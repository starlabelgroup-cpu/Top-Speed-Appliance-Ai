import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_URL, getPageMeta } from '../data/pageMeta'

function setCanonical(href) {
  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = href
}

function PageMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
    const meta = getPageMeta(path)

    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
    setCanonical(`${SITE_URL}${path}`)
  }, [pathname])

  return null
}

export default PageMeta
