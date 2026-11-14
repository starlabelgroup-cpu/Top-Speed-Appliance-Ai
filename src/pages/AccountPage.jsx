import React from 'react'
import { Link } from 'react-router-dom'
import { SERVICE_OS_LINKS, claimSignInLink } from '../lib/serviceOs'

/**
 * Account + Appliance Connect — Figma frame 04.
 *
 * One account for the whole ecosystem. This page is the door, not a
 * copy: sign-in, the garage, offers and referrals all live in the real
 * Service OS apps, so every button routes there. No local fake portal.
 */

const GARAGE_FEATS = [
  {
    icon: <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M5 9.5h14" stroke="#E8322E"/><path d="M8 6.2v1M8 12.6v3.2" strokeWidth="2.2"/></svg>,
    name: 'Registered Appliances',
    desc: 'Model, serial, install date, warranty — the living record of every appliance in your home.',
  },
  {
    icon: <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13.5 5.2a3.6 3.6 0 0 1 4.8-3.3L16.2 4l1.9 1.9 2.1-2.1a3.6 3.6 0 0 1-4.8 4.3L9 14.5a1.7 1.7 0 0 1-2.4 0L5.4 13.3a1.7 1.7 0 0 1 0-2.4z" transform="scale(.92) translate(.6 .4)"/><path d="M14.5 13.5L20.5 19.5M17 11l3.5 3.5-1.8 1.8-3.5-3.5" stroke="#E8322E"/></svg>,
    name: 'Active Service',
    desc: 'Watch live jobs move through Track My Tech, stage by stage, until the repair is complete.',
  },
  {
    icon: <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5.5" y="4.5" width="13" height="17" rx="2"/><path d="M9.5 4.5a2.5 2.5 0 0 1 5 0" stroke="#E8322E"/><path d="M9 10.5h6M9 14h6M9 17.5h3.6"/></svg>,
    name: 'Service Records',
    desc: 'Every visit, receipt and warranty in one history — nothing lost in a text thread.',
  },
]

const DOORS = [
  {
    name: 'Appliance Connect Pro',
    desc: 'Homeowners + property managers: your home, your units, bulk service requests.',
    go: 'Open Connect Pro →',
    href: SERVICE_OS_LINKS.connectProApp,
  },
  {
    name: 'Appliance Pro — Commercial',
    desc: 'Business accounts: equipment registry, bulk requests and consolidated activity.',
    go: 'Open Appliance Pro →',
    href: SERVICE_OS_LINKS.appliancePro,
  },
  {
    name: 'Tech App — Service Providers',
    desc: 'Technicians: your job offers, route and updates — the separate provider portal.',
    go: 'Open the Tech App →',
    href: SERVICE_OS_LINKS.tech,
  },
]


/**
 * "Open in my app" — the .net → app bridge (Super Apps build).
 * This site books as a guest, so there is no session to carry over and
 * we do not pretend otherwise: the customer proves the booking is
 * theirs with the reference + phone (the Track My Tech check), and the
 * Service OS emails a one-time sign-in link — 5 minutes, single use —
 * for the account matching the booking. The API's message is shown
 * verbatim: it is honest whether or not an account matched.
 */
function ClaimAppCard() {
  const [reference, setReference] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [phase, setPhase] = React.useState('idle')
  const [message, setMessage] = React.useState('')

  async function submit(e) {
    e.preventDefault()
    setPhase('sending')
    setMessage('')
    try {
      const data = await claimSignInLink(reference, phone)
      setPhase('sent')
      setMessage((data && data.message) || 'If an account matches that booking, a sign-in link is on its way to its email.')
    } catch (err) {
      setPhase('error')
      setMessage((err && err.message) || 'No booking found for that reference and phone — check both and try again.')
    }
  }

  const inputStyle = {
    flex: '1 1 200px', padding: '11px 13px', border: '1.5px solid #d8e1ee',
    borderRadius: 10, font: 'inherit', fontSize: 14.5,
  }

  return (
    <div style={{ background: '#f4f7fd', border: '1.5px solid #d8e1ee', borderRadius: 16, padding: '20px 22px', margin: '26px 0' }}>
      <p className="os-eyebrow" style={{ marginTop: 0 }}>Booked here as a guest?</p>
      <h3 style={{ margin: '4px 0 8px', fontSize: 20 }}>Open your job in the app</h3>
      <p className="os-sub" style={{ fontSize: 13.5, maxWidth: 860 }}>
        This site books as a guest — there is no password to carry over, so instead we email you a
        one-time sign-in link (good for 5 minutes, works once). Enter your booking reference and the
        phone number on the booking; if an account matches, the link opens your app already signed
        in, with this job, its live tracking and its full department trail already there.
      </p>
      <form onSubmit={submit} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
        <input style={inputStyle} type="text" value={reference} onChange={(e) => setReference(e.target.value.toUpperCase())} placeholder="Booking reference (TS-XXXXXX)" required />
        <input style={inputStyle} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone on the booking" required />
        <button className="os-btn os-btn-blue" type="submit" disabled={phase === 'sending'}>
          {phase === 'sending' ? 'Sending…' : 'Email my sign-in link'}
        </button>
      </form>
      {message ? (
        <p style={{ marginTop: 12, fontSize: 13.5, fontWeight: 600, color: phase === 'error' ? '#c0272d' : '#0a265c' }}>{message}</p>
      ) : null}
    </div>
  )
}

