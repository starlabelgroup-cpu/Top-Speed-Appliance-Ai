import { Link, useParams } from 'react-router-dom'
import { useMemo, useEffect, useRef } from 'react'
import { LOCATION_SERVICE_PAGES } from '../data/locationServicePages'
import { BOOKING_CONFIG } from '../config/bookingConfig'
import { useSeo } from '../utils/useSeo'
import * as ga4Events from '../utils/ga4Events'
import * as googleAdsTracking from '../utils/googleAdsTracking'
import '../styles/location-service-page.css'

function safeOrigin() {
  if (typeof window === 'undefined') return 'https://topspeedappliance.com'
  return window.location.origin
}

function buildFaqSchema({ origin, canonicalPath, faqs, serviceName, cityName }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${origin}${canonicalPath}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    })),
    about: {
      '@type': 'Service',
      name: `${serviceName} in ${cityName}`,
      provider: {
        '@type': 'LocalBusiness',
        name: BOOKING_CONFIG.BUSINESS_NAME,
        telephone: BOOKING_CONFIG.PHONE_NUMBER,
        areaServed: {
          '@type': 'City',
          name: cityName,
          address: {
            '@type': 'PostalAddress',
            addressRegion: 'FL'
          }
        }
      }
    }
  }
}

function NotFoundSection() {
  return (
    <main className="location-service-page">
      <section className="location-hero">
        <p className="location-eyebrow">Service Page Not Found</p>
        <h1>We could not find that city + service combination.</h1>
        <p className="location-lede">Use the quick links below to keep browsing available services.</p>
        <div className="location-hero-actions">
          <Link className="cta-button primary-btn" to="/service-areas">View Service Areas</Link>
          <a className="cta-button secondary-btn" href={BOOKING_CONFIG.BOOKING_URL} target="_blank" rel="noopener noreferrer">Book Online</a>
        </div>
      </section>
    </main>
  )
}

export default function LocationServicePage({ citySlug: citySlugProp, serviceSlug: serviceSlugProp } = {}) {
  const params = useParams()
  const citySlug = citySlugProp ?? params.citySlug
  const serviceSlug = serviceSlugProp ?? params.serviceSlug
  const scrollTrackedRef = useRef({ 25: false, 50: false, 75: false, 100: false })
  const timeTrackedRef = useRef({ 30: false, 60: false, 120: false })
  const pageStartTimeRef = useRef(Date.now())

  const fallbackPath = `/locations/${citySlug}/${serviceSlug}`

  const page = useMemo(() => {
    return LOCATION_SERVICE_PAGES.find((entry) => entry.citySlug === citySlug && entry.serviceSlug === serviceSlug) || null
  }, [citySlug, serviceSlug])

  const canonicalPath = page?.canonicalPath ?? fallbackPath

  const origin = safeOrigin()

  useSeo(
    page
      ? {
          title: `${page.serviceName} in ${page.cityName} FL | Top Speed Appliance`,
          description: `Same-day ${page.serviceName.toLowerCase()} in ${page.cityName}. Licensed & insured technicians. Call Top Speed Appliance today.`,
          canonicalPath,
          ogImage: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2F5b2cddc584514ebd90bab47dfa9fab6c?format=webp&width=1200',
          schema: buildFaqSchema({
            origin,
            canonicalPath,
            faqs: page.faqs,
            serviceName: page.serviceName,
            cityName: page.cityName
          })
        }
      : {
          title: 'Service Page Not Found | Top Speed Appliance',
          description: `We could not find this area. Call ${BOOKING_CONFIG.PHONE_NUMBER} for immediate help.`,
          canonicalPath
        }
  )

  // Track landing page view on mount
  useEffect(() => {
    if (page) {
      // GA4 tracking
      ga4Events.trackLandingPageView(page.cityName, page.serviceName, canonicalPath)

      // Google Ads tracking - page view conversion
      googleAdsTracking.trackPageViewConversion({
        service: page.serviceName,
        city: page.cityName,
        pageType: 'landing_page'
      })

      // Add to remarketing audience
      googleAdsTracking.trackRemarketingAudience({
        audienceType: 'landing_page_visitor',
        service: page.serviceName,
        city: page.cityName
      })
    }
  }, [page, canonicalPath])

  // Track scroll depth and time on page
  useEffect(() => {
    if (!page) return

    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

      if (scrollPercentage >= 25 && !scrollTrackedRef.current[25]) {
        scrollTrackedRef.current[25] = true
        ga4Events.trackScrollDepth(25, page.cityName, page.serviceName)
      }
      if (scrollPercentage >= 50 && !scrollTrackedRef.current[50]) {
        scrollTrackedRef.current[50] = true
        ga4Events.trackScrollDepth(50, page.cityName, page.serviceName)
      }
      if (scrollPercentage >= 75 && !scrollTrackedRef.current[75]) {
        scrollTrackedRef.current[75] = true
        ga4Events.trackScrollDepth(75, page.cityName, page.serviceName)
        // Track high engagement for Google Ads remarketing
        googleAdsTracking.trackHighEngagement({
          service: page.serviceName,
          city: page.cityName,
          scrollDepth: 75
        })
      }
      if (scrollPercentage >= 100 && !scrollTrackedRef.current[100]) {
        scrollTrackedRef.current[100] = true
        ga4Events.trackScrollDepth(100, page.cityName, page.serviceName)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [page])

  // Track time on page at intervals
  useEffect(() => {
    if (!page) return

    const intervals = [
      { time: 30000, key: 30 },
      { time: 60000, key: 60 },
      { time: 120000, key: 120 }
    ]

    const timeouts = intervals.map(({ time, key }) =>
      setTimeout(() => {
        if (!timeTrackedRef.current[key]) {
          timeTrackedRef.current[key] = true
          ga4Events.trackTimeOnPage(key, page.cityName, page.serviceName)
        }
      }, time)
    )

    return () => timeouts.forEach(timeout => clearTimeout(timeout))
  }, [page])

  // Track CTA clicks
  const handleCTAClick = (ctaType) => {
    if (page) {
      ga4Events.trackLandingPageCTA(ctaType, page.cityName, page.serviceName)
    }
  }

  // Track FAQ expansion
  const handleFAQToggle = (question) => {
    if (page) {
      ga4Events.trackFAQEngagement(question, page.cityName, page.serviceName)
    }
  }

  if (!page) {
    return <NotFoundSection />
  }

  return (
    <main className="location-service-page">
      <section className="location-hero">
        <p className="location-eyebrow">{page.serviceName} • {page.cityName}, FL</p>
        <h1>Professional {page.serviceName} Services in {page.cityName}, FL</h1>
        <p className="location-lede">{page.hero.intro}</p>
        <div className="location-hero-actions">
          <a className="cta-button primary-btn" href={BOOKING_CONFIG.BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={() => handleCTAClick('book_now')}>{page.hero.ctaLabel}</a>
          <a className="cta-button secondary-btn" href={BOOKING_CONFIG.PHONE_LINK} onClick={() => handleCTAClick('call_now')}>{page.hero.secondaryCtaLabel}</a>
        </div>
      </section>

      <section className="location-content">
        <div className="location-body">
          <div className="location-card">
            <h2>Common Dryer Problems We Fix</h2>
            <ul>
              {page.problems.map((problem) => (
                <li key={problem}>{problem}</li>
              ))}
            </ul>
          </div>

          <div className="location-card">
            <h2>Dryer Brands We Service</h2>
            <p>Factory-trained technicians handle leading gas and electric dryer lines:</p>
            <div className="location-chip-row">
              {page.brands.map((brand) => (
                <span key={brand} className="location-chip">{brand}</span>
              ))}
            </div>
          </div>

          <div className="location-card">
            <h2>Why Miami Homeowners Trust Top Speed Appliance</h2>
            <ul>
              {page.whyChoose.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </div>

          <div className="location-card">
            <h2>Service Areas Near Miami</h2>
            <div className="location-areas">
              <div>
                <h3>Neighborhoods</h3>
                <ul>
                  {page.serviceAreas.neighborhoods.map((area) => (
                    <li key={area}>{area}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Zip Codes</h3>
                <div className="location-chip-column">
                  {page.serviceAreas.zips.map((zip) => (
                    <span key={zip} className="location-chip">{zip}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="location-card">
            <h2>Frequently Asked Questions</h2>
            <div className="location-faq-list">
              {page.faqs.map((faq) => (
                <details key={faq.question} className="location-faq" onToggle={() => handleFAQToggle(faq.question)}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        <aside className="location-sidebar">
          <div className="location-sidebar-card">
            <h3>Schedule Dryer Repair</h3>
            <p>Call or click to confirm your appointment instantly.</p>
            <div className="location-sidebar-actions">
              <a className="cta-button primary-btn" href={BOOKING_CONFIG.BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={() => handleCTAClick('sidebar_book_online')}>Book Online</a>
              <a className="cta-button secondary-btn" href={BOOKING_CONFIG.PHONE_LINK} onClick={() => handleCTAClick('sidebar_call')}>Call {BOOKING_CONFIG.PHONE_NUMBER}</a>
            </div>
            <p className="location-sidebar-note">Serving {page.county} and nearby cities.</p>
          </div>

          <div className="location-sidebar-card">
            <h3>Coverage Map</h3>
            <div className="location-map-wrapper">
              <iframe
                title={`${page.cityName} coverage map`}
                src={page.googleMapEmbedSrc}
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="location-sidebar-card location-links-card">
            <h3>Explore Related Services</h3>
            <ul>
              <li>
                <Link to="/locations/miami/washer-repair">Washer Repair in Miami</Link>
              </li>
              <li>
                <Link to="/locations/miami/oven-repair">Oven Repair in Miami</Link>
              </li>
              <li>
                <Link to="/services/dryer-repair">Dryer Repair Service Overview</Link>
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </main>
  )
}
