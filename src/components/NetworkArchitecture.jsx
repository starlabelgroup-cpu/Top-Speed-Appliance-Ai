import React from 'react'
import '../styles/network-architecture.css'

export default function NetworkArchitecture() {
  return (
    <div className="network-architecture">
      <section className="network-hero">
        <div className="network-hero-content">
          <h1>TopSpeed Appliance Network</h1>
          <p>An integrated ecosystem connecting service dispatch, mobile apps, referral programs, and lead generation.</p>
        </div>
      </section>

      <section className="network-diagram">
        <div className="network-diagram-container">
          <img 
            src="https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2F02801329becc46649375ae70b13fee8b?format=webp&width=800"
            alt="Integrated Appliance Service Network showing TopSpeedAppliance.net hub connected to AppliancePro.net, ApplianceReferral.com, PrimeHomeConnect.com, and ApplianceConnect.com with sitemap and indexing infrastructure"
            className="network-diagram-image"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      <section className="network-overview">
        <h2>Network Architecture Overview</h2>
        <div className="network-grid">
          
          <div className="network-card hub-card">
            <h3>TopSpeedAppliance.net</h3>
            <p className="network-role">Authority Hub</p>
            <p className="network-description">Main appliance repair service authority with local SEO optimization.</p>
            <ul className="network-features">
              <li>4 Service Pages</li>
              <li>8 City Landing Pages</li>
              <li>Central coordination hub</li>
              <li>Primary booking platform</li>
            </ul>
            <a href="https://topspeedappliance.net" target="_blank" rel="noopener noreferrer" className="network-link-btn">Visit Site</a>
          </div>

          <div className="network-card satellite-card">
            <h3>AppliancePro.net</h3>
            <p className="network-role">Mobile App & Support</p>
            <p className="network-description">Mobile booking app and customer support platform.</p>
            <ul className="network-features">
              <li>iOS/Android App</li>
              <li>Real-time Tracking</li>
              <li>FAQ & Support</li>
              <li>Testimonials</li>
            </ul>
            <a href="https://appliancepro.net" target="_blank" rel="noopener noreferrer" className="network-link-btn">Visit Site</a>
          </div>

          <div className="network-card satellite-card">
            <h3>ApplianceReferral.com</h3>
            <p className="network-role">Referral Program</p>
            <p className="network-description">Customer referral and partnership network.</p>
            <ul className="network-features">
              <li>Earn Rewards</li>
              <li>Partner Businesses</li>
              <li>Referral Tracking</li>
              <li>Commission Management</li>
            </ul>
            <a href="https://appliancereferral.com" target="_blank" rel="noopener noreferrer" className="network-link-btn">Visit Site</a>
          </div>

          <div className="network-card satellite-card">
            <h3>PrimeHomeConnect.com</h3>
            <p className="network-role">SaaS Platform</p>
            <p className="network-description">Home service management and scheduling system.</p>
            <ul className="network-features">
              <li>Platform Integration</li>
              <li>Scheduling Tools</li>
              <li>Analytics Dashboard</li>
              <li>API Access</li>
            </ul>
            <a href="https://primehomeconnect.com" target="_blank" rel="noopener noreferrer" className="network-link-btn">Visit Site</a>
          </div>

          <div className="network-card satellite-card">
            <h3>ApplianceConnect.com</h3>
            <p className="network-role">Lead Generation</p>
            <p className="network-description">Lead capture and routing platform.</p>
            <ul className="network-features">
              <li>Quote Requests</li>
              <li>Lead Routing</li>
              <li>Service Areas</li>
              <li>Integration APIs</li>
            </ul>
            <a href="https://applianceconnect.com" target="_blank" rel="noopener noreferrer" className="network-link-btn">Visit Site</a>
          </div>

        </div>
      </section>

      <section className="network-benefits">
        <h2>Network Benefits</h2>
        <div className="benefits-grid">
          
          <div className="benefit-card">
            <h3>🔗 Interconnected Authority</h3>
            <p>Cross-domain interlinking distributes SEO authority across all 5 properties, boosting search visibility and organic rankings.</p>
          </div>

          <div className="benefit-card">
            <h3>📊 Unified Analytics</h3>
            <p>Cross-domain GA4 tracking monitors user journeys across the entire network, enabling precise attribution and optimization.</p>
          </div>

          <div className="benefit-card">
            <h3>👥 Multi-Channel Conversion</h3>
            <p>Users can engage through their preferred channel—direct booking, app, referral, or lead generation—increasing conversion opportunities.</p>
          </div>

          <div className="benefit-card">
            <h3>🎯 Local SEO Dominance</h3>
            <p>Multiple properties targeting local keywords create comprehensive coverage in local search results and Google Maps.</p>
          </div>

          <div className="benefit-card">
            <h3>🚀 Rapid Scaling</h3>
            <p>Satellite platforms enable feature expansion without burdening the main site, improving scalability and user experience.</p>
          </div>

          <div className="benefit-card">
            <h3>💰 Revenue Diversification</h3>
            <p>Referral program, SaaS platform, and lead generation create multiple revenue streams beyond direct service bookings.</p>
          </div>

        </div>
      </section>

      <section className="network-seo">
        <h2>SEO Strategy & Interlinking</h2>
        
        <div className="seo-strategy">
          <div className="strategy-section">
            <h3>1. Footer Network Links</h3>
            <p>Every page across all sites includes links to the other network properties, distributing link equity and improving navigation.</p>
            <code className="code-block">
AppliancePro.net | Referral Program | PrimeHomeConnect | Lead Requests
            </code>
          </div>

          <div className="strategy-section">
            <h3>2. Robots.txt Coordination</h3>
            <p>All 5 sitemaps are declared in a centralized robots.txt, signaling to search engines to crawl and index the entire network.</p>
            <code className="code-block">
Sitemap: https://topspeedappliance.com/sitemap.xml
Sitemap: https://appliancepro.net/sitemap.xml
Sitemap: https://appliancereferral.com/sitemap.xml
Sitemap: https://primehomeconnect.com/sitemap.xml
Sitemap: https://applianceconnect.com/sitemap.xml
            </code>
          </div>

          <div className="strategy-section">
            <h3>3. Schema.org Organization Markup</h3>
            <p>Structured data declares the organizational relationships, enabling Google to consolidate the network in the Knowledge Graph.</p>
          </div>

          <div className="strategy-section">
            <h3>4. Contextual Content Interlinking</h3>
            <p>Blog posts and service pages feature contextual links to relevant satellite properties, improving user engagement and SEO equity.</p>
          </div>

          <div className="strategy-section">
            <h3>5. UTM Tracking</h3>
            <p>All cross-domain links include UTM parameters for precise conversion attribution in GA4, enabling optimization by traffic source.</p>
          </div>

          <div className="strategy-section">
            <h3>6. Canonical Tag Strategy</h3>
            <p>Duplicate content across domains uses canonical tags pointing to TopSpeed primary pages, preventing penalties and consolidating ranking signals.</p>
          </div>
        </div>
      </section>

      <section className="network-timeline">
        <h2>Implementation Timeline & KPIs</h2>
        
        <div className="timeline">
          <div className="timeline-phase">
            <h3>Phase 1: Foundation (Week 1-2)</h3>
            <p className="timeline-status">✅ Complete</p>
            <ul>
              <li>Footer interlinking deployed</li>
              <li>Robots.txt updated with all sitemaps</li>
              <li>Schema.org markup implemented</li>
            </ul>
          </div>

          <div className="timeline-phase">
            <h3>Phase 2: Satellite Setup (Week 3-4)</h3>
            <p className="timeline-status">🔄 In Progress</p>
            <ul>
              <li>Configure each satellite domain</li>
              <li>Add TopSpeed footer links</li>
              <li>Implement canonical tags</li>
            </ul>
          </div>

          <div className="timeline-phase">
            <h3>Phase 3: Content Interlinking (Week 5-8)</h3>
            <p className="timeline-status">⏳ Pending</p>
            <ul>
              <li>Add contextual blog links</li>
              <li>Create network-focused content</li>
              <li>Update service pages</li>
            </ul>
          </div>

          <div className="timeline-phase">
            <h3>Phase 4: Optimization (Month 2-3)</h3>
            <p className="timeline-status">📊 Monitoring</p>
            <ul>
              <li>Track GA4 cross-domain traffic</li>
              <li>Monitor Search Console rankings</li>
              <li>Optimize based on performance</li>
            </ul>
          </div>
        </div>

        <div className="kpi-targets">
          <h3>Expected Outcomes (6-12 Months)</h3>
          <table className="kpi-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Current</th>
                <th>Target</th>
                <th>Timeline</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Organic Traffic</td>
                <td>Baseline</td>
                <td>+25-35%</td>
                <td>6 months</td>
              </tr>
              <tr>
                <td>Referral Traffic</td>
                <td>Baseline</td>
                <td>+40-60%</td>
                <td>6 months</td>
              </tr>
              <tr>
                <td>Local Rankings</td>
                <td>Position 15-20</td>
                <td>Position 5-10</td>
                <td>6-12 months</td>
              </tr>
              <tr>
                <td>Domain Authority</td>
                <td>Current DA</td>
                <td>+5-10 points</td>
                <td>12 months</td>
              </tr>
              <tr>
                <td>Indexed Pages</td>
                <td>~50</td>
                <td>150-200</td>
                <td>3-6 months</td>
              </tr>
              <tr>
                <td>Cross-Domain Sessions</td>
                <td>0</td>
                <td>Tracked in GA4</td>
                <td>Ongoing</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="network-cta">
        <div className="network-cta-content">
          <h2>Ready to Scale Your Appliance Service Network?</h2>
          <p>Start implementing the complete network strategy with coordinated interlinking, analytics, and optimization.</p>
          <div className="network-cta-buttons">
            <a href="https://topspeedappliance.net/washer-repair" className="cta-button primary-btn">Book Service Now</a>
            <a href="/privacy" className="cta-button secondary-btn">View Full Guide</a>
          </div>
        </div>
      </section>
    </div>
  )
}
