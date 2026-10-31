import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section id="home" className="hero hero-bg">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Professional Appliance Repair Near Me - South Florida's Expert Team</h1>
          <img
            className="hero-banner-image"
            src="/images/service/expert-team-banner.webp"
            alt="Top Speed Appliance technician with service van and repair appliances in South Florida"
            loading="eager"
            decoding="async"
          />
          <p>Expert appliance repair services in South Florida including refrigerator repair near me, washer and dryer repair near me, oven and stove repair near me, and dishwasher repair near me. Fast response times, certified technicians, and guaranteed satisfaction.</p>
          <a href="https://book.housecallpro.com/book/TopSpeed-Appliance/0c0fcb09005e47239b0bd7d487e9d468?v2=true" target="_blank" rel="noopener noreferrer" className="cta-button">Book Online</a>
          <a href="#contact" className="cta-button hero-secondary-cta">Contact Us</a>
          <nav className="hero-quick-actions" aria-label="Quick actions">
            <Link to="/service-request" className="hero-quick-tile">Service Request</Link>
            <Link to="/service-areas" className="hero-quick-tile">Service Areas</Link>
            <a href="https://book.housecallpro.com/book/TopSpeed-Appliance/0c0fcb09005e47239b0bd7d487e9d468?v2=true" target="_blank" rel="noopener noreferrer" className="hero-quick-tile">Book Now</a>
            <a href="tel:9549317997" className="hero-quick-tile">Call (954) 931-7997</a>
          </nav>
        </div>
      </div>
    </section>
  )
}

export default Hero
