import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { leadsDatabase } from '../services/leadsDatabase'
import { storageGetItem, storageSetJson } from '../utils/storage'
import { bookGuest, preferredWindowFor, extractZip, citiesForZip, attributionParams, buildViaTag, SERVICE_CITIES, SERVICE_OS_LINKS } from '../lib/serviceOs'
import TrackMyTech from '../components/TrackMyTech'
import { SpeedyPanel, SPEEDY_PREFILL_KEY } from '../components/SpeedyPanel'
import MobileStickyBar from '../components/MobileStickyBar'
import '../styles/service-request.css'

/**
 * Smart Booking — Figma frame 02 "Smart Booking + Speedy AI".
 *
 * Same real booking path as Phase 1: submit books a guest job into the
 * Top Speed Service OS (POST /speedy/book, source FLAGSHIP_NET) and the
 * Supabase lead mirror is kept as a secondary record. Steps follow the
 * design's segment order: Contact → Location → Appliance → Schedule →
 * Review.
 */

const STEP_LABELS = ['Contact', 'Location', 'Appliance', 'Schedule', 'Review']

const APPLIANCE_ICONS = {
  'Refrigerator': '🧊',
  'Washer': '🌀',
  'Dryer': '👕',
  'Oven/Range': '🔥',
  'Dishwasher': '🍽️',
  'Microwave': '♨️',
  'HVAC': '🌡️',
  'Water Heater': '🚿',
  'Garbage Disposal': '🗑️',
  'Other': '🔧',
  'Freezer/Ice Maker': '❄️',
  'Installation': '🔧',
}

