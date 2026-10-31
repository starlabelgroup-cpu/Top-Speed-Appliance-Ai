const SITE_LINKS = [
  { keywords: ['fort lauderdale'], label: 'Appliance Repair in Fort Lauderdale', href: '/appliance-repair-fort-lauderdale' },
  { keywords: ['hollywood'], label: 'Appliance Repair in Hollywood, FL', href: '/appliance-repair-hollywood-fl' },
  { keywords: ['plantation'], label: 'Appliance Repair in Plantation, FL', href: '/appliance-repair-plantation-fl' },
  { keywords: ['pembroke'], label: 'Appliance Repair in Pembroke Pines, FL', href: '/appliance-repair-pembroke-pines-fl' },
  { keywords: ['delray'], label: 'Appliance Repair in Delray Beach, FL', href: '/appliance-repair-delray-beach-fl' },
  { keywords: ['boynton'], label: 'Appliance Repair in Boynton Beach, FL', href: '/appliance-repair-boynton-beach-fl' },
  { keywords: ['jupiter'], label: 'Appliance Repair in Jupiter, FL', href: '/appliance-repair-jupiter-fl' },
  { keywords: ['palm beach gardens'], label: 'Appliance Repair in Palm Beach Gardens, FL', href: '/appliance-repair-palm-beach-gardens-fl' },
  { keywords: ['washer'], label: 'Washer Repair', href: '/washer-repair' },
  { keywords: ['dryer'], label: 'Dryer Repair', href: '/dryer-repair' },
  { keywords: ['fridge', 'refrigerator'], label: 'Refrigerator Repair', href: '/refrigerator-repair' },
  { keywords: ['oven', 'stove'], label: 'Oven & Stove Repair', href: '/oven-stove-repair' },
  { keywords: ['dishwasher'], label: 'Dishwasher Repair', href: '/dishwasher-repair' },
  { keywords: ['microwave'], label: 'Microwave Repair', href: '/microwave-repair' },
  { keywords: ['commercial', 'restaurant', 'business'], label: 'Commercial Appliance Repair', href: '/commercial-appliance-repair' },
  { keywords: ['install', 'new appliance', 'buy', 'shop', 'recommend'], label: 'Appliance Installation', href: '/appliance-installation' },
  { keywords: ['brand', 'recommend', 'buy', 'shop'], label: 'Brands We Repair', href: '/brands' },
  { keywords: ['service area', 'where do you', 'city', 'cities'], label: 'Service Areas', href: '/service-areas' }
]

const MAX_SITE_LINKS = 3

export const findRelevantSiteLinks = (text) => {
  const normalized = text.toLowerCase()
  const matches = []
  for (const link of SITE_LINKS) {
    if (matches.length >= MAX_SITE_LINKS) break
    if (link.keywords.some((keyword) => normalized.includes(keyword))) matches.push(link)
  }
  return matches
}
