/**
 * Top Speed Service OS — API client for topspeedappliance.net
 *
 * The .net site is a front door of the same Service OS that powers
 * topspeedserviceos.com: guest bookings made here go through the public
 * POST /speedy/book endpoint and land in the Service Setters queue in
 * Book OS (source: FLAGSHIP_NET), and customers can track a job with the
 * reference from their confirmation via GET /bookings/track/:reference.
 */

export const SERVICE_OS_API_BASE = 'https://top-speed-service-os.vercel.app/api/v1'

/** The Service OS flagship — where the live customer/staff apps live. */
export const SERVICE_OS_WEB = 'https://topspeedserviceos.com'

export const SERVICE_OS_LINKS = {
  home: SERVICE_OS_WEB,
  app: `${SERVICE_OS_WEB}/app`,
  signup: `${SERVICE_OS_WEB}/signup`,
  garage: `${SERVICE_OS_WEB}/garage`,
  connectProApp: `${SERVICE_OS_WEB}/connect-pro-app`,
  appliancePro: `${SERVICE_OS_WEB}/appliance-pro`,
  propertyManagers: `${SERVICE_OS_WEB}/property-managers`,
  offers: `${SERVICE_OS_WEB}/offers-rewards`,
  local: `${SERVICE_OS_WEB}/local`,
  ads: `${SERVICE_OS_WEB}/ads`,
  advertise: `${SERVICE_OS_WEB}/advertise`,
  book: `${SERVICE_OS_WEB}/book`,
  providerNetwork: 'https://topspeedapplianceservice.com',
}

// Service area — mirrors apps/api/src/config/serviceAreas.js in the
// Service OS (12 Broward County cities; the API re-validates every ZIP).
export const SERVICE_AREAS = [
  { city: 'Lauderhill', zips: ['33313', '33319', '33351'] },
  { city: 'Plantation', zips: ['33313', '33317', '33322', '33323', '33324', '33325', '33388'] },
  { city: 'Sunrise', zips: ['33313', '33322', '33323', '33326', '33351'] },
  { city: 'Tamarac', zips: ['33309', '33319', '33321', '33351', '33359'] },
  {
    city: 'Fort Lauderdale',
    zips: ['33301', '33302', '33303', '33304', '33305', '33306', '33307', '33308', '33309', '33311', '33312', '33313', '33314', '33315', '33316', '33317', '33319', '33334'],
  },
  { city: 'Lauderdale Lakes', zips: ['33309', '33311', '33313', '33319'] },
  { city: 'North Lauderdale', zips: ['33068', '33319'] },
  { city: 'Davie', zips: ['33312', '33314', '33317', '33324', '33325', '33326', '33328', '33329', '33330', '33331', '33332'] },
  { city: 'Coral Springs', zips: ['33065', '33067', '33071', '33073', '33075', '33076', '33077'] },
  { city: 'Pompano Beach', zips: ['33060', '33061', '33062', '33063', '33064', '33066', '33067', '33068', '33069', '33072', '33073', '33074'] },
  { city: 'Oakland Park', zips: ['33309', '33311', '33334'] },
  { city: 'Margate', zips: ['33063', '33068', '33073', '33093'] },
]

export const SERVICE_CITIES = SERVICE_AREAS.map(({ city }) => city)

export const APPLIANCES = [
  'Refrigerator',
  'Washer',
  'Dryer',
  'Oven/Range',
  'Dishwasher',
  'Freezer/Ice Maker',
  'Microwave',
  'Garbage Disposal',
  'Installation',
]

/** Cities served by a ZIP (a ZIP can straddle more than one). */
export function citiesForZip(zip) {
  return SERVICE_AREAS.filter((area) => area.zips.includes(zip)).map(({ city }) => city)
}

/** Pull the first 5-digit ZIP out of a free-text address. */
export function extractZip(text) {
  const match = String(text || '').match(/\b(\d{5})(?:-\d{4})?\b/)
  return match ? match[1] : ''
}

const WINDOW_BY_START_HOUR = { 8: '08-10', 10: '10-12', 12: '12-14', 14: '14-16', 16: '16-18' }

/**
 * Normalize a form's time value to a Service OS booking-window code
 * ('08-10', '10-12', '12-14', '14-16', '16-18'). Accepts a window code
 * itself, a 12-hour range label ('8:00 AM - 10:00 AM'), or an <input
 * type="time"> value ('08:30'). Returns undefined when the value does
 * not fall inside a booking window.
 */
export function preferredWindowFor(value) {
  if (!value) return undefined
  const v = String(value).trim()
  if (/^\d{2}-\d{2}$/.test(v)) return v
  const label = v.match(/^(\d{1,2})(?::\d{2})?\s*(AM|PM)/i)
  if (label) {
    let hour = parseInt(label[1], 10) % 12
    if (/pm/i.test(label[2])) hour += 12
    return WINDOW_BY_START_HOUR[hour]
  }
  const time = v.match(/^(\d{1,2}):\d{2}/)
  if (time) return WINDOW_BY_START_HOUR[parseInt(time[1], 10)]
  return undefined
}

async function api(path, options) {
  let response
  try {
    response = await fetch(`${SERVICE_OS_API_BASE}${path}`, options)
  } catch {
    const error = new Error('Could not reach the booking system. Please check your connection or call (954) 931-7997.')
    error.status = 0
    throw error
  }
  const json = await response.json().catch(() => ({}))
  if (!response.ok) {
    const error = new Error(json.error || `Request failed (${response.status})`)
    error.status = response.status
    error.serviceCities = json.serviceCities
    error.details = json.details
    throw error
  }
  return json.data
}

/**
 * Create a guest booking in the Service OS. Resolves with
 * { referenceCode, status, city, appliance, preferredWindow, diagnosticFee }.
 * Throws an Error with .status (400/422/…) and the API's message on failure.
 */
export function bookGuest(payload) {
  return api('/speedy/book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

/**
 * Public Track My Tech lookup: reference (TS-XXXXXX) + the phone number
 * on the booking. Resolves with the tracking state (stageIndex 0–7,
 * stageLabels, stageLabel8, technician, etaMinutes, …).
 */
export function trackBooking(reference, phone) {
  const ref = encodeURIComponent(String(reference || '').trim().toUpperCase())
  const ph = encodeURIComponent(String(phone || '').trim())
  return api(`/bookings/track/${ref}?phone=${ph}`)
}

/**
 * Track My Tech via a secure per-job tracking link (?t=<token>).
 * The token is issued by Service Setters from the Track Console; only
 * its SHA-256 hash is stored server-side, links expire 7 days after
 * issue (and 24h after completion), and the response carries a live
 * technicianLocation only while the tech is en route and sharing GPS.
 * Resolves with the same tracking shape as trackBooking.
 */
export function trackByToken(token) {
  const t = encodeURIComponent(String(token || '').trim())
  return api(`/tracking/by-token/${t}`)
}