export default function ServiceRequestPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(() => ({
    customerName: storageGetItem('customerName', ''),
    customerEmail: storageGetItem('customerEmail', ''),
    customerPhone: storageGetItem('customerPhone', ''),
    applianceType: '',
    brand: '',
    model: '',
    age: '',
    symptoms: [],
    description: '',
    photos: [],
    preferredDate: '',
    preferredTime: '',
    urgency: 'normal',
    serviceAddress: storageGetItem('customerServiceAddress', ''),
    city: '',
    zip: '',
    consent: false
  }))

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [bookingRef, setBookingRef] = useState('')
  const [notification, setNotification] = useState(null)
  const [showAiHelper, setShowAiHelper] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState(null)

  const appliances = [
    'Refrigerator',
    'Washer',
    'Dryer',
    'Oven/Range',
    'Dishwasher',
    'Microwave',
    'HVAC',
    'Water Heater',
    'Garbage Disposal',
    'Other'
  ]

  const commonSymptoms = {
    'Refrigerator': ['Not cooling', 'Loud noise', 'Leaking water', 'Frost buildup', 'Door not sealing'],
    'Washer': ['Not spinning', 'Leaking water', 'Loud noise', "Won't drain", 'Error codes'],
    'Dryer': ['Not heating', 'Takes too long', 'Loud noise', 'Not starting', 'Burning smell'],
    'Oven/Range': ['Not heating', 'Uneven cooking', 'Burning smell', "Door won't close", 'Display error'],
    'Dishwasher': ['Not cleaning', 'Not draining', 'Leaking', 'Loud noise', 'Arm not spinning'],
    'Microwave': ['Not heating', 'Sparking', 'Turntable stuck', 'Door stuck', 'Loud noise'],
    'HVAC': ['Not cooling', 'Not heating', 'Strange noise', 'Blowing cold air', 'Thermostat issues'],
    'Water Heater': ['No hot water', 'Leaking', 'Strange noises', 'Low pressure', 'Rusty water'],
    'Garbage Disposal': ["Won't turn on", 'Leaking', 'Strange noises', 'Drains slowly', 'Jammed'],
  }

  const timeSlots = [
    '8:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '12:00 PM - 2:00 PM',
    '2:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM'
  ]

  const windowLabel = (slot) =>
    slot.replace(':00 ', ' ').replace(' - ', '–').replace(' AM', ' AM').replace(' PM', ' PM')

  // Speedy / homepage prefill: an issue typed into a Speedy entry point
  // (or an appliance tile on the homepage) lands in the form.
  useEffect(() => {
    let prefill = null
    try {
      const raw = window.sessionStorage.getItem(SPEEDY_PREFILL_KEY)
      if (raw) {
        prefill = JSON.parse(raw)
        window.sessionStorage.removeItem(SPEEDY_PREFILL_KEY)
      }
    } catch {
      // storage unavailable — nothing to prefill
    }
    const params = new URLSearchParams(window.location.search)
    const issue = params.get('issue') || prefill?.issue || ''
    const appliance = params.get('appliance') || prefill?.appliance || ''
    if (issue || appliance) {
      setFormData((prev) => ({
        ...prev,
        ...(issue && !prev.description ? { description: issue } : {}),
        ...(appliance && !prev.applianceType ? { applianceType: appliance } : {}),
      }))
      if (issue) {
        setNotification({ type: 'info', message: 'Speedy added that to your booking — review it and pick a window.' })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleZipChange = (value) => {
    const zip = String(value).replace(/\D/g, '').slice(0, 5)
    handleInputChange('zip', zip)
    // A ZIP that belongs to exactly one service city can pre-pick it.
    if (zip.length === 5 && !formData.city) {
      const cities = citiesForZip(zip)
      if (cities.length === 1) handleInputChange('city', cities[0])
    }
  }

  const handleAddressChange = (value) => {
    handleInputChange('serviceAddress', value)
    // If the typed address already carries a ZIP, offer it as the ZIP.
    if (!formData.zip) {
      const zip = extractZip(value)
      if (zip) handleZipChange(zip)
    }
  }

  const handleSymptomToggle = (symptom) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }))
  }

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files)
    if (formData.photos.length + files.length > 5) {
      setNotification({ type: 'warning', message: 'Maximum 5 photos allowed' })
      return
    }
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files.map(f => ({ name: f.name, size: f.size }))]
    }))
  }

  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }))
  }

  const handleUseMyLocation = () => {
    if (!('geolocation' in navigator)) {
      setNotification({ type: 'warning', message: 'Location is not available in this browser — enter your ZIP instead.' })
      return
    }
    setNotification({ type: 'info', message: 'Finding your location…' })
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
          )
          const data = await res.json()
          const addr = data.address || {}
          const zip = String(addr.postcode || '').slice(0, 5)
          if (zip) handleZipChange(zip)
          const cityName = addr.city || addr.town || addr.village || ''
          if (SERVICE_CITIES.includes(cityName)) handleInputChange('city', cityName)
          if (data.display_name) handleInputChange('serviceAddress', data.display_name)
          setNotification({ type: 'success', message: 'Location filled in — double-check your city and ZIP before continuing.' })
        } catch {
          setNotification({ type: 'warning', message: 'Could not look up that location — enter your ZIP instead.' })
        }
      },
      () => setNotification({ type: 'warning', message: 'Location permission was not granted — enter your ZIP instead.' }),
      { timeout: 10000 }
    )
  }

  const handleSpeedyPrefill = ({ issue, appliance }) => {
    setFormData((prev) => ({
      ...prev,
      description: issue || prev.description,
      applianceType: appliance || prev.applianceType,
      symptoms: appliance && appliance !== prev.applianceType ? [] : prev.symptoms,
    }))
    setNotification({ type: 'success', message: 'Speedy added that to your booking form — review it and continue.' })
  }

  const validateStep = (currentStep) => {
    const newErrors = {}

    if (currentStep === 1) {
      if (!formData.customerName.trim()) newErrors.customerName = 'Name required'
      if (!formData.customerPhone.trim()) newErrors.customerPhone = 'Phone required'
      if (!formData.customerEmail.trim()) newErrors.customerEmail = 'Email required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
        newErrors.customerEmail = 'Invalid email'
      }
    } else if (currentStep === 2) {
      if (!formData.serviceAddress.trim()) newErrors.serviceAddress = 'Service address required'
      if (!formData.city || !SERVICE_CITIES.includes(formData.city)) newErrors.city = 'Select your city'
      if (!/^\d{5}$/.test(formData.zip || '')) newErrors.zip = 'Enter your 5-digit ZIP'
    } else if (currentStep === 3) {
      if (!formData.applianceType) newErrors.applianceType = 'Select appliance type'
      if (!formData.brand.trim()) newErrors.brand = 'Brand required'
      // Symptoms are only required when the appliance has a known list —
      // "Other" / prefilled canonical types describe the issue in text.
      if (commonSymptoms[formData.applianceType]?.length && formData.symptoms.length === 0) {
        newErrors.symptoms = 'Select at least one symptom'
      }
      if (!formData.description.trim()) newErrors.description = 'Describe the issue'
    } else if (currentStep === 4) {
      if (!formData.preferredDate) newErrors.preferredDate = 'Select preferred date'
      if (!formData.preferredTime) newErrors.preferredTime = 'Select time slot'
    } else if (currentStep === 5) {
      if (!formData.consent) newErrors.consent = 'Please accept terms'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleGetAiHelp = async () => {
    if (!formData.applianceType || formData.symptoms.length === 0) {
      setNotification({ type: 'warning', message: 'Select appliance and symptoms first' })
      return
    }

    setShowAiHelper(true)
    setNotification({ type: 'info', message: 'Analyzing your appliance issue...' })

    setTimeout(() => {
      const suggestionMap = {
        'Refrigerator': {
          'Not cooling': 'Check condenser coils, thermostat, or refrigerant levels',
          'Loud noise': 'May be normal operation, but could indicate fan or compressor issues',
          'Leaking water': 'Usually drain line blockage - we can clean it quickly'
        },
        'Washer': {
          'Not spinning': 'Could be drum bearing, drive belt, or lid switch',
          "Won't drain": 'Drain hose or pump may be clogged',
          'Leaking water': 'Common seal issues - easily fixable'
        }
      }

      const suggestions = suggestionMap[formData.applianceType] || {
        'Default': 'Our technician can diagnose this on-site'
      }

      setAiSuggestions(suggestions)
      setNotification({ type: 'success', message: 'AI analysis complete!' })
    }, 1500)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateStep(5)) {
      return
    }

    setNotification({ type: 'info', message: 'Submitting your request...' })

    const requestData = {
      id: `SR-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      ...formData
    }

    storageSetJson(`serviceRequest_${requestData.id}`, requestData)

    const params = attributionParams()

    const issueText = [
      formData.brand ? `Brand: ${formData.brand}` : null,
      formData.model ? `Model: ${formData.model}` : null,
      formData.age ? `Age: ${formData.age}` : null,
      formData.symptoms?.length ? `Symptoms: ${formData.symptoms.join(', ')}` : null,
      formData.description ? `Description: ${formData.description}` : null,
      formData.preferredDate ? `Preferred Date: ${formData.preferredDate}` : null,
      formData.preferredTime ? `Preferred Time: ${formData.preferredTime}` : null,
      formData.urgency ? `Urgency: ${formData.urgency}` : null,
      formData.photos?.length ? `Photos: ${formData.photos.map(p => p.name).join(', ')}` : null
    ].filter(Boolean).join('\n')

    // Attribution: carry the campaign/source params into the booking so
    // the Service Setters can see where the request came from. Params
    // captured on arrival (sessionStorage first-touch) fill in when
    // this page's own URL no longer carries them.
    const campaignId = params.get('campaignid') || params.get('campaign_id')
    const via = buildViaTag(params)
    const issue = via ? `${issueText} [via: ${via}]` : issueText

    // Primary path: book into the Top Speed Service OS — the booking
    // lands in the Service Setters queue in Book OS with a real
    // reference the customer can track.
    let booking
    try {
      booking = await bookGuest({
        customer: {
          name: formData.customerName.trim(),
          phone: formData.customerPhone.trim(),
          email: formData.customerEmail.trim() || undefined,
          address: formData.serviceAddress.trim() || undefined
        },
        city: formData.city,
        zip: formData.zip,
        appliance: formData.applianceType,
        issue,
        preferredWindow: preferredWindowFor(formData.preferredTime),
        source: 'FLAGSHIP_NET'
      })
    } catch (err) {
      if (err.status === 422) {
        // Outside the service area — show the API's message plainly.
        setNotification({
          type: 'error',
          message: err.serviceCities?.length
            ? `${err.message}. We currently serve: ${err.serviceCities.join(', ')}.`
            : err.message
        })
      } else {
        setNotification({
          type: 'error',
          message: `${err.message || 'We could not send your request.'} Please call (954) 931-7997 to book.`
        })
      }
      return
    }

    // Secondary mirror: keep the Supabase lead record as before.
    try {
      await leadsDatabase.createLead({
        name: formData.customerName,
        phone: formData.customerPhone,
        email: formData.customerEmail,
        address: formData.serviceAddress,
        service_type: formData.applianceType,
        issue_description: issueText,
        lead_source: params.get('src') || 'service-request',
        campaign_id: campaignId,
        keyword: params.get('keyword') || null
      })
    } catch {
      // Non-critical: the Service OS booking above is the real record.
    }

    setBookingRef(booking.referenceCode)
    setSubmitted(true)
    setNotification({ type: 'success', message: `Request booked! Your booking reference is ${booking.referenceCode}.` })
  }

  const displayAppliances =
    formData.applianceType && !appliances.includes(formData.applianceType)
      ? [...appliances, formData.applianceType]
      : appliances

  const symptomList = commonSymptoms[formData.applianceType] || []

  if (submitted) {
    return (
      <div className="os-page os-has-stickybar">
        <div className="os-wrap" style={{ paddingTop: 30, paddingBottom: 60 }}>
          <Link to="/" className="os-btn os-btn-ghost" style={{ paddingLeft: 0 }}>← Back to Home</Link>

          {notification && <div className={`os-notice os-notice-${notification.type}`}>{notification.message}</div>}

          <div className="os-success-card">
            <div className="os-success-check" aria-hidden="true">✓</div>
            <div className="os-success-text">
              <h2>Booked — Reference {bookingRef}</h2>
              <p>
                Confirmation text + email sent. Your job is in the Service Setters queue; a setter
                confirms your window, then Track My Tech goes live.
              </p>
            </div>
            <div className="os-success-actions">
              <Link
                className="os-btn os-btn-navy"
                to={`/track?ref=${encodeURIComponent(bookingRef)}&phone=${encodeURIComponent(formData.customerPhone)}`}
              >
                Track My Tech
              </Link>
              <a className="os-btn os-btn-blue" href={SERVICE_OS_LINKS.garage} target="_blank" rel="noopener noreferrer">
                My Appliances
              </a>
            </div>
          </div>

          <div className="os-form-card" style={{ marginBottom: 26 }}>
            <div className="os-review-group">
              <h3>Your Booking</h3>
              <div className="os-review-item"><span className="label">Appliance:</span><span className="value">{formData.applianceType} ({formData.brand})</span></div>
              <div className="os-review-item"><span className="label">Preferred Date:</span><span className="value">{formData.preferredDate}</span></div>
              <div className="os-review-item"><span className="label">Window:</span><span className="value">{formData.preferredTime}</span></div>
              <div className="os-review-item"><span className="label">City:</span><span className="value">{formData.city} {formData.zip}</span></div>
            </div>
            <div className="os-review-group" style={{ marginBottom: 0 }}>
              <h3>What's Next?</h3>
              <ol style={{ margin: 0, paddingLeft: 20, color: '#5d7188', fontSize: 14, lineHeight: 1.7 }}>
                <li>A Service Setter reviews your request and confirms your appointment</li>
                <li>We'll send a confirmation email to {formData.customerEmail}</li>
                <li>Track your technician with your booking reference</li>
                <li>We'll arrive within your preferred time window</li>
              </ol>
            </div>
          </div>

          <TrackMyTech initialReference={bookingRef} initialPhone={formData.customerPhone} />
        </div>
        <MobileStickyBar />
      </div>
    )
  }

  return (
    <div className="os-page os-has-stickybar">
      <div className="os-wrap">
        <div className="os-book-head">
          <div>
            <h1 className="os-h1">Book in under a minute — or let Speedy do it.</h1>
            <p className="os-sub">
              Every booking lands in the Service OS: CRM customer, Book OS setter queue,
              confirmation by text + email, and a Track My Tech link.
            </p>
          </div>
          <span className="mono-tag">SMART BOOKING &nbsp;•&nbsp; BOOK OS</span>
        </div>

        {notification && <div className={`os-notice os-notice-${notification.type}`}>{notification.message}</div>}


        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 10, margin: '4px 0 18px' }} aria-hidden="true">
            <img src="/visuals/visual-refrigerator.jpg" alt="Refrigerator Repair — not cooling? We fix it fast" loading="lazy" style={{ width: '100%', height: 168, objectFit: 'cover', objectPosition: 'top', display: 'block', borderRadius: 12, border: '1.5px solid #D8E2F2' }} />
            <img src="/visuals/visual-washer-dryer.jpg" alt="Washer or Dryer Not Working? We fix it FAST" loading="lazy" style={{ width: '100%', height: 168, objectFit: 'cover', objectPosition: 'top', display: 'block', borderRadius: 12, border: '1.5px solid #D8E2F2' }} />
            <img src="/visuals/visual-dryer.jpg" alt="Dryer Repair — dryer not heating?" loading="lazy" style={{ width: '100%', height: 168, objectFit: 'cover', objectPosition: 'top', display: 'block', borderRadius: 12, border: '1.5px solid #D8E2F2' }} />
            <img src="/visuals/visual-oven-range.jpg" alt="Oven & Range Repair — oven not heating evenly?" loading="lazy" style={{ width: '100%', height: 168, objectFit: 'cover', objectPosition: 'top', display: 'block', borderRadius: 12, border: '1.5px solid #D8E2F2' }} />
            <img src="/visuals/visual-dishwasher.jpg" alt="Dishwasher Repair — not draining or cleaning?" loading="lazy" style={{ width: '100%', height: 168, objectFit: 'cover', objectPosition: 'top', display: 'block', borderRadius: 12, border: '1.5px solid #D8E2F2' }} />
        </div>
        <div className="os-book-grid">
          <div className="os-form-card">
            <h2 className="os-form-title">Service OS Booking</h2>

            <div className="os-segments" aria-label={`Step ${step} of 5`}>
              {STEP_LABELS.map((label, i) => {
                const n = i + 1
                return (
                  <div key={label} className={`os-segment ${n < step ? 'done' : n === step ? 'now' : ''}`}>
                    <div className="bar" />
                    <div className="lbl">{n < step ? `✓ ${label}` : label}</div>
                  </div>
                )
              })}
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Contact */}
              {step === 1 && (
                <div>
                  <div className="os-field">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      id="name"
                      type="text"
                      value={formData.customerName}
                      onChange={(e) => handleInputChange('customerName', e.target.value)}
                      placeholder="First & Last Name"
                      className={`os-input ${errors.customerName ? 'input-error' : ''}`}
                    />
                    {errors.customerName && <span className="os-error-text">{errors.customerName}</span>}
                  </div>

                  <div className="os-field">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                      placeholder="your@email.com"
                      className={`os-input ${errors.customerEmail ? 'input-error' : ''}`}
                    />
                    {errors.customerEmail && <span className="os-error-text">{errors.customerEmail}</span>}
                  </div>

                  <div className="os-field">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.customerPhone}
                      onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                      placeholder="(954) 000-0000"
                      className={`os-input ${errors.customerPhone ? 'input-error' : ''}`}
                    />
                    {errors.customerPhone && <span className="os-error-text">{errors.customerPhone}</span>}
                  </div>

                  <div className="os-form-actions">
                    <span />
                    <button type="button" className="os-btn os-btn-black" onClick={handleNext}>
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Location */}
              {step === 2 && (
                <div>
                  <div className="os-field">
                    <label htmlFor="address">Service Address *</label>
                    <textarea
                      id="address"
                      value={formData.serviceAddress}
                      onChange={(e) => handleAddressChange(e.target.value)}
                      placeholder="Where should our technician visit?"
                      rows="3"
                      className={`os-textarea ${errors.serviceAddress ? 'input-error' : ''}`}
                    />
                    {errors.serviceAddress && <span className="os-error-text">{errors.serviceAddress}</span>}
                  </div>

                  <div className="os-row2">
                    <div className="os-field">
                      <label htmlFor="city">City *</label>
                      <select
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={`os-select ${errors.city ? 'input-error' : ''}`}
                      >
                        <option value="">Select your city...</option>
                        {SERVICE_CITIES.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                      {errors.city && <span className="os-error-text">{errors.city}</span>}
                    </div>

                    <div className="os-field">
                      <label htmlFor="zip">ZIP Code *</label>
                      <input
                        id="zip"
                        type="text"
                        inputMode="numeric"
                        autoComplete="postal-code"
                        value={formData.zip}
                        onChange={(e) => handleZipChange(e.target.value)}
                        placeholder="e.g., 33313"
                        className={`os-input ${errors.zip ? 'input-error' : ''}`}
                      />
                      {errors.zip && <span className="os-error-text">{errors.zip}</span>}
                    </div>
                  </div>

                  <div className="os-loc-row">
                    <button type="button" className="os-btn os-btn-white" style={{ border: '1px solid #d9e2ec', minHeight: 38, fontSize: 12.5 }} onClick={handleUseMyLocation}>
                      📍 Use my location
                    </button>
                    <span className="os-loc-note">ZIP + city verified against the 12-city service area before anything is booked.</span>
                  </div>

                  <div className="os-form-actions">
                    <button type="button" className="os-btn os-btn-ghost" onClick={handleBack}>← Back</button>
                    <button type="button" className="os-btn os-btn-black" onClick={handleNext}>
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Appliance + Issue */}
              {step === 3 && (
                <div>
                  <div className="os-field">
                    <label className="os-label-red">Which Appliance? *</label>
                    <div className="os-tiles">
                      {displayAppliances.map(app => (
                        <button
                          key={app}
                          type="button"
                          className={`os-tile ${formData.applianceType === app ? 'selected' : ''}`}
                          onClick={() => {
                            handleInputChange('applianceType', app)
                            handleInputChange('symptoms', [])
                          }}
                          aria-pressed={formData.applianceType === app}
                        >
                          <span className="icon" aria-hidden="true">{APPLIANCE_ICONS[app] || '🔧'}</span>
                          <span className="name">{app}</span>
                        </button>
                      ))}
                    </div>
                    {errors.applianceType && <span className="os-error-text">{errors.applianceType}</span>}
                  </div>

                  <div className="os-row2">
                    <div className="os-field">
                      <label htmlFor="brand">Brand *</label>
                      <input
                        id="brand"
                        type="text"
                        value={formData.brand}
                        onChange={(e) => handleInputChange('brand', e.target.value)}
                        placeholder="e.g., LG, Samsung, Whirlpool"
                        className={`os-input ${errors.brand ? 'input-error' : ''}`}
                      />
                      {errors.brand && <span className="os-error-text">{errors.brand}</span>}
                    </div>

                    <div className="os-field">
                      <label htmlFor="model">Model (optional)</label>
                      <input
                        id="model"
                        type="text"
                        value={formData.model}
                        onChange={(e) => handleInputChange('model', e.target.value)}
                        placeholder="Model number"
                        className="os-input"
                      />
                    </div>
                  </div>

                  <div className="os-field">
                    <label htmlFor="age">Age of Appliance (optional)</label>
                    <select
                      id="age"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      className="os-select"
                    >
                      <option value="">Select age...</option>
                      <option value="less-1">Less than 1 year</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10plus">More than 10 years</option>
                    </select>
                  </div>

                  {symptomList.length > 0 && (
                    <div className="os-field">
                      <label className="os-label-red">Common Symptoms *</label>
                      <div className="os-sym-grid">
                        {symptomList.map(symptom => (
                          <button
                            key={symptom}
                            type="button"
                            className={`os-sym ${formData.symptoms.includes(symptom) ? 'selected' : ''}`}
                            onClick={() => handleSymptomToggle(symptom)}
                            aria-pressed={formData.symptoms.includes(symptom)}
                          >
                            {symptom}
                          </button>
                        ))}
                      </div>
                      {errors.symptoms && <span className="os-error-text">{errors.symptoms}</span>}
                    </div>
                  )}

                  <div className="os-field">
                    <label className="os-label-red" htmlFor="description">What's Happening? *</label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Not cooling. Freezer is warm and food is thawing…"
                      rows="4"
                      className={`os-textarea ${errors.description ? 'input-error' : ''}`}
                    />
                    {errors.description && <span className="os-error-text">{errors.description}</span>}
                  </div>

                  <div className="os-field">
                    <button type="button" className="os-btn os-btn-white" style={{ border: '1px solid #d9e2ec' }} onClick={handleGetAiHelp}>
                      🤖 Get AI Diagnosis Help
                    </button>
                    {showAiHelper && aiSuggestions && (
                      <div className="os-note" style={{ marginTop: 14 }}>
                        <strong>AI Suggestions:</strong>
                        <ul style={{ margin: '8px 0 0', paddingLeft: 18 }}>
                          {Object.entries(aiSuggestions).map(([symptom, suggestion]) => (
                            <li key={symptom}><strong>{symptom}:</strong> {suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="os-field">
                    <label>Upload Photos (Optional — Max 5)</label>
                    <input type="file" id="photos" multiple accept="image/*" onChange={handlePhotoUpload} />
                    {formData.photos.length > 0 && (
                      <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {formData.photos.map((photo, idx) => (
                          <span key={idx} className="os-pill os-pill-soft">
                            {photo.name}
                            <button
                              type="button"
                              onClick={() => removePhoto(idx)}
                              aria-label={`Remove ${photo.name}`}
                              style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 700 }}
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="os-form-actions">
                    <button type="button" className="os-btn os-btn-ghost" onClick={handleBack}>← Back</button>
                    <button type="button" className="os-btn os-btn-black" onClick={handleNext}>
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Schedule */}
              {step === 4 && (
                <div>
                  <div className="os-field">
                    <label htmlFor="date">Preferred Date *</label>
                    <input
                      id="date"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className={`os-input ${errors.preferredDate ? 'input-error' : ''}`}
                    />
                    {errors.preferredDate && <span className="os-error-text">{errors.preferredDate}</span>}
                  </div>

                  <div className="os-field">
                    <label className="os-label-red">Pick a Window *</label>
                    <div className="os-windows">
                      {timeSlots.map(slot => (
                        <button
                          key={slot}
                          type="button"
                          className={`os-window ${formData.preferredTime === slot ? 'selected' : ''}`}
                          onClick={() => handleInputChange('preferredTime', slot)}
                          aria-pressed={formData.preferredTime === slot}
                        >
                          {windowLabel(slot)}
                        </button>
                      ))}
                    </div>
                    {errors.preferredTime && <span className="os-error-text">{errors.preferredTime}</span>}
                  </div>

                  <div className="os-field">
                    <label className="os-label-red">Urgency Level</label>
                    <div className="os-windows">
                      {[
                        ['normal', '⏰ Normal (3-7 days)'],
                        ['urgent', '⚡ Urgent (1-2 days)'],
                        ['emergency', '🚨 Emergency (Same day)'],
                      ].map(([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          className={`os-window ${formData.urgency === value ? 'selected' : ''}`}
                          onClick={() => handleInputChange('urgency', value)}
                          aria-pressed={formData.urgency === value}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="os-note">
                    <strong>$99 diagnostic</strong> — collected at booking, credited in full toward
                    your repair. No charge for the visit if you approve the repair.
                  </div>

                  <div className="os-form-actions">
                    <button type="button" className="os-btn os-btn-ghost" onClick={handleBack}>← Back</button>
                    <button type="button" className="os-btn os-btn-black" onClick={handleNext}>
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5: Review & Submit */}
              {step === 5 && (
                <div>
                  <div className="os-review-group">
                    <h3>Customer Information</h3>
                    <div className="os-review-item"><span className="label">Name:</span><span className="value">{formData.customerName}</span></div>
                    <div className="os-review-item"><span className="label">Email:</span><span className="value">{formData.customerEmail}</span></div>
                    <div className="os-review-item"><span className="label">Phone:</span><span className="value">{formData.customerPhone}</span></div>
                  </div>

                  <div className="os-review-group">
                    <h3>Service Location</h3>
                    <div className="os-review-item"><span className="label">Address:</span><span className="value">{formData.serviceAddress}</span></div>
                    <div className="os-review-item"><span className="label">City:</span><span className="value">{formData.city}</span></div>
                    <div className="os-review-item"><span className="label">ZIP:</span><span className="value">{formData.zip}</span></div>
                  </div>

                  <div className="os-review-group">
                    <h3>Appliance & Issue</h3>
                    <div className="os-review-item"><span className="label">Appliance:</span><span className="value">{formData.applianceType} ({formData.brand} {formData.model})</span></div>
                    <div className="os-review-item"><span className="label">Symptoms:</span><span className="value">{formData.symptoms.join(', ')}</span></div>
                    <div className="os-review-item"><span className="label">Description:</span><span className="value">{formData.description}</span></div>
                  </div>

                  <div className="os-review-group">
                    <h3>Service Schedule</h3>
                    <div className="os-review-item"><span className="label">Preferred Date:</span><span className="value">{formData.preferredDate}</span></div>
                    <div className="os-review-item"><span className="label">Time Slot:</span><span className="value">{formData.preferredTime}</span></div>
                    <div className="os-review-item"><span className="label">Urgency:</span><span className="value">{formData.urgency.toUpperCase()}</span></div>
                  </div>

                  {formData.photos.length > 0 && (
                    <div className="os-review-group">
                      <h3>Uploaded Photos</h3>
                      <span className="value">{formData.photos.length} photo(s) attached</span>
                    </div>
                  )}

                  <div className="os-note">
                    <strong>$99 diagnostic</strong> — collected at booking, credited in full toward
                    your repair.
                  </div>

                  <label className="os-consent">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => handleInputChange('consent', e.target.checked)}
                    />
                    <span>
                      I authorize Top Speed Appliance to diagnose and repair my appliance. I understand that a service technician will contact me to confirm the appointment and that terms and conditions apply.
                    </span>
                  </label>
                  {errors.consent && <span className="os-error-text">{errors.consent}</span>}

                  <div className="os-form-actions">
                    <button type="button" className="os-btn os-btn-ghost" onClick={handleBack}>← Back</button>
                    <button type="submit" className="os-btn os-btn-red">
                      ✓ Confirm Booking
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          <SpeedyPanel onPrefill={handleSpeedyPrefill} />
        </div>
      </div>
      <MobileStickyBar />
    </div>
  )
}
