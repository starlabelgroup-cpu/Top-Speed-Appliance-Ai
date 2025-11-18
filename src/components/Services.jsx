import React from 'react'

function Services() {
  const services = [
    {
      title: 'Refrigerator Repair',
      desc: 'Quick fixes and full-service maintenance for all fridge brands.',
      image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg',
    },
    {
      title: 'Washer & Dryer Repair',
      desc: 'Professional washer and dryer diagnostics and repairs.',
      image: 'https://images.pexels.com/photos/4700389/pexels-photo-4700389.jpeg',
    },
    {
      title: 'Oven & Stove Repair',
      desc: 'Get your cooking appliances back to top performance fast.',
      image: 'https://images.pexels.com/photos/7446650/pexels-photo-7446650.jpeg',
    },
    {
      title: 'Dishwasher Repair',
      desc: 'Cleaning, draining, and power issues resolved same-day.',
      image: 'https://images.pexels.com/photos/6755092/pexels-photo-6755092.jpeg',
    },
  ]

  return (
    <section id="services" className="services">
      <h2>Our Services</h2>
      <div className="service-grid">
        {services.map((service, i) => (
          <div className="service-card" key={i}>
            <img src={service.image} alt={service.title} className="service-card-image" />
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services
