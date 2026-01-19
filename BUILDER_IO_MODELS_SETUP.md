# Builder.io Models Setup Guide

This guide walks you through setting up content models in Builder.io for your Top Speed Appliance platform.

## Overview

You'll create 3 main models:
1. **page** - Generic pages (about, promotions, etc.)
2. **blog-post** - Blog articles
3. **location-service-page** - Manage your 40+ location/service combinations

---

## Model 1: Page (Generic Pages)

### Purpose
For generic pages like: About, Contact, Promotions, etc.

### Steps to Create

1. **Log in to builder.io**
2. Click **Models** → **Create New**
3. Fill in:
   - **Name:** `page`
   - **URL:** `/page`
   - **Description:** Generic pages for site content

4. **Add Fields:**

#### Field 1: Title
```
Name: title
Type: String
Display Name: Page Title
Required: Yes
```

#### Field 2: Meta Description
```
Name: metaDescription
Type: String
Display Name: Meta Description (SEO)
```

#### Field 3: Hero Section
```
Name: heroSection
Type: Object
Display Name: Hero Content
Fields:
  - heading (String)
  - subheading (String)
  - backgroundImage (Image)
  - ctaText (String)
  - ctaUrl (String)
```

#### Field 4: Content
```
Name: content
Type: HTML/Rich Text
Display Name: Page Content
```

#### Field 5: Call-to-Actions
```
Name: ctas
Type: Array
Display Name: Call-to-Action Buttons
Item Type: Object
Fields:
  - buttonText (String)
  - buttonUrl (String)
  - buttonStyle (Select: primary, secondary, outline)
```

#### Field 6: SEO Data
```
Name: seoData
Type: Object
Display Name: SEO Settings
Fields:
  - keywords (String)
  - ogImage (Image)
  - canonical (String)
```

5. **Click Save** → Your `page` model is ready!

---

## Model 2: Blog Post

### Purpose
For blog articles - appliance tips, guides, news, etc.

### Steps to Create

1. Click **Models** → **Create New**
2. Fill in:
   - **Name:** `blog-post`
   - **URL:** `/blog`
   - **Description:** Blog articles and guides

3. **Add Fields:**

#### Field 1: Title
```
Name: title
Type: String
Display Name: Article Title
Required: Yes
```

#### Field 2: Slug
```
Name: slug
Type: String
Display Name: URL Slug (e.g., "why-dryer-not-heating")
Required: Yes
```

#### Field 3: Featured Image
```
Name: featuredImage
Type: Image
Display Name: Featured Image
```

#### Field 4: Author
```
Name: author
Type: String
Display Name: Author Name
Default: "Top Speed Appliance"
```

#### Field 5: Publish Date
```
Name: publishDate
Type: Date
Display Name: Publish Date
Required: Yes
```

#### Field 6: Category
```
Name: category
Type: Select
Display Name: Category
Options:
  - Refrigerator Repair
  - Washer/Dryer Repair
  - Oven/Stove Repair
  - Dishwasher Repair
  - Maintenance Tips
  - Emergency Service
```

#### Field 7: Excerpt
```
Name: excerpt
Type: String
Display Name: Short Description
Max Length: 160
```

#### Field 8: Content
```
Name: content
Type: HTML/Rich Text
Display Name: Article Content
```

#### Field 9: Related Posts
```
Name: relatedPosts
Type: Array
Display Name: Related Articles
Item Type: Reference
Reference Model: blog-post
```

#### Field 10: Call-to-Action
```
Name: cta
Type: Object
Display Name: CTA Section
Fields:
  - heading (String)
  - ctaText (String)
  - ctaUrl (String)
```

4. **Click Save** → Your `blog-post` model is ready!

---

## Model 3: Location Service Page

### Purpose
Manage your 40+ location + service combination pages:
- Miami Dryer Repair, Fort Lauderdale Washer/Dryer Repair, etc.

### Steps to Create

1. Click **Models** → **Create New**
2. Fill in:
   - **Name:** `location-service-page`
   - **URL:** `/locations`
   - **Description:** Location + Service landing pages

3. **Add Fields:**

#### Field 1: Title
```
Name: title
Type: String
Display Name: Page Title
Required: Yes
Example: "Dryer Repair in Miami, FL"
```

#### Field 2: City
```
Name: city
Type: String
Display Name: City Name
Required: Yes
Example: "Miami"
```

#### Field 3: Service Type
```
Name: service
Type: Select
Display Name: Service Type
Options:
  - Dryer Repair
  - Washer & Dryer Repair
  - Refrigerator Repair
  - Oven & Stove Repair
  - Dishwasher Repair
Required: Yes
```

#### Field 4: Service Slug
```
Name: serviceSlug
Type: String
Display Name: Service URL Slug
Example: "dryer-repair"
Required: Yes
```

#### Field 5: City Slug
```
Name: citySlug
Type: String
Display Name: City URL Slug
Example: "miami"
Required: Yes
```

#### Field 6: Meta Description
```
Name: metaDescription
Type: String
Display Name: Meta Description (SEO)
Max Length: 160
```

