import React from 'react'
import { Link } from 'react-router-dom'

function Privacy() {
  return (
    <section id="privacy" className="privacy">
      <div className="privacy-container">
        <Link to="/" className="back-link">← Back to Home</Link>

        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: January 2024</p>

        <div className="privacy-content">
          <section className="privacy-section">
            <h2>Introduction</h2>
            <p>Top Speed Appliance ("we," "us," "our," or "Company") respects the privacy of our users ("user" or "you"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.</p>
          </section>

          <section className="privacy-section">
            <h2>1. Information We Collect</h2>
            <p>We may collect information about you in a variety of ways. The information we may collect on our website includes:</p>
            <ul>
              <li><strong>Personal Data:</strong> Name, email address, phone number, billing address, service address, and payment information when you book a service or contact us.</li>
              <li><strong>Device Information:</strong> Browser type, operating system, device type, and IP address.</li>
              <li><strong>Usage Information:</strong> Pages visited, time spent on pages, links clicked, and referral source.</li>
              <li><strong>Location Information:</strong> General location based on IP address or information you provide.</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>2. Use of Your Information</h2>
            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via our website to:</p>
            <ul>
              <li>Process your booking requests and service appointments</li>
              <li>Send you promotional communications about special offers and updates</li>
              <li>Follow up with you regarding your service experience</li>
              <li>Respond to your inquiries and customer service requests</li>
              <li>Generate analytics about our website and marketing effectiveness</li>
              <li>Prevent fraudulent transactions and other illegal activities</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>3. Disclosure of Your Information</h2>
            <p>We may share information we have collected about you in certain situations:</p>
            <ul>
              <li><strong>Service Providers:</strong> We may share your information with third parties who perform services on our behalf, including payment processors, booking platforms, and customer service providers.</li>
              <li><strong>Legal Compliance:</strong> If required by law or when we believe in good faith that disclosure is necessary to protect our rights, your safety, or the safety of others.</li>
              <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or bankruptcy, your information may be transferred as part of that transaction.</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>4. Security of Your Information</h2>
            <p>We use administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.</p>
          </section>

          <section className="privacy-section">
            <h2>5. Contact Information</h2>
            <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
            <div className="contact-info">
              <p><strong>Top Speed Appliance</strong></p>
              <p><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.2 4h3.4l1.4 4.2-2.1 1.7a13.5 13.5 0 0 0 6.2 6.2l1.7-2.1L20 15.4v3.4a2 2 0 0 1-2.1 2A16.5 16.5 0 0 1 3.2 6.1 2 2 0 0 1 5.2 4z"/><path d="M15.5 3.5a7 7 0 0 1 5 5M15.5 6.8a3.8 3.8 0 0 1 1.7 1.7" stroke="#E8322E"/></svg> <a href="tel:9549317997">(954) 931-7997</a></p>
              <p><svg className="fxi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="6" width="18" height="12.5" rx="2.2"/><path d="M3.8 7.4L12 13l8.2-5.6" stroke="#E8322E"/></svg> <a href="mailto:service@topspeedappliance.net">service@topspeedappliance.net</a></p>
            </div>
          </section>

          <section className="privacy-section">
            <h2>6. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by updating the "Last Updated" date of this Privacy Policy.</p>
          </section>

          <section className="privacy-section">
            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Request access to your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information (subject to certain legal obligations)</li>
              <li>Opt-out of promotional communications</li>
              <li>Request a copy of your information in a portable format</li>
            </ul>
            <p>To exercise any of these rights, please contact us using the information provided above.</p>
          </section>

          <section className="privacy-section">
            <h2>8. Cookies and Tracking Technologies</h2>
            <p>Our website uses cookies and similar tracking technologies to enhance your experience. These may include session cookies (which expire when you close your browser) and persistent cookies (which remain until deleted). You can control cookie settings through your browser preferences, though some website features may not function properly if cookies are disabled.</p>
          </section>
        </div>

        <div className="privacy-footer-cta">
          <p>Have questions about our privacy practices?</p>
          <a href="#contact" className="cta-button">Contact Us</a>
        </div>
      </div>
    </section>
  )
}

export default Privacy
