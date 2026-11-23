import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Booking from '../components/Booking'
import MobileStickyBar from '../components/MobileStickyBar'
import { attributionParams, attributionSearch, openSpeedy, withAttribution } from '../lib/serviceOs'

/**
 * Book Service — the dedicated booking page (owner directive 2026-11-23).
 *
 * Every header "Book Service" control lands here, and the page presents
 * the two booking options in the standing form-first order:
 *
 *   1. The Top Speed web form (primary) — the classic booking form,
 *      submitting through bookGuest into the Service OS intake
 *      (POST /speedy/book, source FLAGSHIP_NET) → Book OS / Service
 *      Setters queue.
 *   2. Smart AI booking by Speedy (below) — opens the Speedy chat
 *      (SpeedyFloat), which collects the details, shows a summary for
 *      confirmation, and only then books through the same bookGuest
 *      path into the same queue.
 *
 * First-touch attribution is captured on landing (attributionParams)
 * and rides both submit paths, the same pattern as /service-request.
 */
export default function BookPage() {
  // Capture first-touch attribution (utm_* / click IDs / src) on landing
  // so it survives to whichever booking path the customer takes.
  useEffect(() => {
    attributionParams()
  }, [])

  return (
    <div className="os-page os-has-stickybar">
      <div className="os-wrap">
        <div className="os-book-head">
          <div>
            <h1 className="os-h1">Book Service</h1>
            <p className="os-sub">
              Two ways to book — both land in the same place: the Service OS, the Book OS
              setter queue, confirmation by text + email, and a Track My Tech link.
            </p>
          </div>
          <span className="mono-tag">BOOK SERVICE &nbsp;•&nbsp; BOOK OS</span>
        </div>

        <div className="os-note book-facts">
          <strong>$99 diagnostic</strong> — residential, collected at booking and credited
          toward your approved repair. &nbsp;Open <strong>Mon–Fri, 8am–7pm</strong>. &nbsp;
          Prefer the phone? Call{' '}
          <a href="tel:8444607038">(844) 460-7038</a>.
        </div>

        {/* Option 1 — the classic web form leads (form-first rule). */}
        <section className="os-form-card book-opt" aria-label="Book with the web form">
          <p className="book-opt-tag">Option 1 — Most customers book here</p>
          <h2 className="os-form-title">Book with the Top Speed web form</h2>
          <Booking />
          <p className="book-alt">
            Want the step-by-step Smart Booking form instead?{' '}
            <Link to={withAttribution('/service-request', attributionSearch())}>
              Open Smart Booking →
            </Link>
          </p>
        </section>

        {/* Option 2 — Smart AI booking by Speedy. */}
        <section className="os-form-card book-opt" aria-label="Book with Speedy AI">
          <p className="book-opt-tag">Option 2 — Smart AI booking</p>
          <h2 className="os-form-title">Let Speedy book it for you</h2>
          <p className="book-opt-copy">
            Chat with Speedy, our AI service assistant. Speedy asks the right questions,
            checks your service area, then shows you a summary of your booking — nothing
            is sent until you confirm it. Confirmed bookings go into the same Book OS
            queue, and a Service Setter follows up to confirm your window.
          </p>
          <button type="button" className="os-btn os-btn-blue" onClick={openSpeedy}>
            Book with Speedy →
          </button>
          <p className="book-alt">
            Voice or text &nbsp;•&nbsp; Photo diagnosis &nbsp;•&nbsp; Summary confirmed by you before anything is sent
          </p>
        </section>
      </div>
      <MobileStickyBar />
    </div>
  )
}
