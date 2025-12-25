import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BOOKING_CONFIG } from '../config/bookingConfig'
import { storageGetItem, storageGetJson, storageSetItem, storageSetJson } from '../utils/storage'
import '../styles/qr-lead.css'

function formatPhone(value) {
  const digits = String(value || '').replace(/\D/g, '').slice(0, 10)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

function safeOrigin() {
  if (typeof window === 'undefined') return 'https://topspeedappliance.com'
  return window.location.origin
}

function buildQrImageUrl(data, size = 320) {
  const encoded = encodeURIComponent(data)
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}&margin=10`
}

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

export default function QrLeadPage() {
  const query = useQuery()
  const initialTarget = query.get('target') === 'booking' ? 'booking' : 'service-request'
  const [qrTarget, setQrTarget] = useState(initialTarget)

  const [formData, setFormData] = useState(() => ({
    name: storageGetItem('customerName', ''),
    phone: formatPhone(storageGetItem('customerPhone', '')),
    email: storageGetItem('customerEmail', ''),
    appliance: '',
    issue: '',
    zip: '',
    preferredContact: 'text',
    consent: false
  }))

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [leadId, setLeadId] = useState(null)

  const origin = safeOrigin()
  const serviceRequestUrl = `${origin}/service-request?src=qr`
  const bookingUrl = `${BOOKING_CONFIG.BOOKING_URL}&source=qr`
  const landingUrl = qrTarget === 'booking' ? bookingUrl : serviceRequestUrl

  const qrImageUrl = useMemo(() => buildQrImageUrl(landingUrl, 360), [landingUrl])

  useEffect(() => {
    document.title = 'QR Service Request | Top Speed Appliance'

    const metaName = 'description'
    const content = 'Scan the QR code to book appliance repair, request service, or claim Top Speed Appliance offers in South Florida.'

    let meta = document.head.querySelector(`meta[name="${metaName}"]`)
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', metaName)
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', content)

    const canonicalHref = `${origin}/qr`
    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalHref)

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': canonicalHref,
      url: canonicalHref,
      name: 'Top Speed Appliance QR Lead Generator',
      description: content,
      isPartOf: {
        '@type': 'WebSite',
        name: BOOKING_CONFIG.BUSINESS_NAME,
        url: origin
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: qrImageUrl,
        caption: 'QR code for booking appliance repair with Top Speed Appliance'
      },
      potentialAction: {
        '@type': 'ReserveAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: landingUrl,
          actionPlatform: [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform'
          ]
        },
        result: {
          '@type': 'Reservation',
          name: 'Book Appliance Repair Service'
        }
      }
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script)
    }
  }, [origin, landingUrl, qrImageUrl])

  const setField = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors(prev => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  const validate = () => {
    const next = {}
    if (!formData.name.trim()) next.name = 'Name is required'

    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (phoneDigits.length !== 10) next.phone = 'Enter a valid 10-digit phone number'

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = 'Enter a valid email'
    }

    if (!formData.appliance.trim()) next.appliance = 'Select an appliance'
    if (!formData.issue.trim()) next.issue = 'Describe the issue'
    if (!formData.zip.trim()) next.zip = 'ZIP is required'
    if (!formData.consent) next.consent = 'Consent is required'

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const id = `TS-${Date.now().toString(36).toUpperCase()}`
    setLeadId(id)

    storageSetItem('customerName', formData.name)
    storageSetItem('customerPhone', formData.phone)
    storageSetItem('customerEmail', formData.email)

    const existing = storageGetJson('qr_leads', [])
    const existingList = Array.isArray(existing) ? existing : []
    const lead = {
      id,
      source: 'qr',
      createdAt: new Date().toISOString(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      appliance: formData.appliance,
      issue: formData.issue,
      zip: formData.zip,
      preferredContact: formData.preferredContact
    }

    storageSetJson('qr_leads', [lead, ...existingList].slice(0, 200))

    const subject = encodeURIComponent(`New QR Lead (${id}) - ${formData.appliance}`)
    const body = encodeURIComponent(
      [
        `Lead ID: ${id}`,
        `Source: QR`,
        `Name: ${formData.name}`,
        `Phone: ${formData.phone}`,
        `Email: ${formData.email || 'N/A'}`,
        `Appliance: ${formData.appliance}`,
        `Issue: ${formData.issue}`,
        `ZIP: ${formData.zip}`,
        `Preferred Contact: ${formData.preferredContact}`,
        `Link: ${landingUrl}`
      ].join('\n')
    )

    const supportEmail = 'service@topspeedappliance.net'
    window.open(`mailto:${supportEmail}?subject=${subject}&body=${body}`)

    setSubmitted(true)
  }

  return (
    <div className="qr-lead-page">
      <div className="qr-lead-container">
        <div className="qr-lead-back">
          <Link to="/" className="qr-lead-back-link">← Back to Home</Link>
        </div>

        <header className="qr-lead-hero">
          <div className="qr-lead-hero-badge">🏁 QR Service Access</div>
          <h1 className="qr-lead-title">Top Speed Appliance QR Lead Generator</h1>
          <p className="qr-lead-subtitle">Scan the QR to book service, request repair, or save our contact info in seconds.</p>

          <div className="qr-lead-actions">
            <a className="qr-lead-primary-cta" href={BOOKING_CONFIG.BOOKING_URL} target="_blank" rel="noopener noreferrer">Book Now</a>
            <a className="qr-lead-secondary-cta" href={BOOKING_CONFIG.PHONE_LINK}>Call {BOOKING_CONFIG.PHONE_NUMBER}</a>
          </div>
        </header>

        <section className="qr-lead-grid">
          <div className="qr-lead-card">
            <h2 className="qr-lead-card-title">QR Code</h2>
            <p className="qr-lead-card-text">Choose what the QR should open, then download or share it.</p>

            <div className="qr-lead-toggle">
              <button
                type="button"
                className={`qr-lead-toggle-btn ${qrTarget === 'service-request' ? 'active' : ''}`}
                onClick={() => setQrTarget('service-request')}
              >
                Service Request Page
              </button>
              <button
                type="button"
                className={`qr-lead-toggle-btn ${qrTarget === 'booking' ? 'active' : ''}`}
                onClick={() => setQrTarget('booking')}
              >
                Booking Page
              </button>
            </div>

            <div className="qr-lead-qr-wrap">
              <img className="qr-lead-qr" src={qrImageUrl} alt="Top Speed Appliance booking QR code" loading="eager" />
              <div className="qr-lead-qr-links">
                <a className="qr-lead-link" href={landingUrl} target="_blank" rel="noopener noreferrer">Open destination</a>
                <a className="qr-lead-link" href={qrImageUrl} target="_blank" rel="noopener noreferrer">Open QR image</a>
                <a className="qr-lead-link" href={qrImageUrl} download>Download QR</a>
              </div>
            </div>

            <div className="qr-lead-destination">
              <div className="qr-lead-destination-label">Destination URL</div>
              <div className="qr-lead-destination-value">{landingUrl}</div>
            </div>
          </div>

          <div className="qr-lead-card">
            <h2 className="qr-lead-card-title">Quick Lead Form</h2>
            <p className="qr-lead-card-text">Customers can submit details fast. We save it locally and open an email draft for your team.</p>

            {submitted ? (
              <div className="qr-lead-success">
                <div className="qr-lead-success-title">Lead captured!</div>
                <div className="qr-lead-success-text">Reference: <strong>{leadId}</strong></div>
                <div className="qr-lead-success-actions">
                  <Link className="qr-lead-link" to="/service-request">Continue to full Service Request</Link>
                  <button
                    type="button"
                    className="qr-lead-toggle-btn"
                    onClick={() => {
                      setSubmitted(false)
                      setLeadId(null)
                      setFormData(prev => ({ ...prev, appliance: '', issue: '', zip: '', consent: false }))
                    }}
                  >
                    Capture another lead
                  </button>
                </div>
              </div>
            ) : (
              <form className="qr-lead-form" onSubmit={handleSubmit}>
                <div className="qr-lead-field">
                  <label className="qr-lead-label" htmlFor="qr-name">Name</label>
                  <input
                    id="qr-name"
                    className={`qr-lead-input ${errors.name ? 'has-error' : ''}`}
                    value={formData.name}
                    onChange={(e) => setField('name', e.target.value)}
                    placeholder="Customer name"
                    autoComplete="name"
                  />
                  {errors.name && <div className="qr-lead-error">{errors.name}</div>}
                </div>

                <div className="qr-lead-field">
                  <label className="qr-lead-label" htmlFor="qr-phone">Phone</label>
                  <input
                    id="qr-phone"
                    className={`qr-lead-input ${errors.phone ? 'has-error' : ''}`}
                    value={formData.phone}
                    onChange={(e) => setField('phone', formatPhone(e.target.value))}
                    placeholder="(954) 555-1234"
                    autoComplete="tel"
                  />
                  {errors.phone && <div className="qr-lead-error">{errors.phone}</div>}
                </div>

                <div className="qr-lead-field">
                  <label className="qr-lead-label" htmlFor="qr-email">Email (optional)</label>
                  <input
                    id="qr-email"
                    className={`qr-lead-input ${errors.email ? 'has-error' : ''}`}
                    value={formData.email}
                    onChange={(e) => setField('email', e.target.value)}
                    placeholder="name@email.com"
                    autoComplete="email"
                  />
                  {errors.email && <div className="qr-lead-error">{errors.email}</div>}
                </div>

                <div className="qr-lead-two-col">
                  <div className="qr-lead-field">
                    <label className="qr-lead-label" htmlFor="qr-appliance">Appliance</label>
                    <select
                      id="qr-appliance"
                      className={`qr-lead-input ${errors.appliance ? 'has-error' : ''}`}
                      value={formData.appliance}
                      onChange={(e) => setField('appliance', e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Refrigerator">Refrigerator</option>
                      <option value="Washer">Washer</option>
                      <option value="Dryer">Dryer</option>
                      <option value="Oven/Range">Oven/Range</option>
                      <option value="Dishwasher">Dishwasher</option>
                      <option value="Microwave">Microwave</option>
                      <option value="HVAC">HVAC</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.appliance && <div className="qr-lead-error">{errors.appliance}</div>}
                  </div>

                  <div className="qr-lead-field">
                    <label className="qr-lead-label" htmlFor="qr-zip">ZIP</label>
                    <input
                      id="qr-zip"
                      className={`qr-lead-input ${errors.zip ? 'has-error' : ''}`}
                      value={formData.zip}
                      onChange={(e) => setField('zip', e.target.value.replace(/\D/g, '').slice(0, 5))}
                      placeholder="33351"
                      inputMode="numeric"
                    />
                    {errors.zip && <div className="qr-lead-error">{errors.zip}</div>}
                  </div>
                </div>

                <div className="qr-lead-field">
                  <label className="qr-lead-label" htmlFor="qr-issue">Issue</label>
                  <textarea
                    id="qr-issue"
                    className={`qr-lead-textarea ${errors.issue ? 'has-error' : ''}`}
                    value={formData.issue}
                    onChange={(e) => setField('issue', e.target.value)}
                    placeholder="Example: Not cooling, loud noise, leaking water..."
                    rows={4}
                  />
                  {errors.issue && <div className="qr-lead-error">{errors.issue}</div>}
                </div>

                <div className="qr-lead-two-col">
                  <div className="qr-lead-field">
                    <label className="qr-lead-label" htmlFor="qr-preferred">Preferred contact</label>
                    <select
                      id="qr-preferred"
                      className="qr-lead-input"
                      value={formData.preferredContact}
                      onChange={(e) => setField('preferredContact', e.target.value)}
                    >
                      <option value="text">Text</option>
                      <option value="call">Call</option>
                      <option value="email">Email</option>
                    </select>
                  </div>

                  <div className="qr-lead-field qr-lead-consent">
                    <label className="qr-lead-check">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => setField('consent', e.target.checked)}
                      />
                      <span>I agree to be contacted about service</span>
                    </label>
                    {errors.consent && <div className="qr-lead-error">{errors.consent}</div>}
                  </div>
                </div>

                <button className="qr-lead-submit" type="submit">Submit Lead</button>
              </form>
            )}
          </div>
        </section>

        <section className="qr-lead-footer">
          <h2 className="qr-lead-footer-title">For Search Engines & Sharing</h2>
          <p className="qr-lead-footer-text">This page includes structured data (schema.org) so search engines understand it as a booking/lead page.</p>
          <div className="qr-lead-footer-links">
            <a className="qr-lead-link" href="https://g.page/r/CcII31xB8cIPEBM/review" target="_blank" rel="noopener noreferrer">Leave a Google Review</a>
            <a className="qr-lead-link" href="https://share.google/HzHi48xJlsGcjDJkS" target="_blank" rel="noopener noreferrer">Share on Google</a>
          </div>
        </section>
      </div>
    </div>
  )
}
