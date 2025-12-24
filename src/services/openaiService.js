// OpenAI Service for Ad Generation
// Will use OpenAI API to generate creative ad variations

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || null
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

export const openaiService = {
  /**
   * Generate ads using OpenAI
   */
  generateAds: async (config) => {
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured. Please set VITE_OPENAI_API_KEY environment variable.')
    }

    const {
      productCategory,
      platform,
      audience,
      tone,
      count = 3,
      budget
    } = config

    const platformDescription = {
      facebook: 'Facebook & Instagram (social media)',
      google: 'Google Ads (search and display)',
      all: 'Multiple platforms (Facebook, Google)'
    }[platform] || 'Multiple platforms'

    const prompt = `Generate ${count} creative and compelling advertisement variations for Top Speed Appliance company.

Product Category: ${productCategory}
Target Platform: ${platformDescription}
Target Audience: ${audience}
Tone/Style: ${tone}
Daily Budget: $${budget}

For each ad, provide:
1. Headline (max 30 characters)
2. Description (max 90 characters)
3. CTA Button Text
4. Key selling point

Format the response as a JSON array with objects containing: headline, description, cta, keyPoint, platform, and estimatedReach.

Make the ads compelling, action-oriented, and specific to appliance repair/sales business.`

    try {
      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo-preview',
          messages: [
            {
              role: 'system',
              content: 'You are a creative marketing expert specializing in appliance industry advertising. Generate compelling, conversion-focused ads.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      })

      if (!response.ok) {
        const contentType = response.headers.get('content-type')
        if (contentType?.includes('application/json')) {
          try {
            const error = await response.json()
            throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`)
          } catch (parseErr) {
            throw new Error(`OpenAI API error: Status ${response.status}`)
          }
        } else {
          throw new Error(`OpenAI API error: Status ${response.status}`)
        }
      }

      const contentType = response.headers.get('content-type')
      if (!contentType?.includes('application/json')) {
        throw new Error('Invalid response format from OpenAI API')
      }

      let data
      try {
        data = await response.json()
      } catch (parseErr) {
        throw new Error('Failed to parse OpenAI response as JSON')
      }

      const content = data.choices[0].message.content

      const jsonMatch = content.match(/\[[\s\S]*\]/)
      if (!jsonMatch) {
        throw new Error('Could not parse AI response')
      }

      let ads
      try {
        ads = JSON.parse(jsonMatch[0])
      } catch (parseErr) {
        throw new Error('Failed to parse generated ads JSON')
      }

      // Ensure platform is set correctly
      return ads.map(ad => ({
        ...ad,
        platform: platform === 'all' ? (Math.random() > 0.5 ? 'facebook' : 'google') : platform,
        generatedAt: new Date().toISOString(),
        status: 'pending'
      }))
    } catch (error) {
      console.error('OpenAI API call failed:', error)
      throw error
    }
  },

  /**
   * Improve existing ad copy using AI
   */
  improveAd: async (ad, improvements) => {
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured.')
    }

    const prompt = `Improve this advertisement based on the following feedback:

Current Headline: "${ad.headline}"
Current Description: "${ad.description}"

Improvement Focus: ${improvements}

Provide an improved version maintaining the same character limits.
Headline: max 30 chars
Description: max 90 chars

Return as JSON with improved "headline" and "description" fields.`

    try {
      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo-preview',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.6,
          max_tokens: 500
        })
      })

      if (!response.ok) {
        throw new Error(`Failed to improve ad: Status ${response.status}`)
      }

      const contentType = response.headers.get('content-type')
      if (!contentType?.includes('application/json')) {
        throw new Error('Invalid response format from OpenAI API')
      }

      let data
      try {
        data = await response.json()
      } catch (parseErr) {
        throw new Error('Failed to parse OpenAI response as JSON')
      }

      const content = data.choices[0].message.content

      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('Could not parse improvement response')
      }

      try {
        return JSON.parse(jsonMatch[0])
      } catch (parseErr) {
        throw new Error('Failed to parse improved ad JSON')
      }
    } catch (error) {
      console.error('AI improvement failed:', error)
      throw error
    }
  }
}
