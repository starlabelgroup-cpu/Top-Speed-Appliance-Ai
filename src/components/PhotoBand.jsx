import React from 'react'
import '../styles/photo-band.css'

const BOOKING_URL = 'https://book.housecallpro.com/book/TopSpeed-Appliance/0c0fcb09005e47239b0bd7d487e9d468?v2=true'

function PhotoBand({ className, eyebrow, title, text, ctaLabel, ctaHref = BOOKING_URL }) {
  return (
    <section className={`photo-band ${className}`}>
      <div className="photo-band-content">
        <p className="photo-band-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{text}</p>
        <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="cta-button">
          {ctaLabel}
        </a>
      </div>
    </section>
  )
}

export default PhotoBand
