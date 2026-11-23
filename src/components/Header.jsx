import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { SERVICE_OS_LINKS, SERVICE_OS_WEB, openSpeedy, useAttributionSearch, withAttribution } from '../lib/serviceOs'

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
      {/* Top strip — logo · Ask Speedy AI · Call Now (owner's header design).
          The Ask Speedy AI pill opens the floating Speedy panel via
          openSpeedy(), the same mechanism every Speedy button uses. */}
      <div className="header-strip">
        <div className="header-strip-inner">
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
            type="button"
            className="ask-speedy-pill"
            onClick={openSpeedy}
            aria-label="Ask Speedy AI — get repair help, diagnose your issue, book service"
          >
            <span className="ask-speedy-bot" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="2.6" r="1.1" fill="currentColor" stroke="none" />
                <path d="M12 3.7v2.3" />
                <rect x="4.5" y="6" width="15" height="11.5" rx="3.5" />
                <circle cx="9.2" cy="11.4" r="1.15" fill="currentColor" stroke="none" />
                <circle cx="14.8" cy="11.4" r="1.15" fill="currentColor" stroke="none" />
                <path d="M9.4 14.9c.72.62 1.6.93 2.6.93s1.88-.31 2.6-.93" />
                <path d="M4.5 10.6H2.9M21.1 10.6h-1.6" />
              </svg>
            </span>
            <span className="ask-speedy-copy">
              <span className="ask-speedy-title">
                Ask Speedy AI
                <span className="ask-speedy-badge">24/7</span>
              </span>
              <span className="ask-speedy-sub">Get repair help, diagnose your issue, book service.</span>
            </span>
          </button>

          <div className="header-strip-actions">
            <a className="call-now" href="tel:8444607038" aria-label="Call now — 844-460-7038">
              <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.2 4h3.4l1.4 4.2-2.1 1.7a13.5 13.5 0 0 0 6.2 6.2l1.7-2.1L20 15.4v3.4a2 2 0 0 1-2.1 2A16.5 16.5 0 0 1 3.2 6.1 2 2 0 0 1 5.2 4z"/><path d="M15.5 3.5a7 7 0 0 1 5 5M15.5 6.8a3.8 3.8 0 0 1 1.7 1.7" stroke="#E8322E"/></svg>
              <span className="call-now-copy">
                <small>Call Now</small>
                <b>844-460-7038</b>
              </span>
            </a>
            <Link to={withAttribution('/book', attrQs)} className="book-now-btn">Request Service</Link>
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
      </div>

      <div className="header-main-os">
        <div className="container">
          <button
            className="menu-toggle"
            aria-label="Toggle navigation"
            onClick={() => setOpen((s) => !s)}
          >
            <span className={`hamburger ${open ? 'open' : ''}`}></span>
          </button>

          <nav className={`nav os-nav ${open ? 'open' : ''}`}>
            <NavLink to="/" className={({ isActive }) => `nav-link nav-pill nav-home${isActive ? ' active' : ''}`}>Home</NavLink>
            <Link to="/#services" className="nav-link">Services</Link>
            <NavLink to="/brands" className={navLinkClass}>Repair by Brand</NavLink>
            <NavLink to="/commercial-appliance-repair" className={navLinkClass}>Commercial</NavLink>
            <NavLink to="/service-areas" className={navLinkClass}>Service Areas</NavLink>
            <a
              href={SERVICE_OS_LINKS.propertyManagers}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              Property Managers
            </a>
            <a
              href={SERVICE_OS_LINKS.app}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              Appliance Connect
            </a>
            <a
              href={SERVICE_OS_WEB}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              Service OS
            </a>
            <NavLink to="/track" className={navLinkClass}>Track My Tech</NavLink>
            <NavLink to="/refer" className={navLinkClass}>Refer &amp; Earn</NavLink>
            <NavLink to="/reviews" className={navLinkClass}>Reviews</NavLink>
            <NavLink to="/media-os" className={navLinkClass}>Media OS</NavLink>
            <NavLink to="/account" className={navLinkClass}>Account</NavLink>
            <Link to={withAttribution('/book', attrQs)} className="os-btn os-btn-red os-book-btn">BOOK SERVICE</Link>
          </nav>

          <a className="os-call-btn" href="tel:8444607038" aria-label="Call Top Speed Appliance Repair at 844-460-7038">
            <span aria-hidden="true"><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.2 4h3.4l1.4 4.2-2.1 1.7a13.5 13.5 0 0 0 6.2 6.2l1.7-2.1L20 15.4v3.4a2 2 0 0 1-2.1 2A16.5 16.5 0 0 1 3.2 6.1 2 2 0 0 1 5.2 4z"/><path d="M15.5 3.5a7 7 0 0 1 5 5M15.5 6.8a3.8 3.8 0 0 1 1.7 1.7" stroke="#E8322E"/></svg></span> Call
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
