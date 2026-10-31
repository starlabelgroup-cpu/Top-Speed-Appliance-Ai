import React from 'react'
import { BOOKING_CONFIG } from '../config/bookingConfig'

const installationServices = [
  {
    href: '/appliance-installation',
    image: '/images/service/appliance-installation-service.webp',
    title: 'Appliance Installation',
    desc: 'Professional installation for new appliances, delivered and set up to manufacturer specifications.',
  },
  {
    href: '/washer-dryer-installation',
    image: '/images/service/washer-dryer-service.webp',
    title: 'Washer and Dryer Installation',
    desc: 'Washer and dryer hookups, venting, and leveling handled by certified technicians.',
  },
  {
    href: '/refrigerator-installation',
    image: '/images/service/refrigerator-service.webp',
    title: 'Refrigerator Installation',
    desc: 'Refrigerator and freezer setup with water line hookups, leveling, and cooling checks.',
  },
  {
    href: '/range-oven-installation',
    image: '/images/service/oven-stove-service.webp',
    title: 'Range and Oven Installation',
    desc: 'Gas and electric range and oven installation with safe connections and full testing.',
  },
  {
    href: '/dishwasher-installation',
    image: '/images/service/dishwasher-service.webp',
    title: 'Dishwasher Installation',
    desc: 'Dishwasher installation with drain, water supply, and electrical connections checked.',
  },
  {
    href: '/microwave-installation',
    image: '/images/service/microwave-service.webp',
    title: 'Microwave Installation',
    desc: 'Built-in, over-the-range, and countertop microwave installation done right the first time.',
  },
]

function InstallationServices() {
  return (
    <section id="installation" className="services">
      <h2>Appliance Installation</h2>
      <p className="services-subtitle">Professional installation for new appliances across South Florida</p>
      <div className="service-grid">
        {installationServices.map((service) => (
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
    </section>
  )
}

export default InstallationServices
