import React from 'react'

function Keywords() {
  const keywords = [
    {
      title: 'Refrigerator Repair Near Me',
      description: 'Looking for refrigerator repair near me? Top Speed Appliance provides fast, reliable refrigerator repair services for all brands. We handle cooling problems, compressor issues, leaks, and ice maker repairs.',
      services: ['Cooling issues', 'Compressor problems', 'Leak repairs', 'Ice maker repair', 'Temperature control issues'],
    },
    {
      title: 'Washer and Dryer Repair Near Me',
      description: 'Need washer and dryer repair near me? Our certified technicians offer same-day service for washing machine and dryer problems including drainage, spinning, heating, and electrical issues.',
      services: ['Drainage problems', 'Spinning issues', 'Heating element repair', 'Drum repairs', 'Electrical problems'],
    },
    {
      title: 'Oven and Stove Repair Near Me',
      description: 'Professional oven and stove repair near me with quick turnaround times. We repair gas and electric ovens, stovetops, burners, heating elements, and ignition systems for all major brands.',
      services: ['Heating element repair', 'Ignition system repair', 'Burner repair', 'Temperature control', 'Door lock repair'],
    },
    {
      title: 'Dishwasher Repair Near Me',
      description: 'Expert dishwasher repair near me from Top Speed Appliance. We fix cleaning issues, drainage problems, leaks, spray arm problems, and power issues on all dishwasher brands.',
      services: ['Cleaning issues', 'Drainage problems', 'Leak repair', 'Spray arm repair', 'Filter cleaning'],
    },
  ]

  return (
    <section id="keywords" className="keywords">
      <h2>Appliance Repair Services Near Me</h2>
      <p className="keywords-intro">
        Top Speed Appliance is your trusted local appliance repair company. We provide professional repair services for all major appliance brands in South Florida.
      </p>

      <div className="keywords-grid">
        {keywords.map((item, i) => (
          <div key={i} className="keyword-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="services-list">
              <h4>What We Fix:</h4>
              <ul>
                {item.services.map((service, j) => (
                  <li key={j}>{service}</li>
                ))}
              </ul>
            </div>
            <a href="#booking" className="service-cta">Book Repair</a>
          </div>
        ))}
      </div>

      <div className="keywords-faq">
        <h3>Why Choose Top Speed Appliance?</h3>
        <div className="faq-grid">
          <div className="faq-item">
            <h4>⚡ Fast Service</h4>
            <p>Same-day service available for most appliance repairs in South Florida</p>
          </div>
          <div className="faq-item">
            <h4>✓ Certified Technicians</h4>
            <p>All our technicians are certified and trained on all major appliance brands</p>
          </div>
          <div className="faq-item">
            <h4>💰 Affordable Pricing</h4>
            <p>Transparent pricing with no hidden fees or surprise charges</p>
          </div>
          <div className="faq-item">
            <h4>🔧 Quality Repairs</h4>
            <p>We use genuine parts and offer warranty on all our repairs</p>
          </div>
          <div className="faq-item">
            <h4>📞 Easy Booking</h4>
            <p>Book online or call us for fast scheduling and service confirmation</p>
          </div>
          <div className="faq-item">
            <h4>🌍 Local Service</h4>
            <p>We proudly serve South Florida with dependable, professional service</p>
          </div>
        </div>
      </div>

      <div className="keywords-cta">
        <h3>Need Appliance Repair Today?</h3>
        <p>Contact Top Speed Appliance for fast, reliable repair service in South Florida</p>
        <a href="#booking" className="cta-button">Request Service Now</a>
        <a href="tel:9549317997" className="cta-button" style={{marginLeft: '10px', backgroundColor: '#fff', color: '#d10000', border: '2px solid #d10000'}}>
          Call (954) 931-7997
        </a>
      </div>
    </section>
  )
}

export default Keywords
