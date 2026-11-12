import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { trackBooking, trackByToken, SERVICE_OS_LINKS } from '../lib/serviceOs'

/**
 * Track My Tech Live — Figma frame 03.
 *
 * Two doors, both backed by the real Service OS API:
 *  - a secure per-job tracking link (?t=<token> → GET /tracking/by-token/:token)
 *  - reference + phone lookup (GET /bookings/track/:reference?phone=)
 *
 * The live map appears ONLY when the API returns a technicianLocation
 * (the tech is en route and sharing GPS). ETAs are shown only when the
 * technician set one. Nothing here fabricates a pin, an ETA or a stage.
 */

const STAGE_SUBS = [
  'Request received by Top Speed',
  'Setter confirmed your window',
  'Matched + approved by dispatch',
  'ETA set by technician',
  '',
  '',
  'You approve before any repair',
  'Receipt, warranty + review link',
]

function ageText(ageSeconds) {
  if (ageSeconds == null) return ''
  if (ageSeconds < 90) return 'just now'
  if (ageSeconds < 3600) return `${Math.round(ageSeconds / 60)} min ago`
  return `${Math.round(ageSeconds / 3600)} hr ago`
}

export default function TrackPage() {
  const [params] = useSearchParams()
  const token = params.get('t') || ''
  const [reference, setReference] = useState((params.get('ref') || '').toUpperCase())
  const [phone, setPhone] = useState(params.get('phone') || '')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [updatedAt, setUpdatedAt] = useState(null)
  const aliveRef = useRef(true)

  useEffect(() => {
    aliveRef.current = true
    return () => {
      aliveRef.current = false
    }
  }, [])

  const load = useCallback(
    async (silent = false) => {
      if (!token && (!reference.trim() || !phone.trim())) return
      if (!silent) setLoading(true)
      try {
        const data = token
          ? await trackByToken(token)
          : await trackBooking(reference.trim(), phone.trim())
        if (!aliveRef.current) return
        setResult(data)
        setError('')
        setUpdatedAt(new Date())
      } catch (err) {
        if (!aliveRef.current) return
        if (!silent) {
          setResult(null)
          setError(err.message || 'We could not find that booking.')
        }
      } finally {
        if (aliveRef.current && !silent) setLoading(false)
      }
    },
    [token, reference, phone]
  )

  // Initial load: token links open straight into the live view; a
  // ref+phone pair (e.g. from the booking success screen) does too.
  useEffect(() => {
    if (token || (params.get('ref') && params.get('phone'))) load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  // 30-second auto-refresh while a job is on screen.
  useEffect(() => {
    if (!result) return undefined
    const id = window.setInterval(() => load(true), 30000)
    return () => window.clearInterval(id)
  }, [result, load])

  const loc = result?.technicianLocation
  const hasLiveLoc = Boolean(loc && loc.lat != null && loc.lng != null)
  const mapsUrl = hasLiveLoc ? `https://www.google.com/maps?q=${loc.lat},${loc.lng}` : null
  const techName = result?.technician?.assigned ? result.technician.name : null
  const initials = techName
    ? techName.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase()
    : 'TS'

  const stageSub = (i) => {
    if (i === 3) {
      if (hasLiveLoc && !loc.stale) return 'GPS live — ETA set by technician'
      if (hasLiveLoc && loc.stale) return 'GPS paused — last pin shown'
      return 'ETA set by technician'
    }
    return STAGE_SUBS[i]
  }

  return (
    <div className="os-page">
      <div className="os-wrap">
        <div className="os-book-head">
          <div>
            <h1 className="os-h1" style={{ fontSize: 30 }}>
              {result ? result.stageLabel8 : 'Your technician, on the way — live.'}
            </h1>
            {result ? (
              <p className="os-track-meta" style={{ margin: 0 }}>
                Job {result.referenceCode || reference} &nbsp;•&nbsp; {result.appliance} &nbsp;•&nbsp;{' '}
                {result.city}
                {result.zip ? ` ${result.zip}` : ''}
                {result.preferredWindow ? ` &nbsp;•&nbsp; Window ${result.preferredWindow}` : ''}
              </p>
            ) : (
              <p className="os-sub">Eight live stages from request to repair completed.</p>
            )}
          </div>
          <span className="mono-tag os-mono" style={{ color: '#1280ff', fontSize: 12, paddingTop: 10 }}>
            TRACK MY TECH &nbsp;•&nbsp; SERVICE OS
          </span>
        </div>

        <p className="os-sub" style={{ fontSize: 13.5, marginTop: 14 }}>
          Booked here as a guest? <Link to="/account">Open this job in your app →</Link> — we email
          you a one-time sign-in link; no password needed.
        </p>

        {!token && (
          <div className="os-form-card os-lookup-card">
            <h2 className="os-form-title">Find your job</h2>
            <form
              className="os-lookup-form"
              onSubmit={(e) => {
                e.preventDefault()
                load()
              }}
            >
              <input
                className="os-input"
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value.toUpperCase())}
                placeholder="Booking reference (TS-XXXXXX)"
                autoComplete="off"
                required
              />
              <input
                className="os-input"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone on the booking"
                autoComplete="tel"
                required
              />
              <button className="os-btn os-btn-red" type="submit" disabled={loading}>
                {loading ? 'Checking…' : 'Track My Job'}
              </button>
            </form>
            <p className="os-sub" style={{ fontSize: 12.5, marginTop: 14 }}>
              Got a tracking link from your confirmation text or email? It opens this page already
              signed for your job — no phone number needed.
            </p>
          </div>
        )}

        {error && <div className="os-notice os-notice-error">{error}</div>}

        {result && (
          <>
            <div className="os-track-grid">
              <div>
                <div className="os-map-panel">
                  {hasLiveLoc && !loc.stale && (
                    <span className="os-pill os-pill-live os-map-status">● GPS Live — Tech sharing location</span>
                  )}
                  {hasLiveLoc && loc.stale && (
                    <span className="os-pill os-pill-design os-map-status">● GPS Paused — Last shared {ageText(loc.ageSeconds)}</span>
                  )}
                  {!hasLiveLoc && (
                    <span className="os-pill os-pill-soft os-map-status">GPS — Waiting for your tech</span>
                  )}
                  <div className="os-map-center">
                    {hasLiveLoc ? (
                      <>
                        <p className="big">
                          {loc.stale ? 'Last shared location' : 'Your technician is on the map'}
                        </p>
                        <p className="small">
                          {loc.stale
                            ? `Location updates paused — this pin is from ${ageText(loc.ageSeconds)}. It refreshes the moment your technician shares again.`
                            : `Live location shared ${ageText(loc.ageSeconds)}. This page refreshes every 30 seconds.`}
                        </p>
                        <a className="os-btn os-btn-blue" href={mapsUrl} target="_blank" rel="noopener noreferrer">
                          See your technician on Google Maps
                        </a>
                      </>
                    ) : (
                      <>
                        <p className="big">
                          {result.stageIndex >= 4
                            ? 'Your technician has arrived'
                            : result.stageIndex === 3
                              ? 'En route — map lights up on share'
                              : 'The live map appears here'}
                        </p>
                        <p className="small">
                          {result.stageIndex === 3
                            ? 'Your technician is on the way. The live map appears the moment they share their location from the Tech App.'
                            : 'When your technician sets out and shares location from the Tech App, their live position shows up on this page.'}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="os-map-foot">
                    <span className="os-map-chip">MAP: GOOGLE MAPS</span>
                  </div>
                </div>

                <div className="os-tech-card">
                  <div className="os-tech-avatar" aria-hidden="true">{initials}</div>
                  <div className="os-tech-info">
                    <h3>
                      {result.stageIndex >= 3
                        ? 'Your technician is on the way'
                        : techName
                          ? 'Your technician is assigned'
                          : 'Service Setters are on it'}
                    </h3>
                    <p>
                      {techName ? `${techName} • ` : ''}Assigned by Service Setters • Provider
                      network technician
                      <br />
                      Identity + vehicle details appear here once assigned.
                    </p>
                    <div className="os-tech-actions">
                      <a className="os-btn os-btn-navy" href="tel:9549317997">Call</a>
                      <a className="os-btn os-btn-blue" href="sms:+19549317997">Message</a>
                      <a
                        className="os-btn os-btn-ghost"
                        href={SERVICE_OS_LINKS.speedy}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ask Speedy
                      </a>
                    </div>
                  </div>
                  {result.stageIndex === 3 && result.etaMinutes != null && (
                    <div className="os-eta-box">
                      <div className="num">{result.etaMinutes}</div>
                      <div className="unit">MIN ETA</div>
                      <div className="unit">SET BY TECH</div>
                    </div>
                  )}
                </div>

                <div className="os-secure-card">
                  <h3>🔐 A private link for this job only</h3>
                  <p>
                    Your tracking link is issued per job and expires after completion. No phone
                    number as a password, no public guessing — the pattern ported from the Service
                    OS tracking starter, hardened for production.
                  </p>
                  <div className="os-chip-row">
                    <span className="os-pill os-pill-blue">Expiring token</span>
                    <span className="os-pill os-pill-blue">Audited access</span>
                    <span className="os-pill os-pill-blue">Customer-verified</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="os-timeline-card">
                  <h2 className="os-timeline-title">REPAIR TIMELINE</h2>
                  <div className="os-tl">
                    {result.stageLabels.map((label, i) => {
                      const state = i < result.stageIndex ? 'done' : i === result.stageIndex ? 'now' : 'todo'
                      return (
                        <div key={label} className={`os-tl-row ${state}`}>
                          <span className="os-tl-dot">{state === 'done' ? '✓' : state === 'now' ? '●' : ''}</span>
                          <div className="os-tl-text">
                            <div className="stage">{label}</div>
                            {stageSub(i) && <div className="sub">{stageSub(i)}</div>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  {updatedAt && (
                    <p className="os-mono" style={{ color: '#5d7188', fontSize: 11, marginTop: 16 }}>
                      UPDATED {updatedAt.toLocaleTimeString()} • AUTO-REFRESH 30S
                    </p>
                  )}
                </div>

                <div className="os-updates-card">
                  <h3>AUTOMATIC UPDATES</h3>
                  <p>Text + email at every stage change — en route, arrived, estimate ready, completed.</p>
                  <div className="os-chip-row">
                    <span className="os-pill os-pill-soft">Twilio SMS</span>
                    <span className="os-pill os-pill-soft">Resend Email</span>
                    <span className="os-pill os-pill-soft">In-App</span>
                  </div>
                  <p className="honest">If GPS is off or stale, the map says so — it never fakes a live pin.</p>
                </div>
              </div>
            </div>

            <p className="os-sub" style={{ paddingBottom: 50, fontSize: 13 }}>
              Need a hand? Call <a href="tel:9549317997">(954) 931-7997</a> or{' '}
              <Link to="/service-request">book another repair</Link>.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
