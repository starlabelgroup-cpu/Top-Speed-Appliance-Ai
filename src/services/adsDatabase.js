// Ads Database Service - Supabase Integration
// Handles storing, retrieving, and managing generated ads

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || null
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || null

// Initialize Supabase client
let supabaseClient = null

const initSupabase = async () => {
  if (supabaseClient) return supabaseClient

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('Supabase not configured. Using local storage fallback.')
    return null
  }

  // Dynamically import supabase client
  try {
    const { createClient } = await import('@supabase/supabase-js')
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    return supabaseClient
  } catch (error) {
    console.warn('Supabase client not available:', error)
    return null
  }
}

export const adsDatabase = {
  /**
   * Save a generated ad to the database
   */
  saveAd: async (ad) => {
    const supabase = await initSupabase()

    if (!supabase) {
      // Fallback to localStorage
      const ads = JSON.parse(localStorage.getItem('generated_ads') || '[]')
      const newAd = { ...ad, id: Date.now() }
      ads.push(newAd)
      localStorage.setItem('generated_ads', JSON.stringify(ads))
      return newAd
    }

    try {
      const { data, error } = await supabase
        .from('generated_ads')
        .insert([
          {
            headline: ad.headline,
            description: ad.description,
            cta: ad.cta,
            key_point: ad.keyPoint,
            platform: ad.platform,
            product_category: ad.productCategory,
            target_audience: ad.audience,
            tone: ad.tone,
            estimated_reach: ad.estimatedReach,
            status: ad.status,
            generated_at: ad.generatedAt,
            created_by: ad.createdBy
          }
        ])
        .select()

      if (error) throw error
      return data[0]
    } catch (error) {
      console.error('Failed to save ad:', error)
      throw error
    }
  },

  /**
   * Retrieve all ads with optional filters
   */
  getAds: async (filters = {}) => {
    const supabase = await initSupabase()

    if (!supabase) {
      // Fallback to localStorage
      const ads = JSON.parse(localStorage.getItem('generated_ads') || '[]')
      return ads.reverse()
    }

    try {
      let query = supabase.from('generated_ads').select('*')

      if (filters.platform) {
        query = query.eq('platform', filters.platform)
      }
      if (filters.status) {
        query = query.eq('status', filters.status)
      }
      if (filters.productCategory) {
        query = query.eq('product_category', filters.productCategory)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Failed to fetch ads:', error)
      throw error
    }
  },

  /**
   * Update ad status (approved, published, rejected)
   */
  updateAdStatus: async (adId, status) => {
    const supabase = await initSupabase()

    if (!supabase) {
      // Fallback to localStorage
      const ads = JSON.parse(localStorage.getItem('generated_ads') || '[]')
      const adIndex = ads.findIndex(a => a.id === adId)
      if (adIndex !== -1) {
        ads[adIndex].status = status
        localStorage.setItem('generated_ads', JSON.stringify(ads))
      }
      return ads[adIndex]
    }

    try {
      const { data, error } = await supabase
        .from('generated_ads')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', adId)
        .select()

      if (error) throw error
      return data[0]
    } catch (error) {
      console.error('Failed to update ad status:', error)
      throw error
    }
  },

  /**
   * Delete an ad
   */
  deleteAd: async (adId) => {
    const supabase = await initSupabase()

    if (!supabase) {
      // Fallback to localStorage
      const ads = JSON.parse(localStorage.getItem('generated_ads') || '[]')
      const filtered = ads.filter(a => a.id !== adId)
      localStorage.setItem('generated_ads', JSON.stringify(filtered))
      return true
    }

    try {
      const { error } = await supabase
        .from('generated_ads')
        .delete()
        .eq('id', adId)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Failed to delete ad:', error)
      throw error
    }
  },

  /**
   * Get performance metrics for ads
   */
  getMetrics: async () => {
    const supabase = await initSupabase()

    if (!supabase) {
      // Return mock metrics
      return {
        totalGenerated: 0,
        totalPublished: 0,
        totalApproved: 0,
        byPlatform: { facebook: 0, google: 0 }
      }
    }

    try {
      const { data, error } = await supabase
        .from('generated_ads')
        .select('status, platform')

      if (error) throw error

      const metrics = {
        totalGenerated: data.length,
        totalPublished: data.filter(a => a.status === 'published').length,
        totalApproved: data.filter(a => a.status === 'approved').length,
        byPlatform: {
          facebook: data.filter(a => a.platform === 'facebook').length,
          google: data.filter(a => a.platform === 'google').length
        }
      }

      return metrics
    } catch (error) {
      console.error('Failed to get metrics:', error)
      return null
    }
  }
}
