import { LOCATION_SERVICE_PAGES } from './locationServicePages'

// The site is served on the www host (the bare domain redirects to www), so
// every canonical URL must be built on www — a bare-domain canonical points
// outside the www Search Console property and reads as an alternate page.
export const SITE_URL = 'https://www.topspeedappliance.net'

const HOME_META = {
  title: 'Top Speed Appliance - Refrigerator, Washer, Oven & Dishwasher Repair Near Me',
  description: 'Expert appliance repair services in South Florida. Refrigerator repair near me, washer and dryer repair, oven and stove repair, dishwasher repair. Fast response, certified technicians.',
}

// Location + service landing pages (LocationServicePage). Their runtime head
// is set by the component's useSeo call, so the prerender entries below reuse
// the component's exact title/description strings — prerendering only makes
// the served HTML carry the same head (and the page's own canonical) instead
// of the homepage shell's.
const LOCATION_PAGE_META = Object.fromEntries(
  LOCATION_SERVICE_PAGES.map((entry) => [
    entry.canonicalPath,
    {
      title: `${entry.serviceName} in ${entry.cityName} FL | Top Speed Appliance`,
      description: `Same-day ${entry.serviceName.toLowerCase()} in ${entry.cityName}. Licensed & insured technicians. Call Top Speed Appliance today.`,
    },
  ])
)

