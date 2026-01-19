# Builder.io CMS Integration Setup Guide

## Overview
This guide explains how to set up and use Builder.io CMS with your Top Speed Appliance Vite + React project.

## Installation Status
✅ **@builder.io/react** is already installed
✅ **Configuration files** are ready
⏳ **API Key setup** - requires your action

---

## Step 1: Get Your Builder.io API Key

1. Go to [builder.io](https://builder.io)
2. Sign up or log in to your account
3. Navigate to **Settings** → **Account**
4. Copy your **Public API Key** (starts with `pk_`)

## Step 2: Configure Environment Variable

1. Open `.env.local` in your project root
2. Replace `pk_YOUR_PUBLIC_KEY_HERE` with your actual API key:

```env
VITE_BUILDER_API_KEY=pk_YOUR_ACTUAL_KEY_HERE
```

3. Save the file
4. Restart your dev server (`npm run dev`)

---

## Step 3: Create Content Models in Builder.io

1. Log in to [builder.io](https://builder.io)
2. Create new **Models** for your content:
   - **Page** - for dynamic pages
   - **Blog Post** - for blog content
   - **Service** - for service descriptions
   - **Testimonial** - for customer reviews

Each model will have its own URL path in Builder.io.

---

## Step 4: Example - Render Dynamic Pages

Here's how to fetch and render content from Builder.io:

### Example: Create a Dynamic Blog Page

```jsx
import { BuilderComponent, builder } from '@builder.io/react';
import '../lib/builder'; // Initialize Builder

export async function getBuilderContent(modelName, urlPath) {
  const content = await builder
    .get(modelName, {
      userAttributes: { urlPath }
    })
    .toPromise();
  
  return content;
}

export default function BlogPage() {
  const [content, setContent] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchContent = async () => {
      const data = await getBuilderContent('blog-post', window.location.pathname);
      setContent(data);
      setLoading(false);
    };
    fetchContent();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!content) return <div>Content not found</div>;

  return <BuilderComponent model="blog-post" content={content} />;
}
```

### Example: Route Setup (Add to App.jsx)

```jsx
// Add this route for dynamic Builder pages
<Route path="/pages/:slug" element={<BuilderPage />} />

// Or for specific content types
<Route path="/blog/:slug" element={<BuilderBlogPage />} />
```

---

## Step 5: Using Builder.io Visual Editor

Once your API key is configured:

1. Go to [builder.io](https://builder.io)
2. Create new pages or content
3. Use the visual editor to design pages without code
4. Your Vite app will fetch and display them automatically

---

## Available Models for Your Business

### 1. **Service Pages**
- Create dynamic service pages (Refrigerator Repair, Washer/Dryer Repair, etc.)
- Manage content, pricing, and FAQs visually
- URL pattern: `/services/{serviceSlug}`

### 2. **Blog Posts**
- Write and publish blog articles with rich formatting
- Include images, code blocks, and custom components
- URL pattern: `/blog/{postSlug}`

### 3. **Landing Pages**
- Create promotional landing pages for campaigns
- A/B test different designs
- Track conversion metrics

### 4. **Testimonials**
- Manage customer reviews and testimonials
- Display ratings and images
- Update easily without code changes

---

## API Usage Examples

### Fetch a Single Page

```javascript
import { builder } from '@builder.io/react';

const page = await builder
  .get('page', { 
    userAttributes: { urlPath: '/services/refrigerator-repair' } 
  })
  .toPromise();

console.log(page); // Your page content
```

### Fetch Multiple Items

```javascript
const posts = await builder
  .getAll('blog-post', {
    limit: 10,
    sort: { createdDate: -1 }
  })
  .toPromise();
```

### Search Content

```javascript
const results = await builder
  .get('service', {
    query: {
      'data.title': { $regex: 'refrigerator', $options: 'i' }
    }
  })
  .toPromise();
```

---

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_BUILDER_API_KEY` | Your Builder.io public API key | `pk_abc123...` |

**Note:** Only use public API keys (starting with `pk_`) in frontend code. Never expose secret keys.

---

## Common Use Cases

### 1. Replace Static Location Pages
Instead of hardcoding service pages, manage them in Builder.io:
- Easily update content for Miami, Fort Lauderdale, Boca Raton, etc.
- Use the visual editor for SEO optimization
- A/B test different layouts

### 2. Dynamic Blog Section
- Write blog posts in Builder.io without touching code
- Automatically display on your website
- Include related posts, tags, and categories

### 3. Customer Success Stories
- Create and display testimonials visually
- Include customer photos and ratings
- Update without redeploying

### 4. Seasonal Promotions
- Launch promotional pages quickly
- Update content in real-time
- Track performance with analytics

---

## Troubleshooting

### API Key Not Working?
- ✅ Check that key starts with `pk_` (public key)
- ✅ Verify it's in `.env.local` (not `.env`)
- ✅ Restart dev server after updating `.env.local`
- ✅ Check that the key belongs to your organization in Builder.io

### Content Not Loading?
- ✅ Verify the model name matches your Builder.io setup
- ✅ Check the URL path matches your Builder.io content path
- ✅ Open browser DevTools → Network to see API calls
- ✅ Look for 404 or 401 errors in console

### Build Issues?
- ✅ Clear `node_modules` and reinstall: `npm install`
- ✅ Clear Vite cache: Delete `.vite` folder
- ✅ Rebuild: `npm run build`

---

## Next Steps

1. ✅ Get your API key from [builder.io/account/settings](https://builder.io/account/settings)
2. ✅ Add it to `.env.local`
3. ✅ Create your first model in Builder.io
4. ✅ Test fetching content using the examples above
5. ✅ Integrate into your components and routes

---

## Resources

- [Builder.io Documentation](https://builder.io/c/docs)
- [React SDK Guide](https://builder.io/c/docs/react)
- [API Reference](https://builder.io/c/docs/api)
- [Community Forum](https://forum.builder.io)

---

## Support

For questions or issues:
- Check [Builder.io Docs](https://builder.io/c/docs)
- Visit [Builder.io Forum](https://forum.builder.io)
- Check your `.env.local` configuration
