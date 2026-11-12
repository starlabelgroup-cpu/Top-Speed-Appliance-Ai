import React from 'react'
import { Link } from 'react-router-dom'
import { SERVICE_OS_LINKS } from '../lib/serviceOs'

/**
 * Account + Appliance Connect — Figma frame 04.
 *
 * One account for the whole ecosystem. This page is the door, not a
 * copy: sign-in, the garage, offers and referrals all live in the real
 * Service OS apps, so every button routes there. No local fake portal.
 */

const GARAGE_FEATS = [
  {
    icon: '🧊',
    name: 'Registered Appliances',
    desc: 'Model, serial, install date, warranty — the living record of every appliance in your home.',
  },
  {
    icon: '🛠️',
    name: 'Active Service',
    desc: 'Watch live jobs move through Track My Tech, stage by stage, until the repair is complete.',
  },
  {
    icon: '📋',
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
            <h2>🔐 Your Top Speed Account</h2>
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
                <p className="kicker">🎁 OFFERS + REWARDS</p>
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
