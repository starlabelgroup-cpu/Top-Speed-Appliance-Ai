import React from 'react'
import ApplianceIcon from './ApplianceIcon'

function Services() {
  const services = [
    {
      type: 'Refrigerator',
      title: 'Refrigerator Repair Near Me',
      desc: 'Expert refrigerator repair near me with fast response times. We handle cooling issues, compressor problems, leaks, and more. All major brands serviced.',
      image: '/images/service/refrigerator-service.webp',
    },
    {
      type: 'Washer',
      title: 'Washer & Dryer Repair Near Me',
      desc: 'Professional washer and dryer repair near me with same-day service available. We fix drainage, spinning, heating, drum, and electrical problems.',
      image: '/images/service/washer-dryer-stack.webp',
    },
    {
      type: 'Oven',
      title: 'Oven & Stove Repair Near Me',
      desc: 'Oven and stove repair near me for all major brands. We repair heating elements, ignition systems, controls, and burner issues quickly and affordably.',
      image: '/images/service/oven-stove-range.webp',
    },
    {
      type: 'Dishwasher',
      title: 'Dishwasher Repair Near Me',
      desc: 'Dishwasher repair near me with certified technicians. We fix cleaning issues, drainage problems, leaks, and power issues same-day on all brands.',
      image: '/images/service/dishwasher-service.webp',
    },
    {
      type: 'Microwave',
      title: 'Microwave Repair Near Me',
      image: '/images/service/microwave-service.webp',
      desc: 'Microwave repair near me for built-in, over-the-range, and countertop models. We fix heating failures, control panels, turntables, and door faults.',
    },
    {
      type: 'GarbageDisposal',
      title: 'Garbage Disposal Repair Near Me',
      desc: 'Garbage disposal repair near me for jams, leaks, and units that hum without turning. We clear blockages and replace failed motors and switches on most brands.',
    },
    {
      type: 'WineCooler',
      title: 'Wine Cooler Repair Near Me',
      image: '/images/service/wine-cooler-service.webp',
      desc: 'Wine cooler repair near me for built-in and freestanding units. We fix cooling problems, fan and compressor faults, temperature swings, and door seal issues.',
    },
  ]

  return (
    <section id="services" className="services">
      <h2>Our Services</h2>
      <p className="services-subtitle">Fast and reliable repair services for all major appliance brands</p>
      <div className="service-grid">
        {services.map((service, i) => (
          <div className="service-card" key={i}>
            {service.image && <img src={service.image} alt={service.title} className="service-card-image" loading="lazy" decoding="async" />}
            <ApplianceIcon type={service.type} />
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
            <a href="https://book.housecallpro.com/book/TopSpeed-Appliance/0c0fcb09005e47239b0bd7d487e9d468?v2=true" target="_blank" rel="noopener noreferrer" className="service-booking-btn">
              Book Now
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services
