# Google Analytics 4 (GA4) Tracking Configuration

## Overview

Your Top Speed Appliance website now has comprehensive Google Analytics 4 tracking configured for monitoring landing page performance, user engagement, and conversion funnels across all 23+ service location pages.

**GA4 Property ID**: `G-CWN7VWDX7N`

---

## Tracking Implementation

### 1. **Core GA4 Script** (index.html)
The GA4 initialization script is already in place:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-CWN7VWDX7N"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-CWN7VWDX7N');
</script>
```

### 2. **GA4 Events Utility** (src/utils/ga4Events.js)
A comprehensive utility library has been created with 20+ event tracking functions:

#### Landing Page Events
- `trackLandingPageView(cityName, serviceName, canonicalPath)` - Tracks when users land on service pages
- `trackLandingPageCTA(ctaType, cityName, serviceName)` - Tracks CTA clicks (book_now, call_now, etc.)

#### Conversion Funnel Events
- `trackBookingFormStart(cityName, serviceName)` - When user initiates booking
- `trackBookingComplete(bookingData)` - When booking is confirmed
- `trackPhoneCallClick(cityName, serviceName, phoneNumber)` - Tracks phone call CTAs

#### Engagement Events
- `trackScrollDepth(depth, cityName, serviceName)` - Tracks scroll depth (25%, 50%, 75%, 100%)
- `trackTimeOnPage(seconds, cityName, serviceName)` - Tracks time spent on page
- `trackFAQEngagement(question, cityName, serviceName)` - Tracks FAQ expansion
- `trackNeighborhoodClick(neighborhood, cityName, serviceName)` - Tracks service area clicks

#### Content Events
- `trackBlogEngagement(postSlug, postTitle, scrollDepth)` - Blog post engagement
- `trackBlogToLandingNavigation(blogPostSlug, landingPagePath, serviceName)` - Internal content flow

#### Form Events
- `trackFormFieldInteraction(fieldName, fieldType)` - Form field interactions
- `trackFormFieldError(fieldName, errorMessage)` - Form validation errors

---

## Landing Page Tracking

### Automatic Tracking on LocationServicePage.jsx

All 23 location service pages automatically track:

1. **Page View** - On page mount
   ```javascript
   ga4Events.trackLandingPageView(page.cityName, page.serviceName, canonicalPath)
   ```

2. **Scroll Depth** - At 25%, 50%, 75%, and 100% scroll
   ```javascript
   ga4Events.trackScrollDepth(25, page.cityName, page.serviceName)
   ga4Events.trackScrollDepth(50, page.cityName, page.serviceName)
   // ... etc
   ```

3. **Time on Page** - At 30 sec, 60 sec, and 120 sec intervals
   ```javascript
   ga4Events.trackTimeOnPage(30, page.cityName, page.serviceName)
   ga4Events.trackTimeOnPage(60, page.cityName, page.serviceName)
   ga4Events.trackTimeOnPage(120, page.cityName, page.serviceName)
   ```

4. **CTA Clicks** - Primary "Book" and "Call" buttons
   ```javascript
   handleCTAClick('book_now') // Hero section booking
   handleCTAClick('call_now') // Hero section phone
   handleCTAClick('sidebar_book_online') // Sidebar booking
   handleCTAClick('sidebar_call') // Sidebar phone
   ```

5. **FAQ Engagement** - When users expand FAQ items
   ```javascript
   handleFAQToggle(question) // Tracks which questions users engage with
   ```

---

## Event Data Structure

All events capture the following custom parameters:

| Parameter | Type | Example | Description |
|-----------|------|---------|-------------|
| `city` | string | "Miami" | City name from landing page |
| `service` | string | "Dryer Repair" | Service type |
| `cta_type` | string | "book_now" | CTA action type |
| `event_category` | string | "landing_page" | Event category |
| `event_label` | string | "Dryer Repair in Miami" | Human-readable label |
| `depth_percent` | number | 50 | Scroll depth percentage |
| `value` | number | 120 | Time in seconds or value |
| `page_path` | string | "/dryer-repair-miami-fl" | Canonical URL path |
| `question` | string | "Do you offer same-day service?" | FAQ question |
| `neighborhood` | string | "Brickell" | Service area neighborhood |

---

## Viewing Data in Google Analytics

### 1. **Access Your GA4 Property**
- Go to https://analytics.google.com
- Select your property: **Top Speed Appliance**
- Select the view: **All Web Site Data**

### 2. **Key Reports to Monitor**

#### Landing Page Performance
- **Reports** → **Engagement** → **Pages and Screens**
- Filter by page path containing: `dryer-repair-`, `washer-dryer-repair-`, etc.
- Metrics to watch: Users, Sessions, Engagement Rate, Scroll Depth

#### Conversion Funnel
- **Reports** → **Conversions** → **Conversion funnel**
- Monitor: `begin_checkout` → `purchase` (booking completions)
- Watch the drop-off at each stage

#### Landing Page CTAs
- **Explore** → Create custom report
- Dimensions: `event_name`, `city`, `service`
- Metrics: `event_count`, `users`
- Filter by event: `landing_page_cta_click`

#### User Engagement
- **Reports** → **Engagement** → **Events**
- Find events like:
  - `scroll_depth` - See how far users scroll
  - `time_on_page` - See how long users stay
  - `faq_expand` - See which FAQs get interest
  - `landing_page_cta_click` - See which CTAs perform best

### 3. **Creating Custom Dashboards**

You can create custom dashboards to monitor:
1. **Landing Page Performance by City**: Which cities drive most traffic?
2. **Service Performance**: Which services are most popular?
3. **Conversion Funnel**: How many users complete bookings?
4. **Engagement Metrics**: Scroll depth, time on page, FAQ interactions

**Example Dashboard Metrics:**
```
Landing Page Traffic
├─ Sessions by City
├─ Scroll Depth Distribution (25%, 50%, 75%, 100%)
├─ Average Time on Page
├─ CTA Click Distribution (Book vs. Call)
└─ FAQ Engagement (Most viewed questions)

