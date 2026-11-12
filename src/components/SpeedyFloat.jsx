import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  SERVICE_OS_API_BASE,
  SERVICE_OS_LINKS,
  bookGuest,
  attributionParams,
  buildViaTag,
} from '../lib/serviceOs'

/**
 * Floating Speedy (Phase D) — a persistent Speedy button that waits on
 * the customer and opens the real Speedy chat IN PLACE as a panel.
 * It talks to the same public Service OS endpoints as the flagship
 * chat (/speedy/chat, /speedy/extract-booking, and the FLAGSHIP_NET
 * guest booking path), so a .net visitor chats and books without ever
 * being routed into an app.
 *
 * Recommendations/updates shown here are the platform's standing,
 * published items for guests (this origin holds no flagship session,
 * so nothing is presented as personalized). Speedy never invents
 * prices or certifies a repair is safe.
 */

const GUEST_UPDATES = [
  {
    t: '$25 off your first eligible repair',
    d: 'For new registered customers — published offer, terms on the flagship.',
    href: SERVICE_OS_LINKS.offers,
    c: 'See terms',
  },
]

const GUEST_RECS = [
  {
    t: '$99 diagnostic, credited toward your repair',
    d: 'The residential diagnostic is collected at booking and credited in full toward the repair.',
  },
  {
    t: 'Track My Tech',
    d: 'Every booked job gets live 8-stage tracking with a secure link.',
    href: '/track',
    c: 'Track a job',
  },
  {
    t: 'Care tip',
    d: 'Clean the dryer vent and fridge coils twice a year — the two cheapest breakdowns to prevent.',
  },
]

