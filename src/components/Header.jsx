import React, { useState } from 'react'
import logo from '../assets/logo.svg'

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <div className="container">
        <img src={logo} alt="Top Speed Appliance" className="logo" />

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
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
