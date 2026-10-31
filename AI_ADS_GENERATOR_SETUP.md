# AI Ads Generator - Setup Guide

This document explains how to set up the AI Ads Generator for Top Speed Appliance.

## Features

- ✅ AI-powered ad generation using OpenAI
- ✅ Multi-platform support (Facebook, Google Ads)
- ✅ Admin-only access control
- ✅ Database storage with Supabase
- ✅ Real-time metrics and activity tracking
- ✅ Ad approval/publishing workflow
- ✅ Beautiful dashboard with launch sequence

## Quick Start

### 1. Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# OpenAI API Configuration
VITE_OPENAI_API_KEY=your_openai_api_key_here

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 2. Access the Admin Panel

- Navigate to `/admin/login` to access the admin login page
- For now, use any email and password (6+ characters) to log in (demo mode)
- After authentication is set up, use your Supabase credentials

### 3. Route to AI Ads Generator

Once logged in, you'll be redirected to `/admin/ads-generator`

## Detailed Setup Instructions

### Step 1: Set Up OpenAI API

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Create a new API key in the [API keys section](https://platform.openai.com/api-keys)
4. Copy the API key
5. Add it to your `.env` file as `VITE_OPENAI_API_KEY`

**Note:** The system uses GPT-4 Turbo Preview by default. If you want to use a different model, edit `src/services/openaiService.js` and change the `model` parameter.

### Step 2: Set Up Supabase

#### 2.1 Create a Supabase Account
1. Go to [Supabase](https://supabase.com/)
2. Click "Start Your Project"
3. Sign up with your email or GitHub account
4. Create a new project

#### 2.2 Create the Database Table

In the Supabase dashboard, go to SQL Editor and run this query:

```sql
-- Create generated_ads table
CREATE TABLE generated_ads (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  headline TEXT NOT NULL,
  description TEXT NOT NULL,
  cta TEXT NOT NULL,
  key_point TEXT,
  platform VARCHAR(50) NOT NULL,
  product_category VARCHAR(100),
  target_audience VARCHAR(100),
  tone VARCHAR(100),
  estimated_reach VARCHAR(50),
  status VARCHAR(50) DEFAULT 'pending',
  created_by VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX idx_generated_ads_platform ON generated_ads(platform);
CREATE INDEX idx_generated_ads_status ON generated_ads(status);
CREATE INDEX idx_generated_ads_created_at ON generated_ads(created_at DESC);
```

#### 2.3 Get Your Supabase Credentials

1. In the Supabase dashboard, click "Settings" → "API"
2. Copy the "Project URL" and paste it as `VITE_SUPABASE_URL`
3. Copy the "anon" "public" key and paste it as `VITE_SUPABASE_ANON_KEY`
4. Add both to your `.env` file

### Step 3: Set Up Neon (Optional)

If you want to use Neon as a PostgreSQL provider instead of Supabase's default:

1. Go to [Neon](https://neon.tech/)
2. Create an account and set up a project
3. Get your connection string
4. In Supabase, you can configure an external database connection in Project Settings

**Note:** The current implementation uses Supabase's built-in database. Neon support can be added as an alternative.

### Step 4: Install Dependencies (If Not Already Installed)

```bash
npm install
# or
yarn install
```

If using Supabase client library, it will be auto-imported from CDN in the service file.

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_OPENAI_API_KEY` | OpenAI API key for ad generation | `sk-...` |
| `VITE_SUPABASE_URL` | Your Supabase project URL | `https://xxxxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhb...` |

## How to Use

### 1. Accessing the Admin Panel

1. Go to `/admin/login`
2. Enter credentials (demo mode accepts any valid input)
3. You'll be redirected to the AI Ads Generator dashboard

### 2. Generating Ads

1. Set your preferences:
   - Product Category (Refrigerators, Washers, etc.)
   - Platform (Facebook, Google, or Both)
   - Target Audience
   - Ad Tone/Style
   - Daily Budget

2. Click "Generate New Ads" button
3. Wait for AI to create 3 ad variations
4. Review the generated ads in the list below

### 3. Managing Generated Ads

Each ad has action buttons:
- **Approve** (✓): Mark ad as approved for publishing
- **Publish** (✈): Publish to the selected platform
- **Delete** (🗑): Remove the ad

### 4. System Controls

In the left panel, you can:
- Toggle Auto-Generation
- Enable Auto-Publishing
- Configure A/B Testing
- Set Budget Optimization
- Change generation speed
- Set daily ad limits

## Troubleshooting

### "OpenAI API key not configured"

**Solution:** Make sure you have set `VITE_OPENAI_API_KEY` in your `.env` file and restarted the dev server.

### "Supabase not configured"

**Solution:** The system falls back to localStorage if Supabase is not configured. Ads will be stored locally in the browser. To use Supabase, set the environment variables and restart.

### Ads not saving to database

**Possible causes:**
1. Supabase connection not working - check network in browser dev tools
2. Table schema not created - run the SQL query provided above
3. RLS (Row Level Security) enabled without proper policies - disable RLS for testing

### "Failed to generate ads" error

**Possible causes:**
1. Invalid OpenAI API key
2. Rate limit exceeded (OpenAI free tier has limits)
3. Network error - check browser console for details
4. Model not available in your account (GPT-4 requires paid tier)

**Solutions:**
- Verify your API key at [OpenAI dashboard](https://platform.openai.com/api-keys)
- Check your API usage and limits
- If using free tier, switch to `gpt-3.5-turbo` in `src/services/openaiService.js`

## Database Schema

### generated_ads Table

| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT (PK) | Auto-generated ID |
| headline | TEXT | Ad headline (max 30 chars) |
| description | TEXT | Ad description (max 90 chars) |
| cta | TEXT | Call-to-action button text |
| key_point | TEXT | Key selling point |
| platform | VARCHAR(50) | 'facebook' or 'google' |
| product_category | VARCHAR(100) | Appliance category |
| target_audience | VARCHAR(100) | Target audience segment |
| tone | VARCHAR(100) | Ad tone/style |
| estimated_reach | VARCHAR(50) | Estimated reach metrics |
| status | VARCHAR(50) | 'pending', 'approved', 'published', 'rejected' |
| created_by | VARCHAR(255) | Admin user who created |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |
| published_at | TIMESTAMP | Publishing timestamp |

## API Integration

### OpenAI Service (`src/services/openaiService.js`)

Handles AI ad generation using OpenAI API:
- `generateAds(config)` - Generate new ad variations
- `improveAd(ad, improvements)` - Improve existing ad copy

### Ads Database Service (`src/services/adsDatabase.js`)

Handles database operations:
- `saveAd(ad)` - Save generated ad
- `getAds(filters)` - Retrieve ads with optional filters
- `updateAdStatus(adId, status)` - Update ad status
- `deleteAd(adId)` - Delete ad
- `getMetrics()` - Get performance metrics

## Next Steps

1. **Implement Full Authentication:**
   - Replace demo login with Supabase Auth
   - Set up user roles and permissions
   - Add JWT token management

2. **Platform Integration:**
   - Add Facebook Graph API integration
   - Add Google Ads API integration
   - Implement actual ad publishing

3. **Enhanced Features:**
   - A/B testing results dashboard
   - Real-time performance analytics
   - Ad scheduling and automation
   - Bulk ad operations
   - Custom prompt engineering

4. **Security:**
   - Enable RLS (Row Level Security) in Supabase
   - Implement proper authorization checks
   - Add audit logging for ad operations
   - Rate limiting for API calls

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console for error messages
3. Check Supabase dashboard for database errors
4. Verify OpenAI API key and rate limits

## Files Created

- `src/components/AIAdsGenerator.jsx` - Main ad generator component
- `src/components/AdminLogin.jsx` - Admin login page
- `src/services/openaiService.js` - OpenAI API integration
- `src/services/adsDatabase.js` - Supabase database operations
- `src/utils/adminAuth.js` - Admin authentication utilities
- `src/styles/ai-ads-generator.css` - Generator styling
- `src/styles/admin-login.css` - Login page styling

## File Modifications

- `src/App.jsx` - Added routes for `/admin/login` and `/admin/ads-generator`

---

Last Updated: 2024
