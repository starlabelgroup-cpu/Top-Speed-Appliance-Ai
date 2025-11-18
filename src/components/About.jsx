import React from 'react'

function About() {
  return (
    <section id="about" className="about">
      <h2>About Us</h2>
      <img src="https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Fc593bf5c5ea049c987a8ce14d83a1a44?format=webp&width=800" alt="Professional technician" className="about-image" />
      <p>
        At <strong>Top Speed Appliance</strong>, we specialize in fast, professional, and affordable appliance repair services throughout South Florida. Our certified technicians are trained to handle all major brands and models, ensuring your appliances are fixed right the first time.
      </p>
      <p>
        With over 15 years of experience in the appliance repair industry, we pride ourselves on quick response times, transparent pricing, and exceptional customer service. We believe in honest diagnostics and reliable repairs that last.
      </p>
      <p>
        Whether it's your refrigerator, washer, dryer, oven, or dishwasher, our team of experts will diagnose the problem accurately and provide a solution that fits your budget. We're locally owned and committed to serving our community with integrity and care.
      </p>
      <div style={{marginTop: '40px'}}>
        <a href="#booking" className="cta-button">Request a Quote</a>
      </div>
    </section>
  )
}

export default About