#### Field 7: Hero Section
```
Name: hero
Type: Object
Display Name: Hero Content
Fields:
  - intro (HTML) - "Top Speed Appliance provides..."
  - ctaLabel (String) - "Book Dryer Repair"
  - secondaryCtaLabel (String) - "Call (954) 931-7997"
```

#### Field 8: Common Problems
```
Name: problems
Type: Array
Display Name: Common Problems
Item Type: String
Example Items:
  - "Dryer not heating"
  - "Drum not spinning"
  - "Takes multiple cycles"
```

#### Field 9: Brands Served
```
Name: brands
Type: Array
Display Name: Brands We Service
Item Type: String
Example: ["LG", "Samsung", "Whirlpool", "GE"]
```

#### Field 10: Why Choose Us
```
Name: whyChoose
Type: Array
Display Name: Why Choose Top Speed
Item Type: String
Example:
  - "Licensed and insured technicians"
  - "Same-day service available"
  - "Transparent pricing"
```

#### Field 11: Service Areas
```
Name: serviceAreas
Type: Object
Display Name: Service Areas
Fields:
  - neighborhoods (Array of Strings)
  - zips (Array of Strings)
```

#### Field 12: FAQs
```
Name: faqs
Type: Array
Display Name: Frequently Asked Questions
Item Type: Object
Fields:
  - question (String)
  - answer (HTML)
```

#### Field 13: Map Embed
```
Name: googleMapEmbedSrc
Type: String
Display Name: Google Maps Embed URL
```

#### Field 14: SEO Keywords
```
Name: seoKeywords
Type: String
Display Name: SEO Keywords (comma-separated)
```

4. **Click Save** → Your `location-service-page` model is ready!

---

## Quick Model Reference

| Model Name | Purpose | URL | Key Fields |
|------------|---------|-----|-----------|
| `page` | Generic pages | `/page` | title, content, ctas, seoData |
| `blog-post` | Blog articles | `/blog` | title, slug, content, category, publishDate |
| `location-service-page` | Location services | `/locations` | city, service, hero, problems, faqs |

---

## Creating Content in Builder.io

Once models are set up:

### Creating a Page
1. Go to Models → `page`
2. Click **New Entry**
3. Fill in fields:
   - Title: "About Top Speed Appliance"
   - Content: (use visual editor)
   - CTAs: Add buttons
4. Click **Publish** or **Save as Draft**

### Creating a Blog Post
1. Go to Models → `blog-post`
2. Click **New Entry**
3. Fill in:
   - Title: "Why Your Dryer Takes 2 Hours"
   - Slug: "why-dryer-slow"
   - Category: "Maintenance Tips"
   - Content: (write article)
   - Publish Date: (set date)
4. Click **Publish**

### Creating Location Pages
1. Go to Models → `location-service-page`
2. Click **New Entry**
3. Fill in:
   - City: "Miami"
   - Service: "Dryer Repair"
   - Title: "Dryer Repair in Miami, FL"
   - Hero intro, problems, FAQs (use visual editor)
4. Click **Publish**

---

## Content Import

### Option 1: Manual Entry
- Create each piece of content in Builder.io UI
- Use visual editor for rich content
- Best for: New content going forward

### Option 2: Bulk Import (Advanced)
If you have content in JSON format, you can import:
1. Export current location data from `src/data/locationServicePages.js`
2. Format as Builder.io content
3. Use Builder.io API to bulk import
4. See documentation: https://builder.io/c/docs/import-export

---

## Best Practices

### SEO Optimization
- ✅ Fill meta descriptions
- ✅ Use descriptive URLs/slugs
- ✅ Add og:image for social sharing
- ✅ Include keywords strategically

### Content Organization
- ✅ Use consistent naming
- ✅ Tag content with categories
- ✅ Add publish dates
- ✅ Link related content

### Performance
- ✅ Optimize images before uploading
- ✅ Use lazy loading where possible
- ✅ Set cache headers appropriately
- ✅ Monitor API response times

---

## Testing Your Models

### In Browser Console
```javascript
// Test fetching a page
const page = await builder
  .get('page', { userAttributes: { urlPath: '/about' } })
  .toPromise()
console.log(page)

// Test fetching a blog post
const post = await builder
  .get('blog-post', { userAttributes: { urlPath: '/blog/why-dryer-slow' } })
  .toPromise()
console.log(post)

// Fetch all posts
const posts = await builder
  .getAll('blog-post', { limit: 10 })
  .toPromise()
console.log(posts)
```

---

## Integration Checklist

- [ ] `page` model created
- [ ] `blog-post` model created
- [ ] `location-service-page` model created
- [ ] First page content created
- [ ] First blog post created
- [ ] First location page created
- [ ] API key in `.env.local`
- [ ] Dev server restarted
- [ ] Content fetches successfully in console
- [ ] BuilderPage component working in app
- [ ] BuilderLocationPage component working

---

## Next Steps

1. **Create Models** (this guide)
2. **Add Sample Content** (1 of each type)
3. **Test Fetching** (browser console)
4. **Integrate Components** (in your routes)
5. **Publish & Promote** (go live)

---

## Resources

- [Builder.io Models Docs](https://builder.io/c/docs/models)
- [API Reference](https://builder.io/c/docs/api)
- [Best Practices](https://builder.io/c/docs/best-practices)
