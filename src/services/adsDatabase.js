// Ads Database Service - Supabase Integration via REST API
// Handles storing, retrieving, and managing generated ads
// Uses Supabase REST API instead of SDK (no dependencies needed)

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || null
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || null

// Helper to make Supabase REST API calls
const makeSupabaseRequest = async (method, endpoint, data = null) => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return null
  }

  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    }

    if (data) {
      options.body = JSON.stringify(data)
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1${endpoint}`, options)

    const contentType = response.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      console.error('Invalid response format from Supabase')
      return null
    }

    if (!response.ok) {
      try {
        const error = await response.json()
        console.error('Supabase API error:', error)
      } catch (parseErr) {
        console.error('Supabase API error: Status', response.status)
      }
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('Supabase request failed:', error)
    return null
  }
}

export const adsDatabase = {
  /**
   * Save a generated ad to the database
   */
  saveAd: async (ad) => {
    const adData = {
      headline: ad.headline,
      description: ad.description,
      cta: ad.cta,
      key_point: ad.keyPoint,
      platform: ad.platform,
      product_category: ad.productCategory,
      target_audience: ad.audience,
      tone: ad.tone,
      estimated_reach: ad.estimatedReach,
      status: ad.status || 'pending',
      generated_at: ad.generatedAt,
      created_by: ad.createdBy || 'admin'
    }

    // Try Supabase first
    const result = await makeSupabaseRequest(
      'POST',
      '/generated_ads',
      [adData]
    )

    if (result && result.length > 0) {
      return result[0]
    }

    // Fallback to localStorage
    const ads = JSON.parse(localStorage.getItem('generated_ads') || '[]')
    const newAd = { ...ad, id: Date.now() }
    ads.push(newAd)
    localStorage.setItem('generated_ads', JSON.stringify(ads))
    return newAd
  },

  /**
   * Retrieve all ads with optional filters
   */
  getAds: async (filters = {}) => {
    let query = ''

    if (filters.platform) {
      query += `platform=eq.${filters.platform}`
    }
    if (filters.status) {
      query += `${query ? '&' : ''}status=eq.${filters.status}`
    }
    if (filters.productCategory) {
      query += `${query ? '&' : ''}product_category=eq.${filters.productCategory}`
    }

    // Order by created_at descending
    query += `${query ? '&' : ''}order=created_at.desc`

    // Try Supabase first
    const result = await makeSupabaseRequest(
      'GET',
      `/generated_ads?${query}`,
      null
    )

    if (result && Array.isArray(result)) {
      return result
    }

    // Fallback to localStorage
    const ads = JSON.parse(localStorage.getItem('generated_ads') || '[]')
    return ads.reverse()
  },

  /**
   * Update ad status (approved, published, rejected)
   */
  updateAdStatus: async (adId, status) => {
    // Try Supabase first
    const result = await makeSupabaseRequest(
      'PATCH',
      `/generated_ads?id=eq.${adId}`,
      {
        status,
        updated_at: new Date().toISOString()
      }
    )

    if (result && result.length > 0) {
      return result[0]
    }

    // Fallback to localStorage
    const ads = JSON.parse(localStorage.getItem('generated_ads') || '[]')
    const adIndex = ads.findIndex(a => a.id === adId)
    if (adIndex !== -1) {
      ads[adIndex].status = status
      ads[adIndex].updated_at = new Date().toISOString()
      localStorage.setItem('generated_ads', JSON.stringify(ads))
      return ads[adIndex]
    }

    return null
  },

  /**
   * Delete an ad
   */
  deleteAd: async (adId) => {
    // Try Supabase first
    const result = await makeSupabaseRequest(
      'DELETE',
      `/generated_ads?id=eq.${adId}`,
      null
    )

    if (result !== null) {
      return true
    }

    // Fallback to localStorage
    const ads = JSON.parse(localStorage.getItem('generated_ads') || '[]')
    const filtered = ads.filter(a => a.id !== adId)
    localStorage.setItem('generated_ads', JSON.stringify(filtered))
    return true
  },

  /**
   * Get performance metrics for ads
   */
  getMetrics: async () => {
    // Try Supabase first
    const result = await makeSupabaseRequest(
      'GET',
      '/generated_ads?select=status,platform',
      null
    )

    if (result && Array.isArray(result)) {
      const metrics = {
        totalGenerated: result.length,
        totalPublished: result.filter(a => a.status === 'published').length,
        totalApproved: result.filter(a => a.status === 'approved').length,
        byPlatform: {
          facebook: result.filter(a => a.platform === 'facebook').length,
          google: result.filter(a => a.platform === 'google').length
        }
      }
      return metrics
    }

    // Fallback: Return mock metrics or localStorage data
    const localAds = JSON.parse(localStorage.getItem('generated_ads') || '[]')
    return {
      totalGenerated: localAds.length,
      totalPublished: localAds.filter(a => a.status === 'published').length,
      totalApproved: localAds.filter(a => a.status === 'approved').length,
      byPlatform: {
        facebook: localAds.filter(a => a.platform === 'facebook').length,
        google: localAds.filter(a => a.platform === 'google').length
      }
    }
  },

  /**
   * Save an analysis result (Google Ads analysis with Gemini insights)
   */
  saveAnalysis: async (analysis) => {
    const analysisData = {
      type: analysis.type,
      data: analysis.data,
      analysis: analysis.analysis,
      timestamp: analysis.timestamp,
      created_by: analysis.createdBy || 'admin'
    }

    // Try Supabase first
    const result = await makeSupabaseRequest(
      'POST',
      '/ads_analyses',
      [analysisData]
    )

    if (result && result.length > 0) {
      return result[0]
    }

    // Fallback to localStorage
    const analyses = JSON.parse(localStorage.getItem('ads_analyses') || '[]')
    const newAnalysis = { ...analysis, id: Date.now() }
    analyses.push(newAnalysis)
    localStorage.setItem('ads_analyses', JSON.stringify(analyses))
    return newAnalysis
  },

  /**
   * Get saved analyses
   */
  getAnalyses: async (type = null) => {
    let query = ''

    if (type) {
      query = `type=eq.${type}`
    }

    query += `${query ? '&' : ''}order=timestamp.desc`

    // Try Supabase first
    const result = await makeSupabaseRequest(
      'GET',
      `/ads_analyses?${query}`,
      null
    )

    if (result && Array.isArray(result)) {
      return result
    }

    // Fallback to localStorage
    const analyses = JSON.parse(localStorage.getItem('ads_analyses') || '[]')
    if (type) {
      return analyses.filter(a => a.type === type).reverse()
    }
    return analyses.reverse()
  }
}
