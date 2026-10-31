import dotenv from 'dotenv'

dotenv.config()

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent'

export const geminiAdGenerator = {
  /**
   * Generate ad copy variations using Gemini
   */
  generateAdCopy: async (config) => {
    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key not configured')
    }

    const {
      productCategory = 'appliance repair',
      platform = 'google',
      audience = 'homeowners',
      tone = 'urgent',
      count = 3,
      focusKeyword = 'appliance repair near me'
    } = config

    const prompt = `Generate ${count} highly converting Google Ads for Top Speed Appliance company.

Product/Service: ${productCategory}
Target Platform: ${platform}
Target Audience: ${audience}
Tone: ${tone}
Focus Keyword: ${focusKeyword}

For each ad, provide:
1. Headline 1 (max 30 characters)
2. Headline 2 (max 30 characters)
3. Headline 3 (max 30 characters)
4. Description Line 1 (max 90 characters)
5. Description Line 2 (max 90 characters)
6. Final URL (must be valid URL)
7. Display URL (domain only)
8. Call-to-action text

Make the ads:
- Action-oriented and conversion-focused
- Specific to South Florida appliance repair
- Include urgency or benefit
- Professional and trustworthy

Format each ad as JSON with keys: headline1, headline2, headline3, description1, description2, finalUrl, displayUrl, cta

Return as JSON array of ad objects.`

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

      // Parse JSON from response
      const jsonMatch = content.match(/\[[\s\S]*\]/)
      if (!jsonMatch) {
        throw new Error('Could not parse Gemini response')
      }

      const ads = JSON.parse(jsonMatch[0])

      return ads.map(ad => ({
        ...ad,
        platform,
        audience,
        tone,
        generatedAt: new Date().toISOString(),
        status: 'draft',
        source: 'gemini'
      }))
    } catch (error) {
      console.error('Gemini ad generation failed:', error)
      throw error
    }
  },

  /**
   * Generate ad variations based on existing ad
   */
  generateVariations: async (existingAd, variationType = 'aggressive') => {
    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key not configured')
    }

    const { headline1, description1 } = existingAd

    const prompt = `Create 3 variations of this Google Ad with different approaches:

Original Headline: "${headline1}"
Original Description: "${description1}"

Variation Type: ${variationType}

For each variation:
- Keep the same product/service (appliance repair)
- Adjust tone and messaging for the variation type
- Maintain character limits
- Keep South Florida focus

Types:
- aggressive: High urgency, time-sensitive, "call now"
- educational: Benefits-focused, expertise, "learn why"
- testimonial: Trust-based, "customers love us", proof

Return as JSON array with objects containing: headline1, description1, cta`

    try {
      const response = await fetch(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }]
              }
            ]
          })
        }
      )

      if (!response.ok) {
        throw new Error('Failed to generate variations')
      }

      const data = await response.json()
      const content = data.candidates[0].content.parts[0].text
      const jsonMatch = content.match(/\[[\s\S]*\]/)

      if (!jsonMatch) {
        throw new Error('Could not parse variations')
      }

      return JSON.parse(jsonMatch[0])
    } catch (error) {
      console.error('Variation generation failed:', error)
      throw error
    }
  },

  /**
   * Analyze ad performance and suggest improvements
   */
  analyzeAndOptimize: async (adMetrics) => {
    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key not configured')
    }

    const { clicks, impressions, conversions, headline, description } = adMetrics

    const ctr = impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : 0
    const conversionRate = clicks > 0 ? ((conversions / clicks) * 100).toFixed(2) : 0

    const prompt = `Analyze this Google Ad performance and suggest improvements:

Current Ad:
- Headline: "${headline}"
- Description: "${description}"

Metrics:
- Impressions: ${impressions}
- Clicks: ${clicks}
- CTR: ${ctr}%
- Conversions: ${conversions}
- Conversion Rate: ${conversionRate}%

Provide:
1. Performance assessment (excellent/good/needs improvement)
2. Top 3 issues with the current ad
3. Specific improvements to headline
4. Specific improvements to description
5. Recommended CTA change
6. Expected improvement in CTR and conversion rate

Be specific and actionable. Format as JSON.`

    try {
      const response = await fetch(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }]
              }
            ]
          })
        }
      )

      if (!response.ok) {
        throw new Error('Failed to analyze ad')
      }

      const data = await response.json()
      const content = data.candidates[0].content.parts[0].text
      const jsonMatch = content.match(/\{[\s\S]*\}/)

      if (!jsonMatch) {
        return { analysis: content, raw: true }
      }

      return JSON.parse(jsonMatch[0])
    } catch (error) {
      console.error('Ad analysis failed:', error)
      throw error
    }
  },

  /**
   * Validate Gemini API configuration
   */
  validateConfiguration: () => {
    return {
      isConfigured: !!GEMINI_API_KEY,
      apiKey: GEMINI_API_KEY ? '***HIDDEN***' : 'NOT SET',
      model: 'gemini-3-flash-preview'
    }
  }
}
