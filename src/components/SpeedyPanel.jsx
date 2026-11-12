import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVICE_OS_LINKS, attributionSearch, withAttribution } from '../lib/serviceOs'

/**
 * Speedy AI entry points for topspeedappliance.net (Figma frames 01/02).
 *
 * Speedy itself lives on the Service OS — this component is the front
 * door: whatever the customer types is carried into the real booking
 * flow (or used to prefill the form when already on it). The full Talk
 * to Speedy chat is the standalone chat surface on the flagship
 * (/speedy) — never the Appliance Pro app. Bookings always land in
 * Book OS through the same FLAGSHIP_NET guest path.
 */

const APPLIANCE_KEYWORDS = [
  ['Freezer/Ice Maker', ['freezer', 'ice maker', 'icemaker']],
  ['Refrigerator', ['fridge', 'refrigerator', 'refridgerator']],
  ['Oven/Range', ['oven', 'range', 'stove', 'cooktop']],
  ['Garbage Disposal', ['disposal', 'garbage disposal']],
  ['Water Heater', ['water heater']],
  ['Dishwasher', ['dishwasher', 'dish washer']],
  ['Microwave', ['microwave']],
  ['Washer', ['washer', 'washing machine', 'laundry']],
  ['Dryer', ['dryer']],
  ['HVAC', ['hvac', 'air conditioner', 'ac unit', 'a/c']],
  ['Installation', ['install', 'installation']],
]

export function detectAppliance(text) {
  const t = String(text || '').toLowerCase()
  for (const [appliance, words] of APPLIANCE_KEYWORDS) {
    if (words.some((w) => t.includes(w))) return appliance
  }
  return ''
}

export const SPEEDY_PREFILL_KEY = 'ts_speedy_prefill'

function AskRow({ value, onChange, onSubmit, placeholder, autoFocus = false }) {
  return (
    <form
      className="os-ask"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Tell Speedy what's happening with your appliance"
        autoFocus={autoFocus}
      />
      <span className="mic" aria-hidden="true">🎤</span>
    </form>
  )
}

/** White "Meet Speedy" card — homepage hero (frame 01). */
export function SpeedyCard() {
  const navigate = useNavigate()
  const [text, setText] = useState('')

  const start = () => {
    const issue = text.trim()
    try {
      window.sessionStorage.setItem(
        SPEEDY_PREFILL_KEY,
        JSON.stringify({ issue, appliance: detectAppliance(issue) })
      )
    } catch {
      // storage unavailable — the booking form still opens normally
    }
    navigate(withAttribution('/service-request', attributionSearch()))
  }

  return (
    <div className="os-speedy-card">
      <h3 className="os-speedy-title">✦ Meet Speedy</h3>
      <p className="os-speedy-sub">Your AI Service Assistant</p>
      <p className="os-speedy-copy">
        Tell Speedy what's happening. It asks the right questions, checks your service area, and
        books you into a real dispatch queue — no forms unless you want one.
      </p>
      <AskRow
        value={text}
        onChange={setText}
        onSubmit={start}
        placeholder="What's happening with your appliance?"
      />
      <button type="button" className="os-btn os-btn-blue os-btn-block" onClick={start}>
        Start with Speedy →
      </button>
      <p className="os-speedy-meta">Voice or text &nbsp;•&nbsp; Photo diagnosis &nbsp;•&nbsp; Books into Book OS</p>
      <p className="os-stars">Live 8-stage tracking on every booked job</p>
    </div>
  )
}

/** Dark Speedy AI panel — beside the booking form (frame 02). */
export function SpeedyPanel({ onPrefill }) {
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const [echo, setEcho] = useState(null)

  const send = () => {
    const issue = text.trim()
    if (!issue) return
    const appliance = detectAppliance(issue)
    const prefill = { issue, appliance }
    if (onPrefill) {
      onPrefill(prefill)
      setEcho(
        appliance
          ? `Got it — ${appliance.toLowerCase()} noted. I've added that to your booking form on the left. Add your details and pick a window, and you're booked into Book OS.`
          : `Got it — I've added that to your booking form on the left. Add your details and pick a window, and you're booked into Book OS.`
      )
    } else {
      try {
        window.sessionStorage.setItem(SPEEDY_PREFILL_KEY, JSON.stringify(prefill))
      } catch {
        // ignore — navigation still works
      }
      navigate(withAttribution('/service-request', attributionSearch()))
    }
    setText('')
  }

  return (
    <aside className="os-speedy-panel" aria-label="Speedy AI assistant">
      <div className="os-speedy-panel-head">
        <span className="brand">✦ SPEEDY AI</span>
        <span className="os-pill os-pill-live">Live</span>
      </div>

      <div className="os-bubble os-bubble-bot">Hi I'm Speedy. What's going on with your appliance?</div>
      {echo ? (
        <div className="os-bubble os-bubble-bot">{echo}</div>
      ) : (
        <>
          <div className="os-bubble os-bubble-user">My fridge isn't cooling and the freezer is warm.</div>
          <div className="os-bubble os-bubble-bot">
            Got it — refrigerator, not cooling. Tell me here and I'll drop it straight into your
            booking — or open the full chat and I'll book it with you step by step.
          </div>
        </>
      )}

      <div className="os-ready-card">
        <p className="kicker">READY TO BOOK</p>
        <p className="job">Booked into Book OS — for real</p>
        <p className="meta">
          Service Setters confirm your window, then Track My Tech goes live.
          <br />
          $99 diagnostic at booking, credited toward repair.
        </p>
        <a
          className="os-btn os-btn-red os-btn-block"
          href={SERVICE_OS_LINKS.speedy}
          target="_blank"
          rel="noopener noreferrer"
        >
          ✓ Open the full Speedy chat
        </a>
      </div>

      <AskRow value={text} onChange={setText} onSubmit={send} placeholder="Type or tap 🎤 and say it..." />

      <p className="os-speedy-disclaimer">
        Speedy books real jobs into Book OS. It never invents prices or certifies a repair is
        safe — a technician diagnoses on site.
      </p>
    </aside>
  )
}
