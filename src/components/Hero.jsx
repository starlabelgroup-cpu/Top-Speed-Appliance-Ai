import React from 'react'

function Hero() {
  return (
    <section id="home" className="hero" style={{backgroundImage: 'url(https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Fc072dd8c0d7c4399a48c16f755323d21?format=webp&width=800)'}}>
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
