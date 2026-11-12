import React from 'react'
import { openSpeedy } from '../lib/serviceOs'
import { SEO_BRANDS } from '../data/seoLeadData'
import '../styles/brands-page.css'


function BrandsPage() {
  return (
    <main className="brands-page">
      <section className="brands-hero">
        <h1>Appliance Brands We Repair</h1>
        <p>Top Speed Appliance repairs major appliance brands across South Florida. Book online with Speedy or email us your request.</p>
      </section>

      <section className="brands-grid-section">
        <ul className="brands-grid">
          {SEO_BRANDS.map((brand) => (
            <li key={brand} className="brand-tile">
              <h2>{brand}</h2>
              <div className="brand-booking-actions">
                <button
                  type="button"
                  onClick={openSpeedy}
                  className="brand-booking-btn"
                >
                  Book with Speedy
                </button>
                <a
                  href={`mailto:service@topspeedappliance.net?subject=${encodeURIComponent(`${brand} Appliance Repair Request`)}`}
                  className="brand-email-btn"
                >
                  Book by Email
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default BrandsPage
