import React, { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BOOKING_CONFIG } from '../config/bookingConfig'
import SeoLeadCaptureForm from '../components/SeoLeadCaptureForm'
import {
  SEO_BRANDS,
  SEO_COUNTIES,
  SEO_CITIES_BY_COUNTY,
  SEO_PROBLEMS,
  SEO_SERVICES,
  buildServiceLocationSlug,
  findCityBySlug,
  findCountyBySlug,
  findProblemBySlug,
  findServiceBySlug,
  getCitySlug
} from '../data/seoLeadData'
import { titleCase } from '../utils/slug'
import { useSeo } from '../utils/useSeo'
import '../styles/seo-leads.css'

function safeOrigin() {
  if (typeof window === 'undefined') return 'https://topspeedappliance.com'
  return window.location.origin
}

function buildBreadcrumb({ origin, label, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${origin}/`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: label,
        item: `${origin}${path}`
      }
    ]
  }
}

function buildServiceSchema({ origin, canonicalPath, service, areaName, areaType }) {
  const areaServed = areaType === 'county'
    ? {
        '@type': 'AdministrativeArea',
        name: areaName,
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'FL',
          addressCountry: 'US'
        }
      }
    : {
        '@type': 'City',
        name: areaName,
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'FL',
          addressCountry: 'US'
        }
      }

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${origin}${canonicalPath}#service`,
    name: `${service.name} in ${areaName}`,
    serviceType: service.name,
    areaServed,
    provider: {
      '@type': 'LocalBusiness',
      name: BOOKING_CONFIG.BUSINESS_NAME,
      telephone: BOOKING_CONFIG.PHONE_NUMBER,
      url: origin
    },
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: BOOKING_CONFIG.BOOKING_URL,
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform'
        ]
      }
    }
  }
}

function buildFaqSchema({ origin, canonicalPath, problem }) {
  const questions = [
    {
      name: `Do you offer same-day help for ${problem.title.toLowerCase()}?`,
      text: 'Yes. Top Speed Appliance offers fast scheduling across South Florida and can often provide same-day service depending on availability.'
    },
    {
      name: `Is ${problem.title.toLowerCase()} dangerous?`,
      text: 'Some appliance problems can be unsafe (overheating, electrical faults, water leaks). If you smell burning, see sparks, or have active leaks, turn the appliance off and call for service.'
    },
    {
      name: 'What areas do you service?',
      text: 'We serve Broward, Palm Beach, and Miami-Dade County including major cities like Fort Lauderdale, Boca Raton, West Palm Beach, and Miami.'
    }
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${origin}${canonicalPath}#faq`,
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.name,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.text
      }
    }))
  }
}

function parseServiceLocationSlug(seoSlug) {
  const services = [...SEO_SERVICES].sort((a, b) => b.slug.length - a.slug.length)

  for (const service of services) {
    if (seoSlug === service.slug) {
      return { service, locationType: 'none', locationSlug: null }
    }

    if (seoSlug.startsWith(`${service.slug}-`)) {
      const locationSlug = seoSlug.slice(service.slug.length + 1)
      if (!locationSlug) continue

      const county = findCountyBySlug(locationSlug)
      if (county) {
        return { service, locationType: 'county', locationSlug, locationName: county.name }
      }

      const cityName = findCityBySlug(locationSlug)
      if (cityName) {
        return { service, locationType: 'city', locationSlug, locationName: cityName }
      }
    }
  }

  return null
}

function cityCountyName(cityName) {
  const citySlug = getCitySlug(cityName)
  for (const county of SEO_COUNTIES) {
    const cities = SEO_CITIES_BY_COUNTY[county.slug] || []
    if (cities.some(city => getCitySlug(city) === citySlug)) {
      return county.name
    }
  }
  return 'South Florida'
}

function buildRelatedCityLinks(cityName, serviceSlug) {
  const slug = getCitySlug(cityName)
  return SEO_SERVICES.map(service => ({
    label: service.name,
    to: `/${buildServiceLocationSlug(service.slug, slug)}`,
    active: service.slug === serviceSlug
  }))
}

