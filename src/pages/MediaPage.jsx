import React from 'react'
import { SERVICE_OS_LINKS } from '../lib/serviceOs'

/**
 * Media OS / Top Speed 360 — Figma frame 05.
 *
 * Phase 4 linkage: the Media OS itself is LIVE on the Service OS
 * (topspeedserviceos.com/media with /videos, /live, /publishing,
 * /news and /social), so this hub's cards link into those real pages.
 * Top Speed 360 as a standalone brand/company is still in design —
 * its domains are a separate purchase step and it has NOT launched
 * as a standalone company yet.
 */

const VIDEOS = [
  { title: 'Why your fridge isn’t cooling', meta: '6:42  •  Repair Library' },
  { title: 'Washer won’t drain? Check this first', meta: '4:18  •  Repair Library' },
  { title: 'Inside a same-day oven repair', meta: '9:05  •  From the Field' },
]

const NEWS = [
  { cat: 'Appliance news', headline: 'New energy standards for refrigerators — what changes at home' },
  { cat: 'Top Speed announcements', headline: 'Service OS opens provider applications across Broward' },
  { cat: 'Community', headline: 'Comments, questions and discussions on every story' },
]

export default function MediaPage() {
  return (
    <div className="os-media">
      <div className="os-media-top">
        <div className="os-wrap os-media-top-inner">
          <div className="os-media-logo">
            <span className="top">TOP SPEED 360</span>
            <span className="sub">MEDIA OS</span>
          </div>
          <nav className="os-media-nav" aria-label="Media OS">
            <a href={SERVICE_OS_LINKS.mediaVideos} target="_blank" rel="noopener noreferrer">Watch</a>
            <a href={SERVICE_OS_LINKS.mediaPublishing} target="_blank" rel="noopener noreferrer">Learn</a>
            <a href={SERVICE_OS_LINKS.mediaNews} target="_blank" rel="noopener noreferrer">News</a>
            <a href={SERVICE_OS_LINKS.mediaLive} target="_blank" rel="noopener noreferrer">Live Events</a>
            <a href="#fast-lane">Newsletter</a>
          </nav>
          <span className="os-pill os-pill-design">Top Speed 360 — In Design</span>
        </div>
      </div>

      <div className="os-wrap">
        <div className="os-media-hero">
          <h1>
            The media company
            <span className="sky">built on the Service OS.</span>
          </h1>
          <p>
            Repair know-how, local stories, live demonstrations and the Top Speed world — published
            from the same platform that runs the service business.
          </p>
          <p>
            Media OS is live on the Service OS —{' '}
            <a href={SERVICE_OS_LINKS.media} target="_blank" rel="noopener noreferrer">
              open topspeedserviceos.com/media →
            </a>
          </p>
        </div>

        <h2 className="os-media-kicker" id="watch">VIDEO KNOWLEDGE BASE</h2>
        <div className="os-vid-grid">
          {VIDEOS.map((v) => (
            <a
              key={v.title}
              className="os-vid-card"
              href={SERVICE_OS_LINKS.mediaVideos}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="os-vid-thumb">
                <span aria-hidden="true">▶</span>
                <span className="os-pill os-pill-design tag">In Production</span>
              </div>
              <div className="os-vid-body">
                <h3>{v.title}</h3>
                <span className="meta">{v.meta}</span>
              </div>
            </a>
          ))}
        </div>

        <div className="os-media-cols">
          <div className="os-news-card" id="newsroom">
            <h2 className="os-media-kicker">DIGITAL NEWSROOM</h2>
            {NEWS.map((n) => (
              <a
                key={n.headline}
                className="os-news-row"
                href={SERVICE_OS_LINKS.mediaNews}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="cat">{n.cat}</span>
                <div className="headline">{n.headline}</div>
              </a>
            ))}
          </div>
          <div className="os-live-card" id="live">
            <p className="kicker">LIVE EVENTS</p>
            <h3>Scheduled repair demonstrations</h3>
            <p>
              Watch a real diagnosis live, ask questions in chat, and book the same service for
              your home — straight into Book OS.
            </p>
            <a className="os-btn os-btn-white" href={SERVICE_OS_LINKS.mediaLive} target="_blank" rel="noopener noreferrer">See the schedule on Media OS Live</a>
          </div>
        </div>

        <div className="os-newsletter-card" id="fast-lane">
          <div>
            <p className="kicker">THE FAST LANE — NEWSLETTER</p>
            <p>
              One useful email a week. Maintenance reminders for YOUR appliances, local offers,
              and the best of 360.
            </p>
            <p className="fine">Powered by the Service OS account + Appliance Connect data — with consent, always.</p>
          </div>
          <div className="os-newsletter-join">
            <a
              className="os-btn os-btn-red os-btn-block"
              href={SERVICE_OS_LINKS.app}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join with your Top Speed account
            </a>
            <p className="hint">
              The Fast Lane sends from the Service OS. Your free account is the signup — no separate
              list, no spam, unsubscribe anytime.
            </p>
          </div>
        </div>

        <p className="os-media-status">
          MEDIA OS STATUS — live on the Service OS:{' '}
          <a href={SERVICE_OS_LINKS.mediaVideos} target="_blank" rel="noopener noreferrer">videos</a>,{' '}
          <a href={SERVICE_OS_LINKS.mediaLive} target="_blank" rel="noopener noreferrer">live events</a>,{' '}
          <a href={SERVICE_OS_LINKS.mediaPublishing} target="_blank" rel="noopener noreferrer">publishing</a>,{' '}
          <a href={SERVICE_OS_LINKS.mediaNews} target="_blank" rel="noopener noreferrer">news</a> and{' '}
          <a href={SERVICE_OS_LINKS.mediaSocial} target="_blank" rel="noopener noreferrer">social</a>.
          Publishing runs on Service OS accounts, bookings and CRM. Top Speed 360 as a standalone
          brand is still in design — its domains are a separate purchase step.
        </p>
        <p className="os-media-flywheel">
          Every video, story and event ends in the same flywheel: watch → learn → book → track →
          review → refer.
        </p>
      </div>
    </div>
  )
}
