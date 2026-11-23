import React, { useEffect, useState } from 'react'

/**
 * SocialStreamBlock (2026-11-23) — the Top Speed social + ads
 * streams for topspeedappliance.net, wired ONCE into the shared
 * templates (HomePage, LocationServicePage — every generated
 * city/service page — and CityPage) so every page carries them.
 *
 * Data comes from the Service OS public streams:
 *   GET https://top-speed-service-os.vercel.app/api/v1/facebook-os/feed
 *       — POSTED posts only from the official Facebook Page, each
 *         with its real facebook.com URL (Rule 1 deep link).
 *   GET https://top-speed-service-os.vercel.app/api/v1/ads-os/stream
 *       — POSTED ads-style posts (same honesty rule) + the standing
 *         offer cards (the published rate card + referral terms).
 *
 * Honesty rules, identical to the flagship includes: a block whose
 * stream has no posted posts renders NOTHING (no placeholder, no
 * invented posts); every card links to the post itself on
 * Facebook; all text renders as React text (escaped by React).
 */

const FEED_API = 'https://top-speed-service-os.vercel.app/api/v1/facebook-os/feed?limit=6'
const ADS_API = 'https://top-speed-service-os.vercel.app/api/v1/ads-os/stream?limit=6'
const PAGE_URL = 'https://www.facebook.com/profile.php?id=61596590488055'

const FORMAT_LABELS = {
  REPAIR_SPOTLIGHT: 'Repair Spotlight',
  SPEEDY_TIP: 'Speedy Tip',
  REWARDS_SAVINGS: 'Rewards & Savings',
  CITY_SPOTLIGHT: 'City Spotlight',
  QUICK_TIP: 'Quick Tip',
  REVIEW_INVITE: 'From our customers',
  AD_IDEA: 'Top Speed',
  ANNOUNCEMENT: 'Announcement',
  CUSTOM: 'Top Speed',
}

const CSS = `
.tssb{max-width:1120px;margin:34px auto;padding:0 20px}
.tssb-head{display:flex;justify-content:space-between;align-items:baseline;gap:14px;flex-wrap:wrap;margin-bottom:14px}
.tssb-head h2{font-size:24px;color:#071f4f;margin:0}
.tssb-page{font-weight:700;color:#1473ff;font-size:14.5px}
.tssb-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px}
.tssb-card,.tssb-offer{background:#fff;border:1px solid #d8e2f2;border-radius:14px;overflow:hidden;display:flex;flex-direction:column}
.tssb-offer{border-color:#f0c4c6;background:#fff8f8;padding:16px;gap:8px}
.tssb-media img{width:100%;height:auto;display:block}
.tssb-body{padding:16px;display:flex;flex-direction:column;gap:8px}
.tssb-kicker{font-size:11.5px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#5a6b82}
.tssb-offer .tssb-kicker{color:#b02020}
.tssb-title{font-size:17px;color:#071f4f;margin:0;line-height:1.35}
.tssb-copy{font-size:14.5px;color:#43536b;line-height:1.55;margin:0}
.tssb-lines{margin:0;padding-left:18px;font-size:14.5px;color:#43536b;line-height:1.6}
.tssb-link{font-weight:700;color:#e01a22;font-size:14.5px;margin-top:auto}
.tssb-cta{font-weight:800;color:#fff;background:#e01a22;border-radius:10px;padding:10px 14px;text-align:center;margin-top:auto;text-decoration:none}
`

function excerpt(copy) {
  const text = String(copy || '').replace(/\s+/g, ' ').trim()
  return text.length > 220 ? `${text.slice(0, 217)}…` : text
}

function fmtDate(value) {
  try {
    return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return ''
  }
}

function PostCard({ post, kickerPrefix }) {
  const date = fmtDate(post.postedAt)
  const kicker = `${kickerPrefix || FORMAT_LABELS[post.format] || 'Top Speed'}${date ? ` · ${date}` : ''}`
  return (
    <article className="tssb-card">
      {post.mediaUrl ? (
        <a className="tssb-media" href={post.url} target="_blank" rel="noopener noreferrer">
          <img src={post.mediaUrl} alt="" loading="lazy" />
        </a>
      ) : null}
      <div className="tssb-body">
        <span className="tssb-kicker">{kicker}</span>
        <h3 className="tssb-title">{post.title}</h3>
        <p className="tssb-copy">{excerpt(post.copy)}</p>
        <a className="tssb-link" href={post.url} target="_blank" rel="noopener noreferrer">See it on Facebook</a>
      </div>
    </article>
  )
}

export default function SocialStreamBlock() {
  const [feed, setFeed] = useState(null)
  const [ads, setAds] = useState(null)

  useEffect(() => {
    let live = true
    const load = (url, set) => {
      fetch(url, { headers: { Accept: 'application/json' } })
        .then((r) => (r.ok ? r.json() : null))
        .then((j) => { if (live && j && j.data) set(j.data) })
        .catch(() => { /* stream unreachable: render nothing */ })
    }
    load(FEED_API, setFeed)
    load(ADS_API, setAds)
    return () => { live = false }
  }, [])

  const feedPosts = (feed && feed.posts) || []
  const adPosts = (ads && ads.posts) || []
  const offers = (ads && ads.offers) || []
  if (!feedPosts.length && !adPosts.length) return null

  return (
    <>
      <style>{CSS}</style>
      {feedPosts.length ? (
        <section className="tssb" aria-label="Latest from Top Speed Posts by Pepper">
          <div className="tssb-head">
            <h2>Latest from Top Speed Posts by Pepper</h2>
            <a className="tssb-page" href={PAGE_URL} target="_blank" rel="noopener noreferrer">Follow Top Speed Appliance on Facebook</a>
          </div>
          <div className="tssb-grid">
            {feedPosts.slice(0, 3).map((p) => <PostCard key={p.id} post={p} />)}
          </div>
        </section>
      ) : null}
      {adPosts.length ? (
        <section className="tssb" aria-label="Top Speed Ads — offers and latest ads">
          <div className="tssb-head">
            <h2>Top Speed Ads — straight offers, real posts</h2>
            <a className="tssb-page" href={PAGE_URL} target="_blank" rel="noopener noreferrer">Follow Top Speed Appliance on Facebook</a>
          </div>
          <div className="tssb-grid">
            {offers.map((o) => (
              <article className="tssb-offer" key={o.key}>
                <span className="tssb-kicker">Top Speed offer</span>
                <h3 className="tssb-title">{o.title}</h3>
                <ul className="tssb-lines">
                  {(o.lines || []).map((l) => <li key={l}>{l}</li>)}
                </ul>
                {o.cta ? <a className="tssb-cta" href={o.cta.url}>{o.cta.label}</a> : null}
              </article>
            ))}
            {adPosts.slice(0, 3).map((p) => <PostCard key={p.id} post={p} kickerPrefix="Top Speed Ads" />)}
          </div>
        </section>
      ) : null}
    </>
  )
}
