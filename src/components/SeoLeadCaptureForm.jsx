import { useMemo, useState } from 'react'
import { BOOKING_CONFIG } from '../config/bookingConfig'
import { leadsDatabase } from '../services/leadsDatabase'
import { storageGetItem, storageGetJson, storageSetItem, storageSetJson } from '../utils/storage'
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

export default function SeoLeadCaptureForm({ source, contextLabel, defaultIssue }) {
  const [formData, setFormData] = useState(() => ({
    name: storageGetItem('customerName', ''),
    phone: formatPhone(storageGetItem('customerPhone', '')),
    email: storageGetItem('customerEmail', ''),
    issue: defaultIssue || ''
  }))

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const leadId = useMemo(() => (submitted ? `LS-${Date.now().toString(36).toUpperCase()}` : null), [submitted])

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

    if (!validateEmail(formData.email)) next.email = 'Enter a valid email'

    if (!formData.issue.trim()) next.issue = 'Describe the issue'

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    storageSetItem('customerName', formData.name)
    storageSetItem('customerPhone', formData.phone)
    storageSetItem('customerEmail', formData.email)

    const id = `LS-${Date.now().toString(36).toUpperCase()}`
    const lead = {
      id,
      source: source || 'seo',
      context: contextLabel || null,
      createdAt: new Date().toISOString(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      issue: formData.issue
    }

    const existing = storageGetJson('seo_leads', [])
    const existingList = Array.isArray(existing) ? existing : []
    storageSetJson('seo_leads', [lead, ...existingList].slice(0, 200))

    try {
      await leadsDatabase.createLead({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        service_type: contextLabel || 'Website Lead',
        issue_description: formData.issue,
        lead_source: source || 'seo',
        keyword: contextLabel || null
      })
    } catch {
      // Non-critical: localStorage + mailto already capture the lead
    }

    const subject = encodeURIComponent(`New Lead (${id}) - ${contextLabel || 'Website'}`)
    const body = encodeURIComponent(
      [
        `Lead ID: ${id}`,
        `Source: ${source || 'seo'}`,
        contextLabel ? `Context: ${contextLabel}` : null,
        `Name: ${formData.name}`,
        `Phone: ${formData.phone}`,
        `Email: ${formData.email || 'N/A'}`,
        `Issue: ${formData.issue}`,
        `Booking Link: ${BOOKING_CONFIG.BOOKING_URL}`
      ].filter(Boolean).join('\n')
    )

    window.open(`mailto:service@topspeedappliance.net?subject=${subject}&body=${body}`)
    setSubmitted(true)
  }

  return (
    <div className="seo-lead-form-card">
      <h2 className="seo-lead-form-title">Request Service</h2>
      <p className="seo-lead-form-subtitle">Send your details and we will follow up fast.</p>

      {submitted ? (
        <div className="seo-lead-form-success" role="status">
          <div className="seo-lead-form-success-badge">✅ Submitted</div>
          <p className="seo-lead-form-success-text">Your request is saved and an email draft opened for our team.</p>
          <div className="seo-lead-form-success-actions">
            <a className="cta-button" href={BOOKING_CONFIG.PHONE_LINK}>Call {BOOKING_CONFIG.PHONE_NUMBER}</a>
            <a className="cta-button" href={BOOKING_CONFIG.BOOKING_URL} target="_blank" rel="noopener noreferrer">Book Online</a>
          </div>
          {leadId && <p className="seo-lead-form-lead-id">Lead ID: {leadId}</p>}
        </div>
      ) : (
        <form className="seo-lead-form" onSubmit={handleSubmit}>
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

          <button type="submit" className="seo-lead-form-submit">Send Request</button>
        </form>
      )}
    </div>
  )
}
