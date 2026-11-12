import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer footer-os">
      <a
        href="https://topspeedserviceos.com/advertise"
        target="_blank"
        rel="noopener noreferrer"
        className="os-ad-strip"
      >
        YOUR BUSINESS HERE — Advertise on Top Speed
      </a>
      <p className="os-foot-nav">
        <Link to="/#services">Services</Link> &nbsp;•&nbsp;{' '}
        <Link to="/commercial-appliance-repair">Commercial</Link> &nbsp;•&nbsp;{' '}
        <a href="https://topspeedserviceos.com/property-managers" target="_blank" rel="noopener noreferrer">Property Managers</a> &nbsp;•&nbsp;{' '}
        <a href="https://topspeedapplianceservice.com" target="_blank" rel="noopener noreferrer">Provider Network</a> &nbsp;•&nbsp;{' '}
        <Link to="/track">Track My Tech</Link> &nbsp;•&nbsp;{' '}
        <Link to="/refer">Refer &amp; Earn</Link> &nbsp;•&nbsp;{' '}
        <Link to="/media-os">Media OS</Link>
      </p>
      <p className="os-foot-nav">
        <Link to="/pricing">Pricing</Link> &nbsp;•&nbsp;{' '}
        <Link to="/warranty">Warranty</Link> &nbsp;•&nbsp;{' '}
        <Link to="/service-areas">Service Areas</Link> &nbsp;•&nbsp;{' '}
        <Link to="/service-directory">Directory</Link> &nbsp;•&nbsp;{' '}
        <Link to="/blog">Blog</Link> &nbsp;•&nbsp;{' '}
        <Link to="/brands">Brands</Link> &nbsp;•&nbsp;{' '}
        <Link to="/account">Account</Link>
      </p>
      <p className="os-foot-contact">(954) 931-7997 &nbsp;•&nbsp; service@topspeedappliance.net</p>
      <p>© {new Date().getFullYear()} Top Speed Appliance LLC — The Faster, The Better.</p>
      <p>Fast • Reliable • Professional</p>
      <p>6810 N State Rd 7, Suite 341, Coconut Creek, FL 33073</p>

      <div className="footer-links-wrapper">
        <Link to="/privacy" className="footer-link">Privacy Policy</Link>
      </div>

      <div className="footer-social" aria-label="Social media">
        <a
          className="footer-social-link"
          href="https://www.facebook.com/profile.php?id=61583446045420"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Top Speed Appliance on Facebook"
          title="Facebook"
        >
          <span className="footer-social-icon" aria-hidden="true">
            <svg className="footer-social-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.2 8.5V6.9c0-.8.5-1 1-1h1.5V3h-2.3C12 3 10.8 4.6 10.8 6.7v1.8H9v3h1.8V21h3.4v-9.5H16.5l.4-3h-2.7Z" fill="currentColor"/>
            </svg>
          </span>
        </a>

        <a
          className="footer-social-link"
          href="https://www.instagram.com/topspeedappliance/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Top Speed Appliance on Instagram"
          title="Instagram"
        >
          <span className="footer-social-icon" aria-hidden="true">
            <svg className="footer-social-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" fill="currentColor"/>
              <path d="M16.9 3.5H7.1A3.6 3.6 0 0 0 3.5 7.1v9.8A3.6 3.6 0 0 0 7.1 20.5h9.8a3.6 3.6 0 0 0 3.6-3.6V7.1a3.6 3.6 0 0 0-3.6-3.6Zm1.9 13.4a1.9 1.9 0 0 1-1.9 1.9H7.1a1.9 1.9 0 0 1-1.9-1.9V7.1c0-1 .8-1.9 1.9-1.9h9.8c1 0 1.9.8 1.9 1.9v9.8Z" fill="currentColor"/>
              <path d="M17.6 6.9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="currentColor"/>
            </svg>
          </span>
        </a>
      </div>

      <img src="https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Faa11a37d4c46448dbb38b23141033072?format=webp&width=800" alt="Top Speed Appliance Flag" className="footer-flag" loading="lazy" decoding="async" />
    </footer>
  )
}

export default Footer
