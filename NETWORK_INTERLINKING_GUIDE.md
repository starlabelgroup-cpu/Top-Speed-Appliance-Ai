# TopSpeed Appliance Network - SEO Interlinking Strategy

## Overview

This document outlines the complete cross-domain SEO interlinking strategy for the TopSpeed Appliance Network, a 5-site ecosystem designed to maximize search authority, capture diversified traffic, and improve conversion rates across service channels.

**Network Sites:**
- **TopSpeedAppliance.com** (Main Authority Hub)
- **AppliancePro.net** (Mobile App & Support)
- **ApplianceReferral.com** (Referral System)
- **PrimeHomeConnect.com** (Home Service Platform)
- **ApplianceConnect.com** (Lead Generation)

---

## 1. Network Architecture & SEO Strategy

### Authority Hierarchy

```
TopSpeedAppliance.com (Authority Hub)
├── Primary local SEO pages
├── Service pages (4 core services)
├── City landing pages (8 local markets)
└── Cross-links to satellite sites
        ↓
[Satellite Sites]
├── AppliancePro.net (Mobile/App)
├── ApplianceReferral.com (Referral)
├── PrimeHomeConnect.com (SaaS)
└── ApplianceConnect.com (Leads)
```

### SEO Rationale

1. **TopSpeedAppliance.com** acts as the primary authority hub with highest domain power
2. **Satellite sites** feed traffic and link juice back to the main hub
3. **Cross-linking** between satellites creates a interconnected authority network
4. **Schema.org** markup declares organizational relationships for search engines

---

## 2. Footer Interlinking (Implemented)

### Current Implementation

All pages now include footer links to satellite sites:

```jsx
<div className="footer-network-section">
  <p className="footer-network-title">Part of the TopSpeed Appliance Network:</p>
  <nav className="footer-network-links">
    <a href="https://appliancepro.net" target="_blank">AppliancePro App</a>
    <a href="https://appliancereferral.com" target="_blank">Referral Program</a>
    <a href="https://primehomeconnect.com" target="_blank">PrimeHomeConnect</a>
    <a href="https://applianceconnect.com" target="_blank">Lead Requests</a>
  </nav>
</div>
```

### Impact
- **Every page** gets 4 outbound links to satellite sites
- **Link equity distribution** improves network domain authority
- **User navigation** creates cross-domain traffic flow
- **Anchor text** is contextually relevant (descriptive brand names)

---

## 3. Robots.txt Cross-Domain Indexing (Implemented)

### Updated robots.txt Structure

```
Sitemap: https://topspeedappliance.com/sitemap.xml
Sitemap: https://appliancepro.net/sitemap.xml
Sitemap: https://appliancereferral.com/sitemap.xml
Sitemap: https://primehomeconnect.com/sitemap.xml
Sitemap: https://applianceconnect.com/sitemap.xml
```

### SEO Benefits
- Signals to Google that all 5 sitemaps should be crawled and indexed
- Ensures rapid discovery of new pages across all sites
- Improves crawl efficiency by consolidating indexing signals
- Facilitates cross-domain duplicate detection (canonical tags)

---

## 4. Schema.org Network Markup (Implemented)

### Two-Tier Schema Strategy

#### Tier 1: LocalBusiness (TopSpeedAppliance.com)

Enhanced schema includes network relationships:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://topspeedappliance.com",
  "sameAs": [
    "https://www.facebook.com/topspeedappliance",
    "https://www.instagram.com/topspeedappliance",
    "https://appliancepro.net",
    "https://appliancereferral.com",
    "https://primehomeconnect.com",
    "https://applianceconnect.com"
  ],
  "isPartOf": {
    "@type": "Organization",
    "name": "TopSpeed Appliance Network",
    "url": "https://topspeedappliance.com"
  }
}
```

#### Tier 2: Organization (Network Declaration)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TopSpeed Appliance Network",
  "url": "https://topspeedappliance.com",
  "sameAs": [
    "https://appliancepro.net",
    "https://appliancereferral.com",
    "https://primehomeconnect.com",
    "https://applianceconnect.com"
  ],
  "subOrganization": [
    {
      "@type": "SoftwareApplication",
      "name": "AppliancePro",
      "url": "https://appliancepro.net"
    },
    {
      "@type": "Organization",
      "name": "ApplianceReferral",
      "url": "https://appliancereferral.com"
    },
    {
      "@type": "SoftwareApplication",
      "name": "PrimeHomeConnect",
      "url": "https://primehomeconnect.com"
    },
    {
      "@type": "Organization",
      "name": "ApplianceConnect",
      "url": "https://applianceconnect.com"
    }
  ]
}
```

### Search Engine Signal Value
- Declares organizational structure to Google Knowledge Graph
- Enables enhanced SERP display (including parent/subsidiary relationships)
- Improves brand entity recognition across all 5 domains
- Facilitates knowledge panel consolidation

---

## 5. Contextual Linking Strategy (Recommended for Future)

### Blog/Content Interlinking

**Example: Washer Repair Blog Post**

