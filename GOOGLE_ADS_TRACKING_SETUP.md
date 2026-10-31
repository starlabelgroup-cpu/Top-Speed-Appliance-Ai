# Google Ads Conversion Tracking Setup & Strategy

## Account Overview

**Google Ads Account ID**: AW-17817730406  
**Primary Goal**: Track appliance repair service bookings and lead generation  
**Campaign Focus**: South Florida appliance repair landing pages (23+ locations)

---

## Implementation Status

### ✅ Completed
- [x] Google Ads conversion tracking tag installed in index.html
- [x] Google Ads event tracking utility created (`src/utils/googleAdsTracking.js`)
- [x] Landing page integration with LocationServicePage.jsx
- [x] Conversion tracking for bookings, calls, and leads
- [x] Remarketing audience tracking

### 🔄 Next Steps (Manual GA4 → Google Ads Link)
1. Go to Google Ads account settings
2. Navigate to **Tools & Settings** → **Conversions**
3. Link your GA4 property to Google Ads for enhanced attribution

---

## Conversion Types Configured

### 1. **Booking Conversion** (Primary Goal)
**Conversion Label**: `v7tKCJTiutUDEJ3WutMo`

Tracks when a user:
- Clicks "Book Online" button
- Submits booking request form
- Completes service appointment scheduling

**Event Name**: `purchase`  
**Value**: Estimated service cost (optional)  
**Parameters Tracked**:
- Service type (e.g., "Dryer Repair")
- City (e.g., "Miami")
- Transaction ID (unique booking identifier)

### 2. **Lead/Quote Request Conversion**
**Conversion Label**: `xKY7CJTiutUDEJ3WutMo`

Tracks contact form submissions for:
- Service quotes
- Information requests
- General inquiries

**Event Name**: `conversion` (lead type)  
**Parameters Tracked**:
- Lead type (booking, quote_request, information_request)
- Service type
- City
- Email

### 3. **Phone Call Conversion**
**Conversion Label**: `GuVNCJTiutUDEJ3WutMo`

Tracks when a user:
- Clicks "Call Now" button
- Initiates phone click-to-call
- Uses mobile call button

**Event Name**: `conversion` (phone)  
**Parameters Tracked**:
- Service type
- City
- Phone number called

### 4. **Landing Page View Conversion**
**Conversion Label**: `n2HYCJTiutUDEJ3WutMo`

Tracks service landing page visits for:
- Awareness funnel measurement
- Cost-per-view analysis
- Top-of-funnel metrics

**Event Name**: `conversion` (awareness)

### 5. **High Engagement Conversion** (Remarketing)
**Conversion Label**: `rM5WCJTiutUDEJ3WutMo`

Tracks when users:
- Scroll 75%+ down landing page
- Engage deeply with page content
- Show high purchase intent

**Event Name**: `conversion` (remarketing)  
**Triggers**: Only when scroll depth ≥ 75%

### 6. **Remarketing Audience Events**
**Conversion Label**: `hQ1ZCJT0utUDEJ3WutMo`

Automatically adds users to audiences:
- Landing page visitors
- CTA clickers (Book or Call button)
- High scrollers (75%+)
- Blog post visitors

**Purpose**: Enable dynamic remarketing campaigns

---

## Conversion Tracking Implementation

### Code Structure (src/utils/googleAdsTracking.js)

#### Main Tracking Functions

```javascript
// Track booking submission
googleAdsTracking.trackBookingConversion({
  service: 'Dryer Repair',
  city: 'Miami',
  value: 199,          // Optional: estimated service cost
  currency: 'USD'
})

// Track phone call
googleAdsTracking.trackPhoneCallConversion({
  service: 'Dryer Repair',
  city: 'Miami',
  phone: '(954) 931-7997'
})

// Track lead submission
googleAdsTracking.trackLeadConversion({
  leadType: 'booking_request',
  service: 'Washer Repair',
  city: 'Fort Lauderdale',
  email: 'customer@example.com'
})

// Track high engagement (75%+ scroll)
googleAdsTracking.trackHighEngagement({
  service: 'Dryer Repair',
  city: 'Miami',
  scrollDepth: 75
})

// Add user to remarketing audience
googleAdsTracking.trackRemarketingAudience({
  audienceType: 'landing_page_visitor',
  service: 'Refrigerator Repair',
  city: 'West Palm Beach'
})
```