async function postJson(path, body) {
  const r = await fetch(`${SERVICE_OS_API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const j = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(j.error || `Request failed (${r.status})`)
  return j
}

export default function SpeedyFloat() {
  const [open, setOpen] = useState(false)
  const [greeted, setGreeted] = useState(false)
  const [msgs, setMsgs] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [pendingBook, setPendingBook] = useState(null)
  const [bookedRef, setBookedRef] = useState('')
  const historyRef = useRef([])
  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  const openPanel = useCallback(() => {
    setOpen(true)
    setGreeted((g) => {
      if (!g) {
        setMsgs((m) => [
          ...m,
          {
            role: 'bot',
            text: "Hey, I'm Speedy 🏎️ — Top Speed's assistant. Ask me about the $99 diagnostic, your city, a broken appliance, or type \"book\" and I'll walk you to an appointment.",
          },
        ])
      }
      return true
    })
    setTimeout(() => inputRef.current?.focus(), 90)
  }, [])

  useEffect(() => {
    const onOpen = () => openPanel()
    window.addEventListener('ts-open-speedy', onOpen)
    return () => window.removeEventListener('ts-open-speedy', onOpen)
  }, [openPanel])

  useEffect(() => {
    const b = bodyRef.current
    if (b) b.scrollTop = b.scrollHeight
  }, [msgs, typing, pendingBook, bookedRef, open])

  const maybeBook = useCallback(async () => {
    if (bookedRef) return
    const text = historyRef.current
      .map((h) => `${h.role === 'user' ? 'Customer' : 'Speedy'}: ${h.content}`)
      .join('\n')
    try {
      const j = await postJson('/speedy/extract-booking', { text })
      const d = j.data || {}
      if (d.ready) {
        setPendingBook((prev) => prev || d)
      }
    } catch {
      // extraction is best-effort — the chat continues either way
    }
  }, [bookedRef])

  const send = useCallback(
    async (raw) => {
      const text = String(raw || '').trim()
      if (!text || typing) return
      setInput('')
      setMsgs((m) => [...m, { role: 'me', text }])
      historyRef.current.push({ role: 'user', content: text })
      setTyping(true)
      try {
        const j = await postJson('/speedy/chat', {
          message: text,
          history: historyRef.current.slice(-10),
        })
        const reply = (j.data && j.data.reply) || ''
        if (!reply) throw new Error('empty reply')
        setMsgs((m) => [...m, { role: 'bot', text: reply }])
        historyRef.current.push({ role: 'assistant', content: reply })
        setTyping(false)
        maybeBook()
      } catch {
        setTyping(false)
        setMsgs((m) => [
          ...m,
          {
            role: 'bot',
            text: 'Speedy hit a connection snag just now. For the fastest help, call dispatch at 954-931-7997 — or try me again in a moment.',
          },
        ])
      }
    },
    [typing, maybeBook]
  )

  const bookIt = useCallback(async () => {
    const d = pendingBook
    if (!d) return
    setPendingBook(null)
    setMsgs((m) => [...m, { role: 'bot', text: 'Booking your visit…' }])
    try {
      const via = buildViaTag(attributionParams())
      const j = await bookGuest({
        customer: { name: d.name, phone: d.phone },
        city: d.city,
        zip: d.zip,
        appliance: d.appliance,
        issue: via ? `${d.issue} ${via}` : d.issue,
        preferredWindow: d.preferred_window || undefined,
        source: 'FLAGSHIP_NET',
      })
      const ref = (j.data && j.data.referenceCode) || j.referenceCode || 'received'
      setBookedRef(ref)
      setMsgs((m) => [
        ...m,
        {
          role: 'bot',
          text: `✅ Booked! Your reference is ${ref}. A Service Setter will text ${d.phone} to confirm your window. You can track it any time on the Track My Tech page.`,
        },
      ])
    } catch (e) {
      setMsgs((m) => [
        ...m,
        {
          role: 'bot',
          text: `That booking did not go through (${e.message}). You can use the booking form on this site, or call 954-931-7997.`,
        },
      ])
    }
  }, [pendingBook])

  return (
    <>
      <button
        type="button"
        className="os-float-btn"
        onClick={() => (open ? setOpen(false) : openPanel())}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        💬 Ask Speedy
      </button>

      {open && (
        <div className="os-float-panel" role="dialog" aria-label="Ask Speedy chat assistant">
          <div className="os-float-head">
            <span className="av" aria-hidden="true">🏎️</span>
            <span>
              <b>Speedy</b>
              <small>Top Speed AI assistant • Live</small>
            </span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </div>

          <div className="os-float-quick">
            <button type="button" onClick={() => send('How much is the diagnostic?')}>💲 Diagnostic cost</button>
            <button type="button" onClick={() => send('My fridge is not cooling')}>🧊 Fridge help</button>
            <button type="button" onClick={() => send('I want to book')}>📅 Book me</button>
          </div>

          <div className="os-float-recs">
            <div className="os-float-rec-h">🔔 Updates</div>
            {GUEST_UPDATES.map((u) => (
              <div className="os-float-rec upd" key={u.t}>
                <b>{u.t}</b> — {u.d}{' '}
                <a href={u.href} target="_blank" rel="noopener noreferrer">{u.c} →</a>
              </div>
            ))}
            <div className="os-float-rec-h">✦ Speedy recommends</div>
            {GUEST_RECS.map((r) => (
              <div className="os-float-rec" key={r.t}>
                <b>{r.t}</b> — {r.d}
                {r.href ? (
                  <>
                    {' '}
                    <a href={r.href}>{r.c} →</a>
                  </>
                ) : null}
              </div>
            ))}
          </div>

          <div className="os-float-body" ref={bodyRef}>
            {msgs.map((m, i) => (
              <div key={i} className={`os-bubble ${m.role === 'me' ? 'os-bubble-user' : 'os-bubble-bot'}`}>
                {m.text}
              </div>
            ))}
            {typing && <div className="os-bubble os-bubble-bot">Speedy is typing…</div>}
            {pendingBook && !bookedRef && (
              <div className="os-bubble os-bubble-bot os-float-book">
                <b>Ready to book — does this look right?</b>
                <br />
                Name: <b>{pendingBook.name}</b>
                <br />
                Phone: <b>{pendingBook.phone}</b>
                <br />
                City: <b>{pendingBook.city}</b>
                <br />
                ZIP: <b>{pendingBook.zip}</b>
                <br />
                Appliance: <b>{pendingBook.appliance}</b>
                <br />
                Problem: <b>{pendingBook.issue}</b>
                <br />
                Window: <b>{pendingBook.preferred_window || 'First available'}</b>
                <br />
                <span className="os-float-book-note">
                  $99 diagnostic, collected at booking, credited toward your repair. A Service Setter confirms by text.
                </span>
                <br />
                <button type="button" className="os-btn os-btn-red" onClick={bookIt}>
                  ✓ Book my visit
                </button>
              </div>
            )}
          </div>

          <form
            className="os-float-input"
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about repairs, pricing, areas…"
              aria-label="Message Speedy"
              autoComplete="off"
            />
            <button type="submit">Send</button>
          </form>
          <p className="os-float-fine">
            Speedy books real jobs into Book OS. It never invents prices or certifies a repair is
            safe — a technician diagnoses on site.
          </p>
        </div>
      )}
    </>
  )
}
