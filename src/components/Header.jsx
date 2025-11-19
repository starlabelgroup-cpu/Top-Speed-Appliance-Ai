import React, { useState } from 'react'

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
        <a href="https://book.housecallpro.com/book/Top-Speed-Appliance/c9b4dccc30ee46f2bd3e162ee377aae1?v2=true" target="_blank" rel="noopener noreferrer" className="book-now-btn">
          Book Now
        </a>
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
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#keywords">Repair Near Me</a>
          <a href="#gallery">Gallery</a>
          <a href="#videos">Videos</a>
          <a href="#reviews">Reviews</a>
          <a href="#about">About</a>
          <a href="#booking">Booking</a>
          <a href="#maps">Map</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
