import React, { useState } from 'react'
import { bookGuest, preferredWindowFor, SERVICE_CITIES } from '../lib/serviceOs'

// The form's service labels → the Service OS appliance names.
const APPLIANCE_MAP = {
  'Refrigerator Repair': 'Refrigerator',
  'Washer & Dryer Repair': 'Washer',
  'Oven & Stove Repair': 'Oven/Range',
  'Dishwasher Repair': 'Dishwasher',
}

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  service: 'Refrigerator Repair',
  address: '',
  city: '',
  zip: '',
  date: '',
  time: '',
  message: '',
}

function Booking() {
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [status, setStatus] = useState({ state: 'idle', message: '', reference: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'zip' ? value.replace(/\D/g, '').slice(0, 5) : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'submitting', message: 'Sending your request…', reference: '' })

    const issue = [
      `Service: ${formData.service}`,
      formData.message ? `Details: ${formData.message}` : null,
      formData.date ? `Preferred Date: ${formData.date}` : null,
      formData.time ? `Preferred Time: ${formData.time}` : null,
    ].filter(Boolean).join('\n')

    try {
      const booking = await bookGuest({
        customer: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || undefined,
          address: formData.address.trim() || undefined,
        },
        city: formData.city,
        zip: formData.zip,
        appliance: APPLIANCE_MAP[formData.service] || formData.service,
        issue,
        preferredWindow: preferredWindowFor(formData.time),
        source: 'FLAGSHIP_NET',
      })
      setStatus({
        state: 'success',
        message: 'Thank you! Your service request is booked — a Service Setter will confirm your appointment shortly.',
        reference: booking.referenceCode,
      })
      setFormData(EMPTY_FORM)
    } catch (err) {
      setStatus({
        state: 'error',
        message: err.status === 422
          ? (err.serviceCities?.length
              ? `${err.message}. We currently serve: ${err.serviceCities.join(', ')}.`
              : err.message)
          : `${err.message || 'We could not send your request.'} Please call (954) 931-7997 to book.`,
        reference: '',
      })
    }
  }

  return (
    <section id="booking" className="booking">
      <h2>Request a Service</h2>
      <p className="booking-subtitle">Schedule your appliance repair today</p>

      {status.state === 'success' && (
        <div
          style={{
            maxWidth: '560px', margin: '0 auto 1.5rem', padding: '1rem 1.25rem',
            background: '#e8f5e9', border: '1px solid #2e7d32', borderRadius: '8px', color: '#1b5e20',
          }}
        >
          <p style={{ margin: '0 0 0.25rem' }}>{status.message}</p>
          <p style={{ margin: 0 }}>
            Booking reference: <strong>{status.reference}</strong> — use it with your phone number to track your technician.
          </p>
        </div>
      )}
      {status.state === 'error' && (
        <div
          style={{
            maxWidth: '560px', margin: '0 auto 1.5rem', padding: '1rem 1.25rem',
            background: '#ffebee', border: '1px solid #c62828', borderRadius: '8px', color: '#b71c1c',
          }}
        >
          <p style={{ margin: 0 }}>{status.message}</p>
        </div>
      )}

      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="service">Service Type</label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option>Refrigerator Repair</option>
            <option>Washer & Dryer Repair</option>
            <option>Oven & Stove Repair</option>
            <option>Dishwasher Repair</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="address">Service Address</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Street address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">Select your city...</option>
            {SERVICE_CITIES.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="zip">ZIP Code</label>
          <input
            type="text"
            id="zip"
            name="zip"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="e.g., 33313"
            value={formData.zip}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Preferred Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Preferred Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Additional Details</label>
          <textarea
            id="message"
            name="message"
            placeholder="Describe your appliance issue..."
            rows="5"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="submit-button" disabled={status.state === 'submitting'}>
          {status.state === 'submitting' ? 'Sending…' : 'Request Service'}
        </button>
      </form>
    </section>
  )
}

export default Booking
