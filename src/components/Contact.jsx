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
            <span className="info-icon"><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21.2S5 15.6 5 9.9a7 7 0 0 1 14 0c0 5.7-7 11.3-7 11.3z"/><circle cx="12" cy="9.9" r="2.6" stroke="#E8322E"/><circle cx="12" cy="9.9" r=".9" fill="#E8322E" stroke="none"/></svg></span>
            <div>
              <h3>Address</h3>
              <p>6810 N State Rd 7, Suite 341<br/>Coconut Creek, FL 33073</p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon"><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.2 4h3.4l1.4 4.2-2.1 1.7a13.5 13.5 0 0 0 6.2 6.2l1.7-2.1L20 15.4v3.4a2 2 0 0 1-2.1 2A16.5 16.5 0 0 1 3.2 6.1 2 2 0 0 1 5.2 4z"/><path d="M15.5 3.5a7 7 0 0 1 5 5M15.5 6.8a3.8 3.8 0 0 1 1.7 1.7" stroke="#E8322E"/></svg></span>
            <div>
              <h3>Phone</h3>
              <p>(954) 931-7997</p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon"><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="6" width="18" height="12.5" rx="2.2"/><path d="M3.8 7.4L12 13l8.2-5.6" stroke="#E8322E"/></svg></span>
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
              className="google-btn service-book-btn"
              title="Book service with the Top Speed Service Book"
              aria-label="Top Speed Service Book - Book Your Service"
            >
              <span className="google-icon"><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M7.5 3.5v4M16.5 3.5v4" stroke="#E8322E"/><path d="M7.4 14h2.2M11 14h2.2M14.6 14h2.2M7.4 17h2.2M11 17h2.2" strokeWidth="2"/></svg></span>
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
              <span className="google-icon"><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3.6l2.5 5.2 5.7.7-4.2 4 1.1 5.6L12 16.4l-5.1 2.7 1.1-5.6-4.2-4 5.7-.7z"/><circle cx="12" cy="11.4" r="1" fill="#E8322E" stroke="none"/></svg></span>
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
              <span className="google-icon"><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 14.5v3.7A1.8 1.8 0 0 0 5.8 20h12.4a1.8 1.8 0 0 0 1.8-1.8v-3.7"/><path d="M12 3.5v10M7.8 6.4L12 2.9l4.2 3.5" transform="translate(0 .8)"/><path d="M4 14.5h4.2l1.2 1.8h5.2l1.2-1.8H20" stroke="#E8322E"/></svg></span>
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
              <span className="google-icon"><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3"/><path d="M15.4 15.4L21 21M8.4 10.8h4.8" stroke="#E8322E"/></svg></span>
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
