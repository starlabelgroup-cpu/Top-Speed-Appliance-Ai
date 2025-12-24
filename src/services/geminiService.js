// Google Gemini Service for AI-powered ad analysis and optimization
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || null
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent'

export const geminiService = {
  /**
   * Analyze Google Ads performance data using Gemini AI
   */
  analyzeGoogleAds: async (adsData) => {
    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key not configured. Please set VITE_GEMINI_API_KEY environment variable.')
    }

    if (!adsData || adsData.length === 0) {
      throw new Error('No ads data provided for analysis')
    }

    const adsAnalysisText = adsData
      .map(ad => `Term: "${ad.searchTerm}" | Spend: $${ad.spend} | Conversions: ${ad.conversions} | Impressions: ${ad.impressions}`)
      .join('\n')

    const prompt = `You are a Google Ads specialist. Analyze these underperforming search terms that have high spend but low/zero conversions:

${adsAnalysisText}

Task:
1. Identify which terms are likely irrelevant or off-brand
2. Recommend specific negative keywords to add
3. Suggest bid adjustments for similar terms
4. Provide actionable insights to improve ROI

Format your response as structured recommendations that can be implemented immediately.`

    try {
      const response = await fetch(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 2048
            }
          })
        }
      )

      if (!response.ok) {
        const contentType = response.headers.get('content-type')
        if (contentType?.includes('application/json')) {
          try {
            const error = await response.json()
            throw new Error(`Gemini API error: ${error.error?.message || 'Unknown error'}`)
          } catch (parseErr) {
            throw new Error(`Gemini API error: Status ${response.status}`)
          }
        } else {
          throw new Error(`Gemini API error: Status ${response.status}`)
        }
      }

      const contentType = response.headers.get('content-type')
      if (!contentType?.includes('application/json')) {
        throw new Error('Invalid response format from Gemini API')
      }

      const data = await response.json()

      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid Gemini API response')
      }

      const analysisText = data.candidates[0].content.parts[0].text

      return {
        analysis: analysisText,
        timestamp: new Date().toISOString(),
        model: 'gemini-3-flash-preview',
        inputTokens: data.usageMetadata?.inputTokens || 0,
        outputTokens: data.usageMetadata?.outputTokens || 0
      }
    } catch (error) {
      console.error('Gemini API analysis failed:', error)
      throw error
    }
  },

  /**
   * Generate ad copy variations using Gemini
   */
  generateAdCopy: async (config) => {
    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key not configured.')
    }

    const {
      productCategory,
      platform,
      audience,
      tone,
      count = 3,
      focusKeyword
    } = config

    const prompt = `Generate ${count} creative and compelling advertisement variations for Top Speed Appliance company.

Product Category: ${productCategory}
Target Platform: ${platform}
Target Audience: ${audience}
Tone/Style: ${tone}
Focus Keyword: ${focusKeyword || 'appliance repair'}

For each ad, provide:
1. Headline (max 30 characters)
2. Description (max 90 characters)
3. CTA Button Text (max 15 characters)
4. Key selling point

Format as JSON array with objects: {headline, description, cta, keyPoint, platform}

Create compelling, action-oriented, conversion-focused ads specific to the appliance repair/sales business.`

    try {
      const response = await fetch(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.8,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 2000
            }
          })
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`Gemini API error: ${error.error?.message || 'Unknown error'}`)
      }

      const data = await response.json()

      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid Gemini API response')
      }

      const content = data.candidates[0].content.parts[0].text

      // Parse the JSON response
      const jsonMatch = content.match(/\[[\s\S]*\]/)
      if (!jsonMatch) {
        throw new Error('Could not parse Gemini response')
      }

      const ads = JSON.parse(jsonMatch[0])

      return ads.map(ad => ({
        ...ad,
        platform: platform || 'google',
        generatedAt: new Date().toISOString(),
        status: 'pending',
        source: 'gemini'
      }))
    } catch (error) {
      console.error('Gemini ad generation failed:', error)
      throw error
    }
  },

  /**
   * Optimize ad landing page copy using Gemini
   */
  optimizeLandingPageCopy: async (currentCopy, targetAudience) => {
    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key not configured.')
    }

    const prompt = `You are a conversion rate optimization expert. Improve this landing page copy for maximum conversions.

Current Copy:
${currentCopy}

Target Audience: ${targetAudience}

Provide:
1. Optimized headline
2. Revised value proposition
3. Improved CTA text
4. Benefit statement

Focus on clarity, urgency, and conversion psychology. Format as JSON.`

    try {
      const response = await fetch(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.6,
              maxOutputTokens: 1000
            }
          })
        }
      )

      if (!response.ok) {
        throw new Error('Failed to optimize copy')
      }

      const data = await response.json()
      const content = data.candidates[0].content.parts[0].text

      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('Could not parse optimization response')
      }

      return JSON.parse(jsonMatch[0])
    } catch (error) {
      console.error('Landing page optimization failed:', error)
      throw error
    }
  }
}
