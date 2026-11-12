import React from 'react'
import { Link } from 'react-router-dom'
import { APPLIANCES, SERVICE_CITIES, SERVICE_OS_LINKS } from '../lib/serviceOs'
import { SpeedyCard } from '../components/SpeedyPanel'
import MobileStickyBar from '../components/MobileStickyBar'

/**
 * Homepage — Figma frame 01 "Desktop Homepage — .NET × Service OS"
 * (mobile: frame 06A). topspeedappliance.net as a front door of the
 * Top Speed Service OS: every booking lands in Book OS.
 */

const SERVICE_TILES = [
  { icon: '🧊', label: 'Refrigerator', value: 'Refrigerator' },
  { icon: '🌀', label: 'Washer', value: 'Washer' },
  { icon: '👕', label: 'Dryer', value: 'Dryer' },
  { icon: '🔥', label: 'Oven / Range', value: 'Oven/Range' },
  { icon: '🍽️', label: 'Dishwasher', value: 'Dishwasher' },
  { icon: '❄️', label: 'Freezer / Ice Maker', value: 'Freezer/Ice Maker' },
  { icon: '♨️', label: 'Microwave', value: 'Microwave' },
  { icon: '🗑️', label: 'Garbage Disposal', value: 'Garbage Disposal' },
  { icon: '🔧', label: 'Installation', value: 'Installation' },
]

const ECO_CARDS = [
  { name: 'Service OS', desc: 'Bookings, CRM, accounts', status: 'Live', href: SERVICE_OS_LINKS.home },
  { name: 'Speedy AI', desc: 'Chat, voice, photo diagnosis', status: 'Live', href: SERVICE_OS_LINKS.app },
  { name: 'Book OS', desc: 'Service Setters dispatch', status: 'Live', href: SERVICE_OS_LINKS.book },
  { name: 'Appliance Connect', desc: 'Your garage + history', status: 'Live', to: '/account' },
  { name: 'Local OS', desc: 'Directory, reviews, ads', status: 'Live', href: SERVICE_OS_LINKS.local },
  { name: 'Media OS', desc: 'Top Speed 360 hub', status: 'In Design', to: '/media-os' },
]

const SAMPLE_STAGES = [
  'Request received',
  'Appointment confirmed',
  'Technician assigned',
  'Technician en route',
  'Technician arrived',
  'Diagnosis',
  'Estimate approved',
  'Repair completed',
]

const PROMISES = [
  {
    kicker: '$99 DIAGNOSTIC',
    text: 'Residential service starts with a $99 diagnostic \u2014 approve the repair and the fee is credited toward the bill.',
  },
  {
    kicker: 'TRACK MY TECH',
    text: 'Every booking gets a secure tracking link with all eight live stages, from request received to repair completed.',
  },
  {
    kicker: 'ONE DISPATCH TEAM',
    text: 'Service Setters dispatch every job across our twelve Broward County cities \u2014 and every completed repair is warranty-backed.',
  },
]

