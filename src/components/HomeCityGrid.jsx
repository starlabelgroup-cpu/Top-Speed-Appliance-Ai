import { Link } from 'react-router-dom'
import { LOCATION_SERVICE_PAGES } from '../data/locationServicePages'
import '../styles/home-page.css'

const formatServiceName = (slug) =>
  slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

const cities = LOCATION_SERVICE_PAGES.reduce((acc, page) => {
  if (!acc[page.citySlug]) {
    acc[page.citySlug] = { name: page.cityName, pages: [] }
  }
  acc[page.citySlug].pages.push(page)
  return acc
}, {})

function HomeCityGrid() {
  return (
    <section id="service-areas-grid" className="home-city-grid">
      <h2>Appliance Repair by City</h2>
      <p className="home-city-grid-subtitle">Local technicians across South Florida. Pick your city and appliance.</p>

      <div className="home-city-grid-cards">
        {Object.entries(cities).map(([citySlug, city]) => (
          <article className="home-city-card" key={citySlug}>
            <h3>{city.name}</h3>
            <ul className="home-city-links">
              {city.pages.map((page) => (
                <li key={page.canonicalPath}>
                  <Link to={page.canonicalPath}>{formatServiceName(page.serviceSlug)}</Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <Link to="/service-areas" className="cta-button">View All Service Areas</Link>
    </section>
  )
}

export default HomeCityGrid
