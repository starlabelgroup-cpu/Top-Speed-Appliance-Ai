import React from 'react'
import '../styles/service-and-city-pages.css'
import { BOOKING_CONFIG } from '../config/bookingConfig'
import ServiceBookButton from '../components/ServiceBookButton'
import { SERVICE_OS_LINKS, openSpeedy } from '../lib/serviceOs'

const INFO_PAGES = {
  pricing: {
    h1: 'Appliance Repair Pricing in South Florida',
    intro: 'Know what to expect before a technician arrives. Our pricing is quoted upfront, and you approve the price before any work begins.',
    sections: [
      {
        title: 'How Our Pricing Works',
        items: [
          'Service fee covers the technician visit and diagnosis',
          'Parts and labor are quoted before any work begins',
          'You approve every quote before we start',
          'Commercial and installation jobs are quoted after an assessment',
        ],
      },
    ],
    faqs: [
      { question: 'Do I pay if I do not approve the repair?', answer: 'Call us for the current diagnostic policy before booking so you know what applies to your visit.' },
      { question: 'Is pricing the same for every appliance?', answer: 'Repair pricing depends on the appliance and the parts it needs. We confirm the price before any work begins.' },
    ],
  },
  warranty: {
    h1: 'Appliance Repair Warranty',
    intro: 'Every repair we complete is backed by a written warranty, so you know the work will hold up after the technician leaves.',
    sections: [
      {
        title: 'What Our Warranty Covers',
        items: [
          'Parts and labor on completed repairs',
          'Clear written terms provided with every job',
          'Support if the same problem returns after a covered repair',
        ],
      },
    ],
    faqs: [
      { question: 'How long does the warranty last?', answer: 'Our repairs are covered by a warranty on parts and labor. Ask the technician for the exact terms on your invoice.' },
      { question: 'Does the warranty cover commercial repairs?', answer: 'Commercial repairs are covered under the terms quoted before work begins. Call to confirm the details for your equipment.' },
    ],
  },
  reviews: {
    h1: 'Customer Reviews for Top Speed Appliance',
    intro: 'Top Speed Appliance serves South Florida homes and businesses for repair, installation, and commercial service.',
    sections: [
      {
        title: 'Why Customers Choose Us',
        items: [
          'Certified technicians across all major appliance brands',
          'Upfront quotes before any work begins',
          'Same-day service available in most areas',
        ],
      },
    ],
    faqs: [],
  },
}

function InfoPage({ page }) {
  const config = INFO_PAGES[page]

  return (
    <div className="service-page">
      <section className="service-hero">
        <div className="service-hero-content">
          <h1>{config.h1}</h1>
          <p className="service-intro">{config.intro}</p>
          <BookingButtons source={page} />
        </div>
      </section>

      {config.sections.map((section) => (
        <section key={section.title} className="service-section">
          <h2>{section.title}</h2>
          <ul className="benefits-list">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}

      {page === 'reviews' && (
        <section className="service-section">
          <h2>Reviews Live in the Local OS Reviews Engine</h2>
          <p>
            Every completed job fires an automatic review request inside the Service OS,
            routed to Google — reviews land on the Google Business Profile, where future
            customers and Google both see them. We don't host a copy here; the reviews
            engine in Top Speed Local OS is where the loop is tracked.
          </p>
          <p style={{ marginTop: 14 }}>
            <a
              className="cta-button cta-primary"
              href={SERVICE_OS_LINKS.localReviews}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the Reviews Engine
            </a>
          </p>
        </section>
      )}

      {config.faqs.length > 0 && (
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
      )}

      <section className="service-final-cta">
        <h2>Ready to Book?</h2>
        <p>Book online or call {BOOKING_CONFIG.PHONE_NUMBER}.</p>
        <BookingButtons source={page} />
      </section>
    </div>
  )
}

function BookingButtons({ source }) {
  return (
    <div className="service-ctas">
      <button
        type="button"
        className="cta-button cta-primary"
        onClick={openSpeedy}
      >
        Book Online with Speedy
      </button>
      <ServiceBookButton source={source} className="cta-button cta-primary" />
      <a href={BOOKING_CONFIG.PHONE_LINK} className="cta-button cta-secondary">
        Call to Book: {BOOKING_CONFIG.PHONE_NUMBER}
      </a>
    </div>
  )
}

export default InfoPage