export default function HomePage() {
  return (
    <div className="os-page os-has-stickybar">
      {/* ---------- hero ---------- */}
      <section className="os-hero">
        <div className="os-hero-checker os-checker" aria-hidden="true" />
        <div className="os-wrap os-hero-inner">
          <div>
            <span className="os-pill os-hero-pill">● Service OS — Live</span>
            <h1 className="os-hero-title">
              Appliance Repair.
              <br />
              Smarter. Faster.
              <br />
              Connected.
            </h1>
            <p className="os-hero-copy">
              Professional home and commercial appliance service, powered by Speedy AI and the Top
              Speed Service OS — one booking, one dispatch team, live tracking from request to
              repair.
            </p>
            <div className="os-hero-ctas">
              <Link className="os-btn os-btn-red" to="/service-request">Book a Repair</Link>
              <a className="os-btn os-btn-navy" href="#meet-speedy">Ask Speedy AI</a>
            </div>
            <div className="os-hero-tiles">
              <Link className="os-hero-tile" to="/service-request">
                <span className="icon" aria-hidden="true">⌂</span>
                <span className="label">Home Repair</span>
              </Link>
              <Link className="os-hero-tile" to="/commercial-appliance-repair">
                <span className="icon" aria-hidden="true">▣</span>
                <span className="label">Commercial</span>
              </Link>
              <Link className="os-hero-tile" to="/service-areas">
                <span className="icon" aria-hidden="true">◎</span>
                <span className="label">Service Areas</span>
              </Link>
            </div>
            <ul className="os-hero-chips">
              <li>$99 diagnostic credited toward repair</li>
              <li>Warranty-backed repairs</li>
              <li>Residential &amp; Commercial</li>
            </ul>
            <div className="os-hero-links">
              <a className="sms" href="sms:+19549317997">💬 Text Us</a>
              <a className="wa" href="https://wa.me/19549317997" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </div>
          <div id="meet-speedy">
            <SpeedyCard />
          </div>
        </div>
      </section>
      <div className="os-red-strip" aria-hidden="true" />

      {/* ---------- what we repair ---------- */}
      <section className="os-section" id="services" style={{ paddingBottom: 30 }}>
        <div className="os-wrap">
          <p className="os-eyebrow">What We Repair</p>
          <h2 className="os-h2">Nine services. Twelve Broward cities. One dispatch team.</h2>
          <div className="os-services-grid">
            {SERVICE_TILES.map((s) => (
              <Link
                key={s.value}
                className="os-svc-card"
                to={`/service-request?appliance=${encodeURIComponent(s.value)}`}
              >
                <span className="icon" aria-hidden="true">{s.icon}</span>
                <span className="name">{s.label}</span>
                <span className="cta">Book in under a minute →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* ---------- 2026 poster set ---------- */}
      <section className="os-section" style={{ paddingTop: 6 }}>
        <div className="os-wrap">
          <p className="os-eyebrow">From the field &nbsp;•&nbsp; The 2026 Poster Set</p>
          <h2 className="os-h2">Real repairs. One fast call — 954-931-7997.</h2>
          <img src="/visuals/visual-hero.jpg" alt="Appliance Broken? Book Same-Day Repair in Broward County — Top Speed Appliance" loading="lazy" style={{ width: '100%', display: 'block', borderRadius: 16, border: '1.5px solid #D8E2F2', marginTop: 14 }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14, marginTop: 14 }}>
              <img src="/visuals/visual-book-now.jpg" alt="Appliance Broken? Book Now — Top Speed Appliance poster" loading="lazy" style={{ width: '100%', display: 'block', borderRadius: 14, border: '1.5px solid #D8E2F2' }} />
              <img src="/visuals/visual-washer-dryer.jpg" alt="Washer or Dryer Not Working? We fix it FAST — call 954-931-7997" loading="lazy" style={{ width: '100%', display: 'block', borderRadius: 14, border: '1.5px solid #D8E2F2' }} />
              <img src="/visuals/visual-fridge-not-cooling.jpg" alt="Fridge Not Cooling? Emergency service available — call 954-931-7997" loading="lazy" style={{ width: '100%', display: 'block', borderRadius: 14, border: '1.5px solid #D8E2F2' }} />
              <img src="/visuals/visual-same-day.jpg" alt="Same-Day Appliance Repair — Top Speed Appliance poster" loading="lazy" style={{ width: '100%', display: 'block', borderRadius: 14, border: '1.5px solid #D8E2F2' }} />
              <img src="/visuals/visual-diagnostic.jpg" alt="$99 diagnostic, credited toward your repair — Top Speed Appliance" loading="lazy" style={{ width: '100%', display: 'block', borderRadius: 14, border: '1.5px solid #D8E2F2' }} />
              <img src="/visuals/visual-cities.jpg" alt="Serving 12 Broward Cities — Top Speed Appliance" loading="lazy" style={{ width: '100%', display: 'block', borderRadius: 14, border: '1.5px solid #D8E2F2' }} />
          </div>
        </div>
      </section>
      <div className="os-checker-sm" style={{ height: 20 }} aria-hidden="true" />

      {/* ---------- ecosystem band ---------- */}
      <section className="os-eco">
        <div className="os-wrap">
          <p className="os-eco-brand">GET TOP SPEED</p>
          <h2 className="os-h2">One platform. Every door.</h2>
          <p className="os-sub">
            topspeedappliance.net is now a front door of the Service OS — every booking, call and
            click lands in the same CRM, dispatch queue and flywheel.
          </p>
          <div className="os-eco-grid">
            {ECO_CARDS.map((c) => {
              const inner = (
                <>
                  <span className="row">
                    <span className="name">{c.name}</span>
                    <span className={`os-pill ${c.status === 'Live' ? 'os-pill-live' : 'os-pill-design'}`}>
                      {c.status}
                    </span>
                  </span>
                  <span className="desc">{c.desc}</span>
                </>
              )
              return c.to ? (
                <Link key={c.name} className="os-eco-card" to={c.to}>{inner}</Link>
              ) : (
                <a key={c.name} className="os-eco-card" href={c.href} target="_blank" rel="noopener noreferrer">
                  {inner}
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- track my tech preview ---------- */}
      <section className="os-section">
        <div className="os-wrap os-track-grid">
          <div>
            <p className="os-eyebrow">Track My Tech</p>
            <h2 className="os-h2">Watch your repair move, stage by stage.</h2>
            <p className="os-sub" style={{ maxWidth: 720 }}>
              Secure tracking link per job. Eight live stages from request to repair completed —
              and a live map the moment your technician shares location.
            </p>
            <p style={{ marginTop: 26 }}>
              <Link className="os-btn os-btn-navy" to="/track">Track My Tech</Link>
            </p>
          </div>
          <div className="os-sample-card" aria-label="Sample tracking timeline">
            <div className="os-sample-head">
              <span className="job">JOB TS-XXXXXX &nbsp;•&nbsp; REFRIGERATOR</span>
              <span className="os-pill os-pill-design">ETA set by technician</span>
            </div>
            {SAMPLE_STAGES.map((s, i) => (
              <div key={s} className={`os-stage-row ${i < 4 ? 'done' : 'todo'}`}>
                <span className={`os-stage-dot ${i < 4 ? 'done' : ''}`} />
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- local os · reviews · directory ---------- */}
      <section className="os-section" style={{ paddingTop: 10 }}>
        <div className="os-wrap">
          <p className="os-eyebrow">Local OS &nbsp;•&nbsp; Reviews + Directory</p>
          <h2 className="os-h2">Our promise, on every job.</h2>
          <div className="os-reviews-grid">
            {PROMISES.map((p) => (
              <div key={p.kicker} className="os-review-card">
                <span className="stars">{p.kicker}</span>
                <p className="quote">{p.text}</p>
              </div>
            ))}
          </div>
          <p className="os-sub" style={{ marginTop: 20, fontSize: 13.5 }}>
            Reviews are earned job by job — every completed repair fires an automatic review
            request, routed to Google. See how it works in the{' '}
            <a href={SERVICE_OS_LINKS.localReviews} target="_blank" rel="noopener noreferrer">
              Local OS reviews engine
            </a>
            .
          </p>
          <div className="os-cities">
            {SERVICE_CITIES.map((city) => (
              <Link key={city} className="os-city-chip" to="/service-areas">{city}</Link>
            ))}
          </div>
          <p className="os-sub" style={{ marginTop: 24, fontSize: 13.5 }}>
            Find us in the <a href={SERVICE_OS_LINKS.local} target="_blank" rel="noopener noreferrer">Local OS directory</a>,
            see how <Link to="/reviews">customer reviews</Link> are earned, or put your business in front of
            Broward homeowners with <a href={SERVICE_OS_LINKS.ads} target="_blank" rel="noopener noreferrer">Local OS ads</a>.
            {' '}We service {APPLIANCES.length} appliance types across all twelve cities.
          </p>
        </div>
      </section>

      <MobileStickyBar />
    </div>
  )
}
