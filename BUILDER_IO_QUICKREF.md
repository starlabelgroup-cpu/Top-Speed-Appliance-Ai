# Builder.io Quick Reference

## ✅ Setup Complete!

Your project now has Builder.io CMS integration ready to use.

---

## Quick Start (2 Steps)

### Step 1️⃣: Get API Key
1. Go to https://builder.io/account/settings
2. Copy your **Public API Key** (starts with `pk_`)

### Step 2️⃣: Add to .env.local
```env
VITE_BUILDER_API_KEY=pk_YOUR_KEY_HERE
```
Restart dev server: `npm run dev`

---

## Files Created

| File | Purpose |
|------|---------|
| `.env.local` | Environment variables (add your API key here) |
| `src/lib/builder.js` | Builder.io initialization |
| `src/components/BuilderPage.jsx` | Example component for rendering Builder pages |
| `BUILDER_IO_SETUP.md` | Full setup documentation |

---

## Import Builder.io in Your Components

```jsx
import { BuilderComponent, builder } from '@builder.io/react'
```

---

## Fetch Content from Builder.io

```javascript
// Fetch a single page
const page = await builder
  .get('page', { userAttributes: { urlPath: '/my-page' } })
  .toPromise()

// Fetch all items of a type
const items = await builder
  .getAll('blog-post', { limit: 10 })
  .toPromise()

// Fetch with query filter
const results = await builder
  .get('service', { query: { 'data.title': { $regex: 'repair' } } })
  .toPromise()
```

---

## Render Builder Content

```jsx
<BuilderComponent model="page" content={pageContent} />
```

---

## Use Case Ideas for Top Speed Appliance

### 🔧 Service Pages
Create and manage service pages for each repair type without coding:
- Refrigerator Repair
- Washer/Dryer Repair
- Oven/Stove Repair
- Dishwasher Repair

**Setup:**
```jsx
<Route path="/services/:serviceSlug" element={<BuilderPage />} />
```

### 📝 Blog Posts
Write articles directly in Builder.io's visual editor:
- Appliance maintenance tips
- Repair guides
- Local news and promotions

**Setup:**
```jsx
<Route path="/blog/:postSlug" element={<BuilderPage />} />
```

### 🏢 Location Pages
Manage landing pages for each service area:
- Miami appliance repair
- Fort Lauderdale repairs
- Boca Raton services

### 🎯 Promotional Pages
Create seasonal campaigns without code deployments

---

## Environment Variables

```env
# Required
VITE_BUILDER_API_KEY=pk_YOUR_KEY

# Optional (for advanced features)
BUILDER_SPACE_ID=
BUILDER_SPACE_PREVIEW_SECRET=
```

---

## Common Errors & Fixes

| Error | Fix |
|-------|-----|
| "API key not found" | Check `.env.local` has `VITE_BUILDER_API_KEY` |
| "Content not loading" | Verify URL path in Builder.io matches your code |
| "404 on API calls" | Check your API key is valid and active |
| "Build failing" | Run `npm install` to ensure all packages installed |

---

## Integration Checklist

- [ ] API key obtained from builder.io
- [ ] `.env.local` updated with API key
- [ ] Dev server restarted
- [ ] First model created in Builder.io
- [ ] Test fetch working in browser console
- [ ] Component integrated into route
- [ ] Content loading successfully

---

## Resources

- 📖 [Full Documentation](./BUILDER_IO_SETUP.md)
- 🌐 [Builder.io Docs](https://builder.io/c/docs)
- ⚙️ [API Reference](https://builder.io/c/docs/api)
- 💬 [Community Forum](https://forum.builder.io)

---

## Next Actions

1. Get your API key from builder.io
2. Add it to `.env.local`
3. Restart your dev server
4. Create your first model in Builder.io
5. Test by fetching content in browser console

**Done!** 🎉 Your site now supports dynamic content management.
