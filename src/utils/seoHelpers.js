export const setPageMeta = (title, description, image, url, type = 'website') => {
  if (typeof window === 'undefined') return

  document.title = title
  
  updateMetaTag('description', description)
  updateMetaTag('og:title', title, 'property')
  updateMetaTag('og:description', description, 'property')
  updateMetaTag('og:image', image, 'property')
  updateMetaTag('og:url', url, 'property')
  updateMetaTag('og:type', type, 'property')
  updateMetaTag('twitter:title', title)
  updateMetaTag('twitter:description', description)
  updateMetaTag('twitter:image', image)
}

const updateMetaTag = (name, content, attribute = 'name') => {
  let tag = document.querySelector(`meta[${attribute}="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, name)
    document.head.appendChild(tag)
  }
  tag.content = content
}

export const generateStructuredData = (type, data) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  }
  
  return JSON.stringify(structuredData)
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Top Speed Appliance',
  image: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2Fc593bf5c5ea049c987a8ce14d83a1a44',
  description: 'Professional appliance repair services in South Florida',
  telephone: '+1-954-931-7997',
  email: 'service@topspeedappliance.net',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'South Florida',
    addressLocality: 'South Florida',
    addressRegion: 'FL',
    postalCode: '33000',
    addressCountry: 'US'
  },
  url: 'https://topspeedappliance.com',
  sameAs: [
    'https://www.facebook.com/topspeedappliance',
    'https://www.instagram.com/topspeedappliance'
  ]
}

export const serviceSchema = (title, description, areaServed) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `https://topspeedappliance.com/#${title.replace(/\s+/g, '-')}`,
  name: `Top Speed Appliance - ${title}`,
  description,
  areaServed,
  telephone: '+1-954-931-7997',
  url: 'https://topspeedappliance.com'
})
