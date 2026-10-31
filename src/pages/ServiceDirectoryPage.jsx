import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './ServiceDirectoryPage.css'

const BOOKING_URL = 'https://book.housecallpro.com/book/TopSpeed-Appliance/0c0fcb09005e47239b0bd7d487e9d468?v2=true'

const SERVICES = [
  { value: 'washer', label: 'Washer Repair', code: 'WA', to: '/washer-repair', text: 'Diagnosis and repair for top-load and front-load washers.' },
  { value: 'dryer', label: 'Dryer Repair', code: 'DR', to: '/dryer-repair', text: 'Heating, drum, and venting issues for electric and gas dryers.' },
  { value: 'refrigerator', label: 'Refrigerator Repair', code: 'RF', to: '/refrigerator-repair', text: 'Cooling, ice maker, and temperature problems for all major brands.' },
  { value: 'oven', label: 'Oven & Stove Repair', code: 'OV', to: '/oven-stove-repair', text: 'Burners, igniters, heating elements, and control boards.' },
  { value: 'dishwasher', label: 'Dishwasher Repair', code: 'DW', to: '/dishwasher-repair', text: 'Draining, cleaning, and water-fill problems.' },
  { value: 'microwave', label: 'Microwave Repair', code: 'MW', to: '/microwave-repair', text: 'Heating, turntable, and control panel repairs.' },
  { value: 'garbageDisposal', label: 'Garbage Disposal Repair', code: 'GD', to: '/garbage-disposal-repair', text: 'Jams, leaks, and motor problems for under-sink disposals.' },
  { value: 'wineCooler', label: 'Wine Cooler Repair', code: 'WC', to: '/wine-cooler-repair', text: 'Temperature control and cooling repairs for wine coolers.' },
]

const CITIES = [
  { value: 'fort-lauderdale', label: 'Fort Lauderdale', county: 'Broward County', to: '/appliance-repair-fort-lauderdale' },
  { value: 'hollywood-fl', label: 'Hollywood', county: 'Broward County', to: '/appliance-repair-hollywood-fl' },
  { value: 'plantation-fl', label: 'Plantation', county: 'Broward County', to: '/appliance-repair-plantation-fl' },
  { value: 'pembroke-pines-fl', label: 'Pembroke Pines', county: 'Broward County', to: '/appliance-repair-pembroke-pines-fl' },
  { value: 'delray-beach-fl', label: 'Delray Beach', county: 'Palm Beach County', to: '/appliance-repair-delray-beach-fl' },
  { value: 'boynton-beach-fl', label: 'Boynton Beach', county: 'Palm Beach County', to: '/appliance-repair-boynton-beach-fl' },
  { value: 'jupiter-fl', label: 'Jupiter', county: 'Palm Beach County', to: '/appliance-repair-jupiter-fl' },
  { value: 'palm-beach-gardens-fl', label: 'Palm Beach Gardens', county: 'Palm Beach County', to: '/appliance-repair-palm-beach-gardens-fl' },
]

const EMPTY_FORM = {
  fullName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  appliance: '',
  brand: '',
  issue: '',
  preferredDate: '',
  consent: false,
}

function pushDataLayer(event, payload = {}) {
  if (typeof window === 'undefined' || !Array.isArray(window.dataLayer)) return
  window.dataLayer.push({ event, ...payload })
}

