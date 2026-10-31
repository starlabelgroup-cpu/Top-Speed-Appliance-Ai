// OpenAI Service for Ad Generation
// DISABLED - AI generator features have been disabled

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || null
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

export const openaiService = {
  generateAds: async (config) => {
    throw new Error('AI Ad Generator is disabled. Please use the Promotional Platform instead.')
  },

  improveAd: async (ad, improvements) => {
    throw new Error('AI Ad Generator is disabled. Please use the Promotional Platform instead.')
  }
}
