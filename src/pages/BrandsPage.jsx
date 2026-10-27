import React, { useEffect } from 'react'
import { SEO_BRANDS } from '../data/seoLeadData'
import '../styles/brands-page.css'

const HOUSECALL_BOOKING_URL = 'https://book.housecallpro.com/book/TopSpeed-Appliance/0c0fcb09005e47239b0bd7d487e9d468?v2=true'

function BrandsPage() {
  useEffect(() => {
    document.title = 'Appliance Brands We Repair | Top Speed Appliance'
  }, [])

  return (
    <main className="brands-page">
      <section className="brands-hero">
        <h1>Appliance Brands We Repair</h1>
        <p>Top Speed Appliance repairs major appliance brands across South Florida. Book online with HousecallPro or email us your request.</p>
      </section>

      <section className="brands-grid-section">
        <ul className="brands-grid">
          {SEO_BRANDS.map((brand) => (
            <li key={brand} className="brand-tile">
              <h2>{brand}</h2>
              <div className="brand-booking-actions">
                <a
                  href={HOUSECALL_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-booking-btn"
                >
                  Book with HousecallPro
                </a>
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
