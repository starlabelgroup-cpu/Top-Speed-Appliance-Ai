import React from 'react'

function Hero() {
  return (
    <section id="home" className="hero" style={{backgroundImage: 'url(https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Fc593bf5c5ea049c987a8ce14d83a1a44?format=webp&width=800)'}}>
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Professional Appliance Repair Near Me - South Florida's Expert Team</h1>
          <p>Expert appliance repair services in South Florida including refrigerator repair near me, washer and dryer repair near me, oven and stove repair near me, and dishwasher repair near me. Fast response times, certified technicians, and guaranteed satisfaction.</p>
          <a href="https://book.housecallpro.com/book/TopSpeed-Appliance/0c0fcb09005e47239b0bd7d487e9d468?v2=true" target="_blank" rel="noopener noreferrer" className="cta-button">Book Online</a>
          <a href="#contact" className="cta-button hero-secondary-cta">Contact Us</a>
        </div>
      </div>
    </section>
  )
}

export default Hero
