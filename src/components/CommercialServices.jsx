import React from 'react'
import { BOOKING_CONFIG } from '../config/bookingConfig'

const commercialServices = [
  {
    href: '/commercial-refrigeration-repair',
    image: '/images/service/commercial-refrigeration-service.webp',
    title: 'Commercial Refrigeration Repair',
    desc: 'Walk-in coolers, reach-in units, freezers, and ice machines for restaurants and food service businesses.',
  },
  {
    href: '/commercial-cooking-equipment-repair',
    image: '/images/service/commercial-cooking-service.webp',
    title: 'Commercial Cooking Equipment Repair',
    desc: 'Commercial ovens, ranges, fryers, and griddles repaired with clear quotes and minimal downtime.',
  },
  {
    href: '/commercial-dishwasher-repair',
    image: '/images/service/commercial-dishwasher-service.webp',
    title: 'Commercial Dishwasher Repair',
    desc: 'Sanitizing, booster heater, and rinse problems fixed so your kitchen stays compliant and running.',
  },
  {
    href: '/commercial-laundry-repair',
    image: '/images/service/commercial-laundry-service.webp',
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
            <img src={service.image} alt={service.title} className="service-card-image" loading="lazy" decoding="async" />
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
