import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SERVICE_OS_API_BASE, openSpeedy } from '../lib/serviceOs'
import { BOOKING_CONFIG } from '../config/bookingConfig'
import ServiceBookButton from '../components/ServiceBookButton'
import { useSeo } from '../utils/useSeo'
import '../styles/marketing-os-page.css'

/**
 * Marketing OS landing pages (Page Studio) rendered at their canonical
 * .net paths: /service-areas/:city/, /services/:service/ and
 * /services/:service/:symptom/.
 *
 * Content is owned by the Marketing OS in the Service OS — this page
 * fetches the PUBLISHED page for the current path from
 * GET /marketing-os/pages/by-url and renders its sections in order.
 * Before this component existed, no route matched these multi-segment
 * paths (the only catch-all is the single-segment /:seoSlug), so React
 * Router rendered nothing between the header and the footer.
 */

const BOOK_SOURCE = 'FLAGSHIP_NET'

function normalizePath(pathname) {
  let p = String(pathname || '/')
  if (!p.startsWith('/')) p = `/${p}`
  if (!p.endsWith('/')) p = `${p}/`
  return p
}

function Paragraphs({ text }) {
  if (!text) return null
  return String(text)
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk, i) => <p key={i}>{chunk}</p>)
}

/** Hero CTA buttons: behavior follows the label the Studio saved. */
function HeroCta({ label, primary }) {
  if (!label) return null
  const text = String(label)
  const lower = text.toLowerCase()
  if (lower.includes('speedy')) {
    return (
      <button type="button" className={primary ? 'mop-btn mop-btn-primary' : 'mop-btn mop-btn-ghost'} onClick={openSpeedy}>
        {text}
      </button>
    )
  }
  if (lower.includes('call')) {
    return (
      <a className={primary ? 'mop-btn mop-btn-primary' : 'mop-btn mop-btn-ghost'} href={BOOKING_CONFIG.PHONE_LINK}>
        {text}
      </a>
    )
  }
  return (
    <ServiceBookButton source={BOOK_SOURCE} className={primary ? 'mop-btn mop-btn-primary' : 'mop-btn mop-btn-ghost'}>
      {text}
    </ServiceBookButton>
  )
}

function bannerForPath(path) {
  if (path.startsWith('/service-areas/')) return { src: '/visuals/visual-cities.webp', mode: 'graphic' }
  const s = path.toLowerCase()
  if (s.includes('refrigerator') || s.includes('fridge')) return { src: '/images/service/refrigerator-service.webp', mode: 'photo' }
  if (s.includes('dishwasher')) return { src: '/images/service/dishwasher-service.webp', mode: 'photo' }
  if (s.includes('oven') || s.includes('range') || s.includes('stove')) return { src: '/images/service/oven-stove-service.webp', mode: 'photo' }
  if (s.includes('washer')) return { src: '/images/service/washer-dryer-service.webp', mode: 'photo' }
  if (s.includes('dryer')) return { src: '/images/service/washer-dryer-stack.webp', mode: 'photo' }
  if (s.includes('microwave')) return { src: '/images/service/microwave-service.webp', mode: 'photo' }
  if (s.includes('freezer') || s.includes('ice-maker') || s.includes('ice maker')) return { src: '/visuals/visual-freezer-ice.jpg', mode: 'graphic' }
  if (s.includes('disposal')) return { src: '/images/service/garbage-disposal-service.webp', mode: 'photo' }
  if (s.includes('installation')) return { src: '/images/service/appliance-installation-service.webp', mode: 'photo' }
  if (s.includes('commercial')) return { src: '/visuals/visual-commercial.jpg', mode: 'graphic' }
  return { src: '/images/service/expert-team-banner.webp', mode: 'photo' }
}

