import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

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

  const navLinkClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`

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
          <a href="https://book.housecallpro.com/book/TopSpeed-Appliance/0c0fcb09005e47239b0bd7d487e9d468?v2=true" target="_blank" rel="noopener noreferrer" className="book-now-btn">
            Book Now
          </a>
          <button
            data-token='8d8427149b1b4af097d0fa3874bcf202'
            data-orgname='TopSpeed-Appliance'
            onClick={() => window.open('https://client.housecallpro.com/customer_portal/request-link?token=8d8427149b1b4af097d0fa3874bcf202', '_blank')}
            className="portal-login-btn"
            aria-label="Log in to customer portal"
            title="Access your service history and manage appointments"
          >
            Portal Login
          </button>
        </div>
      </div>
      <div className="container">
        <img src="https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2F55f8330765584b548ff08a3d1f6b6116?format=webp&width=800" alt="Top Speed Appliance" className="logo" />

        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          onClick={() => setOpen((s) => !s)}
        >
          <span className={`hamburger ${open ? 'open' : ''}`}></span>
        </button>

        <nav className={`nav ${open ? 'open' : ''}`}>
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>
          <Link to="/#services" className="nav-link">Services</Link>
          <Link to="/#keywords" className="nav-link">Repair Near Me</Link>
          <NavLink to="/service-areas" className={navLinkClass}>Service Areas</NavLink>
          <NavLink to="/service-request" className={navLinkClass}>Service Request</NavLink>
          <NavLink to="/qr" className={navLinkClass}>QR Page</NavLink>
          <NavLink to="/promotional-platform" className={navLinkClass}>Promotional Platform</NavLink>
          <Link to="/#gallery" className="nav-link">Gallery</Link>
          <Link to="/#videos" className="nav-link">Videos</Link>
          <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
          <Link to="/#reviews" className="nav-link">Reviews</Link>
          <Link to="/#about" className="nav-link">About</Link>
          <NavLink to="/account" className={navLinkClass}>Account</NavLink>
          <Link to="/#booking" className="nav-link">Booking</Link>
          <Link to="/#maps" className="nav-link">Map</Link>
          <Link to="/#contact" className="nav-link">Contact</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
