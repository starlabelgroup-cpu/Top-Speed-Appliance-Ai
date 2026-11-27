# TopSpeed Appliance Network - Satellite Sites Setup Guide

## Overview

This guide provides step-by-step instructions for configuring the 4 satellite domains to complete the network interlinking infrastructure. Each domain must be set up with consistent styling, navigation links, and SEO markup to maximize the network's authority.

---

## Table of Contents

1. [AppliancePro.net Setup](#appliancepronet-setup)
2. [ApplianceReferral.com Setup](#appliancereferralcom-setup)
3. [PrimeHomeConnect.com Setup](#primehomeconnectcom-setup)
4. [ApplianceConnect.com Setup](#applianceconnectcom-setup)
5. [Verification Checklist](#verification-checklist)
6. [GA4 Cross-Domain Setup](#ga4-cross-domain-setup)
7. [SEO Monitoring](#seo-monitoring)

---

## AppliancePro.net Setup

### Phase 1: Domain & Hosting

```
Domain: appliancepro.net
Hosting: [Your hosting provider]
SSL: Enable HTTPS
Email: admin@appliancepro.net
```

### Phase 2: Footer Implementation

**Task:** Add network links to every page footer

```html
<footer class="footer">
  <p>© 2025 AppliancePro. All Rights Reserved.</p>
  
  <div class="footer-network-section">
    <p class="footer-network-title">Part of the TopSpeed Appliance Network:</p>
    <nav class="footer-network-links" aria-label="Appliance service network sites">
      <a href="https://topspeedappliance.net" target="_blank" rel="noopener noreferrer" class="footer-network-link">TopSpeed Appliance</a>
      <a href="https://appliancereferral.com" target="_blank" rel="noopener noreferrer" class="footer-network-link">Referral Program</a>
      <a href="https://primehomeconnect.com" target="_blank" rel="noopener noreferrer" class="footer-network-link">PrimeHomeConnect</a>
      <a href="https://applianceconnect.com" target="_blank" rel="noopener noreferrer" class="footer-network-link">Lead Requests</a>
    </nav>
  </div>
  
  <div class="footer-social">
    <!-- Social icons here -->
  </div>
</footer>
```

**Styling (CSS):**

```css
.footer-network-section {
  margin-top: 15px;
}

.footer-network-title {
  font-size: 0.9rem;
  margin: 8px 0;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.footer-network-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
}

.footer-network-link {
  color: #fff;
  text-decoration: none;
  font-size: 0.85rem;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.3s;
}

.footer-network-link:hover {
  background-color: #d10000;
}
```

### Phase 3: robots.txt Configuration

**File:** `public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Crawl-delay: 1

User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1

# TopSpeed Appliance Network Sitemaps
# Main Authority Site
Sitemap: https://topspeedappliance.net/sitemap.xml

# Satellite Sites - Network Authority Boost
Sitemap: https://appliancepro.net/sitemap.xml
Sitemap: https://appliancereferral.com/sitemap.xml
Sitemap: https://primehomeconnect.com/sitemap.xml
Sitemap: https://applianceconnect.com/sitemap.xml
```

### Phase 4: Schema.org Markup

**Add to `<head>`:**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "AppliancePro",
  "url": "https://appliancepro.net",
  "applicationCategory": "MobileApplication",
  "operatingSystem": "iOS, Android",
  "description": "Mobile app for booking and managing appliance repair services.",
  "isPartOf": {
    "@type": "Organization",
    "name": "TopSpeed Appliance Network",
    "url": "https://topspeedappliance.net",
    "sameAs": [
      "https://topspeedappliance.net",
      "https://appliancereferral.com",
      "https://primehomeconnect.com",
      "https://applianceconnect.com"
    ]
  }
}
</script>
```

### Phase 5: Canonical Tags

**For pages mirroring TopSpeed content:**

```html
<!-- Home page -->
<link rel="canonical" href="https://topspeedappliance.net" />

<!-- Service pages -->
<link rel="canonical" href="https://topspeedappliance.net/washer-repair" />
```

### Phase 6: Sitemap.xml

**File:** `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://appliancepro.net/</loc>
    <lastmod>2025-01-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://appliancepro.net/download-app</loc>
    <lastmod>2025-01-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://appliancepro.net/book-service</loc>
    <lastmod>2025-01-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://appliancepro.net/faq</loc>
    <lastmod>2025-01-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://appliancepro.net/support</loc>
    <lastmod>2025-01-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

## ApplianceReferral.com Setup

### Phase 1: Domain & Hosting

```
Domain: appliancereferral.com
Hosting: [Your hosting provider]
SSL: Enable HTTPS
Email: admin@appliancereferral.com
```

### Phase 2: Footer Implementation

Same footer structure as AppliancePro.net (with topspeedappliance.net as primary link)

### Phase 3: robots.txt Configuration

Same robots.txt as AppliancePro.net (with centralized sitemaps)

### Phase 4: Schema.org Markup

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ApplianceReferral",
  "url": "https://appliancereferral.com",
  "description": "Appliance repair referral program and partnership network.",
  "sameAs": [
    "https://www.facebook.com/appliancereferral",
    "https://topspeedappliance.net",
    "https://appliancepro.net"
  ],
  "isPartOf": {
    "@type": "Organization",
    "name": "TopSpeed Appliance Network",
    "url": "https://topspeedappliance.net"
  }
}
</script>
```

### Phase 5: Contextual Links

Add links from referral pages back to TopSpeed:

```html
<p>Ready to book a service? 
  <a href="https://topspeedappliance.net/washer-repair">Visit TopSpeed Appliance</a>
</p>
```

### Phase 6: Sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://appliancereferral.com/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://appliancereferral.com/refer</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://appliancereferral.com/how-it-works</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://appliancereferral.com/partners</loc>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

## PrimeHomeConnect.com Setup

### Phase 1: Domain & Hosting

```
Domain: primehomeconnect.com
Hosting: [Your hosting provider]
SSL: Enable HTTPS
Email: admin@primehomeconnect.com
```

### Phase 2: Footer Implementation

Same footer structure with all 4 network links

### Phase 3: robots.txt Configuration

Same centralized sitemap structure

### Phase 4: Schema.org Markup

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "PrimeHomeConnect",
  "url": "https://primehomeconnect.com",
  "applicationCategory": "SaaS",
  "description": "Home service management platform for appliance repairs and maintenance.",
  "isPartOf": {
    "@type": "Organization",
    "name": "TopSpeed Appliance Network",
    "url": "https://topspeedappliance.net"
  }
}
</script>
```

### Phase 5: Integration Links

Link to AppliancePro booking in Features/Integrations:

```html
<h3>Integrated Booking</h3>
<p>Connect with <a href="https://appliancepro.net/book-service">AppliancePro booking system</a></p>
```

### Phase 6: Sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://primehomeconnect.com/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://primehomeconnect.com/sign-up</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://primehomeconnect.com/features</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://primehomeconnect.com/pricing</loc>
    <priority>0.9</priority>
  </url>
</urlset>
```

---

## ApplianceConnect.com Setup

### Phase 1: Domain & Hosting

```
Domain: applianceconnect.com
Hosting: [Your hosting provider]
SSL: Enable HTTPS
Email: admin@applianceconnect.com
```

### Phase 2: Footer Implementation

Same footer structure with all 4 network links

### Phase 3: robots.txt Configuration

Same centralized sitemap structure

### Phase 4: Schema.org Markup

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ApplianceConnect",
  "url": "https://applianceconnect.com",
  "description": "Lead generation and routing platform for appliance repair services.",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-305-555-4321",
    "contactType": "Lead Generation"
  },
  "isPartOf": {
    "@type": "Organization",
    "name": "TopSpeed Appliance Network",
    "url": "https://topspeedappliance.net"
  }
}
</script>
```

### Phase 5: Quote-to-TopSpeed Flow

Link quote requests to TopSpeed booking:

```html
<p>Already know what you need? 
  <a href="https://topspeedappliance.net/washer-repair">Book directly with TopSpeed Appliance</a>
</p>
```

### Phase 6: Sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://applianceconnect.com/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://applianceconnect.com/get-quote</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://applianceconnect.com/service-areas</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://applianceconnect.com/how-it-works</loc>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

## Verification Checklist

### ✅ Pre-Launch Verification

For **each satellite domain**, verify:

| Item | AppliancePro | ApplianceRef | PrimeHome | ApplianceConn |
|------|--------------|--------------|-----------|---------------|
| Domain HTTPS | ☐ | ☐ | ☐ | ☐ |
| Footer Links (4 links) | ☐ | ☐ | ☐ | ☐ |
| robots.txt (5 sitemaps) | ☐ | ☐ | ☐ | ☐ |
| Schema.org Markup | ☐ | ☐ | ☐ | ☐ |
| Sitemap.xml exists | ☐ | ☐ | ☐ | ☐ |
| Canonical tags (if needed) | ☐ | ☐ | ☐ | ☐ |
| 404 page custom | ☐ | ☐ | ☐ | ☐ |
| Mobile responsive | ☐ | ☐ | ☐ | ☐ |

### ✅ Search Engine Submission

1. **Google Search Console:**
   - Add each domain
   - Verify ownership (DNS record preferred)
   - Submit sitemap.xml for each domain
   - Request indexing of homepage

2. **Bing Webmaster Tools:**
   - Add each domain
   - Verify and submit sitemaps
   - Import GSC data (optional)

3. **Google Business Profile:**
   - Create/update GBP listing
   - Link website: topspeedappliance.net (primary)
   - Add all 5 network sites to description (optional)

---

## GA4 Cross-Domain Setup

### Step 1: Enable Cross-Domain Tracking

**In Google Analytics 4:**

1. Go to **Admin** → **Data Streams** → **Web**
2. Select your GA4 property
3. Go to **Web Stream Settings**
4. Enable **Enhanced Measurement**
5. Scroll to **Cross-domain measurement**
6. Add all 5 domains:
   ```
   topspeedappliance.net
   appliancepro.net
   appliancereferral.com
   primehomeconnect.com
   applianceconnect.com
   ```

### Step 2: Update Global gtag Configuration

**On all 5 domains, add to `<head>`:**

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    'allow_google_signals': true,
    'allow_ad_personalization_signals': true,
    'linker': {
      'domains': [
        'topspeedappliance.net',
        'appliancepro.net',
        'appliancereferral.com',
        'primehomeconnect.com',
        'applianceconnect.com'
      ]
    }
  });
  
  // Enable cross-domain tracking for links
  gtag('config', 'G-XXXXXXXXXX', {
    'link_attribution': true
  });
</script>
```

### Step 3: Create Cross-Domain Conversion Events

**In GA4, create custom events:**

1. **Event: `network_referral`** - Tracks cross-domain clicks
2. **Event: `network_conversion`** - Tracks cross-domain conversions
3. **Event: `booking_from_referral`** - Specific to referral program bookings

### Step 4: Create GA4 Dashboard

Create custom dashboard showing:
- Users by source domain
- Cross-domain conversion paths
- Traffic flow: Source → Destination → Conversion
- Referral source attribution

---

## SEO Monitoring

### Weekly Tasks

- [ ] Check Google Search Console for crawl errors per domain
- [ ] Monitor indexed pages trend across all 5 domains
- [ ] Track cross-domain referral traffic in GA4

### Monthly Tasks

- [ ] Audit backlinks using Ahrefs/SEMrush
- [ ] Compare keyword rankings across domains
- [ ] Review conversion flow in GA4
- [ ] Check Domain Authority trends
- [ ] Verify sitemap updates reflected in GSC

### Quarterly Tasks

- [ ] Full SEO audit of all 5 domains
- [ ] Review link profile quality
- [ ] Analyze organic traffic growth
- [ ] Assess local ranking improvements
- [ ] Update interlinking based on performance

---

## Implementation Timeline

| Phase | Duration | Satellites | Key Deliverables |
|-------|----------|-----------|-------------------|
| **1. Setup** | Week 1-2 | All 4 | Domains online, SSL, basic pages |
| **2. Footer & Robots** | Week 2 | All 4 | Footer links, robots.txt, sitemaps |
| **3. Schema & SEO** | Week 3 | All 4 | Schema markup, canonical tags |
| **4. GSC Submission** | Week 3-4 | All 4 | GSC setup, sitemap submission |
| **5. GA4 Linking** | Week 4 | All 4 | Cross-domain tracking active |
| **6. Monitoring** | Week 5+ | All 4 | GA4 dashboards, weekly reports |

---

## Success Metrics (6-12 Months)

| Metric | Baseline | Target |
|--------|----------|--------|
| Combined indexed pages | 50 | 150-200 |
| Cross-domain sessions | 0 | 5000+/month |
| Network referral conversions | 0 | 50+/month |
| Organic traffic (all domains) | 100% | +40-60% |
| Authority signals | Baseline | +20-30 more domains linking |
| Local ranking improvement | Position 15+ | Position 5-10 |

---

## Troubleshooting

### Issue: Pages Not Indexing

**Solution:**
1. Verify robots.txt allows crawling
2. Submit sitemap in GSC
3. Check for noindex tags
4. Verify SSL certificate validity

### Issue: Cross-Domain Tracking Not Working

**Solution:**
1. Verify GA4 property ID is consistent
2. Check linker config in gtag script
3. Ensure cookies allow cross-domain
4. Test with GA debug view

### Issue: Canonical Tags Causing Issues

**Solution:**
1. Point all canonicals to TopSpeed primary pages
2. Use absolute URLs (no relative paths)
3. Avoid canonicals pointing to different protocols
4. Verify in GSC that canonicals are respected

---

## Contact & Support

For issues or questions:
- **Technical**: [Your tech support email]
- **SEO Queries**: [Your SEO team email]
- **Escalations**: [Your management email]

---

**Last Updated:** January 2025
**Next Review:** Monthly
**Maintained By:** Network Operations Team
