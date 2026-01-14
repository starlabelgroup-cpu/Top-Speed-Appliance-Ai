/**
 * GA4 Event Tracking Utility
 * Integrates with gtag.js for Google Analytics 4
 * Tracks landing page performance, CTAs, and conversions
 */

/**
 * Safely access gtag function from window object
 */
const getGtag = () => {
  return typeof window !== 'undefined' && window.gtag ? window.gtag : null
}

/**
 * Track landing page view with location and service details
 * @param {string} cityName - City name (e.g., "Miami")
 * @param {string} serviceName - Service name (e.g., "Dryer Repair")
 * @param {string} canonicalPath - Canonical URL path
 */
export const trackLandingPageView = (cityName, serviceName, canonicalPath) => {
  const gtag = getGtag()
  if (!gtag) return

  gtag('event', 'view_landing_page', {
    city: cityName,
    service: serviceName,
    page_path: canonicalPath,
    event_category: 'landing_page',
    event_label: `${serviceName} in ${cityName}`
  })
}

/**
 * Track CTA click on landing page
 * @param {string} ctaType - Type of CTA (e.g., "book_now", "call_now")
 * @param {string} cityName - City name
 * @param {string} serviceName - Service name
 */
export const trackLandingPageCTA = (ctaType, cityName, serviceName) => {
  const gtag = getGtag()
  if (!gtag) return

  gtag('event', 'landing_page_cta_click', {
    cta_type: ctaType,
    city: cityName,
    service: serviceName,
    event_category: 'engagement',
    event_label: `${ctaType} - ${serviceName} in ${cityName}`
  })
}

/**
 * Track booking form start
 * @param {string} cityName - City name
 * @param {string} serviceName - Service name
 */
export const trackBookingFormStart = (cityName, serviceName) => {
  const gtag = getGtag()
  if (!gtag) return

  gtag('event', 'begin_checkout', {
    city: cityName,
    service: serviceName,
    event_category: 'conversion_funnel',
    event_label: `Booking started - ${serviceName} in ${cityName}`
  })
}

/**
 * Track booking form completion (conversion)
 * @param {object} bookingData - Booking details
 * @param {string} bookingData.cityName - City name
 * @param {string} bookingData.serviceName - Service name
 * @param {string} bookingData.appointmentDate - Appointment date
 * @param {number} bookingData.value - Estimated service value (optional)
 */
export const trackBookingComplete = (bookingData) => {
  const gtag = getGtag()
  if (!gtag) return

  const { cityName, serviceName, appointmentDate, value = 0 } = bookingData

  gtag('event', 'purchase', {
    transaction_id: `booking_${Date.now()}`,
    value: value,
    currency: 'USD',
    city: cityName,
    service: serviceName,
    appointment_date: appointmentDate,
    event_category: 'conversion',
    event_label: `Booking completed - ${serviceName} in ${cityName}`
  })
}

/**
 * Track phone call CTA click
 * @param {string} cityName - City name
 * @param {string} serviceName - Service name
 * @param {string} phoneNumber - Phone number clicked
 */
export const trackPhoneCallClick = (cityName, serviceName, phoneNumber) => {
  const gtag = getGtag()
  if (!gtag) return

  gtag('event', 'click_to_call', {
    city: cityName,
    service: serviceName,
    phone: phoneNumber,
    event_category: 'conversion',
    event_label: `Call click - ${serviceName} in ${cityName}`
  })
}

/**
 * Track FAQ expansion/accordion click
 * @param {string} question - FAQ question
 * @param {string} cityName - City name
 * @param {string} serviceName - Service name
 */
export const trackFAQEngagement = (question, cityName, serviceName) => {
  const gtag = getGtag()
  if (!gtag) return

  gtag('event', 'faq_expand', {
    question: question,
    city: cityName,
    service: serviceName,
    event_category: 'engagement',
    event_label: `FAQ - ${serviceName} in ${cityName}`
  })
}

/**
 * Track service area neighborhood click
 * @param {string} neighborhood - Neighborhood name
 * @param {string} cityName - City name
 * @param {string} serviceName - Service name
 */
export const trackNeighborhoodClick = (neighborhood, cityName, serviceName) => {
  const gtag = getGtag()
  if (!gtag) return

  gtag('event', 'service_area_click', {
    neighborhood: neighborhood,
    city: cityName,
    service: serviceName,
    event_category: 'engagement',
    event_label: `Area - ${neighborhood}, ${cityName}`
  })
}

