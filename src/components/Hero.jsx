import React from 'react'
import { Link } from 'react-router-dom'
import ServiceReserveButton from './ServiceReserveButton'

function Hero() {
  return (
    <section id="home" className="hero hero-bg">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Appliance Repair at Top Speed</h1>
          <p>Residential and Commercial Appliance Repair, Installation and Service.</p>
          <a href="https://book.housecallpro.com/book/TopSpeed-Appliance/0c0fcb09005e47239b0bd7d487e9d468?v2=true" target="_blank" rel="noopener noreferrer" className="cta-button">Book Online</a>
          <ServiceReserveButton source="hero" className="cta-button" />
          <a href="#contact" className="cta-button hero-secondary-cta">Contact Us</a>
          <nav className="hero-quick-actions" aria-label="Quick actions">
            <Link to="/home-appliance-repair" className="hero-quick-tile">Residential Appliance Repair</Link>
            <Link to="/commercial-appliance-repair" className="hero-quick-tile">Commercial Appliance Repair</Link>
            <Link to="/service-areas" className="hero-quick-tile">Service Areas</Link>
            <a href="https://book.housecallpro.com/book/TopSpeed-Appliance/0c0fcb09005e47239b0bd7d487e9d468?v2=true" target="_blank" rel="noopener noreferrer" className="hero-quick-tile">Book Online</a>
            <a href="tel:9549317997" className="hero-quick-tile">Call 954-931-7997</a>
          </nav>
        </div>
      </div>
    </section>
  )
}

export default Hero
