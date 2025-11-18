import React from 'react'

function Hero() {
  return (
    <section id="home" className="hero" style={{backgroundImage: 'url(https://images.pexels.com/photos/7446650/pexels-photo-7446650.jpeg)'}}>
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Fast, Reliable Appliance Repair</h1>
          <p>Top Speed Appliance — where service meets speed and quality.</p>
          <a href="#contact" className="cta-button">Book a Repair</a>
        </div>
      </div>
    </section>
  )
}

export default Hero