/**
 * Track blog post engagement
 * @param {string} postSlug - Blog post slug
 * @param {string} postTitle - Blog post title
 * @param {number} scrollDepth - Scroll depth percentage (0-100)
 */
export const trackBlogEngagement = (postSlug, postTitle, scrollDepth = null) => {
  const gtag = getGtag()
  if (!gtag) return

  gtag('event', 'blog_engagement', {
    post_slug: postSlug,
    post_title: postTitle,
    scroll_depth: scrollDepth,
    event_category: 'engagement',
    event_label: postTitle
  })
}

/**
 * Track blog post to landing page navigation
 * @param {string} blogPostSlug - Blog post slug
 * @param {string} landingPagePath - Landing page canonical path
 * @param {string} serviceName - Service name
 */
export const trackBlogToLandingNavigation = (blogPostSlug, landingPagePath, serviceName) => {
  const gtag = getGtag()
  if (!gtag) return

  gtag('event', 'blog_to_service_click', {
    from_blog: blogPostSlug,
    to_landing_page: landingPagePath,
    service: serviceName,
    event_category: 'content_flow',
    event_label: `Blog → ${serviceName} Landing Page`
  })
}

/**
 * Track page scroll depth
 * @param {number} depth - Scroll depth percentage (25, 50, 75, 100)
 * @param {string} cityName - City name
 * @param {string} serviceName - Service name
 */
export const trackScrollDepth = (depth, cityName, serviceName) => {
  const gtag = getGtag()
  if (!gtag) return

  gtag('event', 'scroll_depth', {
    depth_percent: depth,
    city: cityName,
    service: serviceName,
    event_category: 'engagement',
    event_label: `${depth}% scroll - ${serviceName} in ${cityName}`
  })
}

/**
 * Track time on page (call periodically)
 * @param {number} seconds - Time spent on page
 * @param {string} cityName - City name
 * @param {string} serviceName - Service name
 */
export const trackTimeOnPage = (seconds, cityName, serviceName) => {
  const gtag = getGtag()
  if (!gtag) return

  gtag('event', 'time_on_page', {
    value: seconds,
    city: cityName,
    service: serviceName,
    event_category: 'engagement',
    event_label: `${seconds}s on ${serviceName} page`
  })
}

/**
 * Track form field interaction
 * @param {string} fieldName - Form field name
 * @param {string} fieldType - Field type (e.g., "text", "select", "phone")
 */
export const trackFormFieldInteraction = (fieldName, fieldType) => {
  const gtag = getGtag()
  if (!gtag) return

  gtag('event', 'form_field_interaction', {
    field_name: fieldName,
    field_type: fieldType,
    event_category: 'engagement'
  })
}

/**
 * Track form field validation error
 * @param {string} fieldName - Form field name
 * @param {string} errorMessage - Validation error message
 */
export const trackFormFieldError = (fieldName, errorMessage) => {
  const gtag = getGtag()
  if (!gtag) return

  gtag('event', 'form_field_error', {
    field_name: fieldName,
    error_message: errorMessage,
    event_category: 'engagement'
  })
}

/**
 * Track exception/error for debugging
 * @param {string} description - Error description
 * @param {boolean} fatal - Whether the error is fatal
 */
export const trackException = (description, fatal = false) => {
  const gtag = getGtag()
  if (!gtag) return

  gtag('event', 'exception', {
    description: description,
    fatal: fatal
  })
}

/**
 * Track page view with custom properties
 * @param {string} pageTitle - Page title
 * @param {string} pagePath - Page path
 * @param {object} customData - Additional custom data to track
 */
export const trackPageView = (pageTitle, pagePath, customData = {}) => {
  const gtag = getGtag()
  if (!gtag) return

  gtag('event', 'page_view', {
    page_title: pageTitle,
    page_path: pagePath,
    ...customData
  })
}

/**
 * Track user action without event
 * Just sends a custom parameter for any event
 * @param {object} customData - Custom data object with key-value pairs
 */
export const trackCustomData = (customData) => {
  const gtag = getGtag()
  if (!gtag) return

  gtag('event', 'custom_event', customData)
}
