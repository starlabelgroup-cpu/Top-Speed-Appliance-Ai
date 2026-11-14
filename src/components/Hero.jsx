import React from 'react'
import { Link } from 'react-router-dom'
import ServiceBookButton from './ServiceBookButton'

function Hero() {
  return (
    <section id="home" className="hero hero-bg">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Appliance Repair at Top Speed</h1>
          <p>Residential and Commercial Appliance Repair, Installation and Service.</p>
          <a href="https://topspeedserviceos.com/book" target="_blank" rel="noopener noreferrer" className="cta-button">Book Online</a>
          <ServiceBookButton source="hero" className="cta-button" />
          <a href="#contact" className="cta-button hero-secondary-cta">Contact Us</a>
          <nav className="hero-quick-actions" aria-label="Quick actions">
            <Link to="/home-appliance-repair" className="hero-quick-tile">Residential Appliance Repair</Link>
            <Link to="/commercial-appliance-repair" className="hero-quick-tile">Commercial Appliance Repair</Link>
            <Link to="/service-areas" className="hero-quick-tile">Service Areas</Link>
            <a href="https://topspeedserviceos.com/book" target="_blank" rel="noopener noreferrer" className="hero-quick-tile">Book Online</a>
            <a href="tel:9549317997" className="hero-quick-tile">Call 954-931-7997</a>
          </nav>
        </div>
      </div>
    </section>
  )
}

export default Hero
