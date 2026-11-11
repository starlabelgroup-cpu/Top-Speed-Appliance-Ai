import React from 'react'
import { SERVICE_OS_LINKS } from '../lib/serviceOs'

/**
 * Media OS / Top Speed 360 — Figma frame 05.
 *
 * Presented honestly as a build-out: Top Speed 360 is a full public
 * media company in design. Its domains are a separate purchase step
 * and it has NOT launched as a standalone company yet — this hub is
 * the front door while publishing is built on the Service OS.
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
            <a href="#watch">Watch</a>
            <a href="#newsroom">Learn</a>
            <a href="#newsroom">News</a>
            <a href="#live">Live Events</a>
            <a href="#fast-lane">Newsletter</a>
          </nav>
          <span className="os-pill os-pill-design">In Design</span>
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
        </div>

        <h2 className="os-media-kicker" id="watch">VIDEO KNOWLEDGE BASE</h2>
        <div className="os-vid-grid">
          {VIDEOS.map((v) => (
            <article key={v.title} className="os-vid-card">
              <div className="os-vid-thumb">
                <span aria-hidden="true">▶</span>
                <span className="os-pill os-pill-design tag">In Production</span>
              </div>
              <div className="os-vid-body">
                <h3>{v.title}</h3>
                <span className="meta">{v.meta}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="os-media-cols">
          <div className="os-news-card" id="newsroom">
            <h2 className="os-media-kicker">DIGITAL NEWSROOM</h2>
            {NEWS.map((n) => (
              <div key={n.headline} className="os-news-row">
                <span className="cat">{n.cat}</span>
                <div className="headline">{n.headline}</div>
              </div>
            ))}
          </div>
          <div className="os-live-card" id="live">
            <p className="kicker">LIVE EVENTS</p>
            <h3>Scheduled repair demonstrations</h3>
            <p>
              Watch a real diagnosis live, ask questions in chat, and book the same service for
              your home — straight into Book OS.
            </p>
            <a className="os-btn os-btn-white" href="#fast-lane">See the schedule</a>
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
          MEDIA OS STATUS — design phase. Publishing runs on Service OS accounts, bookings and CRM;
          Top Speed 360 domains are a separate purchase step.
        </p>
        <p className="os-media-flywheel">
          Every video, story and event ends in the same flywheel: watch → learn → book → track →
          review → refer.
        </p>
      </div>
    </div>
  )
}
