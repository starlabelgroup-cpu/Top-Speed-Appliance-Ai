// Google Ads API Service for campaign analysis and performance reporting
const GOOGLE_ADS_API_KEY = import.meta.env.VITE_GOOGLE_ADS_API_KEY || null
const GOOGLE_ADS_CUSTOMER_ID = import.meta.env.VITE_GOOGLE_ADS_CUSTOMER_ID || null
const GOOGLE_ADS_DEVELOPER_TOKEN = import.meta.env.VITE_GOOGLE_ADS_DEVELOPER_TOKEN || null

export const googleAdsService = {
  /**
   * Get wasted spend analysis - high cost, low conversion terms
   * Note: This requires backend proxy due to CORS limitations with Google Ads API
   */
  getWastedSpendAnalysis: async (backendUrl) => {
    if (!GOOGLE_ADS_CUSTOMER_ID) {
      throw new Error('Google Ads Customer ID not configured. Please set VITE_GOOGLE_ADS_CUSTOMER_ID environment variable.')
    }

    if (!backendUrl) {
      throw new Error('Backend URL required for Google Ads API calls')
    }

    try {
      const response = await fetch(`${backendUrl}/api/google-ads/wasted-spend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GOOGLE_ADS_API_KEY}`
        },
        body: JSON.stringify({
          customerId: GOOGLE_ADS_CUSTOMER_ID,
          minSpend: 50,
          minDays: 30
        })
      })

      if (!response.ok) {
        const contentType = response.headers.get('content-type')
        let error
        if (contentType?.includes('application/json')) {
          try {
            error = await response.json()
            throw new Error(`Google Ads API error: ${error.error || 'Unknown error'}`)
          } catch (parseErr) {
            throw new Error(`Google Ads API error: Backend returned status ${response.status}`)
          }
        } else {
          throw new Error(`Google Ads API error: Backend returned status ${response.status}`)
        }
      }

      const contentType = response.headers.get('content-type')
      if (!contentType?.includes('application/json')) {
        throw new Error('Invalid response format from server')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Google Ads wasted spend analysis failed:', error)
      throw error
    }
  },

  /**
   * Get campaign performance metrics
   */
  getCampaignMetrics: async (backendUrl, campaignId = null) => {
    if (!GOOGLE_ADS_CUSTOMER_ID) {
      throw new Error('Google Ads Customer ID not configured.')
    }

    if (!backendUrl) {
      throw new Error('Backend URL required for Google Ads API calls')
    }

    try {
      const response = await fetch(`${backendUrl}/api/google-ads/campaign-metrics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GOOGLE_ADS_API_KEY}`
        },
        body: JSON.stringify({
          customerId: GOOGLE_ADS_CUSTOMER_ID,
          campaignId: campaignId,
          dateRange: 'LAST_30_DAYS'
        })
      })

      if (!response.ok) {
        throw new Error('Failed to fetch campaign metrics')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Campaign metrics fetch failed:', error)
      throw error
    }
  },

  /**
   * Get search term report with performance data
   */
  getSearchTermReport: async (backendUrl, options = {}) => {
    if (!GOOGLE_ADS_CUSTOMER_ID) {
      throw new Error('Google Ads Customer ID not configured.')
    }

    if (!backendUrl) {
      throw new Error('Backend URL required for Google Ads API calls')
    }

    try {
      const response = await fetch(`${backendUrl}/api/google-ads/search-terms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GOOGLE_ADS_API_KEY}`
        },
        body: JSON.stringify({
          customerId: GOOGLE_ADS_CUSTOMER_ID,
          minSpend: options.minSpend || 25,
          maxConversions: options.maxConversions || 0,
          dateRange: options.dateRange || 'LAST_30_DAYS',
          limit: options.limit || 20
        })
      })

      if (!response.ok) {
        throw new Error('Failed to fetch search terms')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Search term report fetch failed:', error)
      throw error
    }
  },

  /**
   * Get keyword performance analysis
   */
  getKeywordPerformance: async (backendUrl) => {
    if (!GOOGLE_ADS_CUSTOMER_ID) {
      throw new Error('Google Ads Customer ID not configured.')
    }

    if (!backendUrl) {
      throw new Error('Backend URL required for Google Ads API calls')
    }

    try {
      const response = await fetch(`${backendUrl}/api/google-ads/keyword-performance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GOOGLE_ADS_API_KEY}`
        },
        body: JSON.stringify({
          customerId: GOOGLE_ADS_CUSTOMER_ID,
          dateRange: 'LAST_30_DAYS'
        })
      })

      if (!response.ok) {
        throw new Error('Failed to fetch keyword performance')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Keyword performance fetch failed:', error)
      throw error
    }
  },

  /**
   * Add negative keywords to campaign
   * Note: This requires backend proxy and proper authentication
   */
  addNegativeKeywords: async (backendUrl, campaignId, negativeKeywords) => {
    if (!GOOGLE_ADS_CUSTOMER_ID) {
      throw new Error('Google Ads Customer ID not configured.')
    }

    if (!backendUrl) {
      throw new Error('Backend URL required for Google Ads API calls')
    }

    if (!Array.isArray(negativeKeywords) || negativeKeywords.length === 0) {
      throw new Error('No negative keywords provided')
    }

    try {
      const response = await fetch(`${backendUrl}/api/google-ads/add-negative-keywords`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GOOGLE_ADS_API_KEY}`
        },
        body: JSON.stringify({
          customerId: GOOGLE_ADS_CUSTOMER_ID,
          campaignId: campaignId,
          negativeKeywords: negativeKeywords
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`Failed to add negative keywords: ${error.error || 'Unknown error'}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Add negative keywords failed:', error)
      throw error
    }
  },

  /**
   * Validate Google Ads configuration
   */
  validateConfiguration: () => {
    const config = {
      hasApiKey: !!GOOGLE_ADS_API_KEY,
      hasCustomerId: !!GOOGLE_ADS_CUSTOMER_ID,
      hasDeveloperToken: !!GOOGLE_ADS_DEVELOPER_TOKEN
    }

    const isValid = Object.values(config).every(val => val === true)

    return {
      isValid,
      ...config,
      missingConfig: Object.entries(config)
        .filter(([_, val]) => !val)
        .map(([key]) => key)
    }
  }
}
