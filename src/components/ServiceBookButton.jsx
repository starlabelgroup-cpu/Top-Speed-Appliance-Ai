import { BOOKING_CONFIG } from '../config/bookingConfig'

/**
 * Service Book booking button — every booking on this site runs through the
 * Top Speed Service Book (Top Speed CRM / Service OS Smart Booking).
 * The `source` prop is carried into the booking URL for attribution.
 */
function ServiceBookButton({ source, className = '', children = 'Request Service' }) {
  const href = source
    ? `${BOOKING_CONFIG.BOOKING_URL}?source=${encodeURIComponent(source)}`
    : BOOKING_CONFIG.BOOKING_URL

  return (
    <a href={href} className={className} data-source={source}>
      {children}
    </a>
  )
}

export default ServiceBookButton
