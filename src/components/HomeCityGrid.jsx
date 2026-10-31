import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { LOCATION_SERVICE_PAGES } from '../data/locationServicePages'
import { BOOKING_CONFIG } from '../config/bookingConfig'
import '../styles/home-page.css'

const cities = Object.values(
  LOCATION_SERVICE_PAGES.reduce((acc, page) => {
    if (!acc[page.citySlug]) {
      acc[page.citySlug] = { slug: page.citySlug, name: page.cityName, county: page.county, pages: [] }
    }
    acc[page.citySlug].pages.push(page)
    return acc
  }, {})
)

const appliances = Array.from(
  new Map(LOCATION_SERVICE_PAGES.map((page) => [page.serviceSlug, page.serviceName])).entries()
).map(([slug, name]) => ({ slug, name }))

function HomeCityGrid() {
  const [query, setQuery] = useState('')
  const [activeCity, setActiveCity] = useState('all')
  const [activeAppliance, setActiveAppliance] = useState('all')

  const visibleCities = useMemo(() => {
    const term = query.trim().toLowerCase()
    return cities
      .filter((city) => activeCity === 'all' || city.slug === activeCity)
      .filter((city) => !term || city.name.toLowerCase().includes(term) || city.county.toLowerCase().includes(term))
      .map((city) => ({
        ...city,
        pages: city.pages.filter((page) => activeAppliance === 'all' || page.serviceSlug === activeAppliance),
      }))
      .filter((city) => city.pages.length > 0)
  }, [query, activeCity, activeAppliance])

  const totalServices = visibleCities.reduce((sum, city) => sum + city.pages.length, 0)

  const resetFilters = () => {
    setQuery('')
    setActiveCity('all')
    setActiveAppliance('all')
  }

  return (
    <section id="service-areas-grid" className="home-city-grid">
      <p className="home-city-eyebrow">Local Service Directory</p>
      <h2>Appliance Repair by City</h2>
      <p className="home-city-grid-subtitle">
        Find appliance repair in your city. Choose an appliance, then pick the local page for same-day service options.
      </p>

      <div className="home-city-controls" role="search">
        <div className="home-city-field">
          <label htmlFor="home-city-search">Search city or county</label>
          <input
            id="home-city-search"
            type="search"
            placeholder="e.g. Boca Raton or Broward"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="home-city-field">
          <label htmlFor="home-city-select">City</label>
          <select id="home-city-select" value={activeCity} onChange={(e) => setActiveCity(e.target.value)}>
            <option value="all">All cities</option>
            {cities.map((city) => (
              <option key={city.slug} value={city.slug}>{city.name}</option>
            ))}
          </select>
        </div>
        <div className="home-city-field">
          <label htmlFor="home-appliance-select">Appliance</label>
          <select id="home-appliance-select" value={activeAppliance} onChange={(e) => setActiveAppliance(e.target.value)}>
            <option value="all">All appliances</option>
            {appliances.map((appliance) => (
              <option key={appliance.slug} value={appliance.slug}>{appliance.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="home-city-chips" aria-label="Quick city filter">
        <button
          type="button"
          className={activeCity === 'all' ? 'is-active' : ''}
          onClick={() => setActiveCity('all')}
        >
          All cities
        </button>
        {cities.map((city) => (
          <button
            type="button"
            key={city.slug}
            className={activeCity === city.slug ? 'is-active' : ''}
            onClick={() => setActiveCity(city.slug)}
          >
            {city.name}
          </button>
        ))}
      </div>

      <p className="home-city-count" aria-live="polite">
        {totalServices} local {totalServices === 1 ? 'page' : 'pages'} available
      </p>

      {visibleCities.length > 0 ? (
        <div className="home-city-grid-cards">
          {visibleCities.map((city) => (
            <article className="home-city-card" key={city.slug}>
              <header>
                <h3>{city.name}</h3>
                <span>{city.county}</span>
              </header>
              <ul className="home-city-links">
                {city.pages.map((page) => (
                  <li key={page.canonicalPath}>
                    <Link to={page.canonicalPath}>
                      <span>{page.serviceName}</span>
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      ) : (
        <div className="home-city-empty">
          <p>No local pages match those filters.</p>
          <button type="button" onClick={resetFilters}>Clear filters</button>
        </div>
      )}

      <div className="home-city-help">
        <div>
          <h3>Need help choosing next steps?</h3>
          <p>Call our team or book online and we will confirm the right visit for your appliance.</p>
        </div>
        <div className="home-city-help-actions">
          <a href={BOOKING_CONFIG.PHONE_LINK}>Call {BOOKING_CONFIG.PHONE_NUMBER}</a>
          <a href={BOOKING_CONFIG.BOOKING_URL} target="_blank" rel="noopener noreferrer">Book Online</a>
        </div>
      </div>

      <Link to="/service-areas" className="cta-button">View All Service Areas</Link>
    </section>
  )
}

export default HomeCityGrid
