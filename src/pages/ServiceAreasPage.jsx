import { Link } from 'react-router-dom'
import { BOOKING_CONFIG } from '../config/bookingConfig'
import SeoLeadCaptureForm from '../components/SeoLeadCaptureForm'
import ZipDirectory from '../components/ZipDirectory'
import {
  SEO_COUNTIES,
  SEO_CITIES_BY_COUNTY,
  SEO_PROBLEMS,
  SEO_SERVICES,
  buildServiceLocationSlug,
  getCitySlug
} from '../data/seoLeadData'
import { useSeo } from '../utils/useSeo'
import '../styles/seo-leads.css'

function safeOrigin() {
  if (typeof window === 'undefined') return 'https://topspeedappliance.com'
  return window.location.origin
}

export default function ServiceAreasPage() {
  const canonicalPath = '/service-areas'
  const origin = safeOrigin()

  const title = 'Service Areas & SEO Lead Generator | Top Speed Appliance'
  const description = 'Browse service areas, city pages, common appliance problems, and quick booking links. Built for local search, online directories, and QR marketing.'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${origin}${canonicalPath}`,
    url: `${origin}${canonicalPath}`,
    name: title,
    description,
    isPartOf: {
      '@type': 'WebSite',
      name: BOOKING_CONFIG.BUSINESS_NAME,
      url: origin
    },
    about: {
      '@type': 'LocalBusiness',
      name: BOOKING_CONFIG.BUSINESS_NAME,
      telephone: BOOKING_CONFIG.PHONE_NUMBER,
      url: origin
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: SEO_COUNTIES.map((county, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${origin}/${county.slug}`,
        name: county.name
      }))
    }
  }

  useSeo({
    title,
    description,
    canonicalPath,
    ogImage: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2F5b2cddc584514ebd90bab47dfa9fab6c?format=webp&width=1200',
    schema
  })

  const stopSummaryToggle = (event) => {
    event.stopPropagation()
  }

  return (
    <main className="seo-leads-page">
      <section className="seo-leads-hero">
        <div className="seo-leads-hero-inner">
          <div className="seo-leads-hero-badge">Local SEO • Directories • QR Codes</div>
          <h1 className="seo-leads-hero-title">Find Appliance Repair Pages for Every City</h1>
          <p className="seo-leads-hero-subtitle">
            Use these pages for Google search, online directories, and QR stickers. Each link is optimized for local intent and includes fast booking options.
          </p>

          <div className="seo-leads-hero-actions">
            <a className="cta-button seo-leads-hero-cta" href={BOOKING_CONFIG.BOOKING_URL} target="_blank" rel="noopener noreferrer">Book Online</a>
            <a className="cta-button seo-leads-hero-cta secondary" href={BOOKING_CONFIG.PHONE_LINK}>Call {BOOKING_CONFIG.PHONE_NUMBER}</a>
            <Link className="cta-button seo-leads-hero-cta secondary" to="/qr">QR Page</Link>
            <Link className="cta-button seo-leads-hero-cta secondary" to="/service-request">Service Request</Link>
          </div>
        </div>
      </section>

      <section className="seo-leads-content">
        <div className="seo-leads-grid">
          <div className="seo-leads-panel">
            <h2 className="seo-leads-panel-title">Counties We Serve</h2>
            <p className="seo-leads-panel-text">Pick a county to see city links and local service pages.</p>

            <div className="seo-leads-county-list">
              {SEO_COUNTIES.map(county => (
                <details key={county.slug} className="seo-leads-county">
                  <summary className="seo-leads-county-summary">
                    <span className="seo-leads-county-name">{county.name}</span>
                    <span className="seo-leads-county-links">
                      <Link
                        className="seo-leads-inline-link"
                        to={`/${county.slug}`}
                        onClick={stopSummaryToggle}
                        onPointerDown={stopSummaryToggle}
                      >
                        County page
                      </Link>
                      <Link
                        className="seo-leads-inline-link"
                        to={`/${buildServiceLocationSlug('appliance-repair', county.slug)}`}
                        onClick={stopSummaryToggle}
                        onPointerDown={stopSummaryToggle}
                      >
                        Appliance repair
                      </Link>
                    </span>
                  </summary>

                  <div className="seo-leads-county-body">
                    <div className="seo-leads-city-grid">
                      {(SEO_CITIES_BY_COUNTY[county.slug] || []).map(city => {
                        const citySlug = getCitySlug(city)
                        const applianceRepairSlug = buildServiceLocationSlug('appliance-repair', citySlug)
                        return (
                          <div key={citySlug} className="seo-leads-city-card">
                            <h3 className="seo-leads-city-name">{city}</h3>
                            <div className="seo-leads-city-links">
                              <Link className="seo-leads-city-link" to={`/${applianceRepairSlug}`}>Appliance Repair</Link>
                              {SEO_SERVICES.filter(s => s.slug !== 'appliance-repair').map(service => (
                                <Link
                                  key={service.slug}
                                  className="seo-leads-city-link"
                                  to={`/${buildServiceLocationSlug(service.slug, citySlug)}`}
                                >
                                  {service.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>

          <div className="seo-leads-panel">
            <h2 className="seo-leads-panel-title">Common Problems (Search Pages)</h2>
            <p className="seo-leads-panel-text">These pages match "near me" problem searches and capture leads fast.</p>

            <div className="seo-leads-problem-grid">
              {SEO_PROBLEMS.map(problem => (
                <Link key={problem.slug} to={`/${problem.slug}`} className="seo-leads-problem-card">
                  <h3 className="seo-leads-problem-title">{problem.title}</h3>
                  <p className="seo-leads-problem-text">{problem.summary}</p>
                  <span className="seo-leads-problem-cta">View page →</span>
                </Link>
              ))}
            </div>

            <div className="seo-leads-directory-box">
              <h3 className="seo-leads-directory-title">Directory Posting Tip</h3>
              <p className="seo-leads-directory-text">
                When listing your business on directories, paste a city page URL (example: <span className="seo-leads-mono">/appliance-repair-fort-lauderdale</span>)
                and include the QR code from the <Link className="seo-leads-inline-link" to="/qr">QR Page</Link> for flyers and stickers.
              </p>
            </div>
          </div>

          <SeoLeadCaptureForm source="seo" contextLabel="Service Areas Hub" defaultIssue="" />
        </div>
      </section>

      <ZipDirectory />

      <section className="seo-leads-footer">
        <div className="seo-leads-footer-inner">
          <h2 className="seo-leads-footer-title">Need Same-Day Appliance Repair?</h2>
          <p className="seo-leads-footer-text">Call or book online and get fast service across Palm Beach, Broward, and Miami-Dade.</p>
          <div className="seo-leads-footer-actions">
            <a className="cta-button" href={BOOKING_CONFIG.PHONE_LINK}>Call {BOOKING_CONFIG.PHONE_NUMBER}</a>
            <a className="cta-button primary-btn" href={BOOKING_CONFIG.BOOKING_URL} target="_blank" rel="noopener noreferrer">Book Online</a>
            <Link className="cta-button secondary-btn" to="/">Back to Home</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
