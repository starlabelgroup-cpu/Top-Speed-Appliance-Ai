import { slugify } from '../utils/slug'

export const SEO_BRANDS = [
  'Samsung',
  'LG',
  'GE',
  'Whirlpool',
  'Frigidaire',
  'KitchenAid',
  'Maytag',
  'Bosch'
]

export const SEO_COUNTIES = [
  { slug: 'palm-beach-county', name: 'Palm Beach County' },
  { slug: 'broward-county', name: 'Broward County' },
  { slug: 'miami-dade-county', name: 'Miami-Dade County' }
]

export const SEO_CITIES_BY_COUNTY = {
  'palm-beach-county': [
    'West Palm Beach',
    'Boca Raton',
    'Delray Beach',
    'Boynton Beach',
    'Jupiter',
    'Palm Beach Gardens',
    'Wellington'
  ],
  'broward-county': [
    'Fort Lauderdale',
    'Hollywood',
    'Pembroke Pines',
    'Coral Springs',
    'Pompano Beach',
    'Sunrise',
    'Deerfield Beach'
  ],
  'miami-dade-county': [
    'Miami',
    'Hialeah',
    'Miami Beach',
    'Doral',
    'Kendall',
    'Homestead'
  ]
}

export const SEO_SERVICES = [
  {
    slug: 'appliance-repair',
    name: 'Appliance Repair',
    short: 'Fast, same-day appliance repair with certified technicians.'
  },
  {
    slug: 'home-appliance-repair',
    name: 'Home Appliance Repair',
    short: 'Residential appliance repair for kitchens and laundry rooms.'
  },
  {
    slug: 'commercial-appliance-repair',
    name: 'Commercial Appliance Repair',
    short: 'Commercial appliance repair for restaurants, offices, and property managers.'
  },
  {
    slug: 'appliance-installation',
    name: 'Appliance Installation',
    short: 'Professional installation for new appliances and replacements.'
  },
  {
    slug: 'appliance-delivery',
    name: 'Appliance Delivery',
    short: 'Appliance delivery and setup coordination across South Florida.'
  },
  {
    slug: 'dryer-vent-cleaning',
    name: 'Dryer Vent Cleaning',
    short: 'Dryer vent cleaning to improve safety, drying time, and airflow.'
  }
]

export const SEO_PROBLEMS = [
  {
    slug: 'dryer-not-heating',
    title: 'Dryer Not Heating',
    summary: 'If your dryer runs but does not heat, the issue may be the heating element, thermal fuse, airflow, or a control problem.',
    relatedServiceSlug: 'appliance-repair',
    appliance: 'Dryer'
  },
  {
    slug: 'fridge-not-cooling',
    title: 'Fridge Not Cooling',
    summary: 'A refrigerator not cooling can be caused by condenser coils, a faulty fan motor, thermostat issues, or compressor problems.',
    relatedServiceSlug: 'appliance-repair',
    appliance: 'Refrigerator'
  },
  {
    slug: 'washer-not-draining',
    title: 'Washer Not Draining',
    summary: 'Washer drainage issues are often caused by clogged pumps, blocked hoses, or a lid switch/control malfunction.',
    relatedServiceSlug: 'appliance-repair',
    appliance: 'Washer'
  },
  {
    slug: 'oven-overheating',
    title: 'Oven Overheating',
    summary: 'An oven overheating may indicate a bad sensor, thermostat, relay, or control board.',
    relatedServiceSlug: 'appliance-repair',
    appliance: 'Oven/Range'
  },
  {
    slug: 'ice-maker-not-working',
    title: 'Ice Maker Not Working',
    summary: 'Ice maker problems are commonly caused by water inlet valves, sensors, frozen lines, or fill tube issues.',
    relatedServiceSlug: 'appliance-repair',
    appliance: 'Refrigerator'
  }
]

export function getAllCities() {
  const set = new Set()
  Object.values(SEO_CITIES_BY_COUNTY).forEach(list => list.forEach(city => set.add(city)))
  return Array.from(set)
}

export function getCitySlug(cityName) {
  return slugify(cityName)
}

export function findCountyBySlug(slug) {
  return SEO_COUNTIES.find(c => c.slug === slug) || null
}

export function findServiceBySlug(slug) {
  return SEO_SERVICES.find(s => s.slug === slug) || null
}

export function findProblemBySlug(slug) {
  return SEO_PROBLEMS.find(p => p.slug === slug) || null
}

export function findCityBySlug(citySlug) {
  const cities = getAllCities()
  for (const city of cities) {
    if (slugify(city) === citySlug) return city
  }
  return null
}

export function buildServiceLocationSlug(serviceSlug, locationNameOrSlug) {
  const locationSlug = locationNameOrSlug.includes('-') ? locationNameOrSlug : slugify(locationNameOrSlug)
  return `${serviceSlug}-${locationSlug}`
}
