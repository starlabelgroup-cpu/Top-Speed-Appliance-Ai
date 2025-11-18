import React from 'react'

function Services() {
  const services = [
    {
      title: 'Refrigerator Repair',
      desc: 'Quick fixes and full-service maintenance for all fridge brands. We handle cooling issues, compressor problems, and more.',
      image: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2F5b2cddc584514ebd90bab47dfa9fab6c?format=webp&width=800',
    },
    {
      title: 'Washer & Dryer Repair',
      desc: 'Professional washer and dryer diagnostics and repairs. We fix drainage, spinning, heating and drum problems.',
      image: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Fc593bf5c5ea049c987a8ce14d83a1a44?format=webp&width=800',
    },
    {
      title: 'Oven & Stove Repair',
      desc: 'Get your cooking appliances back to top performance fast. We repair heating, ignition, and control issues.',
      image: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Fc072dd8c0d7c4399a48c16f755323d21?format=webp&width=800',
    },
    {
      title: 'Dishwasher Repair',
      desc: 'Cleaning, draining, and power issues resolved same-day. We service all major dishwasher brands and models.',
      image: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2F5b2cddc584514ebd90bab47dfa9fab6c?format=webp&width=800',
    },
  ]

  return (
    <section id="services" className="services">
      <h2>Our Services</h2>
      <p style={{color: '#666', marginBottom: '50px', fontSize: '1.1rem'}}>Fast and reliable repair services for all major appliance brands</p>
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