function Section({ section, banner }) {
  const type = section?.type || ''
  const heading = section?.heading || ''
  const body = section?.body || ''

  switch (type) {
    case 'hero':
      return (
        <section className="mop-hero">
          <div className="mop-wrap">
            {heading ? <h1 className="mop-hero-title">{heading}</h1> : null}
            <Paragraphs text={body} />
            <div className="mop-actions">
              <HeroCta label={section.primaryCta} primary />
              <HeroCta label={section.secondaryCta} />
              <HeroCta label={section.tertiaryCta} />
            </div>
            {banner ? (
              <figure className={`ts-poster ${banner.mode === 'graphic' ? 'ts-poster-graphic' : 'ts-poster-photo'}`}>
                <img src={banner.src} alt={heading || 'Top Speed Appliance'} />
              </figure>
            ) : null}
          </div>
        </section>
      )
    case 'intro':
      return (
        <section className="mop-section">
          <div className="mop-wrap">
            {heading ? <h2>{heading}</h2> : null}
            <Paragraphs text={body} />
          </div>
        </section>
      )
    case 'service-terms':
      return (
        <section className="mop-section">
          <div className="mop-wrap">
            <div className="mop-terms">
              {heading ? <h2>{heading}</h2> : null}
              <Paragraphs text={body} />
            </div>
          </div>
        </section>
      )
    case 'faq': {
      const items = Array.isArray(section.items) ? section.items : []
      return (
        <section className="mop-section">
          <div className="mop-wrap">
            {heading ? <h2>{heading}</h2> : null}
            <div className="mop-faq">
              {items.map((item, i) => (
                <div className="mop-faq-item" key={i}>
                  <h3>{item?.q}</h3>
                  <Paragraphs text={item?.a} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }
    case 'cta': {
      const phoneDisplay = section.phone || BOOKING_CONFIG.PHONE_NUMBER
      const phoneHref = `tel:${String(phoneDisplay).replace(/\D/g, '')}`
      return (
        <section className="mop-cta">
          <div className="mop-wrap">
            {heading ? <h2>{heading}</h2> : null}
            <Paragraphs text={body} />
            <div className="mop-actions">
              <ServiceBookButton source={BOOK_SOURCE} className="mop-btn mop-btn-primary">
                Book Service
              </ServiceBookButton>
              <a className="mop-btn mop-btn-ghost" href={phoneHref}>
                Call {phoneDisplay}
              </a>
            </div>
          </div>
        </section>
      )
    }
    default:
      // Unknown section types degrade to a simple text block — never blank.
      if (!heading && !body) return null
      return (
        <section className="mop-section">
          <div className="mop-wrap">
            {heading ? <h2>{heading}</h2> : null}
            <Paragraphs text={body} />
          </div>
        </section>
      )
  }
}

function NotFound() {
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

export default function MarketingOsPage() {
  const { pathname } = useLocation()
  const path = normalizePath(pathname)
  const [state, setState] = useState({ status: 'loading', page: null })

  useEffect(() => {
    let cancelled = false
    setState({ status: 'loading', page: null })
    fetch(`${SERVICE_OS_API_BASE}/marketing-os/pages/by-url?path=${encodeURIComponent(path)}`)
      .then(async (res) => {
        if (res.status === 404) return { notFound: true }
        if (!res.ok) throw new Error(`by-url ${res.status}`)
        const json = await res.json()
        return { page: json?.data || null }
      })
      .then((result) => {
        if (cancelled) return
        if (result.notFound || !result.page) setState({ status: 'not-found', page: null })
        else setState({ status: 'ready', page: result.page })
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error', page: null })
      })
    return () => {
      cancelled = true
    }
  }, [path])

  const page = state.status === 'ready' ? state.page : null

  useSeo({
    title: page?.title || undefined,
    description: page?.metaDescription || undefined,
    canonicalPath: path,
  })

  if (state.status === 'loading') {
    return (
      <main className="mop-page">
        <section className="mop-hero">
          <div className="mop-wrap">
            <p className="mop-loading">Loading…</p>
          </div>
        </section>
      </main>
    )
  }

  if (state.status === 'not-found') return <NotFound />

  if (state.status === 'error' || !page) {
    return (
      <main className="mop-page">
        <section className="mop-hero">
          <div className="mop-wrap">
            <h1 className="mop-hero-title">Top Speed Appliance</h1>
            <p>
              We could not load this page just now — but booking still takes about a minute, and a Service Setter
              confirms every appointment by phone.
            </p>
            <div className="mop-actions">
              <ServiceBookButton source={BOOK_SOURCE} className="mop-btn mop-btn-primary">
                Book Service
              </ServiceBookButton>
              <a className="mop-btn mop-btn-ghost" href={BOOKING_CONFIG.PHONE_LINK}>
                Call {BOOKING_CONFIG.PHONE_NUMBER}
              </a>
            </div>
          </div>
        </section>
      </main>
    )
  }

  const sections = Array.isArray(page.sections) ? page.sections : []
  // Symptom guide articles live at /services/:service/:symptom/ — three
  // path segments under /services/. They get the Speedy symptom-guide
  // scenario illustration in the content area (never in the hero banner).
  const pathParts = path.split('/').filter(Boolean)
  const isSymptomGuide = pathParts[0] === 'services' && pathParts.length === 3

  return (
    <main className="mop-page">
      {sections.map((section, i) => (
        <Section key={i} section={section} banner={section?.type === 'hero' ? bannerForPath(path) : null} />
      ))}
      {isSymptomGuide && (
        <section className="mop-section">
          <div className="mop-wrap">
            <h2>Start with the symptom</h2>
            <p>
              Match what your appliance is doing — the sound, the leak, the code on the display —
              and Speedy helps you check the simple things first, then books a technician if it
              needs hands on it.
            </p>
            <figure style={{ margin: '18px 0 0', maxWidth: 760 }}>
              <img
                src="/visuals/scenario/speedy-symptom-guide.webp"
                alt="Speedy symptom guide — checking an appliance symptom step by step"
                loading="lazy"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 14, border: '1.5px solid #D8E2F2' }}
              />
            </figure>
          </div>
        </section>
      )}
    </main>
  )
}
