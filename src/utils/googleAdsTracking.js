/**
 * Google Ads Conversion Tracking Utility
 * Tracks conversions for Google Ads account AW-17817730406
 * Integrates with gtag.js for seamless conversion measurement
 */

/**
 * Safely access gtag function from window object
 */
const getGtag = () => {
  return typeof window !== 'undefined' && window.gtag ? window.gtag : null
}

/**
 * Track booking/service request conversion
 * HIGH VALUE CONVERSION - primary goal
 * @param {object} conversionData - Conversion details
 * @param {string} conversionData.service - Service type (e.g., "Dryer Repair")
 * @param {string} conversionData.city - City name
 * @param {string} conversionData.phone - Optional: customer phone number
 * @param {number} conversionData.value - Optional: estimated service value in USD
 * @param {string} conversionData.currency - Optional: currency code (default: USD)
 */
export const trackBookingConversion = (conversionData = {}) => {
  const gtag = getGtag()
  if (!gtag) return

  const {
    service = '',
    city = '',
    phone = '',
    value = 0,
    currency = 'USD'
  } = conversionData

  gtag('event', 'conversion', {
    'send_to': 'AW-17817730406/v7tKCJTiutUDEJ3WutMo',
    'value': value,
    'currency': currency,
    'transaction_id': `booking_${Date.now()}`,
    'custom_parameter_1': service,
    'custom_parameter_2': city,
    'phone_number': phone,
    'event_label': `Booking - ${service} in ${city}`,
    'event_category': 'conversion',
    'event_callback': function() {
      console.log('Booking conversion tracked in Google Ads')
    }
  })
}

/**
 * Track lead submission conversion
 * When user submits contact form or service request
 * @param {object} leadData - Lead details
 * @param {string} leadData.leadType - Type of lead (booking, quote_request, information_request)
 * @param {string} leadData.service - Service type
 * @param {string} leadData.city - City
 * @param {string} leadData.email - Lead email
 */
export const trackLeadConversion = (leadData = {}) => {
  const gtag = getGtag()
  if (!gtag) return

  const {
    leadType = 'general_lead',
    service = '',
    city = '',
    email = ''
  } = leadData

  gtag('event', 'conversion', {
    'send_to': 'AW-17817730406/xKY7CJTiutUDEJ3WutMo',
    'value': 0,
    'currency': 'USD',
    'transaction_id': `lead_${Date.now()}`,
    'custom_parameter_1': leadType,
    'custom_parameter_2': service,
    'custom_parameter_3': city,
    'email': email,
    'event_label': `Lead - ${leadType} - ${service} in ${city}`,
    'event_category': 'conversion'
  })
}

/**
 * Track phone call conversion
 * When user clicks to call button
 * @param {object} callData - Call details
 * @param {string} callData.service - Service type
 * @param {string} callData.city - City
 * @param {string} callData.phone - Phone number called
 */
export const trackPhoneCallConversion = (callData = {}) => {
  const gtag = getGtag()
  if (!gtag) return

  const {
    service = '',
    city = '',
    phone = '(954) 931-7997'
  } = callData

  gtag('event', 'conversion', {
    'send_to': 'AW-17817730406/GuVNCJTiutUDEJ3WutMo',
    'value': 0,
    'currency': 'USD',
    'transaction_id': `call_${Date.now()}`,
    'custom_parameter_1': service,
    'custom_parameter_2': city,
    'phone_number': phone,
    'event_label': `Phone Call - ${service} in ${city}`,
    'event_category': 'conversion'
  })
}

/**
 * Track page view conversion for landing pages
 * Used for awareness/consideration funnel
 * @param {object} pageData - Page details
 * @param {string} pageData.service - Service type
 * @param {string} pageData.city - City
 * @param {string} pageData.pageType - Type of page (landing_page, blog, directory)
 */
export const trackPageViewConversion = (pageData = {}) => {
  const gtag = getGtag()
  if (!gtag) return

  const {
    service = '',
    city = '',
    pageType = 'landing_page'
  } = pageData

  gtag('event', 'conversion', {
    'send_to': 'AW-17817730406/n2HYCJTiutUDEJ3WutMo',
    'value': 0,
    'currency': 'USD',
    'transaction_id': `pageview_${Date.now()}`,
    'custom_parameter_1': service,
    'custom_parameter_2': city,
    'custom_parameter_3': pageType,
    'event_label': `Page View - ${service} in ${city}`,
    'event_category': 'awareness'
  })
}

/**
 * Track high-engagement event for remarketing
 * When user scrolls deep on landing page
 * @param {object} engagementData - Engagement details
 * @param {string} engagementData.service - Service type
 * @param {string} engagementData.city - City
 * @param {number} engagementData.scrollDepth - Scroll depth percentage
 */
export const trackHighEngagement = (engagementData = {}) => {
  const gtag = getGtag()
  if (!gtag) return

  const {
    service = '',
    city = '',
    scrollDepth = 75
  } = engagementData

  // Only track significant engagement (75%+)
  if (scrollDepth >= 75) {
    gtag('event', 'conversion', {
      'send_to': 'AW-17817730406/rM5WCJTiutUDEJ3WutMo',
      'value': 0,
      'currency': 'USD',
      'transaction_id': `engagement_${Date.now()}`,
      'custom_parameter_1': service,
      'custom_parameter_2': city,
      'custom_parameter_3': scrollDepth,
      'event_label': `High Engagement - ${service} in ${city}`,
      'event_category': 'remarketing'
    })
  }
}

/**
 * Track remarketing audience membership
 * Adds users to specific remarketing lists
 * @param {object} audienceData - Audience targeting data
 * @param {string} audienceData.audienceType - Type: "landing_page_visitor", "cta_clicker", "high_scroller", "blog_visitor"
 * @param {string} audienceData.service - Service type
 * @param {string} audienceData.city - City
 */
export const trackRemarketingAudience = (audienceData = {}) => {
  const gtag = getGtag()
  if (!gtag) return

  const {
    audienceType = 'landing_page_visitor',
    service = '',
    city = ''
  } = audienceData

  // Add user to conversion list for remarketing
  gtag('event', 'conversion', {
    'send_to': 'AW-17817730406/hQ1ZCJT0utUDEJ3WutMo',
    'value': 0,
    'currency': 'USD',
    'transaction_id': `remarketing_${Date.now()}`,
    'custom_parameter_1': audienceType,
    'custom_parameter_2': service,
    'custom_parameter_3': city,
    'event_label': `Remarketing - ${audienceType}`,
    'event_category': 'audience'
  })
}

/**
 * Track form field interaction for lead qualification
 * @param {object} formData - Form interaction data
 * @param {string} formData.fieldName - Field name (e.g., "email", "phone", "service_type")
 * @param {string} formData.hasValue - Whether field has value (true/false)
 */
export const trackFormFieldEntry = (formData = {}) => {
  const gtag = getGtag()
  if (!gtag) return

  const {
    fieldName = '',
    hasValue = false
  } = formData

  gtag('event', 'conversion', {
    'send_to': 'AW-17817730406/cV1ZCJT0utUDEJ3WutMo',
    'value': 0,
    'currency': 'USD',
    'transaction_id': `form_interaction_${Date.now()}`,
    'custom_parameter_1': fieldName,
    'custom_parameter_2': hasValue ? 'completed' : 'started',
    'event_label': `Form Field - ${fieldName}`,
    'event_category': 'engagement'
  })
}

/**
 * Track comparison page view (multi-service interest)
 * When user views multiple service pages
 * @param {object} comparisonData - Comparison data
 * @param {string[]} comparisonData.services - Array of services viewed
 * @param {string} comparisonData.city - City
 */
export const trackComparisonInterest = (comparisonData = {}) => {
  const gtag = getGtag()
  if (!gtag) return

  const {
    services = [],
    city = ''
  } = comparisonData

  if (services.length >= 2) {
    gtag('event', 'conversion', {
      'send_to': 'AW-17817730406/oV2ZCJT0utUDEJ3WutMo',
      'value': 0,
      'currency': 'USD',
      'transaction_id': `comparison_${Date.now()}`,
      'custom_parameter_1': services.join(','),
      'custom_parameter_2': city,
      'custom_parameter_3': services.length,
      'event_label': `Service Comparison - ${services.length} services in ${city}`,
      'event_category': 'interest'
    })
  }
}

/**
 * Track blog-to-service navigation
 * When user clicks from blog post to service page
 * @param {object} navigationData - Navigation details
 * @param {string} navigationData.fromBlog - Blog post slug
 * @param {string} navigationData.toService - Service type
 * @param {string} navigationData.toCity - City
 */
export const trackBlogToServiceNavigation = (navigationData = {}) => {
  const gtag = getGtag()
  if (!gtag) return

  const {
    fromBlog = '',
    toService = '',
    toCity = ''
  } = navigationData

  gtag('event', 'conversion', {
    'send_to': 'AW-17817730406/vV3ZCJT0utUDEJ3WutMo',
    'value': 0,
    'currency': 'USD',
    'transaction_id': `content_flow_${Date.now()}`,
    'custom_parameter_1': fromBlog,
    'custom_parameter_2': toService,
    'custom_parameter_3': toCity,
    'event_label': `Content Flow - ${fromBlog} → ${toService}`,
    'event_category': 'content_flow'
  })
}

/**
 * Track custom conversion with flexible parameters
 * @param {string} conversionLabel - Google Ads conversion label (last part of send_to URL)
 * @param {object} customData - Custom conversion data
 */
export const trackCustomConversion = (conversionLabel, customData = {}) => {
  const gtag = getGtag()
  if (!gtag) return

  const {
    value = 0,
    currency = 'USD',
    customParam1 = '',
    customParam2 = '',
    customParam3 = ''
  } = customData

  gtag('event', 'conversion', {
    'send_to': `AW-17817730406/${conversionLabel}`,
    'value': value,
    'currency': currency,
    'transaction_id': `custom_${Date.now()}`,
    'custom_parameter_1': customParam1,
    'custom_parameter_2': customParam2,
    'custom_parameter_3': customParam3,
    'event_label': `Custom Conversion - ${conversionLabel}`
  })
}

/**
 * Track add-to-cart event (for potential service package purchases)
 * Can be used for booked services or package selections
 * @param {object} itemData - Item/service data
 * @param {string} itemData.service - Service name
 * @param {string} itemData.city - City
 * @param {number} itemData.value - Service value in USD
 * @param {string} itemData.currency - Currency code
 */
export const trackAddToCart = (itemData = {}) => {
  const gtag = getGtag()
  if (!gtag) return

  const {
    service = '',
    city = '',
    value = 0,
    currency = 'USD'
  } = itemData

  gtag('event', 'add_to_cart', {
    'send_to': 'AW-17817730406/xV4ZCJT0utUDEJ3WutMo',
    'value': value,
    'currency': currency,
    'items': [{
      'id': `${service.replace(/\s+/g, '_')}_${city.replace(/\s+/g, '_')}`,
      'google_business_vertical': 'service_provider'
    }],
    'event_label': `Add to Cart - ${service} in ${city}`
  })
}

/**
 * Track purchase event (booking completion)
 * Full ecommerce purchase event for Google Ads
 * @param {object} purchaseData - Purchase details
 * @param {string} purchaseData.transactionId - Unique booking/transaction ID
 * @param {number} purchaseData.value - Service cost in USD
 * @param {string} purchaseData.currency - Currency code
 * @param {string} purchaseData.service - Service type
 * @param {string} purchaseData.city - City
 * @param {string} purchaseData.tax - Tax amount (optional)
 * @param {string} purchaseData.shipping - Shipping amount (optional)
 */
export const trackPurchaseEvent = (purchaseData = {}) => {
  const gtag = getGtag()
  if (!gtag) return

  const {
    transactionId = `txn_${Date.now()}`,
    value = 0,
    currency = 'USD',
    service = '',
    city = '',
    tax = 0,
    shipping = 0
  } = purchaseData

  gtag('event', 'purchase', {
    'send_to': 'AW-17817730406/v7tKCJTiutUDEJ3WutMo',
    'transaction_id': transactionId,
    'value': value,
    'currency': currency,
    'tax': tax,
    'shipping': shipping,
    'items': [{
      'id': service.replace(/\s+/g, '_'),
      'google_business_vertical': 'service_provider'
    }],
    'custom_parameter_1': service,
    'custom_parameter_2': city,
    'event_label': `Purchase - ${service} in ${city}`
  })
}

/**
 * Manual page view event for tracking
 * (gtag automatically tracks page views, but this allows custom tracking)
 * @param {object} viewData - Page view data
 * @param {string} viewData.pageTitle - Page title
 * @param {string} viewData.pageLocation - Page URL
 * @param {string} viewData.service - Service type (if applicable)
 * @param {string} viewData.city - City (if applicable)
 */
export const trackPageView = (viewData = {}) => {
  const gtag = getGtag()
  if (!gtag) return

  const {
    pageTitle = document.title,
    pageLocation = window.location.href,
    service = '',
    city = ''
  } = viewData

  gtag('event', 'page_view', {
    'page_title': pageTitle,
    'page_location': pageLocation,
    'page_path': window.location.pathname,
    'custom_parameter_1': service,
    'custom_parameter_2': city
  })
}

/**
 * Initialization function to set up Google Ads event listeners
 * Call this once on app startup
 */
export const initializeGoogleAdsTracking = () => {
  if (typeof window === 'undefined') return

  // Google Ads tracking is automatically initialized via gtag
  // This function is available for future expansion

  console.log('Google Ads conversion tracking initialized (AW-17817730406)')
}