function ServiceDirectoryPage() {
  const [filters, setFilters] = useState({ service: '', city: '' })
  const [draftFilters, setDraftFilters] = useState({ service: '', city: '' })
  const [form, setForm] = useState(EMPTY_FORM)
  const [started, setStarted] = useState(false)
  const [demoNotice, setDemoNotice] = useState(false)

  const visibleServices = SERVICES.filter((s) => !filters.service || s.value === filters.service)
  const visibleCities = CITIES.filter((c) => !filters.city || c.value === filters.city)

  const handleSearch = (e) => {
    e.preventDefault()
    setFilters(draftFilters)
    pushDataLayer('directory_search', {
      service_type: draftFilters.service || 'all',
      city: draftFilters.city || 'all',
    })
    document.getElementById('directory-services')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target
    if (!started) {
      setStarted(true)
      pushDataLayer('service_request_started')
    }
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setDemoNotice(true)
  }

  return (
    <div className="ts-directory">
      <section className="ts-hero">
        <div className="ts-hero-content">
          <span className="ts-eyebrow ts-eyebrow-light">SERVICE DIRECTORY</span>
          <h1>Find <em>Appliance Repair</em> Near You</h1>
          <p>Choose your appliance and city to find the right repair page, then request a visit or call our team.</p>
          <div className="ts-hero-actions">
            <a className="ts-button ts-button-light" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book Online</a>
            <a className="ts-hero-phone" href="tel:9549317997">Call (954) 931-7997</a>
          </div>
        </div>
        <div className="ts-hero-badge" aria-hidden="true">
          <span>TOP SPEED</span>
          <strong>Same-Day Service</strong>
          <small>SOUTH FLORIDA</small>
        </div>
      </section>

      <div className="ts-search-wrap">
        <div className="ts-search-intro">
          <h2>Search the directory</h2>
          <p>Filter by appliance and city to see matching repair services.</p>
        </div>
        <form className="ts-search-panel" onSubmit={handleSearch}>
          <div className="ts-field">
            <label htmlFor="ts-search-service">Appliance</label>
            <select
              id="ts-search-service"
              value={draftFilters.service}
              onChange={(e) => setDraftFilters((p) => ({ ...p, service: e.target.value }))}
            >
              <option value="">All appliances</option>
              {SERVICES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
          <div className="ts-field">
            <label htmlFor="ts-search-city">City</label>
            <select
              id="ts-search-city"
              value={draftFilters.city}
              onChange={(e) => setDraftFilters((p) => ({ ...p, city: e.target.value }))}
            >
              <option value="">All cities</option>
              {CITIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="ts-button ts-button-primary">Search Directory</button>
          <p className="ts-search-note">Service coverage varies by city. Call (954) 931-7997 to confirm availability for your address.</p>
        </form>
      </div>

      <section className="ts-section" id="directory-services">
        <div className="ts-section-heading">
          <span className="ts-eyebrow">APPLIANCES WE REPAIR</span>
          <h2>Repair Services</h2>
          <p>Select a service to see its dedicated page and booking options.</p>
        </div>
        <div className="ts-card-grid">
          {visibleServices.length === 0 && <p className="ts-empty">No services match this filter.</p>}
          {visibleServices.map((s) => (
            <article className="ts-service-card" key={s.value}>
              <div className="ts-service-icon" aria-hidden="true">{s.code}</div>
              <h3>{s.label}</h3>
              <p>{s.text}</p>
              <Link className="ts-text-button" to={s.to}>View service details</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="ts-section ts-city-section">
        <div className="ts-section-heading">
          <span className="ts-eyebrow">SERVICE AREAS</span>
          <h2>Cities We Serve</h2>
          <p>Pick your city to see local appliance repair information.</p>
        </div>
        <div className="ts-city-grid">
          {visibleCities.length === 0 && <p className="ts-empty">No cities match this filter.</p>}
          {visibleCities.map((c) => (
            <Link className="ts-city-link" key={c.value} to={c.to}>
              <span>
                <strong>{c.label}</strong>
                <small>{c.county}</small>
              </span>
              <span aria-hidden="true">›</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="ts-section">
        <div className="ts-section-heading">
          <span className="ts-eyebrow">HOW IT WORKS</span>
          <h2>How to Request a Repair</h2>
        </div>
        <div className="ts-steps">
          <div className="ts-step">
            <b>01</b>
            <h3>Choose your appliance</h3>
            <p>Select the appliance that needs service.</p>
          </div>
          <div className="ts-step">
            <b>02</b>
            <h3>Choose your city</h3>
            <p>Confirm your location is in our service area.</p>
          </div>
          <div className="ts-step">
            <b>03</b>
            <h3>Send a request</h3>
            <p>Share your contact details and the issue you are seeing.</p>
          </div>
          <div className="ts-step">
            <b>04</b>
            <h3>Call to confirm</h3>
            <p>Call (954) 931-7997 to confirm scheduling for your visit.</p>
          </div>
        </div>
      </section>

      <section className="ts-booking-section" id="service-request">
        <aside className="ts-booking-aside">
          <h2>Request a Repair Visit</h2>
          <p>Tell us about your appliance and we will follow up to confirm scheduling.</p>
          <p>Prefer to talk? Call <a href="tel:9549317997">(954) 931-7997</a> or <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">book online</a>.</p>
        </aside>
        <div className="ts-booking-main">
          <form className="ts-booking-form" onSubmit={handleSubmit}>
            <div className="ts-form-heading">
              <h2>Service Request</h2>
              <p>Fields marked with an asterisk are required.</p>
            </div>
            {demoNotice && (
              <div className="ts-alert" role="status">
                This request form is in demo mode and has not been sent. Please call (954) 931-7997 or book online to schedule your repair.
              </div>
            )}
            <div className="ts-form-grid">
              <div className="ts-field">
                <label htmlFor="ts-fullName">Full name *</label>
                <input id="ts-fullName" name="fullName" type="text" autoComplete="name" required value={form.fullName} onChange={handleFieldChange} />
              </div>
              <div className="ts-field">
                <label htmlFor="ts-phone">Phone *</label>
                <input id="ts-phone" name="phone" type="tel" autoComplete="tel" required value={form.phone} onChange={handleFieldChange} />
              </div>
              <div className="ts-field">
                <label htmlFor="ts-email">Email</label>
                <input id="ts-email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleFieldChange} />
              </div>
              <div className="ts-field">
                <label htmlFor="ts-address">Service address *</label>
                <input id="ts-address" name="address" type="text" autoComplete="street-address" required value={form.address} onChange={handleFieldChange} />
              </div>
              <div className="ts-field">
                <label htmlFor="ts-city">City *</label>
                <select id="ts-city" name="city" required value={form.city} onChange={handleFieldChange}>
                  <option value="">Select a city</option>
                  {CITIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div className="ts-field">
                <label htmlFor="ts-appliance">Appliance *</label>
                <select id="ts-appliance" name="appliance" required value={form.appliance} onChange={handleFieldChange}>
                  <option value="">Select an appliance</option>
                  {SERVICES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div className="ts-field">
                <label htmlFor="ts-brand">Brand</label>
                <input id="ts-brand" name="brand" type="text" value={form.brand} onChange={handleFieldChange} />
              </div>
              <div className="ts-field">
                <label htmlFor="ts-preferredDate">Preferred date</label>
                <input id="ts-preferredDate" name="preferredDate" type="date" value={form.preferredDate} onChange={handleFieldChange} />
              </div>
              <div className="ts-field ts-field-full">
                <label htmlFor="ts-issue">What is the problem? *</label>
                <textarea id="ts-issue" name="issue" rows={4} required value={form.issue} onChange={handleFieldChange} />
              </div>
            </div>
            <label className="ts-consent">
              <input name="consent" type="checkbox" required checked={form.consent} onChange={handleFieldChange} />
              <span>I agree to be contacted by Top Speed Appliance about this request. *</span>
            </label>
            <button type="submit" className="ts-button ts-button-primary ts-submit">Submit Request</button>
            <p className="ts-privacy">Do not include payment card or other sensitive financial information in this form.</p>
          </form>
        </div>
      </section>
    </div>
  )
}

export default ServiceDirectoryPage
