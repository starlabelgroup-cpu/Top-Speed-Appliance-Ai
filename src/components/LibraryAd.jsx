import React, { useEffect, useState } from 'react'

/**
 * LibraryAd (2026-11-24) — Ads Library streaming for
 * topspeedappliance.net: ONE reusable slot component that streams
 * the next ad from the Service OS Ads Library and renders it in the
 * flagship's reference card language. Rotation alternates IMAGE and
 * TEXT ads server-side, so both kinds stream through this one slot.
 *
 *   GET https://top-speed-service-os.vercel.app/api/v1/ads-os/slot
 *       ?platform=net&slot=<name>&format=landscape
 *       → { data: { key, kind: 'IMAGE'|'TEXT', headline, subline,
 *                   ctaText, imageUrl, imageAlt, width, height,
 *                   clickUrl, ... } }
 *
 * Rendering (mirrors the flagship ads-stream.js):
 *   IMAGE → full-bleed <img> in a rounded navy card with a CTA pill
 *           chip bottom-left ("<ctaText> →").
 *   TEXT  → navy card (#0a1a33, rounded 16px) with the headline
 *           (800 weight, white), the subline (muted #c8d2e0) and a
 *           red (#e63946) CTA pill.
 * The whole card is one <a href={clickUrl}> — clicks go through the
 * API's counted redirect, never straight to the destination.
 *
 * Honesty rules: an empty/null response renders NOTHING (no
 * placeholder, no filler); all copy comes from the API (nothing is
 * written here); all text renders as React text (escaped by React —
 * no dangerouslySetInnerHTML).
 */

const SLOT_API = 'https://top-speed-service-os.vercel.app/api/v1/ads-os/slot'

const CSS = `
.tlad{max-width:1120px;margin:30px auto;padding:0 20px}
.tlad-card{display:block;position:relative;background:#0a1a33;border-radius:16px;overflow:hidden;text-decoration:none}
.tlad-card img{width:100%;height:auto;display:block}
.tlad-chip{position:absolute;left:16px;bottom:16px;background:#e63946;color:#fff;font-weight:800;font-size:14.5px;border-radius:999px;padding:9px 16px;line-height:1;box-shadow:0 4px 14px rgba(4,12,28,.35)}
.tlad-text{padding:30px 28px;display:flex;flex-direction:column;gap:10px;align-items:flex-start}
.tlad-headline{font-size:clamp(22px,3.4vw,30px);font-weight:800;color:#fff;line-height:1.2;margin:0}
.tlad-subline{font-size:16px;color:#c8d2e0;line-height:1.5;margin:0}
.tlad-cta{background:#e63946;color:#fff;font-weight:800;font-size:15px;border-radius:999px;padding:11px 20px;line-height:1;margin-top:6px}
`

export default function LibraryAd({ slot = 'content', service = null, city = null, format = 'landscape' }) {
  const [ad, setAd] = useState(null)

  useEffect(() => {
    let live = true
    const params = new URLSearchParams({ platform: 'net', slot, format })
    if (service) params.set('service', service)
    if (city) params.set('city', city)
    fetch(`${SLOT_API}?${params.toString()}`, { headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => { if (live && j && j.data && j.data.clickUrl) setAd(j.data) })
      .catch(() => { /* stream unreachable: render nothing */ })
    return () => { live = false }
  }, [slot, service, city, format])

  if (!ad) return null

  if (ad.kind === 'IMAGE') {
    if (!ad.imageUrl) return null
    return (
      <>
        <style>{CSS}</style>
        <div className="tlad">
          <a className="tlad-card" href={ad.clickUrl} aria-label={ad.headline || 'Top Speed advertisement'}>
            <img
              src={ad.imageUrl}
              alt={ad.imageAlt || ad.headline || ''}
              width={ad.width || undefined}
              height={ad.height || undefined}
              loading="lazy"
            />
            {ad.ctaText ? <span className="tlad-chip">{ad.ctaText} →</span> : null}
          </a>
        </div>
      </>
    )
  }

  if (ad.kind === 'TEXT') {
    if (!ad.headline) return null
    return (
      <>
        <style>{CSS}</style>
        <div className="tlad">
          <a className="tlad-card" href={ad.clickUrl} aria-label={ad.headline}>
            <span className="tlad-text">
              <span className="tlad-headline">{ad.headline}</span>
              {ad.subline ? <span className="tlad-subline">{ad.subline}</span> : null}
              {ad.ctaText ? <span className="tlad-cta">{ad.ctaText} →</span> : null}
            </span>
          </a>
        </div>
      </>
    )
  }

  return null
}
