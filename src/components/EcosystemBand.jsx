import React from 'react'
import { SERVICE_OS_WEB, openSpeedy } from '../lib/serviceOs'
import SpeedySpark from './SpeedySpark'

/**
 * The Top Speed Ecosystem band — shared layout, rendered above the
 * footer on every page (AppRoutes shell), so every landing page,
 * including all Marketing OS city/service/symptom pages, informs
 * customers about the whole ecosystem and keeps the Service OS and
 * Speedy one click away. All links are absolute to the flagship.
 */
const FAMILY = [
  { label: 'Book a Repair', path: '/book' },
  { label: 'Appliance Connect app', path: '/app' },
  { label: 'Track My Tech', path: '/track' },
  { label: 'Refer & Earn', path: '/refer', note: '$25 credit per completed referral' },
  { label: 'Offers & Rewards', path: '/offers-rewards' },
  { label: 'Appliance Connect Pro', path: '/connect-pro-site' },
  { label: 'Appliance Pro', path: '/appliance-pro-site', note: 'commercial' },
  { label: 'Cleanout Vents', path: '/cleanout-vents-site' },
  { label: 'Pepper Lists It', path: '/pepper-lists-site' },
  { label: 'Top Speed Group', path: '/group' },
]

export default function EcosystemBand() {
  return (
    <section className="os-eco" aria-label="The Top Speed Ecosystem">
      <div className="os-wrap">
        <h2 className="os-eco-title">The Top Speed Ecosystem</h2>
        <p className="os-eco-lede">
          Everything runs on one connected platform with Speedy AI at the center — booking,
          live tracking, parts, referrals, and service for homes, property managers, and
          businesses.
        </p>

        <nav className="os-eco-links" aria-label="Top Speed Ecosystem links">
          <a
            className="os-eco-chip os-eco-chip-main"
            href={SERVICE_OS_WEB}
            target="_blank"
            rel="noopener noreferrer"
          >
            Top Speed Service OS
          </a>
          {FAMILY.map((item) => (
            <a
              key={item.path}
              className="os-eco-chip"
              href={`${SERVICE_OS_WEB}${item.path}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
              {item.note ? <span className="os-eco-note">{item.note}</span> : null}
            </a>
          ))}
        </nav>

        <div className="os-eco-foot">
          <p className="os-eco-insight">
            <strong>Good to know:</strong> the $99 diagnostic is collected at booking and
            credited in full toward your approved repair — and every booking gets live
            8-stage tracking.
          </p>
          <button type="button" className="os-eco-tell" onClick={openSpeedy}>
            <SpeedySpark size={20} /> Tell Speedy
          </button>
        </div>
      </div>
    </section>
  )
}