### Landing Page Integration

All 23 landing pages (LocationServicePage.jsx) automatically track:

1. **Page View** - On page load
   ```javascript
   googleAdsTracking.trackPageViewConversion({
     service: page.serviceName,
     city: page.cityName,
     pageType: 'landing_page'
   })
   ```

2. **CTA Clicks** - When user clicks Book or Call buttons
   ```javascript
   if (ctaType === 'call_now') {
     googleAdsTracking.trackPhoneCallConversion({
       service: page.serviceName,
       city: page.cityName,
       phone: BOOKING_CONFIG.PHONE_NUMBER
     })
   }
   ```

3. **High Engagement** - When user scrolls 75%+
   ```javascript
   googleAdsTracking.trackHighEngagement({
     service: page.serviceName,
     city: page.cityName,
     scrollDepth: 75
   })
   ```

4. **Remarketing Audiences** - Automatically tagged on:
   - Page visit
   - CTA click
   - FAQ engagement
   - Service area click

---

## Campaign Strategy

### Conversion Goals by Campaign Type

#### 1. **Lead Generation Campaigns**
- **Primary Conversion**: Phone calls + booking requests
- **Conversion Tracking**: `GuVNCJTiutUDEJ3WutMo` (phone) + `xKY7CJTiutUDEJ3WutMo` (leads)
- **Target Cities**: Miami, Fort Lauderdale, Boca Raton, West Palm Beach
- **Target Services**: Dryer Repair, Washer Repair, Refrigerator Repair
- **Expected ROAS**: 3:1 - 5:1 (based on service value)

#### 2. **Local Service Ads**
- **Primary Conversion**: Booking completions
- **Conversion Tracking**: `v7tKCJTiutUDEJ3WutMo` (purchase)
- **Conversion Value**: $150-$400 (average service cost)
- **Expected Conversion Rate**: 2-3%

#### 3. **Remarketing Campaigns**
- **Audience Source**: `hQ1ZCJT0utUDEJ3WutMo` (remarketing audiences)
- **Audience Segments**:
  - Landing page visitors (all pages)
  - High-scroll users (75%+)
  - CTA clickers (no booking)
- **Bid Strategy**: Target CPA $75-$150
- **Creative**: Service-specific ads for viewed services

#### 4. **Brand/Awareness Campaigns**
- **Primary Conversion**: Landing page views + high engagement
- **Conversion Tracking**: `n2HYCJTiutUDEJ3WutMo` (awareness) + `rM5WCJTiutUDEJ3WutMo` (engagement)
- **Goal**: Build brand authority in South Florida appliance repair

---

## Viewing Conversion Data

### In Google Ads

1. **Navigate to Conversions**
   - Click **Tools & Settings** → **Conversions**
   - View conversion counts and trends

2. **Campaign Performance**
   - Go to **Campaigns** → any campaign
   - Add columns: **Conversions**, **Conversion Rate**, **Cost/Conversion**
   - Filter by conversion type

3. **Conversion Details Report**
   - Go to **Tools & Settings** → **Conversions** → **View conversion details**
   - See conversion count, value, and attribution

### In Google Analytics 4 (Linked Account)

1. **Go to Google Analytics** → Your property
2. **Reports** → **Conversions**
3. Monitor:
   - **Conversion count** by campaign
   - **Conversion value** (total revenue)
   - **Conversion rate** by landing page
   - **Multi-channel attribution** (if linked)

### Cross-Account Tracking (GA4 ↔ Google Ads)

Once linked:
- GA4 shows which landing pages drive Google Ads conversions
- Google Ads shows attribution from GA4 events
- Combined view of user journey

**To Link**: 
1. In Google Ads, go to **Tools & Settings**
2. Click **Linked Accounts**
3. Add Google Analytics 4 property `G-CWN7VWDX7N`

---

## Optimization Recommendations

### 1. **Conversion Value Setup**
Track service cost as conversion value:
```javascript
googleAdsTracking.trackBookingConversion({
  service: 'Dryer Repair',
  city: 'Miami',
  value: 199,        // Service cost
  currency: 'USD'
})
```

**Benefits**:
- ROAS calculation for each landing page
- Smart Bidding optimization by value
- Revenue attribution by city/service