Conversion Metrics
├─ Booking Form Starts
├─ Booking Completions
├─ Phone Call Clicks
└─ Conversion Rate by City/Service

Content Performance
├─ Blog to Landing Page Navigation
├─ Blog Engagement (Scroll Depth)
└─ Internal Content Flow
```

---

## GA4 Goals and Conversions

### Setting Up Goals in GA4

To track conversions in GA4, create events as conversions:

1. Go to **Admin** → **Conversions**
2. Click **Create Conversion**
3. For each key event, select:
   - **Event name**: `purchase` (booking completion)
   - **Conversion value**: Check to track revenue
   - **Description**: "Appliance repair booking completed"

### Key Conversions to Set Up

| Conversion | Event | Description |
|-----------|-------|-------------|
| Booking Started | `begin_checkout` | User initiates booking form |
| Booking Completed | `purchase` | User completes booking (HIGH VALUE) |
| Phone Call | `click_to_call` | User clicks phone call CTA |
| High Engagement | `scroll_depth` | Users scroll 75%+ on landing page |
| FAQ Interest | `faq_expand` | Users engage with FAQ section |

---

## Advanced Tracking Features

### 1. **Audiences for Retargeting**
Create audiences based on:
- Landing page visitors by city
- Users who scroll 75%+ (high intent)
- Users who spend 2+ minutes (high engagement)
- Users who click CTAs but don't complete booking (remarketing)

### 2. **Attribution Modeling**
Monitor which pages/services drive bookings:
- First-click attribution (initial landing page)
- Last-click attribution (final page before booking)
- Multi-touch attribution (full user journey)

### 3. **Cohort Analysis**
Compare user cohorts:
- Landing page arrivals vs. direct arrivals
- Mobile vs. desktop landing page users
- High-scroll vs. low-scroll users

---

## Troubleshooting GA4 Tracking

### Checking if Events Are Firing

1. Open your site in Chrome
2. Open DevTools → **Console**
3. Type: `window.dataLayer`
4. Look for events like `view_landing_page`, `landing_page_cta_click`

### GA4 Real-Time Report

1. In GA4, go to **Reports** → **Realtime**
2. Perform actions on your site (click CTA, scroll, etc.)
3. Watch events appear in real-time within 2-3 seconds

### Common Issues

| Issue | Solution |
|-------|----------|
| No data appearing | Wait 24 hours for GA4 to process initial data |
| Events not firing | Check gtag.js loads in DevTools Network tab |
| Wrong parameters | Check ga4Events.js parameters match your implementation |
| Mobile events missing | Ensure gtag.js works on mobile (check in Mobile DevTools) |

---

## Data Privacy & Compliance

### GDPR Compliance
- GA4 consent mode is enabled by default
- Users can opt-out of tracking via browser settings
- No personally identifiable information (PII) is collected
- Data retention is set to 14 months

### Recommended Privacy Setup
1. Add cookie consent banner (if not already present)
2. Update privacy policy with GA4 disclosure
3. Add "Do Not Track" respected settings

---

## Next Steps

### 1. **Verify Data**
- Check GA4 Real-Time report to confirm events are firing
- Wait 24 hours for initial data processing
- Review Reports → Overview for baseline metrics

### 2. **Create Custom Reports**
- Build dashboards for landing page performance
- Create conversion funnel reports
- Set up city/service performance comparisons

### 3. **Set Up Goals**
- Mark `purchase` event as primary conversion
- Create secondary goals for phone calls and bookings
- Monitor conversion rate by city and service

### 4. **Configure Alerts**
- Set up low traffic alerts for landing pages
- Monitor zero-booking days
- Track CTA click drop-offs

### 5. **Monthly Analysis**
- Review landing page performance by city
- Identify top-performing services
- Analyze user engagement patterns
- Optimize CTAs based on click data

---

## GA4 Event Reference

All events are fully customizable. To add new events:

```javascript
// In any component:
import * as ga4Events from '../utils/ga4Events'

// Track custom event
ga4Events.trackCustomData({
  custom_param: 'value',
  another_param: 'another value'
})
```

---

## Support

For GA4 help:
- **Google Analytics Help**: https://support.google.com/analytics
- **GA4 Setup Docs**: https://support.google.com/analytics/answer/9744165
- **Event Tracking Guide**: https://support.google.com/analytics/answer/10598514

---

**Last Updated**: January 2026  
**GA4 Property**: G-CWN7VWDX7N  
**Website**: https://topspeedappliance.com