```markdown
# How to Fix Your Washer: Common Issues & Solutions

## When to Call a Professional

For complex repairs, contact **TopSpeed Appliance** 
→ [Book Service: Washer Repair](https://topspeedappliance.com/washer-repair)

## Track Your Repair Status

Download the **AppliancePro App** for real-time repair tracking
→ [Download AppliancePro](https://appliancepro.net/download-app)

## Share Your Experience

Got a good deal? Refer friends and earn rewards
→ [ApplianceReferral Program](https://appliancereferral.com/refer)
```

### Implementation Notes
- Place contextual links within blog content (not just footers)
- Use natural anchor text (avoid keyword stuffing)
- Link when topically relevant (not forced)
- Update 2-3 existing blog posts monthly with network links

---

## 6. UTM Tracking for Cross-Domain Attribution

### Network Click-Through Tracking

Add UTM parameters to all cross-domain links:

```
https://appliancepro.net/download-app?utm_source=topspeedappliance&utm_medium=footer&utm_campaign=network_referral

https://appliancereferral.com/refer?utm_source=topspeedappliance&utm_medium=blog&utm_campaign=blog_referral

https://applianceconnect.com/get-quote?utm_source=topspeedappliance&utm_medium=footer&utm_campaign=lead_gen
```

### GA4 Configuration
- Create **cross-domain tracking** in GA4 Settings
- Add all 5 domains to the measurement ID configuration
- Create custom segments for **Network Traffic**
- Monitor conversion flow: TopSpeed → Satellite Site → Conversion

---

## 7. Canonical Tag Strategy (For Duplicate Content)

### Scenario: Washer Repair Page Exists on Multiple Domains

**TopSpeedAppliance.com** (Primary)
```html
<link rel="canonical" href="https://topspeedappliance.com/washer-repair" />
```

**ApplianceConnect.com** (Secondary)
```html
<link rel="canonical" href="https://topspeedappliance.com/washer-repair" />
```

### Implementation Rules
- **Always** point duplicate pages to TopSpeedAppliance.com (main authority)
- Use absolute URLs (not relative paths)
- Ensure href attribute has no trailing slash consistency issues
- Verify canonical in GSC for each domain

---

## 8. Site-Specific Interlinking Map

### AppliancePro.net (Mobile App)

**Outbound Links to Network:**
- Homepage: Link to TopSpeed Appliance main service pages
- Download Page: Link to ApplianceConnect "Get a Quote" for users without app
- FAQ: Link to ApplianceReferral referral program details

**Expected Inbound Links:**
- From TopSpeed Appliance: ~50-80 footer links/month
- From service pages: 3-5 contextual links per blog post
- Internal GA4 referral tracking events

---

### ApplianceReferral.com (Referral)

**Outbound Links to Network:**
- Homepage: Link to TopSpeed Appliance main site
- Refer & Earn: Link to AppliancePro app download
- How it Works: Link to ApplianceConnect lead capture

**Expected Inbound Links:**
- From TopSpeed Appliance: 50-80 footer links/month
- From PrimeHomeConnect: Embedded referral widget

---

### PrimeHomeConnect.com (SaaS Platform)

**Outbound Links to Network:**
- Features: Link to TopSpeed Appliance service quality metrics
- Testimonials: Link to AppliancePro app reviews
- Integration docs: Link to ApplianceConnect API docs

**Expected Inbound Links:**
- From TopSpeed Appliance: 50-80 footer links/month
- From ApplianceConnect: Lead platform integration page

---

### ApplianceConnect.com (Lead Generation)

**Outbound Links to Network:**
- Homepage: Link to TopSpeed Appliance main services
- Service Areas: Link to city-specific TopSpeed pages
- How it Works: Link to AppliancePro booking process

**Expected Inbound Links:**
- From TopSpeed Appliance: 50-80 footer links/month
- From service pages: 2-3 calls-to-action per page

---

## 9. Search Console Configuration

### Verification & Monitoring

**Per Domain:**

1. **Verify all 5 domains** in Google Search Console
2. **Link the domains** in GSC settings (declare network relationship)
3. **Monitor** for indexing issues per domain
4. **Crawl stats** to identify bottlenecks

**Cross-Domain Tracking:**

```
GSC → Settings → Website verification and ownership
└── Link properties: 
    ├─ topspeedappliance.com
    ├─ appliancepro.net
    ├─ appliancereferral.com
    ├─ primehomeconnect.com
    └─ applianceconnect.com
```

### KPIs to Track

| Metric | Target | Measurement |
|--------|--------|-------------|
| Indexed Pages (Total) | 200+ | Monthly in GSC |
| Click-Through Rate (CTR) | 3-5% | GSC Performance Report |
| Avg. Position (Rank) | Top 10 | GSC for target keywords |
| Crawled Pages/Day | 50+ | Crawl Stats |
| Sitemap Errors | 0 | Sitemaps Report |

---

## 10. Implementation Checklist

### Phase 1: Completed ✅
- [x] Update Footer.jsx with 4 network links
- [x] Update robots.txt with all 5 sitemaps
- [x] Add schema.org Organization markup
- [x] Verify GA4 cross-domain configuration

