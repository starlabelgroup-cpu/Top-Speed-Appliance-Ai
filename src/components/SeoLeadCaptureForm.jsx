import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BOOKING_CONFIG } from '../config/bookingConfig'
import { leadsDatabase } from '../services/leadsDatabase'
import { storageGetItem, storageGetJson, storageSetItem, storageSetJson } from '../utils/storage'
import {
  APPLIANCES,
  SERVICE_CITIES,
  attributionParams,
  bookGuest,
  buildViaTag,
} from '../lib/serviceOs'
import '../styles/seo-leads.css'

function formatPhone(value) {
  const digits = String(value || '').replace(/\D/g, '').slice(0, 10)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

function validateEmail(value) {
  if (!value) return true
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

// Same appliance options as the main Smart Booking form: the nine
// canonical Service OS appliances plus the site's extra options.
const APPLIANCE_OPTIONS = [...APPLIANCES, 'HVAC', 'Water Heater', 'Other']

/**
 * Lead capture on the SEO landing / service-area pages.
 *
 * Phase 4: this form now books for real into the Top Speed Service OS
 * (POST /speedy/book, source FLAGSHIP_NET) — the same guest pipeline as
 * the Smart Booking form — with the visitor's campaign attribution in
 * the booking's [via: …] tag. The Supabase lead record stays as the
 * secondary mirror, exactly like the main form. Before Phase 4 the
 * form only saved to localStorage and opened a mailto: draft.
 */
export default function SeoLeadCaptureForm({ source, contextLabel, defaultIssue, defaultCity = '', defaultAppliance = '' }) {
  const [formData, setFormData] = useState(() => ({
    name: storageGetItem('customerName', ''),
    phone: formatPhone(storageGetItem('customerPhone', '')),
    email: storageGetItem('customerEmail', ''),
    city: defaultCity || '',
    zip: '',
    appliance: defaultAppliance || '',
    issue: defaultIssue || ''
  }))

  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [bookingRef, setBookingRef] = useState('')

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

    if (formData.name.trim().length < 2) next.name = 'Name is required'

    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (phoneDigits.length !== 10) next.phone = 'Enter a valid 10-digit phone number'

    if (!validateEmail(formData.email)) next.email = 'Enter a valid email'

    if (!formData.city) next.city = 'Select your city'

    if (!/^\d{5}$/.test(formData.zip.trim())) next.zip = 'Enter your 5-digit ZIP code'

    if (!formData.appliance) next.appliance = 'Select the appliance'

    if (!formData.issue.trim()) next.issue = 'Describe the issue'

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate() || submitting) return

    setSubmitError('')
    setSubmitting(true)

    storageSetItem('customerName', formData.name)
    storageSetItem('customerPhone', formData.phone)
    storageSetItem('customerEmail', formData.email)

    const params = attributionParams()
    const via = buildViaTag(params)
    const issueText = [
      contextLabel ? `Context: ${contextLabel}` : null,
      formData.issue.trim(),
    ].filter(Boolean).join('\n')
    const issue = via ? `${issueText} [via: ${via}]` : issueText

    // Primary path: book into the Top Speed Service OS — the booking
    // lands in the Service Setters queue in Book OS with a real
    // reference the customer can track.
    let booking
    try {
      booking = await bookGuest({
        customer: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || undefined,
        },
        city: formData.city,
        zip: formData.zip.trim(),
        appliance: formData.appliance,
        issue,
        source: 'FLAGSHIP_NET'
      })
    } catch (err) {
      setSubmitting(false)
      if (err.status === 422) {
        // Outside the service area — show the API's message plainly.
        setSubmitError(
          err.serviceCities?.length
            ? `${err.message}. We currently serve: ${err.serviceCities.join(', ')}.`
            : err.message
        )
      } else {
        setSubmitError(`${err.message || 'We could not send your request.'} Please call (954) 931-7997 to book.`)
      }
      return
    }

    // Secondary mirrors: keep the local record and the Supabase lead
    // record as before — the Service OS booking above is the real one.
    const lead = {
      id: `LS-${Date.now().toString(36).toUpperCase()}`,
      source: source || 'seo',
      context: contextLabel || null,
      createdAt: new Date().toISOString(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      zip: formData.zip,
      appliance: formData.appliance,
      issue: formData.issue,
      bookingReference: booking.referenceCode
    }
    const existing = storageGetJson('seo_leads', [])
    const existingList = Array.isArray(existing) ? existing : []
    storageSetJson('seo_leads', [lead, ...existingList].slice(0, 200))

    try {
      await leadsDatabase.createLead({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        service_type: formData.appliance || contextLabel || 'Website Lead',
        issue_description: issueText,
        lead_source: params.get('src') || source || 'seo',
        campaign_id: params.get('campaignid') || params.get('campaign_id') || null,
        keyword: params.get('keyword') || contextLabel || null
      })
    } catch {
      // Non-critical: the Service OS booking above is the real record.
    }

    setSubmitting(false)
    setBookingRef(booking.referenceCode)
  }

  return (
    <div className="seo-lead-form-card">
      <h2 className="seo-lead-form-title">Request Service</h2>
      <p className="seo-lead-form-subtitle">Send your details and we will follow up fast.</p>

      {bookingRef ? (
        <div className="seo-lead-form-success" role="status">
          <div className="seo-lead-form-success-badge"><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="M8 12.4l2.8 2.8L16.4 9.4" stroke="#E8322E"/></svg> Booked</div>
          <p className="seo-lead-form-success-text">
            Your request is booked into our dispatch queue. A Service Setter will confirm your
            appointment shortly — save your booking reference:
          </p>
          <p className="seo-lead-form-lead-id">Booking reference: <strong>{bookingRef}</strong></p>
          <div className="seo-lead-form-success-actions">
            <Link
              className="cta-button"
              to={`/track?ref=${encodeURIComponent(bookingRef)}&phone=${encodeURIComponent(formData.phone)}`}
            >
              Track My Tech
            </Link>
            <a className="cta-button" href={BOOKING_CONFIG.PHONE_LINK}>Call {BOOKING_CONFIG.PHONE_NUMBER}</a>
          </div>
        </div>
      ) : (
        <form className="seo-lead-form" onSubmit={handleSubmit}>
          {submitError && (
            <div className="seo-lead-form-error" role="alert" style={{ marginBottom: 12 }}>
              {submitError}
            </div>
          )}

          <label className="seo-lead-form-label">
            Full Name
            <input
              className={`seo-lead-form-input ${errors.name ? 'has-error' : ''}`}
              value={formData.name}
              onChange={(e) => setField('name', e.target.value)}
              autoComplete="name"
              required
            />
            {errors.name && <span className="seo-lead-form-error">{errors.name}</span>}
          </label>

          <label className="seo-lead-form-label">
            Phone
            <input
              className={`seo-lead-form-input ${errors.phone ? 'has-error' : ''}`}
              value={formData.phone}
              onChange={(e) => setField('phone', formatPhone(e.target.value))}
              inputMode="tel"
              autoComplete="tel"
              required
            />
            {errors.phone && <span className="seo-lead-form-error">{errors.phone}</span>}
          </label>

          <label className="seo-lead-form-label">
            Email (optional)
            <input
              className={`seo-lead-form-input ${errors.email ? 'has-error' : ''}`}
              value={formData.email}
              onChange={(e) => setField('email', e.target.value)}
              inputMode="email"
              autoComplete="email"
            />
            {errors.email && <span className="seo-lead-form-error">{errors.email}</span>}
          </label>

          <label className="seo-lead-form-label">
            City
            <select
              className={`seo-lead-form-input ${errors.city ? 'has-error' : ''}`}
              value={formData.city}
              onChange={(e) => setField('city', e.target.value)}
              autoComplete="address-level2"
              required
            >
              <option value="">Select your city…</option>
              {SERVICE_CITIES.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {errors.city && <span className="seo-lead-form-error">{errors.city}</span>}
          </label>

          <label className="seo-lead-form-label">
            ZIP Code
            <input
              className={`seo-lead-form-input ${errors.zip ? 'has-error' : ''}`}
              value={formData.zip}
              onChange={(e) => setField('zip', e.target.value.replace(/\D/g, '').slice(0, 5))}
              inputMode="numeric"
              autoComplete="postal-code"
              placeholder="e.g., 33313"
              required
            />
            {errors.zip && <span className="seo-lead-form-error">{errors.zip}</span>}
          </label>

          <label className="seo-lead-form-label">
            Appliance
            <select
              className={`seo-lead-form-input ${errors.appliance ? 'has-error' : ''}`}
              value={formData.appliance}
              onChange={(e) => setField('appliance', e.target.value)}
              required
            >
              <option value="">Select the appliance…</option>
              {APPLIANCE_OPTIONS.map((appliance) => (
                <option key={appliance} value={appliance}>{appliance}</option>
              ))}
            </select>
            {errors.appliance && <span className="seo-lead-form-error">{errors.appliance}</span>}
          </label>

          <label className="seo-lead-form-label">
            What is going on?
            <textarea
              className={`seo-lead-form-textarea ${errors.issue ? 'has-error' : ''}`}
              value={formData.issue}
              onChange={(e) => setField('issue', e.target.value)}
              rows={4}
              required
            />
            {errors.issue && <span className="seo-lead-form-error">{errors.issue}</span>}
          </label>

          <button type="submit" className="seo-lead-form-submit" disabled={submitting}>
            {submitting ? 'Sending…' : 'Send Request'}
          </button>
        </form>
      )}
    </div>
  )
}
