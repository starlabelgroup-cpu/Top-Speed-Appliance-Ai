// Google Gemini Service for AI-powered ad analysis and optimization
// DISABLED - AI generator features have been disabled

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || null
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent'

export const geminiService = {
  analyzeGoogleAds: async (adsData) => {
    throw new Error('AI Ad Generator is disabled. Please use the Promotional Platform instead.')
  },

  generateAdCopy: async (config) => {
    throw new Error('AI Ad Generator is disabled. Please use the Promotional Platform instead.')
  },

  optimizeLandingPageCopy: async (currentCopy, targetAudience) => {
    throw new Error('AI Ad Generator is disabled. Please use the Promotional Platform instead.')
  }
}
