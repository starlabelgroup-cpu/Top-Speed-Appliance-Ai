/**
 * Centralized Booking Configuration
 * 
 * This file contains all HouseCall Pro booking links and related configuration.
 * Keep this file up-to-date to ensure all booking links remain functional.
 * 
 * IMPORTANT: All components should import BOOKING_URL from here instead of
 * hardcoding the link. This prevents broken bookings if the link ever changes.
 */

export const BOOKING_CONFIG = {
  // Main HouseCall Pro booking link - Used across all sections
  BOOKING_URL: 'https://book.housecallpro.com/book/TopSpeed-Appliance/0c0fcb09005e47239b0bd7d487e9d468?v2=true',
  
  // Phone number for direct calls
  PHONE_NUMBER: '(954) 931-7997',
  PHONE_LINK: 'tel:9549317997',
  
  // Business info
  BUSINESS_NAME: 'Top Speed Appliance',
  SERVICE_AREA: 'South Florida',
  
  // Hours of operation (if needed)
  HOURS: {
    monday: '8:00 AM - 6:00 PM',
    tuesday: '8:00 AM - 6:00 PM',
    wednesday: '8:00 AM - 6:00 PM',
    thursday: '8:00 AM - 6:00 PM',
    friday: '8:00 AM - 6:00 PM',
    saturday: '9:00 AM - 4:00 PM',
    sunday: 'Closed',
  }
}

/**
 * Helper function to create a booking link
 * @param {string} source - Optional source identifier for tracking (e.g., 'hero', 'services')
 * @returns {string} - The booking URL with optional tracking parameter
 */
export const getBookingLink = (source = null) => {
  if (!source) return BOOKING_CONFIG.BOOKING_URL
  // Append source for analytics if needed: &source=hero
  return `${BOOKING_CONFIG.BOOKING_URL}&source=${source}`
}

/**
 * CTA text constants to ensure consistency across the app
 */
export const CTA_TEXT = {
  BOOK_ONLINE: 'Book Online',
  BOOK_NOW: 'Book Now',
  BOOK_REPAIR: 'Book Repair',
  SCHEDULE_SERVICE: 'Schedule Service',
  SCHEDULE_SERVICE_TODAY: 'Schedule Service Today',
  BOOK_YOUR_REPAIR: 'Book Your Repair',
  BOOK_YOUR_REPAIR_TODAY: 'Book Your Repair Today',
  REQUEST_SERVICE: 'Request Service Now',
  CALL_NOW: 'Call Now',
  SCHEDULE_SERVICE_NOW: 'Schedule Service Now',
}

export default BOOKING_CONFIG
