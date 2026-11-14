import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SERVICE_OS_LINKS, useAttributionSearch, withAttribution } from '../lib/serviceOs'
import './ServiceDirectoryPage.css'
import { openSpeedy } from '../lib/serviceOs'


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

function pushDataLayer(event, payload = {}) {
  if (typeof window === 'undefined' || !Array.isArray(window.dataLayer)) return
  window.dataLayer.push({ event, ...payload })
}

function ServiceDirectoryPage() {
  const attrQs = useAttributionSearch()
  const [filters, setFilters] = useState({ service: '', city: '' })
  const [draftFilters, setDraftFilters] = useState({ service: '', city: '' })

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

  return (
    <div className="ts-directory">
      <section className="ts-hero">
        <div className="ts-hero-content">
          <span className="ts-eyebrow ts-eyebrow-light">SERVICE DIRECTORY</span>
          <h1>Find <em>Appliance Repair</em> Near You</h1>
          <p>Choose your appliance and city to find the right repair page, then book online or call our team.</p>
          <div className="ts-hero-actions">
            <button type="button" className="ts-button ts-button-light" onClick={openSpeedy}>Book Online</button>
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
              <Link className="ts-text-button" to={withAttribution(s.to, attrQs)}>View service details</Link>
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
            <Link className="ts-city-link" key={c.value} to={withAttribution(c.to, attrQs)}>
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
            <h3>Book online</h3>
            <p>Pick a time in our booking system.</p>
          </div>
          <div className="ts-step">
            <b>04</b>
            <h3>Call if needed</h3>
            <p>Call (954) 931-7997 with questions about your visit.</p>
          </div>
        </div>
      </section>

      <section className="ts-section">
        <div className="ts-section-heading">
          <span className="ts-eyebrow">TOP SPEED LOCAL OS</span>
          <h2>Also in the Local OS Directory</h2>
          <p>
            This directory lives inside Top Speed Local OS too — the Service OS home for our
            listings, service directory and reviews engine, built on the areas we actually
            serve. Bookings started there carry their source with them, same as bookings
            started here.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a className="ts-button ts-button-primary" href={SERVICE_OS_LINKS.localDirectory} target="_blank" rel="noopener noreferrer">
            Open the Local OS Directory
          </a>
          <a className="ts-button ts-button-primary" href={SERVICE_OS_LINKS.localReviews} target="_blank" rel="noopener noreferrer">
            See the Reviews Engine
          </a>
        </div>
      </section>

      <section className="ts-booking-section" id="service-request">
        <aside className="ts-booking-aside">
          <h2>Request a Repair Visit</h2>
          <p>Book your appointment online and choose a time that works for you.</p>
          <p>Prefer to talk? Call <a href="tel:9549317997">(954) 931-7997</a>.</p>
        </aside>
        <div className="ts-booking-main">
          <div className="ts-booking-form">
            <div className="ts-form-heading">
              <h2>Book Your Appointment</h2>
              <p>Pick your appliance, address, and preferred time in our online booking system.</p>
            </div>
            <button type="button" className="ts-button ts-button-primary ts-submit" onClick={openSpeedy}>
              Book Online with Speedy
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServiceDirectoryPage
