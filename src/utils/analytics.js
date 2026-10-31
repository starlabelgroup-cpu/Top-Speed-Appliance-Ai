export const initializeAnalytics = () => {
  if (typeof window === 'undefined') return

  window.addEventListener('load', () => {
    trackPageLoadMetrics()
    trackCoreWebVitals()
  })
}

export const trackPageLoadMetrics = () => {
  if (!window.performance) return

  const perfData = window.performance.timing
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
  const connectTime = perfData.responseEnd - perfData.requestStart
  const renderTime = perfData.domComplete - perfData.domLoading

  const metrics = {
    pageLoadTime,
    connectTime,
    renderTime,
    timestamp: new Date().toISOString(),
    url: window.location.href
  }

  logMetric('page_load', metrics)
  return metrics
}

export const trackCoreWebVitals = () => {
  if (typeof window === 'undefined' || !window.requestIdleCallback) return

  window.requestIdleCallback(() => {
    try {
      const navigation = window.performance.getEntriesByType('navigation')[0]
      if (navigation) {
        const vitals = {
          fcp: navigation.responseStart - navigation.fetchStart,
          lcp: navigation.domContentLoadedEventEnd - navigation.fetchStart,
          cls: calculateCumulativeLayoutShift(),
          timestamp: new Date().toISOString()
        }
        logMetric('core_web_vitals', vitals)
      }
    } catch (err) {
      console.error('Error tracking Core Web Vitals:', err)
    }
  })
}

export const calculateCumulativeLayoutShift = () => {
  let clsValue = 0
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value
      }
    }
  })

  observer.observe({ entryTypes: ['layout-shift'] })
  return clsValue
}

export const logMetric = (metricName, data) => {
  try {
    // Metrics logging is optional and non-critical
    // Silently skip if in production or if backend is unavailable
    if (process.env.NODE_ENV === 'production') return

    const payload = {
      metric: metricName,
      data,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    }

    // Use sendBeacon if available (more reliable for analytics)
    if (navigator.sendBeacon) {
      try {
        navigator.sendBeacon('/api/metrics', JSON.stringify(payload))
      } catch (beaconErr) {
        // Silently ignore beacon errors - don't try to log them!
      }
    }
    // Don't use fetch here - it would create circular error logging
  } catch (err) {
    // Silently suppress all metric logging errors
    // This ensures analytics failures don't break the app
  }
}

export const trackEvent = (eventName, eventData = {}) => {
  const event = {
    name: eventName,
    data: eventData,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    referrer: document.referrer
  }

  logMetric('custom_event', event)
}

export const trackConversion = (conversionType, value = null) => {
  trackEvent('conversion', {
    type: conversionType,
    value,
    timestamp: new Date().toISOString()
  })
}

export const trackBookingAttempt = (applianceType) => {
  trackEvent('booking_started', { appliance: applianceType })
}

export const trackBookingCompleted = (bookingData) => {
  trackConversion('booking_completed', {
    appliance: bookingData.appliance,
    appointmentDate: bookingData.preferredDate
  })
}

export const trackError = (errorType, errorMessage) => {
  const error = {
    type: errorType,
    message: errorMessage,
    stack: new Error().stack,
    timestamp: new Date().toISOString(),
    url: window.location.href
  }

  logMetric('error', error)
}

export const setupPerformanceMonitoring = () => {
  if (typeof window === 'undefined') return

  try {
    if (window.__tsap_fetch_wrapped) return
    window.__tsap_fetch_wrapped = true

    const originalFetch = window.fetch
    window.fetch = function(...args) {
      // Don't intercept /api/metrics calls - this prevents circular logging
      const resource = args[0]
      const resourceUrl = typeof resource === 'string' ? resource : resource.url
      if (resourceUrl?.includes('/api/metrics')) {
        return originalFetch.apply(this, args)
      }

      const startTime = performance.now()
      return originalFetch.apply(this, args).then(response => {
        const endTime = performance.now()
        const duration = endTime - startTime

        // Only log successful responses
        logMetric('api_call', {
          url: resourceUrl,
          method: args[1]?.method || 'GET',
          duration,
          status: response.status
        })

        return response
      }).catch(error => {
        // Don't log fetch errors here (prevents loops). Let callers handle.
        return Promise.reject(error)
      })
    }
  } catch (err) {
    // Performance monitoring setup failed, continue without it
  }
}

export const reportWebVitals = (metric) => {
  if (metric.name === 'CLS') {
    trackEvent('cls_observed', { value: metric.value })
  } else if (metric.name === 'FCP') {
    trackEvent('fcp_observed', { value: metric.value })
  } else if (metric.name === 'FID') {
    trackEvent('fid_observed', { value: metric.value })
  } else if (metric.name === 'LCP') {
    trackEvent('lcp_observed', { value: metric.value })
  }
}
