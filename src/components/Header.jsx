import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import ServiceReserveButton from './ServiceReserveButton'
import { openSpeedy, useAttributionSearch, withAttribution } from '../lib/serviceOs'

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const attrQs = useAttributionSearch()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    const hash = location.hash

    if (hash) {
      const id = hash.replace('#', '')
      const tryScroll = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return true
        }
        return false
      }

      if (!tryScroll()) {
        setTimeout(() => {
          if (!tryScroll()) {
            requestAnimationFrame(tryScroll)
          }
        }, 50)
      }

      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname, location.hash])

  const navLinkClass = ({ isActive }) => `nav-link nav-pill${isActive ? ' active' : ''}`

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-contact">
          <a href="tel:9549317997" className="contact-link phone-link">
            <span className="contact-icon" aria-hidden="true">
              <svg className="header-contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.87 5.11 6.69 2.93a1.5 1.5 0 0 0-2.12 0L3.34 4.16c-.9.9-1.17 2.24-.68 3.41a21.3 21.3 0 0 0 10.77 10.77c1.17.49 2.51.22 3.41-.68l1.23-1.23a1.5 1.5 0 0 0 0-2.12l-2.18-2.18a1.5 1.5 0 0 0-1.62-.33l-1.81.72a1.5 1.5 0 0 1-1.64-.35L8.48 8.54a1.5 1.5 0 0 1-.35-1.64l.72-1.81a1.5 1.5 0 0 0-.33-1.62Z" fill="currentColor"/>
              </svg>
            </span>
            (954) 931-7997
          </a>
          <a href="mailto:service@topspeedappliance.net" className="contact-link email-link">
            <span className="contact-icon" aria-hidden="true">
              <svg className="header-contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-11Zm2.05-.5 5.67 4.26a1.5 1.5 0 0 0 1.8 0L19.2 6H6.05Zm13.95 2.5-5.58 4.2a3.5 3.5 0 0 1-4.2 0L4 8.5v9A1.5 1.5 0 0 0 5.5 19h13a1.5 1.5 0 0 0 1.5-1.5v-9Z" fill="currentColor"/>
              </svg>
            </span>
            service@topspeedappliance.net
          </a>
        </div>
        <div className="header-actions">
          <button type="button" className="book-now-btn" onClick={openSpeedy}>
            Book Now
          </button>
          <ServiceReserveButton source="header" className="book-now-btn" />
          <Link
            to="/account"
            className="portal-login-btn"
            aria-label="Log in to your Top Speed account"
            title="Access your service history and manage appointments"
          >
            Portal Login
          </Link>
        </div>
      </div>
      <div className="header-main-os">
        <div className="container">
          <Link to="/" className="os-logo" aria-label="Top Speed Appliance Repair — The Faster, The Better. — home">
            <img
              src="/logo-header.jpg"
              alt="Top Speed Appliance Repair — The Faster, The Better."
              className="os-logo-img"
              width="500"
              height="217"
            />
            <span className="os-lockup">
              <b>Top Speed Appliance Repair</b>
              <small>Serving South Florida</small>
            </span>
          </Link>

          <button
            className="menu-toggle"
            aria-label="Toggle navigation"
            onClick={() => setOpen((s) => !s)}
          >
            <span className={`hamburger ${open ? 'open' : ''}`}></span>
          </button>

          <nav className={`nav os-nav ${open ? 'open' : ''}`}>
            <Link to="/#services" className="nav-link">Services</Link>
            <NavLink to="/commercial-appliance-repair" className={navLinkClass}>Commercial</NavLink>
            <a
              href="https://topspeedserviceos.com/property-managers"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              Property Managers
            </a>
            <NavLink to="/track" className={navLinkClass}>Track My Tech</NavLink>
            <NavLink to="/refer" className={navLinkClass}>Refer &amp; Earn</NavLink>
            <NavLink to="/reviews" className={navLinkClass}>Reviews</NavLink>
            <NavLink to="/media-os" className={navLinkClass}>Media OS</NavLink>
            <NavLink to="/account" className={navLinkClass}>Account</NavLink>
            <Link to={withAttribution('/service-request', attrQs)} className="os-btn os-btn-red os-book-btn">BOOK SERVICE</Link>
          </nav>

          <a className="os-call-btn" href="tel:9549317997" aria-label="Call Top Speed Appliance Repair at 954-931-7997">
            <span aria-hidden="true">📞</span> Call
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
