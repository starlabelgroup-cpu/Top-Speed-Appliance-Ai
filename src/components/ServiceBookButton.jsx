import { BOOKING_CONFIG } from '../config/bookingConfig'
import { attributionParams } from '../lib/serviceOs'

/**
 * Service Book booking button — every booking on this site runs through the
 * Top Speed Service Book (Top Speed CRM / Service OS Smart Booking).
 * The `source` prop is carried into the booking URL for attribution.
 *
 * The visitor's arrival attribution (src / utm_* params captured by
 * attributionParams(), e.g. ?src=network-coverage from the Service
 * Network coverage page) and the current page path ride along, so the
 * booking record shows Service Setters exactly which surface and page
 * produced it. Attribution is best-effort: any failure leaves the plain
 * booking URL untouched.
 */
const FORWARDED_PARAMS = ['src', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']

function ServiceBookButton({ source, className = '', children = 'Request Service' }) {
  const params = new URLSearchParams()
  if (source) params.set('source', source)
  try {
    const arrived = attributionParams()
    for (const key of FORWARDED_PARAMS) {
      const value = arrived.get(key)
      if (value) params.set(key, value)
    }
    if (typeof window !== 'undefined' && window.location && window.location.pathname) {
      params.set('page', window.location.pathname)
    }
  } catch {
    // storage/URL unavailable — book without attribution
  }
  const qs = params.toString()
  const href = qs ? `${BOOKING_CONFIG.BOOKING_URL}?${qs}` : BOOKING_CONFIG.BOOKING_URL

  return (
    <a href={href} className={className} data-source={source}>
      {children}
    </a>
  )
}

export default ServiceBookButton
