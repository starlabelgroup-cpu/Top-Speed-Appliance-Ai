import { useEffect } from 'react'

function ensureMetaByName(name) {
  let meta = document.head.querySelector(`meta[name="${name}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', name)
    document.head.appendChild(meta)
  }
  return meta
}

function ensureMetaByProperty(property) {
  let meta = document.head.querySelector(`meta[property="${property}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('property', property)
    document.head.appendChild(meta)
  }
  return meta
}

function ensureCanonical() {
  let canonical = document.head.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  return canonical
}

function safeOrigin() {
  if (typeof window === 'undefined') return 'https://topspeedappliance.com'
  return window.location.origin
}

export function useSeo({
  title,
  description,
  canonicalPath,
  ogImage,
  schema
}) {
  useEffect(() => {
    if (title) document.title = title

    if (description) {
      ensureMetaByName('description').setAttribute('content', description)
      ensureMetaByProperty('og:description').setAttribute('content', description)
      ensureMetaByName('twitter:description').setAttribute('content', description)
    }

    if (title) {
      ensureMetaByProperty('og:title').setAttribute('content', title)
      ensureMetaByName('twitter:title').setAttribute('content', title)
    }

    if (ogImage) {
      ensureMetaByProperty('og:image').setAttribute('content', ogImage)
    }

    const origin = safeOrigin()
    const canonicalUrl = canonicalPath ? `${origin}${canonicalPath}` : origin
    ensureCanonical().setAttribute('href', canonicalUrl)

    const scriptId = 'page-jsonld'
    const previous = document.getElementById(scriptId)
    if (previous) previous.remove()

    let cleanup = null

    if (schema) {
      const script = document.createElement('script')
      script.id = scriptId
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(schema)
      document.head.appendChild(script)
      cleanup = () => {
        if (script.parentNode) script.parentNode.removeChild(script)
      }
    }

    return () => {
      if (cleanup) cleanup()
    }
  }, [title, description, canonicalPath, ogImage, schema])
}
