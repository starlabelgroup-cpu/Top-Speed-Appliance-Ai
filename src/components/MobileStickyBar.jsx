import React from 'react'
import { Link } from 'react-router-dom'
import { useAttributionSearch, withAttribution } from '../lib/serviceOs'

/** Sticky mobile action bar — Figma frames 06A/06B. CSS shows it < 640px. */
export default function MobileStickyBar() {
  const attrQs = useAttributionSearch()
  return (
    <div className="os-stickybar" aria-label="Quick actions">
      <Link className="b-book" to={withAttribution('/service-request', attrQs)}>Book Online</Link>
      <a className="b-call" href="tel:9549317997">Call Us</a>
      <button
        type="button"
        className="b-chat"
        onClick={() => window.dispatchEvent(new Event('ts-open-speedy'))}
      >
        Chat
      </button>
    </div>
  )
}