export default function AccountPage() {
  return (
    <div className="os-page">
      <div className="os-wrap">
        <div className="os-book-head">
          <div>
            <h1 className="os-h1" style={{ fontSize: 30 }}>One account for your whole home.</h1>
            <p className="os-sub" style={{ maxWidth: 980 }}>
              The same sign-in works on topspeedappliance.net, the Service OS portal, and the
              Appliance Connect Pro mobile apps.
            </p>
          </div>
          <span className="mono-tag os-mono" style={{ color: '#1280ff', fontSize: 12, paddingTop: 10 }}>
            APPLIANCE CONNECT &nbsp;•&nbsp; POWERED BY SERVICE OS
          </span>
        </div>

        <div className="os-acct-grid">
          {/* sign-in card */}
          <div className="os-signin-card">
            <h2><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/><circle cx="12" cy="14.6" r="1.5" fill="#E8322E" stroke="none"/><path d="M12 16v1.6" stroke="#E8322E"/></svg> Your Top Speed Account</h2>
            <div className="os-signin-tabs">
              <span className="on">Sign in</span>
              <span className="off">Create account</span>
            </div>
            <div className="os-signin-rule" />
            <p className="os-sub" style={{ fontSize: 13.5, marginBottom: 18 }}>
              Your account lives in the Top Speed Service OS — sign in there and everything here
              unlocks: garage, history, offers and tracking.
            </p>
            <a
              className="os-btn os-btn-red os-btn-block"
              href={SERVICE_OS_LINKS.connectProApp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Sign In
            </a>
            <a
              className="os-btn os-btn-navy os-btn-block"
              style={{ marginTop: 12 }}
              href={SERVICE_OS_LINKS.signup}
              target="_blank"
              rel="noopener noreferrer"
            >
              Create Account
            </a>
            <a href={SERVICE_OS_LINKS.connectProApp} target="_blank" rel="noopener noreferrer">
              <button type="button" className="os-google-btn">Continue with Google</button>
            </a>
            <p className="os-signin-note">
              Google sign-in activates the moment the OAuth client is connected — email sign-in
              works today.
            </p>
            <p className="os-signin-types">
              Homeowner &nbsp;•&nbsp; Business &nbsp;•&nbsp; Property Manager
              <br />
              One account type routes you to the right app.
            </p>
          </div>

          {/* garage + offers + referrals */}
          <div>
            <p className="os-eyebrow" style={{ marginTop: 4 }}>My Appliances — The Garage</p>
            <div className="os-garage-feats">
              {GARAGE_FEATS.map((f) => (
                <div key={f.name} className="os-garage-feat">
                  <span className="icon" aria-hidden="true">{f.icon}</span>
                  <span className="name">{f.name}</span>
                  <span className="desc">{f.desc}</span>
                </div>
              ))}
            </div>
            <a
              className="os-btn os-btn-blue"
              href={SERVICE_OS_LINKS.garage}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open My Appliances
            </a>
            <span style={{ marginLeft: 12 }}>
              <Link className="os-btn os-btn-ghost" to="/track">Track a job →</Link>
            </span>

            <div className="os-acct-cards2">
              <div className="os-offers-card">
                <p className="kicker"><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="10" width="16" height="10" rx="1.5"/><path d="M12 10v10M4 14.5h16M12 10a2.6 2.6 0 1 1 2.6-2.6c0 1.7-2.6 2.6-2.6 2.6zm0 0a2.6 2.6 0 1 0-2.6-2.6c0 1.7 2.6 2.6 2.6 2.6z" stroke="#E8322E"/></svg> OFFERS + REWARDS</p>
                <h3>$25 off your first repair</h3>
                <p>
                  For new registered customers, on eligible repairs — terms on /offers-rewards.
                  The $99 diagnostic credit applies too.
                </p>
                <p className="fine">Eligibility is checked against YOUR account — no fake “everyone wins” banners.</p>
                <a href={SERVICE_OS_LINKS.offers} target="_blank" rel="noopener noreferrer">
                  See offers + terms →
                </a>
              </div>
              <div className="os-ref-card">
                <p className="kicker">REFERRALS</p>
                <h3>Your code appears here</h3>
                <p>
                  Referral codes are issued when your first repair completes — then share them
                  from the app, text or email.
                </p>
                <div className="os-ref-code">TS-REF-••••••</div>
                <a
                  className="os-btn os-btn-navy os-btn-block"
                  href={SERVICE_OS_LINKS.connectProApp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open the app
                </a>
              </div>
            </div>
          </div>
        </div>

        <ClaimAppCard />

        <p className="os-eyebrow">Every Door, One Account</p>
        <div className="os-doors">
          {DOORS.map((d) => (
            <a key={d.name} className="os-door" href={d.href} target="_blank" rel="noopener noreferrer">
              <span className="name">{d.name}</span>
              <span className="desc">{d.desc}</span>
              <span className="go">{d.go}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
