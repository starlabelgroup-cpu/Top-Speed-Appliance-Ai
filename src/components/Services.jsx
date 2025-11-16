import React from 'react'

function Services() {
  const services = [
    {
      title: 'Refrigerator Repair',
      desc: 'Quick fixes and full-service maintenance for all fridge brands.',
    },
    {
      title: 'Washer & Dryer Repair',
      desc: 'Professional washer and dryer diagnostics and repairs.',
    },
    {
      title: 'Oven & Stove Repair',
      desc: 'Get your cooking appliances back to top performance fast.',
    },
    {
      title: 'Dishwasher Repair',
      desc: 'Cleaning, draining, and power issues resolved same-day.',
    },
  ]

  return (
    <section id="services" className="services">
      <h2>Our Services</h2>
      <div className="service-grid">
        {services.map((service, i) => (
          <div className="service-card" key={i}>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services
