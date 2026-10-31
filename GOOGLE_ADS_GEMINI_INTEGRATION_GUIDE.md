# Google Ads and Gemini 3 Integration Guide

This guide explains how to integrate Google Ads API and Google Gemini 3 AI with your Top Speed Appliance AI Ads Generator.

## Overview

The integration enables the AI Ads Generator to:

1. **Google Ads Analysis**: Query your Google Ads campaigns for underperforming keywords (high spend, low conversions)
2. **Gemini AI Insights**: Use Google's Gemini 3 AI to analyze wasted spend and provide recommendations
3. **Automated Improvements**: Get AI-powered suggestions for negative keywords and optimization strategies
4. **Ad Generation**: Generate new ad copy using Gemini instead of OpenAI

## Prerequisites

- Active Google Cloud Project
- Google Ads Account with API access
- Gemini API key
- Top Speed Appliance AI Ads Generator installed

---

## Part 1: Set Up Gemini API

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click **New Project**
4. Enter project name: `TopSpeed-AdsGenerator`
5. Click **Create**
6. Wait for project creation

### Step 2: Enable Gemini API

1. In Google Cloud Console, go to **APIs & Services > Library**
2. Search for `Generative Language API`
3. Click on **Generative Language API**
4. Click **Enable**

### Step 3: Create API Key

