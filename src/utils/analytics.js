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
  // Metrics logging is optional and non-critical
  // Only attempt if in development environment
  if (process.env.NODE_ENV !== 'production') {
    const payload = {
      metric: metricName,
      data,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    }

    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/metrics', JSON.stringify(payload))
    } else {
      fetch('/api/metrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(() => {})
    }
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
    const originalFetch = window.fetch
    window.fetch = function(...args) {
      const startTime = performance.now()
      return originalFetch.apply(this, args).then(response => {
        const endTime = performance.now()
        const duration = endTime - startTime
        const resource = args[0]

        // Don't log /api/metrics calls to avoid infinite loops
        const resourceUrl = typeof resource === 'string' ? resource : resource.url
        if (!resourceUrl?.includes('/api/metrics')) {
          logMetric('api_call', {
            url: resourceUrl,
            method: args[1]?.method || 'GET',
            duration,
            status: response.status
          })
        }

        return response
      }).catch(error => {
        // Silently suppress fetch errors to prevent infinite loops
        // Don't call trackError as it would try to send data to /api/metrics
        return error
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
