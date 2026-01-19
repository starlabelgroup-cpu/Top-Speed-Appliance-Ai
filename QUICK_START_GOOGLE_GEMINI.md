# Quick Start Guide: Google Ads & Gemini 3 Integration

Get the AI Ads Generator up and running with Gemini AI in 10 minutes!

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Gemini API Key (2 minutes)

1. Open [Google AI Studio](https://aistudio.google.com)
2. Click **"Create API Key"** in the sidebar
3. Create key in "Default project" (or create a new one)
4. **Copy the API key** (keep this safe!)

### Step 2: Add to Environment (1 minute)

1. Open your `.env` file in the project
2. Add this line:
   ```
   VITE_GEMINI_API_KEY=paste_your_api_key_here
   ```
3. Save the file
4. Restart your dev server (`npm run dev`)

### Step 3: Test It (2 minutes)

1. Navigate to the **AI Ads Generator** page
2. Scroll down to **"Google Ads Performance Analysis"** section
3. Click **"Analyze Wasted Spend"** button
4. Wait for Gemini to analyze the data (~3 seconds)
5. ✅ You should see AI-powered recommendations!

---

## 🎯 Using the Features

### Analyze Google Ads Performance

```
1. Click "Analyze Wasted Spend" button
2. System identifies underperforming keywords
3. Gemini AI provides recommendations:
   - Which keywords to block (negative keywords)
   - Why they're not converting
   - Optimization suggestions
4. Results are saved to your database
```

### Generate Ads with Gemini

```
1. Configure your ad settings:
   - Product Category: Choose (e.g., Refrigerators)
   - Platform: Facebook or Google Ads
   - Audience: Target audience type
   - Tone: Professional, Urgent, Friendly, etc.

2. Click "Generate with Gemini" button

3. Gemini creates 3 ad variations with:
   - Headline (max 30 characters)
   - Description (max 90 characters)
   - Call-to-action button text
   - Key selling point

4. Review ads and:
   - ✅ Approve ads
   - 🚀 Publish to platforms
   - 🗑️ Delete unwanted ads
```

---

## 📊 What You Get

### From "Analyze Wasted Spend"

Gemini identifies:
- High-cost keywords with zero conversions
- Why these terms don't convert
- Specific negative keywords to add
- Bid adjustment recommendations

**Example Output:**
```
Wasted Spend Terms:
- "free appliance repair" ($85.50 spent, 0 conversions)
- "cheap refrigerator" ($72.30 spent, 0 conversions)

Gemini Recommendations:
1. Add "-free" as negative keyword (intent: DIY, not repair service)
2. Add "-used" as negative keyword (targets secondhand, not repair)
3. Increase bids for branded keywords instead
4. Consider audience exclusions for low-income areas
```

### From "Generate with Gemini"

Gemini creates:
- Multiple ad variations per configuration
- Professional, conversion-focused copy
- Platform-specific optimizations
- Industry-relevant messaging

---

## 🔧 Environment Variables

### Minimal Setup (Demo Mode)
```env
VITE_GEMINI_API_KEY=your_api_key_here
```

### Full Setup (Optional - Production)
```env
VITE_GEMINI_API_KEY=your_api_key_here
VITE_GOOGLE_ADS_API_KEY=your_key_here
VITE_GOOGLE_ADS_CUSTOMER_ID=123-456-7890
VITE_GOOGLE_ADS_DEVELOPER_TOKEN=your_token_here
```

---

## ❓ Common Questions

### Q: Do I need Google Ads API key to use Gemini?
**A:** No! Gemini works with demo data. Google Ads API is optional for production use.

### Q: Where are my results saved?
**A:** Analyses are saved to Supabase (if configured) or localStorage (automatic fallback).

### Q: Can I use this with my own Google Ads account?
**A:** Yes, but requires backend setup. See full integration guide for details.

### Q: How much does this cost?
**A:** 
- Gemini: First 50 requests/min free, then ~$0.075 per 1M input tokens
- Google Ads API: Free with your Google Ads account

### Q: What if Gemini returns strange results?
**A:** This is normal occasionally. Try analyzing again - LLMs are non-deterministic.

---

## 🎨 UI Navigation

```
AI Ads Generator
├── System Header
├── Control Panel (Left Sidebar)
├── Main Content Area
│   ├── System Metrics (cards)
│   ├── Generation Settings (controls)
│   ├── Generated Ads (grid)
│   ├── Google Ads Performance Analysis ← NEW!
│   │   ├── Analyze Wasted Spend button
│   │   ├── Generate with Gemini button
│   │   ├── Wasted Spend Terms (if analysis done)
│   │   └── Gemini AI Recommendations (if analysis done)
│   └── System Activity (feed)
└── Back Link
```

---

## 📱 Mobile Support

The interface is fully responsive:
- ✅ Works on tablets
- ✅ Works on phones
- ✅ Touch-friendly buttons
- ✅ Mobile-optimized layout

---

## 🐛 Troubleshooting Quick Fixes

| Error | Solution |
|-------|----------|
| "Gemini API key not configured" | Add `VITE_GEMINI_API_KEY` to `.env`, restart server |
| "Failed to analyze" | Check API key is valid, rate limit not exceeded |
| "No ads generated" | Check `VITE_GEMINI_API_KEY` and API quota |
| "Results not saving" | Check Supabase config or use localStorage |
| "Slow responses" | Gemini can take 3-5 seconds, this is normal |

---

## 📈 Next Steps

1. ✅ Set up Gemini API key
2. ✅ Test with "Analyze Wasted Spend"
3. ✅ Test with "Generate with Gemini"
4. 🔄 Review saved analyses in activity feed
5. 📊 Implement Gemini recommendations in Google Ads
6. 📈 Monitor performance improvements

---

## 🎓 Learning Resources

- **Gemini Docs**: https://ai.google.dev
- **Full Setup Guide**: See `GOOGLE_ADS_GEMINI_INTEGRATION_GUIDE.md`
- **Integration Summary**: See `GOOGLE_GEMINI_INTEGRATION_SUMMARY.md`
- **Python Reference**: See `gemini_ads_analyzer.py`

---

## 💡 Pro Tips

1. **Better Analysis**: Provide specific product categories and audiences for more targeted recommendations

2. **Ad Performance**: Use different tones (Urgent, Friendly, Professional) to A/B test messaging

3. **Cost Optimization**: Implement all of Gemini's negative keyword suggestions within 1-2 weeks

4. **Database**: Enable Supabase to keep historical analyses for trend tracking

5. **Batch Operations**: Generate ads in batches by product category for easier organization

---

## ⚡ Performance Tips

- **Faster Analysis**: Analyze small batches (5-10 keywords) for faster results
- **Quicker Generation**: Use "Balanced" generation speed for good quality + speed ratio
- **Save Bandwidth**: Results auto-save to localStorage if Supabase is unavailable

---

## 🔐 Security Checklist

- ✅ Never commit `.env` file with API keys
- ✅ Use separate API keys for dev and production
- ✅ Rotate API keys every 90 days
- ✅ Monitor API usage for unusual activity
- ✅ Don't share API keys in code or documentation

---

## 📞 Support

- **Stuck?** Check the full integration guide: `GOOGLE_ADS_GEMINI_INTEGRATION_GUIDE.md`
- **More details?** See `GOOGLE_GEMINI_INTEGRATION_SUMMARY.md`
- **Errors?** Check troubleshooting section above

---

## 🎉 You're Ready!

Your AI Ads Generator is now powered by Google Gemini 3! 

Start analyzing your Google Ads performance and generating high-converting ad copy in seconds. 🚀

---

**Last Updated**: December 2024  
**Version**: 1.0.0
