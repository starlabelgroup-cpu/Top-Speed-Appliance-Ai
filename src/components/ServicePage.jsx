import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/service-page.css'

/**
 * ServicePage Component
 * Reusable component for all service pages (Washer, Dryer, Refrigerator, Oven)
 * Usage: <Route path="/washer-repair" element={<ServicePage service="washer" />} />
 */

const ServicePageComponent = ({ service }) => {
  const navigate = useNavigate()

  // Service configuration
  const serviceConfig = {
    washer: {
      title: 'Washer Repair in Fort Lauderdale, FL',
      seoTitle: 'Washer Repair in Fort Lauderdale | Same-Day Service',
      metaDescription: 'Fast washer repair in Fort Lauderdale. We fix leaks, spin issues, and error codes. Call Top Speed Appliance for same-day service.',
      h1: 'Washer Repair in Fort Lauderdale, FL',
      intro: 'Top Speed Appliance provides fast, professional washer repair in Fort Lauderdale and nearby areas. Our licensed technicians service all major brands and offer same-day appointments. Whether your washer won\'t spin, is leaking water, or displaying error codes, we diagnose and repair the problem quickly and affordably.',
      problems: ['Washer not spinning', 'Water leaking', 'Won\'t drain', 'Loud noises', 'Error codes', 'Not filling with water'],
      brands: ['Samsung', 'LG', 'Whirlpool', 'GE', 'Maytag', 'Kenmore', 'Frigidaire', 'Speed Queen', 'Bosch', 'Electrolux'],
      faqs: [
        {
          question: 'Do you offer same-day washer repair?',
          answer: 'Yes, same-day service is available in most Fort Lauderdale areas. Call before noon for same-day scheduling.'
        },
        {
          question: 'Do you repair all washer brands?',
          answer: 'Yes, we service all major brands including top-load, front-load, and HE washers.'
        },
        {
          question: 'What is the cost of washer repair?',
          answer: 'Service calls start at $79. Repairs typically range from $150–$400 depending on the part. We provide free estimates.'
        },
        {
          question: 'Do you offer a warranty?',
          answer: 'Yes, all repairs come with a 12-month warranty on parts and labor.'
        }
      ],
      utmCampaign: 'gbp_washer'
    },
    dryer: {
      title: 'Dryer Repair in Fort Lauderdale, FL',
      seoTitle: 'Dryer Repair in Fort Lauderdale | Fast & Reliable',
      metaDescription: 'Quick dryer repair in Fort Lauderdale. Fix heating, spinning, or noise issues. Call Top Speed Appliance for same-day service.',
      h1: 'Dryer Repair in Fort Lauderdale, FL',
      intro: 'Top Speed Appliance provides professional dryer repair for all brands in Fort Lauderdale. We handle heating problems, noise, and malfunctions with same-day service available. Our licensed technicians specialize in both gas and electric dryers.',
      problems: ['Dryer not heating', 'Long drying times', 'Loud noises', 'Gas/electric ignition problems', 'Random shutdowns', 'Thermal fuse issues', 'Belt problems'],
      brands: ['Samsung', 'LG', 'Whirlpool', 'GE', 'Maytag', 'Kenmore', 'Frigidaire', 'Speed Queen', 'Bosch', 'Electrolux'],
      faqs: [
        {
          question: 'Do you repair gas and electric dryers?',
          answer: 'Yes, we service both gas and electric dryers with specialized expertise.'
        },
        {
          question: 'Can you fix dryers the same day?',
          answer: 'Yes, same-day repair is available in most cases.'
        },
        {
          question: 'Why is my dryer taking so long to dry clothes?',
          answer: 'Clogged vents, failed thermal sensors, or aged heating elements cause slow drying. We inspect and repair.'
        },
        {
          question: 'Do you offer vent cleaning?',
          answer: 'Yes, we offer professional vent cleaning to improve efficiency and safety.'
        }
      ],
      utmCampaign: 'gbp_dryer'
    },
    refrigerator: {
      title: 'Refrigerator Repair in Fort Lauderdale, FL',
      seoTitle: 'Refrigerator Repair in Fort Lauderdale | Same-Day Service',
      metaDescription: 'Fast refrigerator repair in Fort Lauderdale. Fix cooling, ice maker, or leaks. Call Top Speed Appliance for reliable service.',
      h1: 'Refrigerator Repair in Fort Lauderdale, FL',
      intro: 'Top Speed Appliance provides expert refrigerator repair in Fort Lauderdale. We fix cooling issues, ice makers, leaks, and compressor problems quickly and reliably. Don\'t let spoiled food become expensive — call us for same-day diagnosis and repair.',
      problems: ['Not cooling', 'Ice maker not working', 'Water leaks', 'Strange noises', 'Compressor issues', 'Frost accumulation', 'Weak water pressure'],
      brands: ['Samsung', 'LG', 'Whirlpool', 'GE', 'Maytag', 'Kenmore', 'Frigidaire', 'Sub-Zero', 'Viking', 'Electrolux'],
      faqs: [
        {
          question: 'How long can food stay cold if my fridge isn\'t cooling?',
          answer: 'Food safety requires 40°F or below. If temps rise above 50°F, discard perishables.'
        },
        {
          question: 'Do you repair all refrigerator brands?',
          answer: 'Yes, we service all major brands including Sub-Zero and Viking.'
        },
        {
          question: 'Is same-day service available?',
          answer: 'Yes, most repairs can be done same-day.'
        },
        {
          question: 'What causes a refrigerator to stop cooling?',
          answer: 'Common causes: compressor failure, refrigerant leak, or thermostat malfunction. We diagnose quickly.'
        }
      ],
      utmCampaign: 'gbp_refrigerator'
    },
    oven: {
      title: 'Oven & Stove Repair in Fort Lauderdale, FL',
      seoTitle: 'Oven & Stove Repair in Fort Lauderdale | Fast & Reliable',
      metaDescription: 'Reliable oven & stove repair in Fort Lauderdale. Fix burners, igniters, and temperature issues. Call Top Speed Appliance today.',
      h1: 'Oven & Stove Repair in Fort Lauderdale, FL',
      intro: 'Top Speed Appliance provides professional oven and stove repair in Fort Lauderdale. We fix burners, igniters, temperature issues, and controls for all major brands. Our certified technicians service both gas and electric models.',
      problems: ['Oven not heating', 'Burners not lighting', 'Faulty controls', 'Igniters failing', 'Temperature problems', 'Broken door seals', 'Self-cleaning cycle errors'],
      brands: ['Samsung', 'LG', 'Whirlpool', 'GE', 'Maytag', 'Kenmore', 'Frigidaire', 'Wolf', 'Bosch', 'Electrolux'],
      faqs: [
        {
          question: 'Do you repair all brands of ovens and stoves?',
          answer: 'Yes, we service all major brands including luxury models like Wolf.'
        },
        {
          question: 'Can repairs be done the same day?',
          answer: 'Yes, most repairs are same-day.'
        },
        {
          question: 'Are your technicians certified for gas stoves?',
          answer: 'Yes, all gas appliance work is performed by licensed, certified technicians.'
        },
        {
          question: 'How much does oven repair typically cost?',
          answer: 'Service calls start at $79. Component replacement typically ranges $150–$400.'
        }
      ],
      utmCampaign: 'gbp_oven'
    }
  }

  const config = serviceConfig[service] || serviceConfig.washer

  // Update page title and meta tags
  useEffect(() => {
    document.title = config.seoTitle
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', config.metaDescription)
    }

    // Track page view in GA4
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: config.seoTitle,
        page_path: window.location.pathname,
        service_type: service
      })
    }
  }, [service, config])

  // Handle CTA clicks
  const handleCallClick = () => {
    if (window.gtag) {
      window.gtag('event', 'click_call', {
        event_category: 'Contact',
        event_label: `${service}_repair`,
        phone_number: '(954) 931-7997'
      })
    }
  }

  const handleBookingClick = () => {
    if (window.gtag) {
      window.gtag('event', 'schedule_service', {
        event_category: 'Booking',
        event_label: `${service}_repair`
      })
    }
    navigate('/service-request')
  }

  return (
    <div className="service-page">
      {/* Hero Section */}
      <section className="service-hero">
        <div className="service-hero-content">
          <h1>{config.h1}</h1>
          <p className="service-intro">{config.intro}</p>
          <div className="service-ctas">
            <a href="tel:+19549317997" className="cta-button cta-primary" onClick={handleCallClick}>
              📞 Call Now: (954) 931-7997
            </a>
            <button className="cta-button cta-secondary" onClick={handleBookingClick}>
              🔘 Schedule Service Online
            </button>
          </div>
        </div>
      </section>

      {/* Common Problems */}
      <section className="service-section">
        <h2>Common Problems We Fix</h2>
        <ul className="problems-list">
          {config.problems.map((problem, idx) => (
            <li key={idx}>{problem}</li>
          ))}
        </ul>
      </section>

      {/* Brands */}
      <section className="service-section">
        <h2>Brands We Service</h2>
        <p className="brands-text">
          {config.brands.join(', ')}
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="service-section">
        <h2>Why Choose Top Speed Appliance</h2>
        <ul className="benefits-list">
          <li>Same-day service available</li>
          <li>Licensed & insured technicians</li>
          <li>Honest, upfront pricing</li>
          <li>Local, experienced technicians</li>
          <li>12-month warranty on repairs</li>
        </ul>
      </section>

      {/* Service Areas */}
      <section className="service-section">
        <h2>Service Areas</h2>
        <p>We service appliance repair in:</p>
        <ul className="cities-list">
          <li><a href="/appliance-repair-fort-lauderdale">Appliance Repair in Fort Lauderdale</a></li>
          <li><a href="/appliance-repair-hollywood-fl">Appliance Repair in Hollywood</a></li>
          <li><a href="/appliance-repair-plantation-fl">Appliance Repair in Plantation</a></li>
          <li><a href="/appliance-repair-pembroke-pines-fl">Appliance Repair in Pembroke Pines</a></li>
          <li><a href="/appliance-repair-delray-beach-fl">Appliance Repair in Delray Beach</a></li>
          <li><a href="/appliance-repair-boynton-beach-fl">Appliance Repair in Boynton Beach</a></li>
          <li><a href="/appliance-repair-jupiter-fl">Appliance Repair in Jupiter</a></li>
          <li><a href="/appliance-repair-palm-beach-gardens-fl">Appliance Repair in Palm Beach Gardens</a></li>
        </ul>
      </section>

      {/* CTA Middle */}
      <section className="service-cta-middle">
        <h2>Ready for Fast {service.charAt(0).toUpperCase() + service.slice(1)} Repair?</h2>
        <div className="service-ctas">
          <a href="tel:+19549317997" className="cta-button cta-primary" onClick={handleCallClick}>
            📞 Call Now: (954) 931-7997
          </a>
          <button className="cta-button cta-secondary" onClick={handleBookingClick}>
            🔘 Schedule Service Today
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="service-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {config.faqs.map((faq, idx) => (
            <div key={idx} className="faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="service-final-cta">
        <h2>Contact Top Speed Appliance Today</h2>
        <p>Same-day service available for most repairs.</p>
        <a href="tel:+19549317997" className="cta-button cta-primary" onClick={handleCallClick}>
          📞 Call Now: (954) 931-7997
        </a>
      </section>
    </div>
  )
}

export default ServicePageComponent
