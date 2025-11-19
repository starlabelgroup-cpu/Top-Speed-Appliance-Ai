import React from 'react'

function Services() {
  const services = [
    {
      title: 'Refrigerator Repair Near Me',
      desc: 'Expert refrigerator repair near me with fast response times. We handle cooling issues, compressor problems, leaks, and more. All major brands serviced.',
      image: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2F5b2cddc584514ebd90bab47dfa9fab6c?format=webp&width=800',
    },
    {
      title: 'Washer & Dryer Repair Near Me',
      desc: 'Professional washer and dryer repair near me with same-day service available. We fix drainage, spinning, heating, drum, and electrical problems.',
      image: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Fc593bf5c5ea049c987a8ce14d83a1a44?format=webp&width=800',
    },
    {
      title: 'Oven & Stove Repair Near Me',
      desc: 'Oven and stove repair near me for all major brands. We repair heating elements, ignition systems, controls, and burner issues quickly and affordably.',
      image: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Fc072dd8c0d7c4399a48c16f755323d21?format=webp&width=800',
    },
    {
      title: 'Dishwasher Repair Near Me',
      desc: 'Dishwasher repair near me with certified technicians. We fix cleaning issues, drainage problems, leaks, and power issues same-day on all brands.',
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
