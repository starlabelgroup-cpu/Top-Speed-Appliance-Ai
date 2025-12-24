/**
 * Configuration Validator
 * 
 * Runs on app startup to verify critical configuration is in place.
 * Helps catch broken links or missing config before users see errors.
 * 
 * This only runs in development to aid debugging.
 */

import { BOOKING_CONFIG } from '../config/bookingConfig'

/**
 * Validate all critical configuration
 */
export const validateConfig = () => {
  if (process.env.NODE_ENV === 'production') {
    return true // Skip in production
  }

  const errors = []
  const warnings = []

  // Validate booking URL
  if (!BOOKING_CONFIG.BOOKING_URL) {
    errors.push('BOOKING_URL is missing from bookingConfig')
  } else if (!BOOKING_CONFIG.BOOKING_URL.includes('housecallpro.com')) {
    warnings.push('BOOKING_URL does not contain "housecallpro.com"')
  } else if (!BOOKING_CONFIG.BOOKING_URL.includes('TopSpeed-Appliance')) {
    errors.push('BOOKING_URL does not contain TopSpeed-Appliance identifier')
  }

  // Validate phone number
  if (!BOOKING_CONFIG.PHONE_NUMBER) {
    warnings.push('PHONE_NUMBER is missing from bookingConfig')
  } else if (!BOOKING_CONFIG.PHONE_NUMBER.match(/\(\d{3}\)\s\d{3}-\d{4}/)) {
    warnings.push('PHONE_NUMBER format looks incorrect: ' + BOOKING_CONFIG.PHONE_NUMBER)
  }

  // Validate phone link
  if (!BOOKING_CONFIG.PHONE_LINK) {
    warnings.push('PHONE_LINK is missing from bookingConfig')
  } else if (!BOOKING_CONFIG.PHONE_LINK.startsWith('tel:')) {
    errors.push('PHONE_LINK must start with "tel:"')
  }

  // Validate business name
  if (!BOOKING_CONFIG.BUSINESS_NAME) {
    warnings.push('BUSINESS_NAME is missing from bookingConfig')
  }

  // Print results
  if (errors.length > 0) {
    console.error(
      '%c❌ Configuration Errors',
      'color: #ff0000; font-weight: bold; font-size: 12px;'
    )
    errors.forEach(error => {
      console.error(`   • ${error}`)
    })
    return false
  }

  if (warnings.length > 0) {
    console.warn(
      '%c⚠️  Configuration Warnings',
      'color: #ff9900; font-weight: bold; font-size: 12px;'
    )
    warnings.forEach(warning => {
      console.warn(`   • ${warning}`)
    })
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log(
      '%c✅ Configuration Valid',
      'color: #00aa00; font-weight: bold; font-size: 12px;'
    )
    console.log('Booking URL:', BOOKING_CONFIG.BOOKING_URL)
    console.log('Phone Number:', BOOKING_CONFIG.PHONE_NUMBER)
  }

  return errors.length === 0
}

export default validateConfig
