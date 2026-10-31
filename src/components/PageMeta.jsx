import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE_URL = 'https://topspeedappliance.com'

const HOME_META = {
  title: 'Top Speed Appliance - Refrigerator, Washer, Oven & Dishwasher Repair Near Me',
  description: 'Expert appliance repair services in South Florida. Refrigerator repair near me, washer and dryer repair, oven and stove repair, dishwasher repair. Fast response, certified technicians.',
}

const PAGE_META = {
  '/': HOME_META,
  '/service-areas': {
    title: 'Appliance Repair Service Areas in South Florida | Top Speed Appliance',
    description: 'See every South Florida city we serve for refrigerator, washer, dryer, oven, and dishwasher repair.',
  },
  '/service-request': {
    title: 'Request Appliance Repair Service | Top Speed Appliance',
    description: 'Request appliance repair in South Florida. Tell us your appliance and issue, and our team will follow up.',
  },
  '/brands': {
    title: 'Appliance Brands We Repair | Top Speed Appliance',
    description: 'Appliance repair for Samsung, LG, GE, Whirlpool, Bosch, Sub-Zero, Miele, and more. Book online or by email.',
  },
  '/blog': {
    title: 'Appliance Repair Tips and Guides | Top Speed Appliance',
    description: 'Appliance maintenance tips and repair guides from the Top Speed Appliance team.',
  },
  '/privacy': {
    title: 'Privacy Policy | Top Speed Appliance',
    description: 'How Top Speed Appliance collects, uses, and protects your information.',
  },
}

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
    const meta = PAGE_META[path] ?? HOME_META

    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
    setCanonical(`${SITE_URL}${path}`)
  }, [pathname])

  return null
}

export default PageMeta
