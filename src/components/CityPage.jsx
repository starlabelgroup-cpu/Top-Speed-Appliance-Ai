import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVICE_OS_LINKS, attributionSearch, useAttributionSearch, withAttribution } from '../lib/serviceOs'
import '../styles/service-and-city-pages.css'

/**
 * CityPage Component
 * Reusable component for all city pages (Fort Lauderdale, Hollywood, etc.)
 * Usage: <Route path="/appliance-repair-fort-lauderdale" element={<CityPage city="fort-lauderdale" />} />
 */

const CityPageComponent = ({ city }) => {
  const navigate = useNavigate()
  const attrQs = useAttributionSearch()

  // City configuration
  const cityConfig = {
    'fort-lauderdale': {
      displayName: 'Fort Lauderdale',
      seoTitle: 'Appliance Repair in Fort Lauderdale, FL | Same-Day Service',
      metaDescription: 'Top Speed Appliance offers fast appliance repair in Fort Lauderdale. Washer, dryer, refrigerator & oven repair. Call today.',
      h1: 'Appliance Repair in Fort Lauderdale, FL',
      intro: 'Top Speed Appliance offers professional appliance repair in Fort Lauderdale, FL. Our licensed technicians provide fast, same-day service for all major appliances. We service washers, dryers, refrigerators, ovens, and more — all with transparent pricing and trusted service.',
      neighborhoods: ['Downtown Fort Lauderdale', 'Las Olas', 'Victoria Park', 'Flagler Village', 'Colee Hammock', 'Oakland Park']
    },
    'hollywood-fl': {
      displayName: 'Hollywood',
      seoTitle: 'Appliance Repair in Hollywood, FL | Same-Day Service',
      metaDescription: 'Top Speed Appliance provides fast appliance repair in Hollywood. Washer, dryer, refrigerator & oven repair. Call today.',
      h1: 'Appliance Repair in Hollywood, FL',
      intro: 'Top Speed Appliance delivers professional appliance repair in Hollywood, FL. From washers and dryers to refrigerators and ovens, we provide fast, same-day service for all major brands. Our local technicians are licensed, insured, and dedicated to reliable repairs.',
      neighborhoods: ['Downtown Hollywood', 'Hollywood Beach', 'Young Circle', 'Dania Beach', 'Liberia', 'Emerald Hills']
    },
    'plantation-fl': {
      displayName: 'Plantation',
      seoTitle: 'Appliance Repair in Plantation, FL | Same-Day Service',
      metaDescription: 'Top Speed Appliance provides fast appliance repair in Plantation. Washer, dryer, refrigerator & oven repair. Call today.',
      h1: 'Appliance Repair in Plantation, FL',
      intro: 'Top Speed Appliance provides trusted appliance repair in Plantation, FL. Our experienced technicians repair washers, dryers, refrigerators, and ovens, offering same-day service for all major brands. We\'re your local Plantation appliance repair specialists.',
      neighborhoods: ['Central Plantation', 'Westview', 'Plantation Acres', 'West Broward', 'Oak Ridge', 'Colonades']
    },
    'pembroke-pines-fl': {
      displayName: 'Pembroke Pines',
      seoTitle: 'Appliance Repair in Pembroke Pines, FL | Same-Day Service',
      metaDescription: 'Top Speed Appliance provides fast appliance repair in Pembroke Pines. Washer, dryer, refrigerator & oven repair. Call today.',
      h1: 'Appliance Repair in Pembroke Pines, FL',
      intro: 'Top Speed Appliance provides reliable appliance repair in Pembroke Pines, FL. Our licensed technicians repair washers, dryers, refrigerators, and ovens with same-day service available. We\'re dedicated to fast, honest repairs for all major brands.',
      neighborhoods: ['Pembroke Lakes', 'Chapel Trail', 'Silver Lakes', 'Heritage Park', 'Pembroke Gardens', 'Pembroke Commons']
    },
    'delray-beach-fl': {
      displayName: 'Delray Beach',
      seoTitle: 'Appliance Repair in Delray Beach, FL | Same-Day Service',
      metaDescription: 'Top Speed Appliance offers fast appliance repair in Delray Beach. Washer, dryer, refrigerator & oven repair. Call today.',
      h1: 'Appliance Repair in Delray Beach, FL',
      intro: 'Top Speed Appliance brings professional appliance repair to Delray Beach, FL. Our certified technicians service washers, dryers, refrigerators, and ovens with same-day appointments available. Fast, reliable, and honest service for all major brands.',
      neighborhoods: ['Downtown Delray Beach', 'Atlantic Avenue', 'West Delray', 'Delray Manors', 'Oriole Road', 'Delray Oaks']
    },
    'boynton-beach-fl': {
      displayName: 'Boynton Beach',
      seoTitle: 'Appliance Repair in Boynton Beach, FL | Same-Day Service',
      metaDescription: 'Top Speed Appliance provides fast appliance repair in Boynton Beach. Washer, dryer, refrigerator & oven repair. Call today.',
      h1: 'Appliance Repair in Boynton Beach, FL',
      intro: 'Top Speed Appliance brings fast appliance repair to Boynton Beach, FL. Our licensed technicians repair all major appliance brands with same-day service available. We handle washers, dryers, refrigerators, ovens, and more — all with upfront, honest pricing.',
      neighborhoods: ['Downtown Boynton Beach', 'Gateway Center', 'Leisureville', 'Heatherwood', 'Olympus', 'Seacrest']
    },
    'jupiter-fl': {
      displayName: 'Jupiter',
      seoTitle: 'Appliance Repair in Jupiter, FL | Same-Day Service',
      metaDescription: 'Top Speed Appliance provides fast appliance repair in Jupiter. Washer, dryer, refrigerator & oven repair. Call today.',
      h1: 'Appliance Repair in Jupiter, FL',
      intro: 'Top Speed Appliance brings professional appliance repair to Jupiter, FL. Our certified technicians service washers, dryers, refrigerators, and ovens with same-day availability. Fast, reliable repairs for all major brands from your local Jupiter service team.',
      neighborhoods: ['Downtown Jupiter', 'Jupiter Island', 'Tequesta', 'Abacoa', 'North Jupiter Ridge', 'Limestone Creek']
    },
    'palm-beach-gardens-fl': {
      displayName: 'Palm Beach Gardens',
      seoTitle: 'Appliance Repair in Palm Beach Gardens, FL | Same-Day Service',
      metaDescription: 'Top Speed Appliance provides fast appliance repair in Palm Beach Gardens. Washer, dryer, refrigerator & oven repair. Call today.',
      h1: 'Appliance Repair in Palm Beach Gardens, FL',
      intro: 'Top Speed Appliance offers professional appliance repair in Palm Beach Gardens, FL. Our licensed technicians repair all major appliance brands with same-day service available. From washers and dryers to refrigerators and ovens — we handle it all with trusted service.',
      neighborhoods: ['Downtown Palm Beach Gardens', 'Gardens Mall', 'PGA Boulevard', 'Military Trail', 'Northlake', 'Allamanda']
    }
  }

  const config = cityConfig[city] || cityConfig['fort-lauderdale']

  // Update page title and meta tags
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
        city: config.displayName
      })
    }
  }, [city, config])

  const handleCallClick = () => {
    if (window.gtag) {
      window.gtag('event', 'click_call', {
        event_category: 'Contact',
        event_label: `city_${city}`,
        city: config.displayName
      })
    }
  }

  const handleBookingClick = () => {
    if (window.gtag) {
      window.gtag('event', 'schedule_service', {
        event_category: 'Booking',
        event_label: `city_${city}`
      })
    }
    navigate(withAttribution('/service-request', attributionSearch()))
  }

  return (
    <div className="city-page">
      {/* Hero Section */}
      <section className="city-hero">
        <div className="city-hero-content">
          <h1>{config.h1}</h1>
          <p className="city-intro">{config.intro}</p>
          <div className="city-ctas">
            <a href="tel:+19549317997" className="cta-button cta-primary" onClick={handleCallClick}>
              <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.2 4h3.4l1.4 4.2-2.1 1.7a13.5 13.5 0 0 0 6.2 6.2l1.7-2.1L20 15.4v3.4a2 2 0 0 1-2.1 2A16.5 16.5 0 0 1 3.2 6.1 2 2 0 0 1 5.2 4z"/><path d="M15.5 3.5a7 7 0 0 1 5 5M15.5 6.8a3.8 3.8 0 0 1 1.7 1.7" stroke="#E8322E"/></svg> Call Now: (954) 931-7997
            </a>
            <button className="cta-button cta-secondary" onClick={handleBookingClick}>
              <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.6"/><circle cx="12" cy="12" r="3.4" stroke="#E8322E"/><circle cx="12" cy="12" r="1" fill="#E8322E" stroke="none"/></svg> Schedule Service Today
            </button>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="city-section">
        <h2>Our Services in {config.displayName}</h2>
        <ul className="services-list">
          <li><a href={withAttribution('/washer-repair', attrQs)}>Washer Repair</a></li>
          <li><a href={withAttribution('/dryer-repair', attrQs)}>Dryer Repair</a></li>
          <li><a href={withAttribution('/refrigerator-repair', attrQs)}>Refrigerator Repair</a></li>
          <li><a href={withAttribution('/oven-stove-repair', attrQs)}>Oven & Stove Repair</a></li>
          <li><a href={withAttribution('/dishwasher-repair', attrQs)}>Dishwasher Repair</a></li>
          <li><a href={withAttribution('/microwave-repair', attrQs)}>Microwave Repair</a></li>
          <li><a href={withAttribution('/home-appliance-repair', attrQs)}>Home Appliance Repair</a></li>
          <li><a href={withAttribution('/commercial-appliance-repair', attrQs)}>Commercial Appliance Repair</a></li>
          <li><a href={withAttribution('/appliance-installation', attrQs)}>Appliance Installation</a></li>
        </ul>
      </section>

      {/* Why Choose Us */}
      <section className="city-section">
        <h2>Why {config.displayName} Chooses Top Speed Appliance</h2>
        <ul className="benefits-list">
          <li>Local, licensed technicians</li>
          <li>Same-day service available</li>
          <li>Honest and transparent pricing</li>
          <li>Trusted and reliable repairs</li>
          <li>12-month warranty</li>
        </ul>
      </section>

      {/* Neighborhoods */}
      <section className="city-section">
        <h2>Neighborhoods We Serve</h2>
        <p>{config.neighborhoods.join(', ')}</p>
      </section>

      {/* Other Cities */}
      <section className="city-section">
        <h2>Also Serving Nearby Areas</h2>
        <ul className="other-cities">
          {['fort-lauderdale', 'hollywood-fl', 'plantation-fl', 'pembroke-pines-fl', 'delray-beach-fl', 'boynton-beach-fl', 'jupiter-fl', 'palm-beach-gardens-fl'].map(c => (
            c !== city && (
              <li key={c}>
                <a href={withAttribution(`/appliance-repair-${c}`, attrQs)}>
                  Appliance Repair in {cityConfig[c].displayName}
                </a>
              </li>
            )
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="city-cta-middle">
        <h2>Ready for Fast Appliance Repair in {config.displayName}?</h2>
        <div className="city-ctas">
          <a href="tel:+19549317997" className="cta-button cta-primary" onClick={handleCallClick}>
            <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.2 4h3.4l1.4 4.2-2.1 1.7a13.5 13.5 0 0 0 6.2 6.2l1.7-2.1L20 15.4v3.4a2 2 0 0 1-2.1 2A16.5 16.5 0 0 1 3.2 6.1 2 2 0 0 1 5.2 4z"/><path d="M15.5 3.5a7 7 0 0 1 5 5M15.5 6.8a3.8 3.8 0 0 1 1.7 1.7" stroke="#E8322E"/></svg> Call Now: (954) 931-7997
          </a>
          <button className="cta-button cta-secondary" onClick={handleBookingClick}>
            <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.6"/><circle cx="12" cy="12" r="3.4" stroke="#E8322E"/><circle cx="12" cy="12" r="1" fill="#E8322E" stroke="none"/></svg> Schedule Service Today
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="city-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          <div className="faq-item">
            <h3>Do you offer same-day service in {config.displayName}?</h3>
            <p>Yes, same-day service is available in most areas of {config.displayName}.</p>
          </div>
          <div className="faq-item">
            <h3>Do you service all brands?</h3>
            <p>Yes, we repair all major appliance brands.</p>
          </div>
          <div className="faq-item">
            <h3>Are your technicians licensed?</h3>
            <p>Yes, all technicians are licensed, insured, and background checked.</p>
          </div>
          <div className="faq-item">
            <h3>What areas do you service?</h3>
            <p>We service all of {config.displayName} and surrounding areas. Call for availability in your neighborhood.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="city-final-cta">
        <h2>Contact Top Speed Appliance Today</h2>
        <p>Same-day service available for most repairs in {config.displayName}.</p>
        <a href="tel:+19549317997" className="cta-button cta-primary" onClick={handleCallClick}>
          <svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.2 4h3.4l1.4 4.2-2.1 1.7a13.5 13.5 0 0 0 6.2 6.2l1.7-2.1L20 15.4v3.4a2 2 0 0 1-2.1 2A16.5 16.5 0 0 1 3.2 6.1 2 2 0 0 1 5.2 4z"/><path d="M15.5 3.5a7 7 0 0 1 5 5M15.5 6.8a3.8 3.8 0 0 1 1.7 1.7" stroke="#E8322E"/></svg> Call Now: (954) 931-7997
        </a>
        <p style={{ marginTop: 14 }}>
          Or find Top Speed Appliance in the{' '}
          <a href={SERVICE_OS_LINKS.localDirectory} target="_blank" rel="noopener noreferrer">
            Top Speed Local OS directory
          </a>{' '}
          — listings, reviews and local offers on the Service OS.
        </p>
      </section>
    </div>
  )
}

export default CityPageComponent
