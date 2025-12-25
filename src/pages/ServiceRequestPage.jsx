import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BOOKING_CONFIG } from '../config/bookingConfig'
import { storageGetItem, storageSetJson } from '../utils/storage'
import '../styles/service-request.css'

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
    consent: false
  }))

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
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
      if (!formData.applianceType) newErrors.applianceType = 'Select appliance type'
      if (!formData.brand.trim()) newErrors.brand = 'Brand required'
    } else if (currentStep === 3) {
      if (formData.symptoms.length === 0) newErrors.symptoms = 'Select at least one symptom'
      if (!formData.description.trim()) newErrors.description = 'Describe the issue'
    } else if (currentStep === 4) {
      if (!formData.preferredDate) newErrors.preferredDate = 'Select preferred date'
      if (!formData.preferredTime) newErrors.preferredTime = 'Select time slot'
      if (!formData.serviceAddress.trim()) newErrors.serviceAddress = 'Service address required'
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

    setTimeout(() => {
      const requestData = {
        id: `SR-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        ...formData
      }

      storageSetJson(`serviceRequest_${requestData.id}`, requestData)
      
      setSubmitted(true)
      setNotification({ type: 'success', message: 'Request submitted! Redirecting to booking...' })

      setTimeout(() => {
        window.open(BOOKING_CONFIG.BOOKING_URL, '_blank')
      }, 2000)
    }, 1500)
  }

  if (submitted) {
    return (
      <section className="service-request-page">
        <div className="service-request-container">
          <Link to="/" className="back-link">← Back to Home</Link>
          
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h2>Service Request Submitted!</h2>
            <p>Your request has been recorded and you'll be redirected to our booking system.</p>
            
            <div className="success-details">
              <div className="detail-item">
                <span className="detail-label">Request ID:</span>
                <span className="detail-value">{formData.customerName}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Appliance:</span>
                <span className="detail-value">{formData.applianceType} ({formData.brand})</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Preferred Service Date:</span>
                <span className="detail-value">{formData.preferredDate}</span>
              </div>
            </div>

            <div className="next-steps">
              <h3>What's Next?</h3>
              <ol>
                <li>You'll be taken to our booking page to confirm your appointment</li>
                <li>We'll send a confirmation email to {formData.customerEmail}</li>
                <li>Our technician will contact you 24 hours before service</li>
                <li>We'll arrive within your preferred time window</li>
              </ol>
            </div>

            <button className="book-now-btn" onClick={() => window.open(BOOKING_CONFIG.BOOKING_URL, '_blank')}>
              🏁 Complete Booking in HouseCall Pro
            </button>

            <Link to="/" className="return-home-btn">Return to Home</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="service-request-page">
      <div className="service-request-container">
        <Link to="/" className="back-link">← Back to Home</Link>

        {notification && (
          <div className={`notification notification-${notification.type}`}>
            {notification.message}
          </div>
        )}

        <div className="form-header">
          <div className="header-content">
            <h1>🏁 Service Request Form</h1>
            <p>Fast • Reliable • Local Repair</p>
          </div>
          <div className="progress-indicator">
            <span className="step-number">Step {step} of 5</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(step / 5) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="service-form">
          {/* Step 1: Customer Information */}
          {step === 1 && (
            <div className="form-step">
              <h2>Step 1: Your Information</h2>
              <div className="section-divider"></div>

              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  placeholder="First & Last Name"
                  className={errors.customerName ? 'input-error' : ''}
                />
                {errors.customerName && <span className="error-text">{errors.customerName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                  placeholder="your@email.com"
                  className={errors.customerEmail ? 'input-error' : ''}
                />
                {errors.customerEmail && <span className="error-text">{errors.customerEmail}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                  placeholder="(954) 000-0000"
                  className={errors.customerPhone ? 'input-error' : ''}
                />
                {errors.customerPhone && <span className="error-text">{errors.customerPhone}</span>}
              </div>

              <div className="form-actions">
                <button type="button" className="btn-next" onClick={handleNext}>
                  Continue to Appliance Details →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Appliance Details */}
          {step === 2 && (
            <div className="form-step">
              <h2>Step 2: Appliance Details</h2>
              <div className="section-divider"></div>

              <div className="form-group">
                <label htmlFor="appliance">Appliance Type *</label>
                <select
                  id="appliance"
                  value={formData.applianceType}
                  onChange={(e) => {
                    handleInputChange('applianceType', e.target.value)
                    handleInputChange('symptoms', [])
                  }}
                  className={errors.applianceType ? 'input-error' : ''}
                >
                  <option value="">Select an appliance...</option>
                  {appliances.map(app => (
                    <option key={app} value={app}>{app}</option>
                  ))}
                </select>
                {errors.applianceType && <span className="error-text">{errors.applianceType}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="brand">Brand *</label>
                <input
                  id="brand"
                  type="text"
                  value={formData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  placeholder="e.g., LG, Samsung, Whirlpool"
                  className={errors.brand ? 'input-error' : ''}
                />
                {errors.brand && <span className="error-text">{errors.brand}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="model">Model (optional)</label>
                  <input
                    id="model"
                    type="text"
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    placeholder="Model number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="age">Age of Appliance (optional)</label>
                  <select
                    id="age"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                  >
                    <option value="">Select age...</option>
                    <option value="less-1">Less than 1 year</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10plus">More than 10 years</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-back" onClick={handleBack}>
                  ← Back
                </button>
                <button type="button" className="btn-next" onClick={handleNext}>
                  Continue to Symptoms →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Issue Description */}
          {step === 3 && (
            <div className="form-step">
              <h2>Step 3: Describe the Issue</h2>
              <div className="section-divider"></div>

              {formData.applianceType && (
                <div className="symptoms-section">
                  <label>Common Symptoms (Select any that apply) *</label>
                  <div className="checkbox-grid">
                    {commonSymptoms[formData.applianceType]?.map(symptom => (
                      <label key={symptom} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={formData.symptoms.includes(symptom)}
                          onChange={() => handleSymptomToggle(symptom)}
                        />
                        <span>{symptom}</span>
                      </label>
                    ))}
                  </div>
                  {errors.symptoms && <span className="error-text">{errors.symptoms}</span>}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="description">Additional Details *</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the issue in detail (leaks, noises, error codes, etc.)"
                  rows="5"
                  className={errors.description ? 'input-error' : ''}
                />
                {errors.description && <span className="error-text">{errors.description}</span>}
              </div>

              <div className="ai-helper-section">
                <button
                  type="button"
                  className="ai-helper-btn"
                  onClick={handleGetAiHelp}
                >
                  🤖 Get AI Diagnosis Help
                </button>
                
                {aiSuggestions && (
                  <div className="ai-suggestions">
                    <h4>AI Suggestions:</h4>
                    <ul>
                      {Object.entries(aiSuggestions).map(([symptom, suggestion]) => (
                        <li key={symptom}><strong>{symptom}:</strong> {suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="photo-upload-section">
                <label>Upload Photos (Optional - Max 5)</label>
                <div className="file-input-wrapper">
                  <input
                    type="file"
                    id="photos"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                  />
                  <label htmlFor="photos" className="file-label">
                    📸 Click to upload or drag & drop
                  </label>
                </div>
                
                {formData.photos.length > 0 && (
                  <div className="photos-preview">
                    {formData.photos.map((photo, idx) => (
                      <div key={idx} className="photo-item">
                        <span>{photo.name}</span>
                        <button
                          type="button"
                          onClick={() => removePhoto(idx)}
                          className="remove-photo"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="button" className="btn-back" onClick={handleBack}>
                  ← Back
                </button>
                <button type="button" className="btn-next" onClick={handleNext}>
                  Continue to Scheduling →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Scheduling */}
          {step === 4 && (
            <div className="form-step">
              <h2>Step 4: Schedule Service</h2>
              <div className="section-divider"></div>

              <div className="form-group">
                <label htmlFor="address">Service Address *</label>
                <textarea
                  id="address"
                  value={formData.serviceAddress}
                  onChange={(e) => handleInputChange('serviceAddress', e.target.value)}
                  placeholder="Where should our technician visit?"
                  rows="3"
                  className={errors.serviceAddress ? 'input-error' : ''}
                />
                {errors.serviceAddress && <span className="error-text">{errors.serviceAddress}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Preferred Date *</label>
                  <input
                    id="date"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className={errors.preferredDate ? 'input-error' : ''}
                  />
                  {errors.preferredDate && <span className="error-text">{errors.preferredDate}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="time">Time Slot *</label>
                  <select
                    id="time"
                    value={formData.preferredTime}
                    onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                    className={errors.preferredTime ? 'input-error' : ''}
                  >
                    <option value="">Select time...</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  {errors.preferredTime && <span className="error-text">{errors.preferredTime}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Urgency Level</label>
                <div className="radio-group">
                  <label className="radio-item">
                    <input
                      type="radio"
                      name="urgency"
                      value="normal"
                      checked={formData.urgency === 'normal'}
                      onChange={(e) => handleInputChange('urgency', e.target.value)}
                    />
                    <span>⏰ Normal (3-7 days)</span>
                  </label>
                  <label className="radio-item">
                    <input
                      type="radio"
                      name="urgency"
                      value="urgent"
                      checked={formData.urgency === 'urgent'}
                      onChange={(e) => handleInputChange('urgency', e.target.value)}
                    />
                    <span>⚡ Urgent (1-2 days)</span>
                  </label>
                  <label className="radio-item">
                    <input
                      type="radio"
                      name="urgency"
                      value="emergency"
                      checked={formData.urgency === 'emergency'}
                      onChange={(e) => handleInputChange('urgency', e.target.value)}
                    />
                    <span>🚨 Emergency (Same day)</span>
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-back" onClick={handleBack}>
                  ← Back
                </button>
                <button type="button" className="btn-next" onClick={handleNext}>
                  Continue to Review →
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Review & Submit */}
          {step === 5 && (
            <div className="form-step">
              <h2>Step 5: Review & Submit</h2>
              <div className="section-divider"></div>

              <div className="review-section">
                <div className="review-group">
                  <h3>Customer Information</h3>
                  <div className="review-item">
                    <span className="label">Name:</span>
                    <span className="value">{formData.customerName}</span>
                  </div>
                  <div className="review-item">
                    <span className="label">Email:</span>
                    <span className="value">{formData.customerEmail}</span>
                  </div>
                  <div className="review-item">
                    <span className="label">Phone:</span>
                    <span className="value">{formData.customerPhone}</span>
                  </div>
                </div>

                <div className="review-group">
                  <h3>Appliance & Issue</h3>
                  <div className="review-item">
                    <span className="label">Appliance:</span>
                    <span className="value">{formData.applianceType} ({formData.brand} {formData.model})</span>
                  </div>
                  <div className="review-item">
                    <span className="label">Symptoms:</span>
                    <span className="value">{formData.symptoms.join(', ')}</span>
                  </div>
                  <div className="review-item">
                    <span className="label">Description:</span>
                    <span className="value">{formData.description}</span>
                  </div>
                </div>

                <div className="review-group">
                  <h3>Service Schedule</h3>
                  <div className="review-item">
                    <span className="label">Preferred Date:</span>
                    <span className="value">{formData.preferredDate}</span>
                  </div>
                  <div className="review-item">
                    <span className="label">Time Slot:</span>
                    <span className="value">{formData.preferredTime}</span>
                  </div>
                  <div className="review-item">
                    <span className="label">Urgency:</span>
                    <span className="value">{formData.urgency.toUpperCase()}</span>
                  </div>
                  <div className="review-item">
                    <span className="label">Address:</span>
                    <span className="value">{formData.serviceAddress}</span>
                  </div>
                </div>

                {formData.photos.length > 0 && (
                  <div className="review-group">
                    <h3>Uploaded Photos</h3>
                    <span className="value">{formData.photos.length} photo(s) attached</span>
                  </div>
                )}
              </div>

              <div className="consent-section">
                <label className="consent-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => handleInputChange('consent', e.target.checked)}
                  />
                  <span>
                    I authorize Top Speed Appliance to diagnose and repair my appliance. I understand that a service technician will contact me to confirm the appointment and that terms and conditions apply.
                  </span>
                </label>
                {errors.consent && <span className="error-text">{errors.consent}</span>}
              </div>

              <div className="form-actions">
                <button type="button" className="btn-back" onClick={handleBack}>
                  ← Back
                </button>
                <button type="submit" className="btn-submit">
                  🏁 Submit & Book Service
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
