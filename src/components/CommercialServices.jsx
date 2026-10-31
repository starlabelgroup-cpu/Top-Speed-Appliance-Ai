import React from 'react'
import { BOOKING_CONFIG } from '../config/bookingConfig'

const commercialServices = [
  {
    href: '/commercial-refrigeration-repair',
    title: 'Commercial Refrigeration Repair',
    desc: 'Walk-in coolers, reach-in units, freezers, and ice machines for restaurants and food service businesses.',
  },
  {
    href: '/commercial-cooking-equipment-repair',
    title: 'Commercial Cooking Equipment Repair',
    desc: 'Commercial ovens, ranges, fryers, and griddles repaired with clear quotes and minimal downtime.',
  },
  {
    href: '/commercial-dishwasher-repair',
    title: 'Commercial Dishwasher Repair',
    desc: 'Sanitizing, booster heater, and rinse problems fixed so your kitchen stays compliant and running.',
  },
  {
    href: '/commercial-laundry-repair',
    title: 'Commercial Laundry Repair',
    desc: 'Commercial washers and dryers for apartment complexes, hotels, and laundromats.',
  },
]

function CommercialServices() {
  return (
    <section id="commercial" className="services">
      <h2>Commercial Appliance Repair</h2>
      <p className="services-subtitle">Repair service for restaurants, hotels, apartment complexes, and offices across South Florida</p>
      <div className="service-grid">
        {commercialServices.map((service) => (
          <div className="service-card" key={service.href}>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
            <a href={service.href} className="service-learn-link">View Service Details</a>
            <a href={BOOKING_CONFIG.BOOKING_URL} target="_blank" rel="noopener noreferrer" className="service-booking-btn">
              Book Now
            </a>
          </div>
        ))}
      </div>
      <div className="services-cta">
        <a href="/commercial-appliance-repair" className="cta-button">View All Commercial Services</a>
      </div>
    </section>
  )
}

export default CommercialServices
