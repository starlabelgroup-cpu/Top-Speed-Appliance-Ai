import React, { useEffect } from 'react'
import { BOOKING_CONFIG } from '../config/bookingConfig'
import '../styles/service-and-city-pages.css'

/**
 * ServicePage Component
 * Reusable appliance repair page with the $99 service fee, Housecall Pro booking, and phone booking.
 * Usage: <Route path="/washer-repair" element={<ServicePage service="washer" />} />
 */

const SERVICE_FEE = '$99'
const PHONE_DISPLAY = BOOKING_CONFIG.PHONE_NUMBER
const PHONE_HREF = BOOKING_CONFIG.PHONE_LINK
const BOOKING_URL = BOOKING_CONFIG.BOOKING_URL

const DEFAULT_BENEFITS = [
  `${SERVICE_FEE} service fee, quoted upfront`,
  'Same-day service available in most areas',
  'Licensed and insured technicians',
  '12-month warranty on repairs'
]

const SERVICE_CONFIG = {
  washer: {
    name: 'Washer',
    seoTitle: 'Washer Repair in Fort Lauderdale | $99 Service Fee',
    metaDescription: 'Washer repair in South Florida with a $99 service fee. Book online with Housecall Pro or call (954) 931-7997.',
    h1: 'Washer Repair in Fort Lauderdale, FL',
    image: '/images/service/washer-dryer-stack.webp',
    imageAlt: 'Stacked LG washer and dryer in a laundry room',
    intro: 'Top Speed Appliance provides professional washer repair in Fort Lauderdale and nearby areas. Our licensed technicians service all major brands for leaks, spin problems, drain issues, and error codes.',
    problems: ['Washer not spinning', 'Water leaking', 'Won\'t drain', 'Loud noises', 'Error codes', 'Not filling with water'],
    brands: ['Samsung', 'LG', 'Whirlpool', 'GE', 'Maytag', 'Kenmore', 'Frigidaire', 'Speed Queen', 'Bosch', 'Electrolux'],
    faqs: [
      { question: 'How much does washer repair cost?', answer: `The ${SERVICE_FEE} service fee covers the technician visit and diagnosis. Parts and labor are quoted before any work begins.` },
      { question: 'Do you repair all washer brands?', answer: 'Yes, we service top-load, front-load, and HE washers from all major brands.' },
      { question: 'Can you come out the same day?', answer: 'Same-day service is available in most areas. Book online or call to check availability.' },
      { question: 'Do you offer a warranty?', answer: 'Yes, all repairs come with a 12-month warranty on parts and labor.' }
    ]
  },
  dryer: {
    name: 'Dryer',
    seoTitle: 'Dryer Repair in Fort Lauderdale | $99 Service Fee',
    metaDescription: 'Dryer repair in South Florida with a $99 service fee. Book online with Housecall Pro or call (954) 931-7997.',
    h1: 'Dryer Repair in Fort Lauderdale, FL',
    intro: 'Top Speed Appliance provides professional dryer repair for all brands in Fort Lauderdale. We handle heating problems, noise, and malfunctions for both gas and electric dryers.',
    problems: ['Dryer not heating', 'Long drying times', 'Loud noises', 'Gas/electric ignition problems', 'Random shutdowns', 'Thermal fuse issues', 'Belt problems'],
    brands: ['Samsung', 'LG', 'Whirlpool', 'GE', 'Maytag', 'Kenmore', 'Frigidaire', 'Speed Queen', 'Bosch', 'Electrolux'],
    faqs: [
      { question: 'How much does dryer repair cost?', answer: `The ${SERVICE_FEE} service fee covers the technician visit and diagnosis. Parts and labor are quoted before any work begins.` },
      { question: 'Do you repair gas and electric dryers?', answer: 'Yes, we service both gas and electric dryers.' },
      { question: 'Why is my dryer taking so long to dry clothes?', answer: 'Clogged vents, failed thermal sensors, or aged heating elements are common causes. We inspect and repair them.' },
      { question: 'Do you offer vent cleaning?', answer: 'Yes, we offer professional dryer vent cleaning to improve efficiency and safety.' }
    ]
  },
  refrigerator: {
    name: 'Refrigerator',
    seoTitle: 'Refrigerator Repair in Fort Lauderdale | $99 Service Fee',
    metaDescription: 'Refrigerator repair in South Florida with a $99 service fee. Book online with Housecall Pro or call (954) 931-7997.',
    h1: 'Refrigerator Repair in Fort Lauderdale, FL',
    intro: 'Top Speed Appliance provides expert refrigerator repair in Fort Lauderdale. We fix cooling issues, ice makers, leaks, and compressor problems. Call or book online so spoiled food does not become an expensive problem.',
    problems: ['Not cooling', 'Ice maker not working', 'Water leaks', 'Strange noises', 'Compressor issues', 'Frost accumulation', 'Weak water pressure'],
    brands: ['Samsung', 'LG', 'Whirlpool', 'GE', 'Maytag', 'Kenmore', 'Frigidaire', 'Sub-Zero', 'Viking', 'Electrolux'],
    faqs: [
      { question: 'How much does refrigerator repair cost?', answer: `The ${SERVICE_FEE} service fee covers the technician visit and diagnosis. Parts and labor are quoted before any work begins.` },
      { question: 'How long can food stay cold if my fridge isn\'t cooling?', answer: 'Food safety requires 40°F or below. If temperatures rise above 50°F, discard perishables.' },
      { question: 'Do you repair all refrigerator brands?', answer: 'Yes, we service all major brands including Sub-Zero and Viking.' },
      { question: 'What causes a refrigerator to stop cooling?', answer: 'Common causes include compressor failure, refrigerant leaks, and thermostat malfunctions. We diagnose quickly.' }
    ]
  },
  oven: {
    name: 'Oven & Stove',
    seoTitle: 'Oven & Stove Repair in Fort Lauderdale | $99 Service Fee',
    metaDescription: 'Oven and stove repair in South Florida with a $99 service fee. Book online with Housecall Pro or call (954) 931-7997.',
    h1: 'Oven & Stove Repair in Fort Lauderdale, FL',
    image: '/images/service/oven-stove-range.webp',
    imageAlt: 'Freestanding electric range with glass cooktop and digital controls',
    intro: 'Top Speed Appliance provides professional oven and stove repair in Fort Lauderdale. We fix burners, igniters, temperature issues, and controls for gas and electric models of all major brands.',
    problems: ['Oven not heating', 'Burners not lighting', 'Faulty controls', 'Igniters failing', 'Temperature problems', 'Broken door seals', 'Self-cleaning cycle errors'],
    brands: ['Samsung', 'LG', 'Whirlpool', 'GE', 'Maytag', 'Kenmore', 'Frigidaire', 'Wolf', 'Bosch', 'Electrolux'],
    faqs: [
      { question: 'How much does oven repair cost?', answer: `The ${SERVICE_FEE} service fee covers the technician visit and diagnosis. Parts and labor are quoted before any work begins.` },
      { question: 'Do you repair all brands of ovens and stoves?', answer: 'Yes, we service all major brands including luxury models like Wolf.' },
      { question: 'Are your technicians qualified for gas stoves?', answer: 'Yes, all gas appliance work is performed by licensed technicians.' },
      { question: 'Can repairs be done the same day?', answer: 'Same-day repair is available in most cases. Book online or call to check availability.' }
    ]
  },
  dishwasher: {
    name: 'Dishwasher',
    seoTitle: 'Dishwasher Repair in Fort Lauderdale | $99 Service Fee',
    metaDescription: 'Dishwasher repair in South Florida with a $99 service fee. Book online with Housecall Pro or call (954) 931-7997.',
    h1: 'Dishwasher Repair in Fort Lauderdale, FL',
    intro: 'Top Speed Appliance provides dishwasher repair in Fort Lauderdale and nearby areas. We fix drainage, leaks, cleaning performance, and control problems on all major dishwasher brands.',
    problems: ['Not draining', 'Leaking water', 'Dishes not getting clean', 'Won\'t start', 'Loud noises', 'Door latch issues', 'Error codes'],
    brands: ['Samsung', 'LG', 'Whirlpool', 'GE', 'Bosch', 'KitchenAid', 'Frigidaire', 'Maytag', 'Miele', 'Electrolux'],
    faqs: [
      { question: 'How much does dishwasher repair cost?', answer: `The ${SERVICE_FEE} service fee covers the technician visit and diagnosis. Parts and labor are quoted before any work begins.` },
      { question: 'Why is my dishwasher not draining?', answer: 'Clogged filters, drain hoses, or failed drain pumps are common causes. We inspect and repair them.' },
      { question: 'Do you repair built-in dishwashers?', answer: 'Yes, we service built-in and portable dishwashers from all major brands.' },
      { question: 'Do you offer a warranty?', answer: 'Yes, all repairs come with a 12-month warranty on parts and labor.' }
    ]
  },
  microwave: {
    name: 'Microwave',
    seoTitle: 'Microwave Repair in Fort Lauderdale | $99 Service Fee',
    metaDescription: 'Microwave repair in South Florida with a $99 service fee. Book online with Housecall Pro or call (954) 931-7997.',
    h1: 'Microwave Repair in Fort Lauderdale, FL',
    intro: 'Top Speed Appliance provides microwave repair in Fort Lauderdale and nearby areas. We fix heating failures, control panel problems, turntable issues, and door faults on built-in and countertop models.',
    problems: ['Not heating', 'Turntable not turning', 'Control panel not responding', 'Door not closing properly', 'Sparking or arcing', 'Loud humming', 'Error codes'],
    brands: ['Samsung', 'LG', 'Whirlpool', 'GE', 'Panasonic', 'Sharp', 'Frigidaire', 'Kenmore', 'Bosch', 'KitchenAid'],
    faqs: [
      { question: 'How much does microwave repair cost?', answer: `The ${SERVICE_FEE} service fee covers the technician visit and diagnosis. Parts and labor are quoted before any work begins.` },
      { question: 'Is it worth repairing a microwave?', answer: 'Often yes. We diagnose the fault first so you can decide whether repair or replacement makes more sense.' },
      { question: 'Do you repair built-in microwaves?', answer: 'Yes, we service built-in, over-the-range, and countertop microwaves.' },
      { question: 'Can you come out the same day?', answer: 'Same-day service is available in most areas. Book online or call to check availability.' }
    ]
  },
  commercial: {
    name: 'Commercial Appliance',
    seoTitle: 'Commercial Appliance Repair in South Florida | Book Online',
    metaDescription: 'Commercial appliance repair in South Florida for restaurants, hotels, and businesses. Book online with Housecall Pro or call (954) 931-7997.',
    h1: 'Commercial Appliance Repair in South Florida',
    intro: 'Top Speed Appliance provides commercial appliance repair for restaurants, hotels, apartment complexes, and offices across South Florida. We keep commercial kitchen and laundry equipment running with fast response and clear quotes.',
    problems: ['Commercial refrigerator not cooling', 'Walk-in cooler issues', 'Commercial oven not heating', 'Dishwasher not sanitizing', 'Ice machine not producing ice', 'Commercial washer or dryer breakdowns', 'Gas burner problems'],
    brands: ['Hobart', 'True', 'Traulsen', 'Beverage-Air', 'Viking', 'Blodgett', 'Frymaster', 'Manitowoc', 'Speed Queen', 'Electrolux'],
    ctaTitle: 'Ready to Book Commercial Service?',
    pricing: {
      label: 'Pricing',
      amount: 'Custom Quote',
      note: 'Commercial repairs are quoted after diagnosis, and you approve the quote before work begins. Book online or call to schedule a visit.'
    },
    benefits: ['Quotes provided before work begins', 'Scheduling around your business hours', 'Licensed and insured technicians', '12-month warranty on repairs'],
    faqs: [
      { question: 'Do you repair restaurant equipment?', answer: 'Yes, we service commercial kitchen equipment including refrigeration, cooking, and dishwashing appliances.' },
      { question: 'How are commercial repairs priced?', answer: 'Commercial repairs are quoted after diagnosis, and you approve the quote before any work begins.' },
      { question: 'Can you schedule visits around my business hours?', answer: 'Yes, call us to discuss a schedule that fits your business.' },
      { question: 'Can you respond to an urgent breakdown?', answer: 'Call (954) 931-7997 and we will check availability for urgent repairs.' }
    ]
  },
  home: {
    name: 'Home Appliance',
    seoTitle: 'Home Appliance Repair in South Florida | $99 Service Fee',
    metaDescription: 'Home appliance repair in South Florida with a $99 service fee. Book online with Housecall Pro or call (954) 931-7997.',
    h1: 'Home Appliance Repair in South Florida',
    intro: 'Top Speed Appliance repairs the appliances in your home across South Florida, including washers, dryers, refrigerators, ovens, dishwashers, and microwaves. Book online or call to get your appliance working again.',
    problems: ['Appliance not turning on', 'Not heating or cooling', 'Leaks and drainage problems', 'Strange noises', 'Error codes', 'Control panel problems'],
    brands: ['Samsung', 'LG', 'Whirlpool', 'GE', 'Maytag', 'Kenmore', 'Frigidaire', 'Bosch', 'Electrolux', 'KitchenAid'],
    faqs: [
      { question: 'Which home appliances do you repair?', answer: 'We repair washers, dryers, refrigerators, ovens and stoves, dishwashers, and microwaves.' },
      { question: 'How much does a home appliance repair cost?', answer: `The ${SERVICE_FEE} service fee covers the technician visit and diagnosis. Parts and labor are quoted before any work begins.` },
      { question: 'Do you offer same-day service?', answer: 'Same-day service is available in most areas. Book online or call to check availability.' },
      { question: 'Do you offer a warranty?', answer: 'Yes, all repairs come with a 12-month warranty on parts and labor.' }
    ]
  },
  installation: {
    name: 'Appliance Installation',
    seoTitle: 'Appliance Installation in South Florida | Book Online',
    metaDescription: 'Professional appliance installation in South Florida. Book online with Housecall Pro or call (954) 931-7997 for a quote.',
    h1: 'Appliance Installation in South Florida',
    intro: 'Top Speed Appliance installs washers, dryers, refrigerators, ranges, dishwashers, and microwaves in South Florida homes and businesses. We connect each appliance to its water, gas, or electrical lines and confirm it runs correctly before we leave.',
    listTitle: 'Installation Services We Provide',
    problems: ['Washer and dryer hookup', 'Refrigerator and ice maker water line', 'Range and oven connection', 'Dishwasher installation', 'Built-in microwave installation'],
    brands: ['Samsung', 'LG', 'Whirlpool', 'GE', 'Maytag', 'Kenmore', 'Frigidaire', 'Bosch', 'Electrolux', 'KitchenAid'],
    ctaTitle: 'Ready to Schedule Your Installation?',
    pricing: {
      label: 'Pricing',
      amount: 'Custom Quote',
      note: 'Installation is quoted based on your appliance and the hookups it needs. Book online or call for an exact price.'
    },
    benefits: ['Installation quoted before work begins', 'Licensed and insured technicians', 'Same-day service available in most areas'],
    faqs: [
      { question: 'How much does appliance installation cost?', answer: 'Installation is quoted based on the appliance and the hookups it requires. Book online or call for an exact price.' },
      { question: 'What is included in an installation?', answer: 'Installation connects the appliance to its water, gas, or electrical lines and confirms it runs correctly.' },
      { question: 'Can you install an appliance I bought elsewhere?', answer: 'Call us with the appliance model and we will confirm whether we can install it.' },
      { question: 'Can you schedule installation the same day?', answer: 'Same-day installation is available in most areas. Book online or call to check availability.' }
    ]
  }
}

