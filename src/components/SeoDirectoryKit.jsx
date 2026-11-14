import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { BOOKING_CONFIG } from '../config/bookingConfig'
import { buildServiceLocationSlug } from '../data/seoLeadData'

export default function SeoDirectoryKit({ locations, selectedSlug, onSelect }) {
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [copied, setCopied] = useState(false)

  const selected = locations.find(location => location.slug === selectedSlug) || locations[0]
  const origin = typeof window === 'undefined' ? 'https://topspeedappliance.net' : window.location.origin
  const pagePath = selected ? `/${buildServiceLocationSlug('appliance-repair', selected.slug)}` : ''
  const pageUrl = `${origin}${pagePath}`

  useEffect(() => {
    if (!pageUrl) return
    let cancelled = false
    QRCode.toDataURL(pageUrl, {
      width: 320,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: { dark: '#0f0f10', light: '#ffffff' }
    }).then(url => {
      if (!cancelled) setQrDataUrl(url)
    })
    return () => {
      cancelled = true
    }
  }, [pageUrl])

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 1500)
    return () => window.clearTimeout(timer)
  }, [copied])

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  if (!selected) return null

  const listingText = `${BOOKING_CONFIG.BUSINESS_NAME} - Appliance Repair in ${selected.name}, FL\nPhone: ${BOOKING_CONFIG.PHONE_NUMBER}\nWebsite: ${pageUrl}`

  return (
    <div className="seo-kit">
      <div className="seo-kit-controls">
        <label className="seo-kit-label" htmlFor="seo-kit-city">City</label>
        <select
          id="seo-kit-city"
          className="seo-kit-select"
          value={selected.slug}
          onChange={event => onSelect(event.target.value)}
        >
          {locations.map(location => (
            <option key={location.slug} value={location.slug}>{location.name} ({location.countyName})</option>
          ))}
        </select>
      </div>

      <div className="seo-kit-body">
        <div className="seo-kit-qr">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt={`QR code linking to the ${selected.name} appliance repair page`} width="200" height="200" />
          ) : (
            <div className="seo-kit-qr-placeholder">Generating QR code...</div>
          )}
          {qrDataUrl && (
            <a className="seo-kit-button" href={qrDataUrl} download={`qr-${selected.slug}.png`}>Download QR PNG</a>
          )}
        </div>

        <div className="seo-kit-details">
          <p className="seo-kit-label">Page URL</p>
          <p className="seo-kit-url"><span className="seo-leads-mono">{pageUrl}</span></p>
          <div className="seo-kit-actions">
            <button type="button" className="seo-kit-button" onClick={copyUrl}>
              {copied ? 'Copied' : 'Copy URL'}
            </button>
          </div>

          <p className="seo-kit-label">Directory listing text</p>
          <textarea className="seo-kit-textarea" readOnly rows={4} value={listingText} />
        </div>
      </div>
    </div>
  )
}
