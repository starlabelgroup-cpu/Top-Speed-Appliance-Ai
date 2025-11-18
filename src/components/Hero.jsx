import React from 'react'

function Hero() {
  return (
    <section id="home" className="hero" style={{backgroundImage: 'url(https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Fc593bf5c5ea049c987a8ce14d83a1a44?format=webp&width=800)'}}>
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Leave Your Appliance Repairs To The Experts</h1>
          <p>We provide professional appliance repair services throughout South Florida with fast response times and expert technicians.</p>
          <a href="#booking" className="cta-button">Book Online</a>
          <a href="#contact" className="cta-button" style={{marginLeft: '10px', backgroundColor: '#1a1a1a', borderColor: '#d10000', border: '2px solid #d10000'}}>Contact Us</a>
        </div>
      </div>
    </section>
  )
}

export default Hero