const ServicePageComponent = ({ service }) => {
  const config = SERVICE_CONFIG[service] || SERVICE_CONFIG.washer
  const pricing = config.pricing || {
    label: 'Service Fee',
    amount: SERVICE_FEE,
    note: `Covers the technician visit and diagnosis for your ${config.name.toLowerCase()}. Parts and labor are quoted before any work begins.`
  }
  const benefits = config.benefits || DEFAULT_BENEFITS

  useEffect(() => {
    document.title = config.seoTitle

    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', config.metaDescription)
    }

    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: config.seoTitle,
        page_path: window.location.pathname,
        service_type: service
      })
    }
  }, [service, config])

  const trackEvent = (eventName) => {
    if (window.gtag) {
      window.gtag('event', eventName, {
        event_category: 'Booking',
        event_label: `${service}_repair`
      })
    }
  }

  const bookingButtons = (className) => (
    <div className="service-ctas">
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`cta-button cta-primary ${className}`}
        onClick={() => trackEvent('schedule_service')}
      >
        Book Online with Housecall Pro
      </a>
      <a href={PHONE_HREF} className="cta-button cta-secondary" onClick={() => trackEvent('click_call')}>
        Call to Book: {PHONE_DISPLAY}
      </a>
    </div>
  )

  return (
    <div className="service-page">
      <section className="service-hero">
        <div className="service-hero-content">
          <h1>{config.h1}</h1>
          <p className="service-intro">{config.intro}</p>
          {bookingButtons('service-hero-cta')}
          {config.image && <img className="service-hero-image" src={config.image} alt={config.imageAlt} />}
        </div>
      </section>

      <section className="service-section service-pricing">
        <div className="service-price-card">
          <p className="service-price-label">{pricing.label}</p>
          <p className="service-price-amount">{pricing.amount}</p>
          <p className="service-price-note">{pricing.note}</p>
          {bookingButtons('service-price-cta')}
        </div>
      </section>

      <section className="service-section">
        <h2>{config.listTitle || `Common ${config.name} Problems We Fix`}</h2>
        <ul className="problems-list">
          {config.problems.map((problem) => (
            <li key={problem}>{problem}</li>
          ))}
        </ul>
      </section>

      <section className="service-section">
        <h2>Brands We Service</h2>
        <p className="brands-text">{config.brands.join(', ')}</p>
      </section>

      <section className="service-section">
        <h2>Why Choose Top Speed Appliance</h2>
        <ul className="benefits-list">
          {benefits.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>
      </section>

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

      <section className="service-cta-middle">
        <h2>{config.ctaTitle || `Ready to Book Your ${config.name} Repair?`}</h2>
        {bookingButtons('service-middle-cta')}
      </section>

      <section className="service-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {config.faqs.map((faq) => (
            <div key={faq.question} className="faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="service-final-cta">
        <h2>Contact Top Speed Appliance Today</h2>
        <p>Book online or call {PHONE_DISPLAY}.</p>
        {bookingButtons('service-final-book')}
      </section>
    </div>
  )
}

export default ServicePageComponent
