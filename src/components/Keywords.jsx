import React from 'react'

import ApplianceIcon from './ApplianceIcon'

function Keywords() {
  const keywords = [
    {
      type: 'Refrigerator',
      title: 'Refrigerator Repair Near Me',
      description: 'Looking for refrigerator repair near me? Top Speed Appliance provides fast, reliable refrigerator repair services for all brands. We handle cooling problems, compressor issues, leaks, and ice maker repairs.',
      services: ['Cooling issues', 'Compressor problems', 'Leak repairs', 'Ice maker repair', 'Temperature control issues'],
    },
    {
      type: 'Washer',
      title: 'Washer and Dryer Repair Near Me',
      description: 'Need washer and dryer repair near me? Our certified technicians offer same-day service for washing machine and dryer problems including drainage, spinning, heating, and electrical issues.',
      services: ['Drainage problems', 'Spinning issues', 'Heating element repair', 'Drum repairs', 'Electrical problems'],
    },
    {
      type: 'Oven',
      title: 'Oven and Stove Repair Near Me',
      description: 'Professional oven and stove repair near me with quick turnaround times. We repair gas and electric ovens, stovetops, burners, heating elements, and ignition systems for all major brands.',
      services: ['Heating element repair', 'Ignition system repair', 'Burner repair', 'Temperature control', 'Door lock repair'],
    },
    {
      type: 'Dishwasher',
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
            <ApplianceIcon type={item.type} />
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
            <a href="https://topspeedserviceos.com/book" target="_blank" rel="noopener noreferrer" className="service-cta">Book Repair</a>
          </div>
        ))}
      </div>

      <div className="keywords-faq">
        <h3>Why Choose Top Speed Appliance?</h3>
        <div className="faq-grid">
          <div className="faq-item">
            <h4><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13 2.8L4.8 13.4h5.4L9.4 21.2l8.4-10.8h-5.5z"/><circle cx="18.6" cy="18.8" r="1" fill="#E8322E" stroke="none"/></svg> Fast Service</h4>
            <p>Same-day service available for most appliance repairs in South Florida</p>
          </div>
          <div className="faq-item">
            <h4><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12.8l5.2 5.2L20 6.8"/><circle cx="19" cy="17.5" r="1.15" fill="#E8322E" stroke="none"/></svg> Certified Technicians</h4>
            <p>All our technicians are certified and trained on all major appliance brands</p>
          </div>
          <div className="faq-item">
            <h4><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9.4 3.8h5.2M10 3.8c0 2-1.2 3-2.4 4.2C5.9 9.7 5 11.4 5 13.5A6.9 5.9 0 0 0 12 19.4a6.9 5.9 0 0 0 7-5.9c0-2.1-.9-3.8-2.6-5.5C15.2 6.8 14 5.8 14 3.8"/><path d="M12 9.4v6.4M14 11.2a2.6 2.6 0 0 0-2-1 2.3 2.3 0 0 0-2.3 2c0 2.9 4.6 1.6 4.6 3.9 0 1.1-1 1.7-2.3 1.7a2.8 2.8 0 0 1-2.3-1.1" stroke="#E8322E"/></svg> Affordable Pricing</h4>
            <p>Transparent pricing with no hidden fees or surprise charges</p>
          </div>
          <div className="faq-item">
            <h4><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.7 6.3a4.4 4.4 0 0 1 5.9-4L18 4.9l2.3 2.3 2.7-2.6a4.4 4.4 0 0 1-5.9 5.2L8 18.9a2 2 0 0 1-2.9 0l-1.2-1.2a2 2 0 0 1 0-2.9z" transform="translate(-1.2 .6) scale(.94)"/></svg> Quality Repairs</h4>
            <p>We use genuine parts and offer warranty on all our repairs</p>
          </div>
          <div className="faq-item">
            <h4><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.2 4h3.4l1.4 4.2-2.1 1.7a13.5 13.5 0 0 0 6.2 6.2l1.7-2.1L20 15.4v3.4a2 2 0 0 1-2.1 2A16.5 16.5 0 0 1 3.2 6.1 2 2 0 0 1 5.2 4z"/><path d="M15.5 3.5a7 7 0 0 1 5 5M15.5 6.8a3.8 3.8 0 0 1 1.7 1.7" stroke="#E8322E"/></svg> Easy Booking</h4>
            <p>Book online or call us for fast scheduling and service confirmation</p>
          </div>
          <div className="faq-item">
            <h4><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.7"/><path d="M3.3 12h17.4M12 3.3c2.6 2.4 3.9 5.3 3.9 8.7s-1.3 6.3-3.9 8.7c-2.6-2.4-3.9-5.3-3.9-8.7S9.4 5.7 12 3.3z" stroke="#E8322E"/></svg> Local Service</h4>
            <p>We proudly serve South Florida with dependable, professional service</p>
          </div>
        </div>
      </div>

      <div className="keywords-cta">
        <h3>Need Appliance Repair Today?</h3>
        <p>Contact Top Speed Appliance for fast, reliable repair service in South Florida</p>
        <a href="https://topspeedserviceos.com/book" target="_blank" rel="noopener noreferrer" className="cta-button">Request Service Now</a>
        <a href="tel:9549317997" className="cta-button keywords-call-cta">
          Call (954) 931-7997
        </a>
      </div>
    </section>
  )
}

export default Keywords