### 2. **Custom Parameters for Segmentation**
Use custom parameters to segment conversions:
- **Service type** - Which repairs are most profitable?
- **City** - Which locations have best conversion rate?
- **CTA type** - Book vs. Call conversion rates?

### 3. **Remarketing Strategy**
Create custom audiences from:
- **High-scroll users** (75%+) - High purchase intent
- **CTA clickers** - Almost converted
- **Service-specific visitors** - Show related services

### 4. **Attribution Modeling**
Compare attribution models in Google Ads:
- **First-click** - Which landing pages introduce people?
- **Last-click** - Which pages close deals?
- **Linear** - All touchpoints equally valued
- **Time-decay** - Later interactions more valued

---

## Conversion Tracking Verification

### Testing Conversions Locally

1. **Open DevTools** → **Console**
2. **Type**: `window.dataLayer`
3. **Look for events**:
   ```javascript
   {
     "event": "conversion",
     "send_to": "AW-17817730406/v7tKCJTiutUDEJ3WutMo",
     "value": 199,
     "currency": "USD"
   }
   ```

### Verify in Google Ads

1. Go to **Tools & Settings** → **Conversions**
2. Select conversion type
3. Check **Conversion details** → **Recent conversions**
4. Wait 30-60 seconds for real-time updates

### Troubleshooting

| Issue | Solution |
|-------|----------|
| No conversions appearing | Wait 24 hours; check gtag.js loads in DevTools |
| Wrong conversion values | Check `value` parameter in function call |
| Duplicate conversions | Verify click deduplication in settings |
| Missing custom parameters | Ensure parameters passed to tracking function |

---

## Advanced Features

### 1. **E-commerce Event Tracking**

For service packages:
```javascript
googleAdsTracking.trackPurchaseEvent({
  transactionId: 'booking_12345',
  value: 199,
  currency: 'USD',
  service: 'Dryer Repair',
  city: 'Miami',
  tax: 15,
  shipping: 0
})
```

### 2. **Multi-Service Comparison Tracking**

When users view multiple services:
```javascript
googleAdsTracking.trackComparisonInterest({
  services: ['Dryer Repair', 'Washer Repair'],
  city: 'Miami'
})
```

### 3. **Form Field Progression**

Track form completion rate:
```javascript
googleAdsTracking.trackFormFieldEntry({
  fieldName: 'email',
  hasValue: true
})

googleAdsTracking.trackFormFieldEntry({
  fieldName: 'phone',
  hasValue: true
})
```

### 4. **Content Flow Attribution**

Track blog-to-service navigation:
```javascript
googleAdsTracking.trackBlogToServiceNavigation({
  fromBlog: 'why-dryer-takes-long-to-dry',
  toService: 'Dryer Repair',
  toCity: 'Miami'
})
```

---

## Monthly Optimization Checklist

- [ ] Review conversion count and cost/conversion by campaign
- [ ] Identify lowest-converting landing pages/cities
- [ ] Check phone call vs. booking conversion rates
- [ ] Review remarketing audience performance
- [ ] Analyze conversion value by service type
- [ ] Test different bid strategies
- [ ] Update negative keywords based on search terms
- [ ] A/B test landing page CTAs

---

## Next Steps

1. **Verify Tracking is Live**
   - Use Google Ads conversion tracking preview
   - Test with Dev Tools

2. **Set Up Campaign Tracking**
   - Add conversion to all lead gen campaigns
   - Configure bid strategy to optimize for conversions

3. **Link GA4 Account**
   - Connect Google Analytics 4 for attribution
   - Enable Google Ads campaign import

4. **Create Remarketing Campaigns**
   - Build audience lists from conversion tracking
   - Create dynamic remarketing ads

5. **Optimize Continuously**
   - Monitor ROAS and CPA by city/service
   - Adjust bids and budgets based on performance

---

## Support & Resources

- **Google Ads Help**: https://support.google.com/google-ads
- **Conversion Tracking Guide**: https://support.google.com/google-ads/answer/3103387
- **Remarketing Setup**: https://support.google.com/google-ads/answer/2453970
- **Cross-Account Linking**: https://support.google.com/google-ads/answer/7519144

---

**Account ID**: AW-17817730406  
**Setup Date**: January 2026  
**Last Updated**: January 2026