### Phase 2: Satellite Site Setup (External)
- [ ] Create AppliancePro.net footer with TopSpeed links
- [ ] Create ApplianceReferral.com footer with TopSpeed links
- [ ] Create PrimeHomeConnect.com footer with TopSpeed links
- [ ] Create ApplianceConnect.com footer with TopSpeed links
- [ ] Set up canonical tags on all satellite sites (point to TopSpeed primary)
- [ ] Update each domain's robots.txt with network sitemaps

### Phase 3: Content Interlinking (Monthly)
- [ ] Add 2-3 contextual links to existing blog posts
- [ ] Create new blog post linking to AppliancePro app
- [ ] Create new blog post linking to ApplianceReferral program
- [ ] Create new blog post linking to ApplianceConnect lead gen

### Phase 4: Monitoring & Optimization (Ongoing)
- [ ] Monitor GSC for ranking improvements
- [ ] Track referral traffic between sites in GA4
- [ ] Monitor crawl errors and fix as needed
- [ ] A/B test footer link positioning and anchor text
- [ ] Track conversion flow: TopSpeed → Satellite → Booking/Lead

---

## 11. Expected SEO Outcomes (6-12 Months)

### Ranking Improvements
- **Local keywords** (e.g., "washer repair Miami"): +3-5 position improvement
- **Service keywords** (e.g., "dryer repair"): +2-4 position improvement
- **Network keywords** (e.g., "appliance repair platform"): New rankings (top 20)

### Traffic Growth
- **Direct traffic**: +10-15% (footer link clicks)
- **Referral traffic**: +40-60% (satellite site traffic flow)
- **Organic traffic**: +25-35% (improved rankings)

### Authority Metrics
- **Domain Authority**: +5-10 points (from link equity redistribution)
- **Indexed Pages**: 150-200 total (across all 5 sites)
- **Referral Links**: 500+ (cross-domain backlinks)

### Conversion Metrics
- **Cross-domain sessions**: Track users moving between sites
- **Lead quality**: Monitor conversion source attribution
- **Customer acquisition cost**: Lower via organic referrals

---

## 12. Tools & Resources

### SEO Monitoring
- **Google Search Console**: Track indexing, rankings, clicks
- **GA4**: Cross-domain traffic and conversion tracking
- **Ahrefs/SEMrush**: Monitor backlinks and authority metrics
- **Bing Webmaster Tools**: Verify sitemaps and crawl health

### Implementation Checklist
- Weekly: Monitor GSC for new errors
- Monthly: Review GA4 cross-domain traffic
- Quarterly: Add 6-10 new contextual links to content
- Quarterly: Audit canonical tags across all sites

### Contact & Escalation
- **Technical Issues**: Review robots.txt, sitemap.xml, canonical tags
- **Traffic Attribution**: Check GA4 cross-domain configuration
- **Ranking Issues**: Monitor GSC for crawl errors or penalties

---

## 13. Risk Mitigation

### Avoid Common Pitfalls

❌ **DON'T:**
- Create exact duplicate content across sites (use canonical tags)
- Over-link the footer (limit to 4-5 contextual links max)
- Link to irrelevant sites (maintain topical relevance)
- Ignore crawl errors (address within 48 hours)
- Forget to update robots.txt with all sitemaps

✅ **DO:**
- Use descriptive anchor text (brand names + service context)
- Place links in logical content sections (footer, blog, services)
- Monitor GSC for penalties or manual actions
- Update sitemap.xml monthly with new pages
- Test cross-domain GA4 tracking after setup

---

## 14. Future Enhancements

### Advanced Strategies (Future Phases)

1. **Content Hub Strategy**
   - Create pillar pages on TopSpeed Appliance
   - Cluster pages on satellite sites link back to pillars
   - Improves topical authority and E-E-A-T signals

2. **Referral Partner Network**
   - Each satellite site links to relevant TopSpeed pages
   - AppliancePro → Book Service (TopSpeed)
   - ApplianceConnect → Lead Routing (TopSpeed)

3. **Structured Data for Local**
   - Add LocalBusiness schema to each service page
   - Include geo-coordinates and service area coverage
   - Improves local search visibility and map ranking

4. **Link Baiting Content**
   - Create comprehensive "Appliance Repair Industry Report"
   - Link from all 5 sites to industry research
   - Attracts external backlinks to network

5. **White-Label Integration**
   - AppliancePro app white-labeled on PrimeHomeConnect
   - Creates seamless cross-domain user experience
   - Funnels users between platforms (improves metrics)

---

## Conclusion

This network interlinking strategy leverages the TopSpeed Appliance ecosystem to create a interconnected authority network. By strategically linking between domains, using proper schema markup, and monitoring cross-domain metrics, we maximize search visibility, improve user flow, and optimize conversion pathways.

**Key Wins:**
✅ Distributed domain authority across 5 properties
✅ Improved local SEO rankings through contextual interlinking
✅ Enhanced user journey from discovery → booking
✅ Cross-domain conversion tracking and attribution
✅ Scalable foundation for future network expansion

---

**Last Updated:** January 2025
**Next Review:** Quarterly (April, July, October)
**Maintained By:** SEO Team
