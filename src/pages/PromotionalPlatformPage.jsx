import React from 'react'
import PromotionalBroadcasting from '../components/PromotionalBroadcasting'

function PromotionalPlatformPage() {
  return (
    <div className="promotional-platform-page">
      <section className="promo-page-header">
        <div className="promo-page-content">
          <h1>Top Speed Appliance Promotional Broadcasting Platform</h1>
          <p className="promo-page-subtitle">
            Experience our award-winning appliance repair service through professional media showcasing our expertise, team, and customer satisfaction
          </p>
          <a href="https://book.housecallpro.com/book/TopSpeed-Appliance/0c0fcb09005e47239b0bd7d487e9d468?v2=true" target="_blank" rel="noopener noreferrer" className="cta-button">
            Schedule Your Repair Now
          </a>
        </div>
      </section>

      <PromotionalBroadcasting />

      <section className="promo-page-footer">
        <div className="promo-footer-content">
          <h2>Why Choose Top Speed Appliance?</h2>
          <div className="promo-benefits-grid">
            <div className="promo-benefit-item">
              <div className="promo-benefit-icon">⚡</div>
              <h3>Fast Response</h3>
              <p>Same-day service available for most repairs in South Florida</p>
            </div>
            <div className="promo-benefit-item">
              <div className="promo-benefit-icon">✓</div>
              <h3>Certified Experts</h3>
              <p>Professional technicians trained on all major appliance brands</p>
            </div>
            <div className="promo-benefit-item">
              <div className="promo-benefit-icon">💰</div>
              <h3>Transparent Pricing</h3>
              <p>No hidden fees or surprise charges on any repair</p>
            </div>
            <div className="promo-benefit-item">
              <div className="promo-benefit-icon">🔧</div>
              <h3>Quality Guaranteed</h3>
              <p>Genuine parts and warranty on all repairs</p>
            </div>
          </div>

          <div className="promo-footer-cta">
            <h3>Ready to Experience Top Speed Service?</h3>
            <p>Join thousands of satisfied customers across South Florida</p>
            <div className="promo-footer-actions">
              <a href="https://book.housecallpro.com/book/TopSpeed-Appliance/0c0fcb09005e47239b0bd7d487e9d468?v2=true" target="_blank" rel="noopener noreferrer" className="cta-button primary-btn">
                Book Your Repair
              </a>
              <a href="tel:(954)931-7997" className="cta-button secondary-btn">
                Call (954) 931-7997
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PromotionalPlatformPage