// City pages (CityPage). Same approach: the exact seoTitle/metaDescription
// strings the component applies at runtime, keyed by route path.
const CITY_PAGE_META = {
  '/appliance-repair-fort-lauderdale': {
    title: 'Appliance Repair in Fort Lauderdale, FL | Same-Day Service',
    description: 'Top Speed Appliance offers fast appliance repair in Fort Lauderdale. Washer, dryer, refrigerator & oven repair. Call today.',
  },
  '/appliance-repair-hollywood-fl': {
    title: 'Appliance Repair in Hollywood, FL | Same-Day Service',
    description: 'Top Speed Appliance provides fast appliance repair in Hollywood. Washer, dryer, refrigerator & oven repair. Call today.',
  },
  '/appliance-repair-plantation-fl': {
    title: 'Appliance Repair in Plantation, FL | Same-Day Service',
    description: 'Top Speed Appliance provides fast appliance repair in Plantation. Washer, dryer, refrigerator & oven repair. Call today.',
  },
  '/appliance-repair-pembroke-pines-fl': {
    title: 'Appliance Repair in Pembroke Pines, FL | Same-Day Service',
    description: 'Top Speed Appliance provides fast appliance repair in Pembroke Pines. Washer, dryer, refrigerator & oven repair. Call today.',
  },
  '/appliance-repair-delray-beach-fl': {
    title: 'Appliance Repair in Delray Beach, FL | Same-Day Service',
    description: 'Top Speed Appliance offers fast appliance repair in Delray Beach. Washer, dryer, refrigerator & oven repair. Call today.',
  },
  '/appliance-repair-boynton-beach-fl': {
    title: 'Appliance Repair in Boynton Beach, FL | Same-Day Service',
    description: 'Top Speed Appliance provides fast appliance repair in Boynton Beach. Washer, dryer, refrigerator & oven repair. Call today.',
  },
  '/appliance-repair-jupiter-fl': {
    title: 'Appliance Repair in Jupiter, FL | Same-Day Service',
    description: 'Top Speed Appliance provides fast appliance repair in Jupiter. Washer, dryer, refrigerator & oven repair. Call today.',
  },
  '/appliance-repair-palm-beach-gardens-fl': {
    title: 'Appliance Repair in Palm Beach Gardens, FL | Same-Day Service',
    description: 'Top Speed Appliance provides fast appliance repair in Palm Beach Gardens. Washer, dryer, refrigerator & oven repair. Call today.',
  },
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
  '/track': {
    title: 'Track My Tech — Live Job Tracking | Top Speed Appliance',
    description: 'Follow your appliance repair live through all eight stages, from request received to repair completed — with a live map when your technician is en route.',
  },
  '/refer': {
    title: 'Refer & Earn — ApplianceReferral by Top Speed | Top Speed Appliance',
    description: 'Share your Top Speed referral code: your friend gets $25 off their first eligible repair, and you earn service credit — $25 per completed referral, rising to $35 and $50, plus milestone bonuses. Businesses and property managers refer on the partner track, same terms.',
  },
  '/account': {
    title: 'Your Top Speed Account — Appliance Connect | Top Speed Appliance',
    description: 'One account for your whole home: sign in to the Top Speed Service OS for your appliance garage, service history, offers and referrals.',
  },
  '/media-os': {
    title: 'Media OS — Top Speed 360 | Top Speed Appliance',
    description: 'Top Speed 360 is the media company built on the Service OS: repair know-how, local stories, live demonstrations and The Fast Lane newsletter. Now in design.',
  },
  '/brands': {
    title: 'Appliance Brands We Repair | Top Speed Appliance',
    description: 'Appliance repair for Samsung, LG, GE, Whirlpool, Bosch, Sub-Zero, Miele, and more. Book online or by email.',
  },
  '/pricing': {
    title: 'Appliance Repair Pricing in South Florida | Top Speed Appliance',
    description: 'Appliance repair pricing in South Florida. Quotes are provided upfront, and you approve the price before any work begins.',
  },
  '/warranty': {
    title: 'Appliance Repair Warranty | Top Speed Appliance',
    description: 'Warranty coverage on appliance repairs from Top Speed Appliance in South Florida. Book online or call 954-931-7997.',
  },
  '/reviews': {
    title: 'Customer Reviews | Top Speed Appliance',
    description: 'Top Speed Appliance serves South Florida homes and businesses for appliance repair, installation, and commercial service.',
  },
  '/blog': {
    title: 'Appliance Repair Tips and Guides | Top Speed Appliance',
    description: 'Appliance maintenance tips and repair guides from the Top Speed Appliance team.',
  },
  '/privacy': {
    title: 'Privacy Policy | Top Speed Appliance',
    description: 'How Top Speed Appliance collects, uses, and protects your information.',
  },
  '/refrigerator-repair': {
    title: 'Refrigerator Repair Near Me in South Florida | Top Speed Appliance',
    description: 'Refrigerator repair in South Florida from Top Speed Appliance. Book online or call 954-931-7997 to schedule a visit.',
  },
  '/washer-repair': {
    title: 'Washer Repair Near Me in South Florida | Top Speed Appliance',
    description: 'Washer repair in South Florida from Top Speed Appliance. Book online or call 954-931-7997 to schedule a visit.',
  },
  '/dryer-repair': {
    title: 'Dryer Repair Near Me in South Florida | Top Speed Appliance',
    description: 'Dryer repair in South Florida from Top Speed Appliance. Book online or call 954-931-7997 to schedule a visit.',
  },
  '/dishwasher-repair': {
    title: 'Dishwasher Repair Near Me in South Florida | Top Speed Appliance',
    description: 'Dishwasher repair in South Florida from Top Speed Appliance. Book online or call 954-931-7997 to schedule a visit.',
  },
  '/oven-stove-repair': {
    title: 'Oven and Range Repair Near Me in South Florida | Top Speed Appliance',
    description: 'Oven and range repair in South Florida from Top Speed Appliance. Book online or call 954-931-7997 to schedule a visit.',
  },
  '/microwave-repair': {
    title: 'Microwave Repair Near Me in South Florida | Top Speed Appliance',
    description: 'Microwave repair in South Florida from Top Speed Appliance. Book online or call 954-931-7997 to schedule a visit.',
  },
  '/commercial-appliance-repair': {
    title: 'Commercial Appliance Repair in South Florida | Top Speed Appliance',
    description: 'Commercial appliance repair in South Florida. Request a quote or call 954-931-7997 to discuss your equipment.',
  },
  '/appliance-installation': {
    title: 'Appliance Installation in South Florida | Top Speed Appliance',
    description: 'Appliance installation in South Florida from Top Speed Appliance. Installation is quoted before work begins. Call 954-931-7997.',
  },
  ...LOCATION_PAGE_META,
  ...CITY_PAGE_META,
}

// Extra explicit routes prerendered with the fallback (home) meta. Their
// runtime head comes from the global PageMeta fallback today, so prerendering
// changes only their canonical (own URL on www) and gives them a real SSR
// body instead of the homepage shell — titles/descriptions stay as they are.
const EXTRA_PRERENDER_PATHS = [
  '/garbage-disposal-repair',
  '/wine-cooler-repair',
  '/home-appliance-repair',
  '/commercial-refrigeration-repair',
  '/commercial-cooking-equipment-repair',
  '/commercial-dishwasher-repair',
  '/commercial-laundry-repair',
  '/washer-dryer-installation',
  '/refrigerator-installation',
  '/range-oven-installation',
  '/dishwasher-installation',
  '/microwave-installation',
  '/service-directory',
  '/network',
]

export const PRERENDER_PATHS = [...new Set([...Object.keys(PAGE_META), ...EXTRA_PRERENDER_PATHS])]

export function getPageMeta(path) {
  return PAGE_META[path] ?? HOME_META
}
