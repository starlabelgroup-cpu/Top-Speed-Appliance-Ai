import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-contact">
          <a href="tel:9549317997" className="contact-link phone-link">
            <span className="contact-icon">📞</span>(954) 931-7997
          </a>
          <a href="mailto:service@topspeedappliance.net" className="contact-link email-link">
            <span className="contact-icon">📧</span>service@topspeedappliance.net
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

        <nav className={`nav ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
          <Link to="/">Home</Link>
          <a href="#services">Services</a>
          <a href="#keywords">Repair Near Me</a>
          <Link to="/service-areas">Service Areas</Link>
          <Link to="/service-request">Service Request</Link>
          <Link to="/qr">QR Page</Link>
          <Link to="/promotional-platform">Promotional Platform</Link>
          <a href="#gallery">Gallery</a>
          <a href="#videos">Videos</a>
          <Link to="/blog">Blog</Link>
          <a href="#reviews">Reviews</a>
          <a href="#about">About</a>
          <Link to="/account">Account</Link>
          <a href="#booking">Booking</a>
          <a href="#maps">Map</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