export default function SeoLandingPage() {
  const { seoSlug } = useParams()
  const origin = safeOrigin()
  const canonicalPath = `/${seoSlug}`

  const pageModel = useMemo(() => {
    const problem = findProblemBySlug(seoSlug)
    if (problem) return { type: 'problem', problem }

    const county = findCountyBySlug(seoSlug)
    if (county) return { type: 'county', county }

    const cityName = findCityBySlug(seoSlug)
    if (cityName) return { type: 'city', cityName }

    const parsed = parseServiceLocationSlug(seoSlug)
    if (parsed && parsed.service && parsed.locationType !== 'none') {
      return { type: 'service-location', ...parsed }
    }

    if (parsed && parsed.service && parsed.locationType === 'none') {
      return { type: 'service', service: parsed.service }
    }

    return { type: 'not-found' }
  }, [seoSlug])

  const seo = useMemo(() => {
    if (pageModel.type === 'problem') {
      const { problem } = pageModel
      const title = `${problem.title} | Same-Day Appliance Repair | Top Speed Appliance`
      const description = `${problem.summary} Top Speed Appliance offers same-day appliance repair across Broward, Palm Beach, and Miami-Dade. Call ${BOOKING_CONFIG.PHONE_NUMBER}.`

      return {
        title,
        description,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            buildBreadcrumb({ origin, label: problem.title, path: canonicalPath }),
            buildServiceSchema({
              origin,
              canonicalPath,
              service: findServiceBySlug(problem.relatedServiceSlug) || { name: 'Appliance Repair' },
              areaName: 'South Florida',
              areaType: 'region'
            }),
            buildFaqSchema({ origin, canonicalPath, problem })
          ]
        }
      }
    }

    if (pageModel.type === 'county') {
      const title = `Appliance Repair in ${pageModel.county.name} | Top Speed Appliance`
      const description = `Need appliance repair in ${pageModel.county.name}? Same-day service available. Book online or call ${BOOKING_CONFIG.PHONE_NUMBER} for fast help.`

      return {
        title,
        description,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            buildBreadcrumb({ origin, label: pageModel.county.name, path: canonicalPath }),
            {
              '@type': 'CollectionPage',
              '@id': `${origin}${canonicalPath}`,
              url: `${origin}${canonicalPath}`,
              name: title,
              description
            }
          ]
        }
      }
    }

    if (pageModel.type === 'city') {
      const countyName = cityCountyName(pageModel.cityName)
      const title = `Appliance Repair in ${pageModel.cityName} FL | Top Speed Appliance`
      const description = `Looking for appliance repair in ${pageModel.cityName}? We serve ${countyName} with same-day appointments. Call ${BOOKING_CONFIG.PHONE_NUMBER} or book online.`

      return {
        title,
        description,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            buildBreadcrumb({ origin, label: pageModel.cityName, path: canonicalPath }),
            {
              '@type': 'WebPage',
              '@id': `${origin}${canonicalPath}`,
              url: `${origin}${canonicalPath}`,
              name: title,
              description
            }
          ]
        }
      }
    }

    if (pageModel.type === 'service-location') {
      const { service, locationName, locationType } = pageModel
      const areaLabel = locationType === 'county' ? locationName : `${locationName} FL`
      const title = `${service.name} in ${areaLabel} | Same-Day Service`
      const description = `${service.short} Serving ${areaLabel}. Call ${BOOKING_CONFIG.PHONE_NUMBER} or book online with Top Speed Appliance.`

      return {
        title,
        description,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            buildBreadcrumb({ origin, label: `${service.name} in ${areaLabel}`, path: canonicalPath }),
            buildServiceSchema({
              origin,
              canonicalPath,
              service,
              areaName: locationName,
              areaType: locationType
            })
          ]
        }
      }
    }

    if (pageModel.type === 'service') {
      const title = `${pageModel.service.name} Near Me | Top Speed Appliance`
      const description = `${pageModel.service.short} Serving Broward, Palm Beach, and Miami-Dade. Call ${BOOKING_CONFIG.PHONE_NUMBER} or book online.`

      return {
        title,
        description,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            buildBreadcrumb({ origin, label: pageModel.service.name, path: canonicalPath }),
            buildServiceSchema({
              origin,
              canonicalPath,
              service: pageModel.service,
              areaName: 'South Florida',
              areaType: 'region'
            })
          ]
        }
      }
    }

    const title = 'Page Not Found | Top Speed Appliance'
    const description = `We could not find this page. For service, call ${BOOKING_CONFIG.PHONE_NUMBER} or book online.`

    return {
      title,
      description,
      schema: buildBreadcrumb({ origin, label: 'Not Found', path: canonicalPath })
    }
  }, [pageModel, origin, canonicalPath])

  useSeo({
    title: seo.title,
    description: seo.description,
    canonicalPath,
    ogImage: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2F5b2cddc584514ebd90bab47dfa9fab6c?format=webp&width=1200',
    schema: seo.schema
  })

  if (pageModel.type === 'not-found') {
    return (
      <main className="seo-landing-page">
        <section className="seo-landing-header">
          <h1 className="seo-landing-title">Page Not Found</h1>
          <p className="seo-landing-subtitle">The page you are looking for does not exist.</p>
          <div className="seo-landing-actions">
            <Link className="cta-button" to="/service-areas">Service Areas</Link>
            <Link className="cta-button" to="/">Back to Home</Link>
          </div>
        </section>
      </main>
    )
  }

  const leadContext = (() => {
    if (pageModel.type === 'problem') return pageModel.problem.title
    if (pageModel.type === 'county') return pageModel.county.name
    if (pageModel.type === 'city') return pageModel.cityName
    if (pageModel.type === 'service-location') return `${pageModel.service.name} - ${pageModel.locationName}`
    if (pageModel.type === 'service') return pageModel.service.name
    return 'Website'
  })()

  const leadDefaultIssue = (() => {
    if (pageModel.type === 'problem') return pageModel.problem.title
    if (pageModel.type === 'service-location') return `${pageModel.service.name} in ${pageModel.locationName}`
    if (pageModel.type === 'service') return pageModel.service.name
    return ''
  })()

  const serviceLocationLinks = pageModel.type === 'service-location' && pageModel.locationType === 'city'
    ? buildRelatedCityLinks(pageModel.locationName, pageModel.service.slug)
    : null

  const countyCityLinks = pageModel.type === 'county'
    ? (SEO_CITIES_BY_COUNTY[pageModel.county.slug] || []).map(city => ({
        city,
        citySlug: getCitySlug(city)
      }))
    : null

  const pageHeading = (() => {
    if (pageModel.type === 'problem') return pageModel.problem.title
    if (pageModel.type === 'county') return `Appliance Repair in ${pageModel.county.name}`
    if (pageModel.type === 'city') return `Appliance Repair in ${pageModel.cityName}`
    if (pageModel.type === 'service-location') return `${pageModel.service.name} in ${pageModel.locationName}`
    if (pageModel.type === 'service') return `${pageModel.service.name} Near Me`
    return titleCase(seoSlug)
  })()

  const pageIntro = (() => {
    if (pageModel.type === 'problem') return pageModel.problem.summary
    if (pageModel.type === 'service-location') return pageModel.service.short
    if (pageModel.type === 'service') return pageModel.service.short
    return 'Top Speed Appliance provides fast, reliable service with same-day availability.'
  })()

  return (
    <main className="seo-landing-page">
      <section className="seo-landing-header">
        <div className="seo-landing-breadcrumb">
          <Link to="/">Home</Link>
          <span className="seo-landing-breadcrumb-sep">/</span>
          <Link to="/service-areas">Service Areas</Link>
        </div>

        <h1 className="seo-landing-title">{pageHeading}</h1>
        <p className="seo-landing-subtitle">{pageIntro}</p>

        <div className="seo-landing-actions">
          <a className="cta-button primary-btn" href={BOOKING_CONFIG.BOOKING_URL} target="_blank" rel="noopener noreferrer">Book Online</a>
          <a className="cta-button secondary-btn" href={BOOKING_CONFIG.PHONE_LINK}>Call {BOOKING_CONFIG.PHONE_NUMBER}</a>
          <Link className="cta-button secondary-btn" to="/qr">QR Page</Link>
        </div>
      </section>

      <section className="seo-landing-body">
        <div className="seo-landing-grid">
          <article className="seo-landing-panel">
            <h2 className="seo-landing-panel-title">What to Expect</h2>
            <p className="seo-landing-text">
              Top Speed Appliance serves Broward, Palm Beach, and Miami-Dade County with fast scheduling, clear communication, and professional repair.
              We work on major brands including {SEO_BRANDS.slice(0, 5).join(', ')} and more.
            </p>

            {pageModel.type === 'problem' && (
              <div className="seo-landing-section">
                <h3 className="seo-landing-section-title">Common Causes</h3>
                <ul className="seo-landing-list">
                  <li>Worn or failed components</li>
                  <li>Electrical or sensor issues</li>
                  <li>Airflow or ventilation problems</li>
                  <li>Normal wear and tear</li>
                </ul>

                <h3 className="seo-landing-section-title">Next Steps</h3>
                <p className="seo-landing-text">
                  If the problem persists, a professional diagnosis is the safest way to prevent further damage and reduce downtime.
                </p>
              </div>
            )}

            {pageModel.type === 'county' && countyCityLinks && (
              <div className="seo-landing-section">
                <h3 className="seo-landing-section-title">Cities in {pageModel.county.name}</h3>
                <div className="seo-landing-link-grid">
                  {countyCityLinks.map(item => (
                    <Link key={item.citySlug} className="seo-landing-link" to={`/${buildServiceLocationSlug('appliance-repair', item.citySlug)}`}>
                      Appliance Repair in {item.city}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {pageModel.type === 'city' && (
              <div className="seo-landing-section">
                <h3 className="seo-landing-section-title">Services Available</h3>
                <div className="seo-landing-link-grid">
                  {SEO_SERVICES.map(service => (
                    <Link key={service.slug} className="seo-landing-link" to={`/${buildServiceLocationSlug(service.slug, seoSlug)}`}>
                      {service.name} in {pageModel.cityName}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {pageModel.type === 'service-location' && serviceLocationLinks && (
              <div className="seo-landing-section">
                <h3 className="seo-landing-section-title">More Services in {pageModel.locationName}</h3>
                <div className="seo-landing-link-grid">
                  {serviceLocationLinks.map(link => (
                    <Link
                      key={link.to}
                      className={`seo-landing-link ${link.active ? 'active' : ''}`}
                      to={link.to}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="seo-landing-section">
              <h3 className="seo-landing-section-title">Popular Problem Searches</h3>
              <div className="seo-landing-link-grid">
                {SEO_PROBLEMS.map(problem => (
                  <Link key={problem.slug} className="seo-landing-link" to={`/${problem.slug}`}>
                    {problem.title}
                  </Link>
                ))}
              </div>
            </div>
          </article>

          <SeoLeadCaptureForm source="seo" contextLabel={leadContext} defaultIssue={leadDefaultIssue} />
        </div>
      </section>

      <section className="seo-landing-footer">
        <div className="seo-landing-footer-inner">
          <h2 className="seo-landing-footer-title">Ready to Schedule?</h2>
          <p className="seo-landing-footer-text">Book online or call now for same-day availability.</p>
          <div className="seo-landing-actions">
            <a className="cta-button primary-btn" href={BOOKING_CONFIG.BOOKING_URL} target="_blank" rel="noopener noreferrer">Book Online</a>
            <a className="cta-button secondary-btn" href={BOOKING_CONFIG.PHONE_LINK}>Call {BOOKING_CONFIG.PHONE_NUMBER}</a>
            <Link className="cta-button secondary-btn" to="/service-request">Service Request Form</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
