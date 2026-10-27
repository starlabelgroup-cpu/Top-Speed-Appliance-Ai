import React from 'react'
import ApplianceIcon from './ApplianceIcon'

function Services() {
  const services = [
    {
      type: 'Refrigerator',
      title: 'Refrigerator Repair Near Me',
      desc: 'Expert refrigerator repair near me with fast response times. We handle cooling issues, compressor problems, leaks, and more. All major brands serviced.',
      image: 'https://cdn.builder.io/o/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2F1691e9f9d0fc4588b5c7637ec821851a?alt=media&token=0420f7d6-0cdd-4fed-876d-7b10cabb3e8f&apiKey=a186f40324f047e6b518d0ea27bf7f66',
    },
    {
      type: 'Washer',
      title: 'Washer & Dryer Repair Near Me',
      desc: 'Professional washer and dryer repair near me with same-day service available. We fix drainage, spinning, heating, drum, and electrical problems.',
      image: 'https://cdn.builder.io/o/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Fc9d67e2d48244d9d886a692c06ddbfe3?alt=media&token=54389edc-ccc1-4be4-8875-6db695844930&apiKey=a186f40324f047e6b518d0ea27bf7f66',
    },
    {
      type: 'Oven',
      title: 'Oven & Stove Repair Near Me',
      desc: 'Oven and stove repair near me for all major brands. We repair heating elements, ignition systems, controls, and burner issues quickly and affordably.',
      image: 'https://cdn.builder.io/o/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Ffba3ebb96d20467ba02605ca464b41aa?alt=media&token=800168f6-772d-4f35-8372-6c3e28052765&apiKey=a186f40324f047e6b518d0ea27bf7f66',
    },
    {
      type: 'Dishwasher',
      title: 'Dishwasher Repair Near Me',
      desc: 'Dishwasher repair near me with certified technicians. We fix cleaning issues, drainage problems, leaks, and power issues same-day on all brands.',
      image: 'https://cdn.builder.io/o/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Fa6d48478690c4c47af4a4dd6cecfdc07?alt=media&token=17cefb88-93ad-4b2d-9956-e04e2944c45c&apiKey=a186f40324f047e6b518d0ea27bf7f66',
    },
  ]

  return (
    <section id="services" className="services">
      <h2>Our Services</h2>
      <p className="services-subtitle">Fast and reliable repair services for all major appliance brands</p>
      <div className="service-grid">
        {services.map((service, i) => (
          <div className="service-card" key={i}>
            <img src={service.image} alt={service.title} className="service-card-image" loading="lazy" decoding="async" />
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
