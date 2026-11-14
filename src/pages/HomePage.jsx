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
  { icon: <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M5 9.5h14" stroke="#E8322E"/><path d="M8 6.2v1M8 12.6v3.2" strokeWidth="2.2"/></svg>, label: 'Refrigerator', value: 'Refrigerator' },
  { icon: <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 12a2 2 0 1 1 2 2 4 4 0 1 1-4-4 6.2 6.2 0 1 1 6.2 6.2" stroke="#E8322E"/><circle cx="12" cy="12" r=".9" fill="#E8322E" stroke="none"/></svg>, label: 'Washer', value: 'Washer' },
  { icon: <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8.5 4L3.8 7l1.7 3.2 2-1v11h9v-11l2 1L20.2 7 15.5 4a3.5 3.5 0 0 1-7 0z"/><path d="M9.8 13.2h4.4" stroke="#E8322E"/></svg>, label: 'Dryer', value: 'Dryer' },
  { icon: <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3.5c.8 3-1.6 4.6-2.9 6.1C7.7 11.2 7 12.6 7 14.2A5 5 0 0 0 17 14.2c0-1.2-.5-2.3-1.1-3.3-.5 1-1.2 1.7-2.1 2.1.3-2.7-.4-6.4-1.8-9.5z"/><path d="M12 20.2a2.6 2.6 0 0 1-2.6-2.6c0-1 .5-1.8 1.1-2.5.5-.6 1-1.2 1.5-2 .5.8.9 1.4 1.4 2 .6.7 1.1 1.5 1.1 2.5A2.6 2.6 0 0 1 12 20.2z" stroke="#E8322E"/></svg>, label: 'Oven / Range', value: 'Oven/Range' },
  { icon: <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6.5 3.5v6M4.2 3.5v3.4a2.3 2.3 0 0 0 4.6 0V3.5M6.5 9.5V20.5" transform="translate(.4 0)"/><path d="M17.2 3.5c1.8 1.4 2.6 3.8 2.6 6 0 2-1 3-2.6 3v8" stroke="#E8322E"/></svg>, label: 'Dishwasher', value: 'Dishwasher' },
  { icon: <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9M12 3l-2 2.2M12 3l2 2.2M12 21l-2-2.2M12 21l2-2.2" stroke="#E8322E"/></svg>, label: 'Freezer / Ice Maker', value: 'Freezer/Ice Maker' },
  { icon: <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 20.5c-1.4-2.3 1.4-3.6 0-5.9M12 20.5c-1.4-2.3 1.4-3.6 0-5.9M17 20.5c-1.4-2.3 1.4-3.6 0-5.9" stroke="#E8322E"/><path d="M8.2 9.6c-1-1.8.8-2.8.4-4.6M12.4 9.6c-1-1.8.8-2.8.4-4.6M16.6 9.6c-1-1.8.8-2.8.4-4.6" opacity=".75"/></svg>, label: 'Microwave', value: 'Microwave' },
  { icon: <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4.5 6.5h15M9.5 6V4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2M6.5 6.5l1 13a2 2 0 0 0 2 1.8h5a2 2 0 0 0 2-1.8l1-13"/><path d="M10 10.5v6M14 10.5v6" stroke="#E8322E"/></svg>, label: 'Garbage Disposal', value: 'Garbage Disposal' },
  { icon: <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.7 6.3a4.4 4.4 0 0 1 5.9-4L18 4.9l2.3 2.3 2.7-2.6a4.4 4.4 0 0 1-5.9 5.2L8 18.9a2 2 0 0 1-2.9 0l-1.2-1.2a2 2 0 0 1 0-2.9z" transform="translate(-1.2 .6) scale(.94)"/></svg>, label: 'Installation', value: 'Installation' },
]

const ECO_CARDS = [
  { name: 'Service OS', desc: 'Bookings, CRM, accounts', status: 'Live', href: SERVICE_OS_LINKS.home },
  { name: 'Speedy AI', desc: 'Chat, voice, photo diagnosis', status: 'Live', href: SERVICE_OS_LINKS.speedy },
  { name: 'Book OS', desc: 'Service Setters dispatch', status: 'Live', href: SERVICE_OS_LINKS.book },
  { name: 'Appliance Connect Pro', desc: 'Your garage + history — homeowners & property managers', status: 'Live', href: SERVICE_OS_LINKS.connectProApp },
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
              <a className="sms" href="sms:+19549317997"><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 5.5A1.8 1.8 0 0 1 5.8 3.7h12.4A1.8 1.8 0 0 1 20 5.5v8.3a1.8 1.8 0 0 1-1.8 1.8H13l-4.6 3.9v-3.9H5.8A1.8 1.8 0 0 1 4 13.8z"/><path d="M7.6 9.3h.01M12 9.3h.01M16.4 9.3h.01" strokeWidth="2.6" stroke="#E8322E"/></svg> Text Us</a>
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
