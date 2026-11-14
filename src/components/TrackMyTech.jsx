import React, { useState } from 'react'
import { trackBooking } from '../lib/serviceOs'

/**
 * Track My Tech — public job tracking for topspeedappliance.net.
 * A customer enters the booking reference from their confirmation
 * (TS-XXXXXX) plus the phone number on the booking and sees the live
 * 8-stage state from the Top Speed Service OS. No account needed.
 */
export default function TrackMyTech({ initialReference = '', initialPhone = '' }) {
  const [reference, setReference] = useState(initialReference)
  const [phone, setPhone] = useState(initialPhone)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const handleTrack = async (e) => {
    e.preventDefault()
    setError('')
    setResult(null)
    setLoading(true)
    try {
      setResult(await trackBooking(reference, phone))
    } catch (err) {
      setError(err.message || 'We could not find that booking.')
    } finally {
      setLoading(false)
    }
  }

  const styles = {
    card: {
      marginTop: '2rem',
      padding: '1.5rem',
      background: '#f9f9f9',
      border: '2px solid #e0e0e0',
      borderTop: '4px solid #d10000',
      borderRadius: '8px',
      textAlign: 'left',
    },
    heading: { margin: '0 0 0.25rem', color: '#1a1a1a', fontSize: '1.25rem' },
    sub: { margin: '0 0 1rem', color: '#555', fontSize: '0.95rem' },
    form: { display: 'flex', flexWrap: 'wrap', gap: '0.75rem' },
    input: {
      flex: '1 1 180px',
      padding: '0.65rem 0.75rem',
      border: '2px solid #e0e0e0',
      borderRadius: '6px',
      fontSize: '1rem',
      background: '#fff',
    },
    button: {
      padding: '0.65rem 1.25rem',
      background: 'linear-gradient(135deg, #d10000 0%, #8b0000 100%)',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
    },
    error: {
      marginTop: '1rem',
      padding: '0.75rem 1rem',
      background: '#ffebee',
      color: '#c62828',
      borderRadius: '6px',
    },
    stageNow: { margin: '1rem 0 0.25rem', color: '#d10000', fontSize: '1.2rem', fontWeight: 700 },
    meta: { margin: '0.25rem 0', color: '#333' },
    dots: { display: 'flex', alignItems: 'center', gap: '6px', margin: '1rem 0' },
    list: { listStyle: 'none', margin: '0.5rem 0 0', padding: 0 },
  }

  return (
    <div style={styles.card}>
      <h3 style={styles.heading}><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21.2S5 15.6 5 9.9a7 7 0 0 1 14 0c0 5.7-7 11.3-7 11.3z"/><circle cx="12" cy="9.9" r="2.6" stroke="#E8322E"/><circle cx="12" cy="9.9" r=".9" fill="#E8322E" stroke="none"/></svg> Track My Tech</h3>
      <p style={styles.sub}>
        Enter your booking reference and the phone number on the booking to see where your visit stands.
      </p>

      <form onSubmit={handleTrack} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          placeholder="Booking reference (TS-XXXXXX)"
          autoComplete="off"
          required
        />
        <input
          style={styles.input}
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone on the booking"
          autoComplete="tel"
          required
        />
        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? 'Checking…' : 'Track My Job'}
        </button>
      </form>

      {error && <div style={styles.error}>{error}</div>}

      {result && (
        <div>
          <p style={styles.stageNow}>{result.stageLabel8}</p>
          <p style={styles.meta}>
            {result.appliance} · {result.city}
            {result.preferredWindow ? ` · Window ${result.preferredWindow}` : ''}
          </p>
          {result.technician?.assigned && (
            <p style={styles.meta}>Technician: {result.technician.name}</p>
          )}
          {result.stageIndex === 3 && result.etaMinutes != null && (
            <p style={styles.meta}>Estimated arrival: about {result.etaMinutes} minutes</p>
          )}

          <div style={styles.dots} aria-hidden="true">
            {result.stageLabels.map((label, i) => (
              <span
                key={label}
                title={label}
                style={{
                  width: i === result.stageIndex ? '18px' : '14px',
                  height: i === result.stageIndex ? '18px' : '14px',
                  borderRadius: '50%',
                  background: i <= result.stageIndex ? '#d10000' : '#ddd',
                  boxShadow: i === result.stageIndex ? '0 0 0 3px #ffebee' : 'none',
                  flexShrink: 0,
                }}
              />
            ))}
          </div>

          <ul style={styles.list}>
            {result.stageLabels.map((label, i) => (
              <li
                key={label}
                style={{
                  padding: '0.2rem 0',
                  color: i < result.stageIndex ? '#777' : i === result.stageIndex ? '#d10000' : '#999',
                  fontWeight: i === result.stageIndex ? 700 : 400,
                }}
              >
                {i < result.stageIndex ? '' : i === result.stageIndex ? '● ' : '○ '}
                {label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
