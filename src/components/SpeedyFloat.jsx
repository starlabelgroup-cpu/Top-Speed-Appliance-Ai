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
  if (!r.ok) {
    const err = new Error(j.error || `Request failed (${r.status})`)
    err.status = r.status
    throw err
  }
  return j
}

/* Chat sends retry ONCE after ~2s on a network error or a 5xx, so a
 * single dropped request (mobile connection, platform blip) reads as
 * "still typing" instead of the connection-snag fallback. The snag
 * shows only when the retry also fails. 4xx errors are not retried —
 * the server answered, and the answer was no. */
async function postChatWithRetry(body) {
  try {
    return await postJson('/speedy/chat', body)
  } catch (e) {
    if (e && e.status && e.status < 500) throw e
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return postJson('/speedy/chat', body)
  }
}

/* Chat capture: one stable session id per visit, sent with chat,
 * diagnosis and booking calls so the conversation lands in the
 * Service OS database for staff Chat Insights (source 'net-float'). */
function speedySessionId() {
  try {
    const k = 'tsos_speedy_session'
    let v = window.sessionStorage.getItem(k)
    if (!v) {
      v =
        window.crypto && window.crypto.randomUUID
          ? window.crypto.randomUUID()
          : `sess-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
      window.sessionStorage.setItem(k, v)
    }
    return v
  } catch {
    return undefined
  }
}

/* Bot bubbles render Speedy's **bold** markdown as real bold. React
 * escapes the text segments itself, so model output stays inert. */
function renderRich(text) {
  const parts = String(text || '').split(/\*\*([^*]+)\*\*/)
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))
}

/* Futuristic input-row icons (2026-11-12): a scan-frame lens for the
 * photo button and a voice waveform for the mic — inline SVG in the
 * brand palette with a soft cyan glow on the red buttons. */
function ScanIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path
        d="M4 8.5V6.8A2.8 2.8 0 0 1 6.8 4h1.7M15.5 4h1.7A2.8 2.8 0 0 1 20 6.8v1.7M20 15.5v1.7a2.8 2.8 0 0 1-2.8 2.8h-1.7M8.5 20H6.8A2.8 2.8 0 0 1 4 17.2v-1.7"
        stroke="#BFE3FF"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3.4" stroke="#FFFFFF" strokeWidth="1.9" />
      <circle cx="12" cy="12" r="1.15" fill="#FFFFFF" />
    </svg>
  )
}

function WaveIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path
        d="M4.5 10.2v3.6M8.3 7.4v9.2M15.7 7.4v9.2M19.5 10.2v3.6"
        stroke="#FFFFFF"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path d="M12 4.8v14.4" stroke="#BFE3FF" strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  )
}

export default function SpeedyFloat() {
  const [open, setOpen] = useState(false)
  const [greeted, setGreeted] = useState(false)
  const [msgs, setMsgs] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [pendingBook, setPendingBook] = useState(null)
  const [bookedRef, setBookedRef] = useState('')
  const [bookedPhone, setBookedPhone] = useState('')
  const [listening, setListening] = useState(false)
  const fileRef = useRef(null)
  const recogRef = useRef(null)
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
            text: "Hey, I'm Speedy — Top Speed's AI assistant. I can diagnose appliance issues (send a photo or describe the problem), recommend the right fix, schedule maintenance, and book real visits — or just answer your questions. What can I do for you?",
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
        const j = await postChatWithRetry({
          message: text,
          history: historyRef.current.slice(-10),
          sessionId: speedySessionId(),
          source: 'net-float',
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
        sessionId: speedySessionId(),
      })
      const ref = (j.data && j.data.referenceCode) || j.referenceCode || 'received'
      setBookedRef(ref)
      setBookedPhone(d.phone)
      setMsgs((m) => [
        ...m,
        {
          role: 'bot',
          text: `Booked! Your reference is ${ref}. A Service Setter will text ${d.phone} to confirm your window. You can track it any time on the Track My Tech page.`,
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


  const sendReceipt = useCallback(
    async (channel) => {
      if (!bookedRef || !bookedPhone) return
      try {
        const j = await postJson('/speedy/send-receipt', {
          reference: bookedRef,
          phone: bookedPhone,
          channel,
        })
        const msg = (j.data && j.data.message) || 'Done.'
        setMsgs((m) => [...m, { role: 'bot', text: `${msg}` }])
      } catch (e) {
        setMsgs((m) => [
          ...m,
          { role: 'bot', text: `That didn't go through: ${e.message}. Call 954-931-7997 and we'll send it by phone.` },
        ])
      }
    },
    [bookedRef, bookedPhone]
  )

  const onPhoto = useCallback((e) => {
    const f = e.target.files && e.target.files[0]
    e.target.value = ''
    if (!f) return
    setMsgs((m) => [...m, { role: 'me', text: 'Sent a photo of my appliance' }])
    setTyping(true)
    const reader = new FileReader()
    reader.onload = (ev) => {
      const img = new Image()
      img.onload = async () => {
        try {
          const mx = 1280
          const sc = Math.min(1, mx / Math.max(img.naturalWidth, img.naturalHeight))
          const cv = document.createElement('canvas')
          cv.width = Math.round(img.naturalWidth * sc)
          cv.height = Math.round(img.naturalHeight * sc)
          cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height)
          const j = await postJson('/speedy/diagnose', {
            imageDataUrl: cv.toDataURL('image/jpeg', 0.82),
            note: 'Photo sent by a customer chatting on topspeedappliance.net',
            sessionId: speedySessionId(),
            source: 'net-float',
          })
          const rep = (j.data && (j.data.reply || j.data.summary || j.data.text)) || ''
          setTyping(false)
          setMsgs((m) => [
            ...m,
            {
              role: 'bot',
              text: rep
                ? `Speedy's first look: ${rep} A technician confirms the diagnosis on site — Speedy never certifies a repair is safe. Want me to book the $99 diagnostic visit?`
                : "I received your photo but couldn't read it clearly — a technician will review it in person. Want me to book the $99 diagnostic visit?",
            },
          ])
        } catch {
          setTyping(false)
          setMsgs((m) => [
            ...m,
            { role: 'bot', text: "Speedy couldn't read that photo just now — book the visit and the technician will diagnose on site, or call 954-931-7997." },
          ])
        }
      }
      img.src = ev.target.result
    }
    reader.readAsDataURL(f)
  }, [])

  const toggleMic = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) {
      setMsgs((m) => [
        ...m,
        { role: 'bot', text: "Voice isn't supported in this browser — type instead, and I'll book you the same way. (Voice works in Chrome on desktop and Android.)" },
      ])
      return
    }
    if (listening) {
      recogRef.current && recogRef.current.stop()
      setListening(false)
      return
    }
    try {
      const rec = new SR()
      recogRef.current = rec
      rec.lang = 'en-US'
      rec.interimResults = false
      rec.onresult = (ev) => {
        const t = ev.results[0][0].transcript
        setListening(false)
        send(t)
      }
      rec.onend = () => setListening(false)
      rec.onerror = () => setListening(false)
      rec.start()
      setListening(true)
    } catch {
      setListening(false)
    }
  }, [listening, send])

  return (
    <>
      {!open && (
        <button
          type="button"
          className="os-float-btn"
          onClick={openPanel}
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 5.5A1.8 1.8 0 0 1 5.8 3.7h12.4A1.8 1.8 0 0 1 20 5.5v8.3a1.8 1.8 0 0 1-1.8 1.8H13l-4.6 3.9v-3.9H5.8A1.8 1.8 0 0 1 4 13.8z"/><path d="M7.6 9.3h.01M12 9.3h.01M16.4 9.3h.01" strokeWidth="2.6" stroke="#E8322E"/></svg> Ask Speedy
        </button>
      )}

      {open && (
        <div className="os-float-panel" role="dialog" aria-label="Ask Speedy chat assistant">
          <div className="os-float-head">
            <span className="av" aria-hidden="true"><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 15.5l1.6-4.4A2 2 0 0 1 6.5 9.7h3.1l1.8-2.4h5.4l2.6 3.4 1.6 4.8M3 15.5h18M3 15.5a2.4 2.4 0 0 0 2.4 2.4h1M21 15.5a2.4 2.4 0 0 1-2.4 2.4h-1"/><circle cx="7.6" cy="17.9" r="1.8"/><circle cx="16.4" cy="17.9" r="1.8"/><path d="M11.3 9.7h6" stroke="#E8322E"/></svg></span>
            <span>
              <b>Speedy</b>
              <small>Top Speed AI assistant • Live</small>
            </span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </div>

          <div className="os-float-quick">
            <button type="button" onClick={() => send('Can you help diagnose my appliance problem?')}><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.7 6.3a4.4 4.4 0 0 1 5.9-4L18 4.9l2.3 2.3 2.7-2.6a4.4 4.4 0 0 1-5.9 5.2L8 18.9a2 2 0 0 1-2.9 0l-1.2-1.2a2 2 0 0 1 0-2.9z" transform="translate(-1.2 .6) scale(.94)"/></svg> Diagnose</button>
            <button type="button" onClick={() => send('What do you recommend for my appliance?')}><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l1.9 6.1L20 11l-6.1 1.9L12 19l-1.9-6.1L4 11l6.1-1.9z"/><circle cx="12" cy="11" r="1" fill="#E8322E" stroke="none"/></svg> Recommend</button>
            <button type="button" onClick={() => send("I'd like to schedule maintenance")}><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13.5 5.2a3.6 3.6 0 0 1 4.8-3.3L16.2 4l1.9 1.9 2.1-2.1a3.6 3.6 0 0 1-4.8 4.3L9 14.5a1.7 1.7 0 0 1-2.4 0L5.4 13.3a1.7 1.7 0 0 1 0-2.4z" transform="scale(.92) translate(.6 .4)"/><path d="M14.5 13.5L20.5 19.5M17 11l3.5 3.5-1.8 1.8-3.5-3.5" stroke="#E8322E"/></svg> Maintenance</button>
            <button type="button" onClick={() => send('I want to book a repair visit')}><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M7.5 3.5v4M16.5 3.5v4" stroke="#E8322E"/><path d="M7.4 14h2.2M11 14h2.2M14.6 14h2.2M7.4 17h2.2M11 17h2.2" strokeWidth="2"/></svg> Book a visit</button>
          </div>

          <div className="os-float-scroll" ref={bodyRef}>
          <div className="os-float-recs">
            <div className="os-float-rec-h"><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 16v-5.2a6 6 0 0 1 12 0V16l1.2 2.8H4.8z"/><path d="M10 21a2.2 2.2 0 0 0 4 0" stroke="#E8322E"/><path d="M12 3.4a2 2 0 0 1 2 2" opacity=".7"/></svg> Updates</div>
            {GUEST_UPDATES.map((u) => (
              <div className="os-float-rec upd" key={u.t}>
                <b>{u.t}</b> — {u.d}{' '}
                <a href={u.href} target="_blank" rel="noopener noreferrer">{u.c} →</a>
              </div>
            ))}
            <div className="os-float-rec-h"><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l1.9 6.1L20 11l-6.1 1.9L12 19l-1.9-6.1L4 11l6.1-1.9z"/><circle cx="12" cy="11" r="1" fill="#E8322E" stroke="none"/></svg> Speedy recommends</div>
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

          <div className="os-float-body">
            {msgs.map((m, i) => (
              <div key={i} className={`os-bubble ${m.role === 'me' ? 'os-bubble-user' : 'os-bubble-bot'}`}>
                {m.role === 'me' ? m.text : renderRich(m.text)}
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
                  <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12.8l5.2 5.2L20 6.8"/><circle cx="19" cy="17.5" r="1.15" fill="#E8322E" stroke="none"/></svg> Book my visit
                </button>
              </div>
            )}
            {bookedRef && (
              <div className="os-bubble os-bubble-bot os-float-book">
                <b>Your booking tools</b>
                <br />
                <button type="button" className="os-btn" onClick={() => sendReceipt('email')}>
                  <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="6" width="18" height="12.5" rx="2.2"/><path d="M3.8 7.4L12 13l8.2-5.6" stroke="#E8322E"/></svg> Email me my receipt
                </button>{' '}
                <button type="button" className="os-btn" onClick={() => sendReceipt('sms')}>
                  <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 5.5A1.8 1.8 0 0 1 5.8 3.7h12.4A1.8 1.8 0 0 1 20 5.5v8.3a1.8 1.8 0 0 1-1.8 1.8H13l-4.6 3.9v-3.9H5.8A1.8 1.8 0 0 1 4 13.8z"/><path d="M7.6 9.3h.01M12 9.3h.01M16.4 9.3h.01" strokeWidth="2.6" stroke="#E8322E"/></svg> Text me my tracking link
                </button>
              </div>
            )}
          </div>

          </div>

          <form
            className="os-float-input"
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={onPhoto}
              aria-hidden="true"
              tabIndex={-1}
            />
            <button type="button" onClick={() => fileRef.current && fileRef.current.click()} aria-label="Send a photo for diagnosis" title="Send a photo — Speedy will take a first look">
              <ScanIcon />
            </button>
            <button type="button" className={listening ? 'os-mic-on' : ''} onClick={toggleMic} aria-label={listening ? 'Stop voice input' : 'Book by voice'} title="Book by voice">
              <WaveIcon />
            </button>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={listening ? 'Listening… speak now' : 'Ask about repairs, pricing, areas…'}
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
