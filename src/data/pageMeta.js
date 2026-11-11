export const SITE_URL = 'https://topspeedappliance.net'

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
  '/track': {
    title: 'Track My Tech — Live Job Tracking | Top Speed Appliance',
    description: 'Follow your appliance repair live through all eight stages, from request received to repair completed — with a live map when your technician is en route.',
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
}

export const PRERENDER_PATHS = Object.keys(PAGE_META)

export function getPageMeta(path) {
  return PAGE_META[path] ?? HOME_META
}
