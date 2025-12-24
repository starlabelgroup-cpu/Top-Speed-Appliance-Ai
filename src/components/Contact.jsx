import React, { useState } from 'react'
import { BOOKING_CONFIG } from '../config/bookingConfig'

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Message sent! We'll get back to you shortly.")
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="contact">
      <h2>Contact Us</h2>
      <div className="contact-content">
        <div className="contact-info">
          <div className="info-item">
            <span className="info-icon">📍</span>
            <div>
              <h3>Address</h3>
              <p>10120 NW 53rd St<br/>South Florida, 33351</p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">📞</span>
            <div>
              <h3>Phone</h3>
              <p>(954) 931-7997</p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">📧</span>
            <div>
              <h3>Email</h3>
              <p>service@topspeedappliance.net</p>
            </div>
          </div>
        </div>

        <div className="google-section">
          <h3>Connect With Us</h3>
          <p>Book your service, leave a review, or share us on Google</p>
          <div className="google-buttons">
            <a
              href={BOOKING_CONFIG.BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="google-btn housecall-pro-btn"
              title="Book service on HouseCall Pro"
              aria-label="HouseCall Pro - Book Your Service"
            >
              <span className="google-icon">📅</span>
              <span className="btn-text">Book Service</span>
            </a>

            <a
              href="https://g.page/r/CcII31xB8cIPEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="google-btn google-reviews"
              title="Leave a review on Google"
              aria-label="Google Reviews - Leave a Review"
            >
              <span className="google-icon">⭐</span>
              <span className="btn-text">Google Reviews</span>
            </a>

            <a
              href="https://share.google/HzHi48xJlsGcjDJkS"
              target="_blank"
              rel="noopener noreferrer"
              className="google-btn google-share"
              title="Share our business on Google"
              aria-label="Google Share - Share Top Speed Appliance"
            >
              <span className="google-icon">📤</span>
              <span className="btn-text">Share Us</span>
            </a>

            <a
              href="https://www.google.com/search?q=12328780520724801902"
              target="_blank"
              rel="noopener noreferrer"
              className="google-btn google-business"
              title="Visit our Google Business Profile"
              aria-label="Google Business - View Profile"
            >
              <span className="google-icon">🔍</span>
              <span className="btn-text">Google Business</span>
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            required
          />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  )
}

export default Contact