1. Go to **APIs & Services > Credentials**
2. Click **+ Create Credentials** > **API Key**
3. Copy the API key (you'll need this later)
4. (Optional) Set API key restrictions:
   - Under **Restrict key**, select **API restricitions**
   - Search and select **Generative Language API**
   - Click **Save**

### Step 4: Add Gemini API Key to Environment

1. Open your project's `.env` file
2. Add the following line:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
3. Replace `your_api_key_here` with the API key from Step 3
4. Save the file
5. Restart your development server: `npm run dev`

---

## Part 2: Set Up Google Ads API

### Step 1: Create Google Ads Account (if not already done)

If you don't have a Google Ads account:
1. Go to [Google Ads](https://ads.google.com/)
2. Click **Start now**
3. Follow the setup wizard

### Step 2: Get Your Customer ID

1. Log in to [Google Ads](https://ads.google.com/)
2. Click the **Settings** icon (⚙️) in the top right
3. Click **Account settings**
4. Look for **Account ID** (format: XXX-XXX-XXXX)
5. Copy this ID (you'll need it for configuration)

### Step 3: Enable Google Ads API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Make sure you're in the same project as above
3. Go to **APIs & Services > Library**
4. Search for `Google Ads API`
5. Click **Google Ads API**
6. Click **Enable**

### Step 4: Create OAuth 2.0 Credentials

1. Go to **APIs & Services > Credentials**
2. Click **+ Create Credentials** > **OAuth client ID**
3. If prompted, set up the OAuth consent screen:
   - Choose **External**
   - Click **Create**
   - Fill in the required fields (App name, User support email)
   - Add scopes: Search for `Google Ads API` and select it
   - Click **Save and continue**
4. Back to credentials:
   - Application type: **Web application**
   - Authorized redirect URIs: 
     - `http://localhost:3000/auth/callback`
     - `http://localhost:5173/auth/callback` (Vite default)
   - Click **Create**
5. You'll get a Client ID and Client Secret - save these

### Step 5: Get Developer Token

1. In [Google Ads](https://ads.google.com/):
2. Click the **Settings** icon > **API center**
3. Request access to the API (if not already enabled)
4. Once approved, you'll see your **Developer token** on the API center page
5. Copy this token

### Step 6: Create Refresh Token (for server-side integration)

For full Google Ads API integration, you'll need to:

1. Create a backend endpoint that handles Google Ads authentication
2. Use the OAuth credentials to get a refresh token
3. Use that refresh token to make API calls

**Note**: The current frontend integration uses a mock dataset for demo purposes. For production use, implement a backend service that:
- Handles Google Ads API authentication
- Queries the Google Ads API for campaign data
- Returns data to the frontend

### Step 7: Add Google Ads Configuration to Environment

1. Open your project's `.env` file
2. Add the following lines:
   ```
   VITE_GOOGLE_ADS_API_KEY=your_api_key_here
   VITE_GOOGLE_ADS_CUSTOMER_ID=your_customer_id_here
   VITE_GOOGLE_ADS_DEVELOPER_TOKEN=your_developer_token_here
   ```
3. Replace the values with your actual credentials
4. Save the file
5. Restart your development server: `npm run dev`

---

## Part 3: Backend Integration (Optional but Recommended)

For production use, implement backend endpoints to handle Google Ads API calls:

### Endpoint 1: Get Wasted Spend Analysis

```python
# Example Python Flask endpoint
@app.route('/api/google-ads/wasted-spend', methods=['POST'])
def get_wasted_spend():
    customer_id = request.json.get('customerId')
    min_spend = request.json.get('minSpend', 50)
    
    # Use Google Ads API client to fetch data
    client = GoogleAdsClient.load_from_storage('google-ads.yaml')
    
    # Query for search terms with high spend and zero conversions
    query = """
        SELECT search_term_view.search_term,
               metrics.cost_micros,
               metrics.conversions
        FROM search_term_view
        WHERE metrics.cost_micros > {}
        AND metrics.conversions = 0
    """.format(min_spend * 1000000)
    
    # Execute query and return results
    # ...
```

### Endpoint 2: Add Negative Keywords

```python
@app.route('/api/google-ads/add-negative-keywords', methods=['POST'])
def add_negative_keywords():
    customer_id = request.json.get('customerId')
    campaign_id = request.json.get('campaignId')
    keywords = request.json.get('negativeKeywords')
    
    # Use Google Ads API to add negative keywords
    # ...
```

See the Python script provided (`gemini_ads_analyzer.py`) for reference implementation.

---

## Part 4: Use the AI Ads Generator

### Analyze Google Ads Performance

1. Navigate to the **AI Ad Generator** page
2. In the **Google Ads Performance Analysis** section
3. Click **Analyze Wasted Spend**
4. The system will:
   - Fetch underperforming keywords
   - Send them to Gemini AI for analysis
   - Display AI-powered recommendations
5. Implement the suggested negative keywords in your Google Ads campaigns

### Generate Ads with Gemini

1. Configure your ad settings:
   - Product Category
   - Platform
   - Target Audience
   - Tone
2. Click **Generate with Gemini**
3. Gemini will generate new ad copy variations
4. Review, approve, and publish ads as needed

---

## File Structure

### New Services Created

```
src/services/
├── geminiService.js          # Gemini AI integration
├── googleAdsService.js       # Google Ads API integration
├── openaiService.js          # OpenAI (existing)
└── adsDatabase.js            # Database operations (updated)
```

### Updated Components

```
src/components/
└── AIAdsGenerator.jsx        # Updated with Gemini & Google Ads sections
```

### Updated Styles

```
src/styles/
└── ai-ads-generator.css      # New styles for analysis sections
```

---

## Environment Variables

```env
# Gemini Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key

# Google Ads Configuration
VITE_GOOGLE_ADS_API_KEY=your_google_ads_api_key
VITE_GOOGLE_ADS_CUSTOMER_ID=your_customer_id
VITE_GOOGLE_ADS_DEVELOPER_TOKEN=your_developer_token

# Existing Configuration
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## API References

### Gemini API

- **Model**: `gemini-3-flash-preview`
- **Documentation**: [Google Generative AI API](https://ai.google.dev)
- **Pricing**: First 50 requests/minute free, then paid tier

### Google Ads API

- **Version**: v14+
- **Documentation**: [Google Ads API Docs](https://developers.google.com/google-ads/api)
- **GAQL**: [Google Ads Query Language](https://developers.google.com/google-ads/api/fields/v14/overview)

---

## Troubleshooting

### "Gemini API key not configured"

**Solution**: Make sure `VITE_GEMINI_API_KEY` is set in your `.env` file

### "Google Ads Customer ID not configured"

**Solution**: Verify all three Google Ads environment variables are set:
- `VITE_GOOGLE_ADS_API_KEY`
- `VITE_GOOGLE_ADS_CUSTOMER_ID`
- `VITE_GOOGLE_ADS_DEVELOPER_TOKEN`

### "Failed to fetch Google Ads data"

**Possible causes**:
1. Missing backend endpoint (frontend demo uses mock data)
2. Invalid customer ID format
3. Insufficient API permissions
4. API quota exceeded

**Solution**: Implement backend service to handle Google Ads API calls

### "Gemini analysis shows repeated content"

This is expected behavior for Gemini sometimes. You can:
1. Modify the prompt in `geminiService.js`
2. Adjust temperature and other parameters
3. Try a different prompt or sample data

---

## Next Steps

1. ✅ Set up Gemini API
2. ✅ Set up Google Ads API
3. ✅ Add environment variables
4. ✅ Test in the AI Ads Generator
5. 🔄 Implement backend Google Ads proxy (optional but recommended)
6. 📊 Monitor Gemini AI recommendations
7. 🎯 Refine prompts based on results

---

## Support

For issues or questions:

- **Gemini API**: [AI Studio Help](https://support.google.com/aistudio)
- **Google Ads API**: [Support Center](https://support.google.com/google-ads)
- **This Project**: Check documentation or contact the development team

---

## Example Usage Flow

```
User clicks "Analyze Wasted Spend"
    ↓
Frontend queries Google Ads API (or backend proxy)
    ↓
Retrieves search terms with high spend, zero conversions
    ↓
Sends data to Gemini for analysis
    ↓
Gemini returns recommendations (negative keywords, etc.)
    ↓
Results displayed in UI
    ↓
User implements recommendations in Google Ads
    ↓
Monitor performance improvements
```

---

## Version History

- **v1.0** - Initial Google Ads and Gemini integration
  - Gemini API integration for ad analysis
  - Google Ads API service (frontend-ready)
  - Mock data for demo purposes
  - Supabase database support for saving analyses

---

**Last Updated**: December 2024
