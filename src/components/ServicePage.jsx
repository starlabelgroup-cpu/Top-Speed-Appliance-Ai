import React, { useEffect } from 'react'
import { BOOKING_CONFIG } from '../config/bookingConfig'
import { openSpeedy, useAttributionSearch, withAttribution } from '../lib/serviceOs'
import '../styles/service-and-city-pages.css'
import ServiceBookButton from './ServiceBookButton'

/**
 * ServicePage Component
 * Reusable appliance repair page with the $99 service fee, Speedy booking, and phone booking.
 * Usage: <Route path="/washer-repair" element={<ServicePage service="washer" />} />
 */

const SERVICE_FEE = '$99'
const PHONE_DISPLAY = BOOKING_CONFIG.PHONE_NUMBER
const PHONE_HREF = BOOKING_CONFIG.PHONE_LINK

const DEFAULT_BENEFITS = [
  `${SERVICE_FEE} service fee, quoted upfront`,
  'Same-day service available in most areas',
  'Licensed and insured technicians',
  '12-month warranty on repairs'
]

const COMMERCIAL_PRICING = {
  label: 'Pricing',
  amount: 'Custom Quote',
  note: 'Commercial repairs are quoted after diagnosis, and you approve the quote before work begins. Book online or call to schedule a visit.'
}

const COMMERCIAL_BENEFITS = ['Quotes provided before work begins', 'Scheduling around your business hours', 'Licensed and insured technicians', '12-month warranty on repairs']

const INSTALLATION_PRICING = {
  label: 'Pricing',
  amount: 'Custom Quote',
  note: 'Installation is quoted based on your appliance and the hookups it needs. Book online or call for an exact price.'
}

const INSTALLATION_BENEFITS = ['Installation quoted before work begins', 'Licensed and insured technicians', 'Same-day service available in most areas']

const COMMERCIAL_RELATED_LINKS = [
  { href: '/commercial-refrigeration-repair', label: 'Commercial Refrigeration Repair' },
  { href: '/commercial-cooking-equipment-repair', label: 'Commercial Cooking Equipment Repair' },
  { href: '/commercial-dishwasher-repair', label: 'Commercial Dishwasher Repair' },
  { href: '/commercial-laundry-repair', label: 'Commercial Laundry Repair' }
]

const INSTALLATION_RELATED_LINKS = [
  { href: '/washer-dryer-installation', label: 'Washer and Dryer Installation' },
  { href: '/refrigerator-installation', label: 'Refrigerator Installation' },
  { href: '/range-oven-installation', label: 'Range and Oven Installation' },
  { href: '/dishwasher-installation', label: 'Dishwasher Installation' },
  { href: '/microwave-installation', label: 'Microwave Installation' }
]

const SERVICE_CONFIG = {
  washer: {
    name: 'Washer',
    seoTitle: 'Washer Repair in Fort Lauderdale | $99 Service Fee',
    metaDescription: 'Washer repair in South Florida with a $99 service fee. Book online with Speedy or call (954) 931-7997.',
    h1: 'Washer Repair in Fort Lauderdale, FL',
    image: '/visuals/page-washer.webp',
    imageAlt: 'Top Speed Appliance technician repairing a washer motor',
    imageMode: 'poster',
    intro: 'Top Speed Appliance provides professional washer repair in Fort Lauderdale and nearby areas. Our licensed technicians service all major brands for leaks, spin problems, drain issues, and error codes.',
    problems: ['Washer not spinning', 'Water leaking', 'Won\'t drain', 'Loud noises', 'Error codes', 'Not filling with water'],
    brands: ['Samsung', 'LG', 'Whirlpool', 'GE', 'Maytag', 'Kenmore', 'Frigidaire', 'Speed Queen', 'Bosch', 'Electrolux'],
    faqs: [
      { question: 'How much does washer repair cost?', answer: `The ${SERVICE_FEE} service fee covers the technician visit and diagnosis. Parts and labor are quoted before any work begins.` },
      { question: 'Do you repair all washer brands?', answer: 'Yes, we service top-load, front-load, and HE washers from all major brands.' },
      { question: 'Can you come out the same day?', answer: 'Same-day service is available in most areas. Book online or call to check availability.' },
      { question: 'Do you offer a warranty?', answer: 'Yes, all repairs come with a 12-month warranty on parts and labor.' }
    ]
  },
  dryer: {
    name: 'Dryer',
    seoTitle: 'Dryer Repair in Fort Lauderdale | $99 Service Fee',
    metaDescription: 'Dryer repair in South Florida with a $99 service fee. Book online with Speedy or call (954) 931-7997.',
    h1: 'Dryer Repair in Fort Lauderdale, FL',
    image: '/visuals/page-dryer.webp',
    imageAlt: 'Top Speed Appliance technician repairing a dryer',
    imageMode: 'poster',
    intro: 'Top Speed Appliance provides professional dryer repair for all brands in Fort Lauderdale. We handle heating problems, noise, and malfunctions for both gas and electric dryers.',
    problems: ['Dryer not heating', 'Long drying times', 'Loud noises', 'Gas/electric ignition problems', 'Random shutdowns', 'Thermal fuse issues', 'Belt problems'],
    brands: ['Samsung', 'LG', 'Whirlpool', 'GE', 'Maytag', 'Kenmore', 'Frigidaire', 'Speed Queen', 'Bosch', 'Electrolux'],
    faqs: [
      { question: 'How much does dryer repair cost?', answer: `The ${SERVICE_FEE} service fee covers the technician visit and diagnosis. Parts and labor are quoted before any work begins.` },
      { question: 'Do you repair gas and electric dryers?', answer: 'Yes, we service both gas and electric dryers.' },
      { question: 'Why is my dryer taking so long to dry clothes?', answer: 'Clogged vents, failed thermal sensors, or aged heating elements are common causes. We inspect and repair them.' },
      { question: 'Do you offer vent cleaning?', answer: 'We repair the dryer itself — vent cleaning is handled by Cleanout Vents, our registered vent partner in the Top Speed Appliance Service Network. Call 954-931-7997 and ask for Cleanout Vents.' }
    ]
  },
  refrigerator: {
    name: 'Refrigerator',
    seoTitle: 'Refrigerator Repair in Fort Lauderdale | $99 Service Fee',
    metaDescription: 'Refrigerator repair in South Florida with a $99 service fee. Book online with Speedy or call (954) 931-7997.',
    h1: 'Refrigerator Repair in Fort Lauderdale, FL',
    image: '/visuals/page-refrigerator.webp',
    imageAlt: 'Top Speed Appliance technician repairing a refrigerator compressor',
    imageMode: 'poster',
    intro: 'Top Speed Appliance provides expert refrigerator repair in Fort Lauderdale. We fix cooling issues, ice makers, leaks, and compressor problems. Call or book online so spoiled food does not become an expensive problem.',
    problems: ['Not cooling', 'Ice maker not working', 'Water leaks', 'Strange noises', 'Compressor issues', 'Frost accumulation', 'Weak water pressure'],
    brands: ['Samsung', 'LG', 'Whirlpool', 'GE', 'Maytag', 'Kenmore', 'Frigidaire', 'Sub-Zero', 'Viking', 'Electrolux'],
    faqs: [
      { question: 'How much does refrigerator repair cost?', answer: `The ${SERVICE_FEE} service fee covers the technician visit and diagnosis. Parts and labor are quoted before any work begins.` },
      { question: 'How long can food stay cold if my fridge isn\'t cooling?', answer: 'Food safety requires 40°F or below. If temperatures rise above 50°F, discard perishables.' },
      { question: 'Do you repair all refrigerator brands?', answer: 'Yes, we service all major brands including Sub-Zero and Viking.' },
      { question: 'What causes a refrigerator to stop cooling?', answer: 'Common causes include compressor failure, refrigerant leaks, and thermostat malfunctions. We diagnose quickly.' }
    ]
  },
  oven: {
    name: 'Oven & Stove',
    seoTitle: 'Oven & Stove Repair in Fort Lauderdale | $99 Service Fee',
    metaDescription: 'Oven and stove repair in South Florida with a $99 service fee. Book online with Speedy or call (954) 931-7997.',
    h1: 'Oven & Stove Repair in Fort Lauderdale, FL',
    image: '/visuals/page-oven.webp',
    imageAlt: 'Top Speed Appliance technician repairing a stove',
    imageMode: 'poster',
    intro: 'Top Speed Appliance provides professional oven and stove repair in Fort Lauderdale. We fix burners, igniters, temperature issues, and controls for gas and electric models of all major brands.',
    problems: ['Oven not heating', 'Burners not lighting', 'Faulty controls', 'Igniters failing', 'Temperature problems', 'Broken door seals', 'Self-cleaning cycle errors'],
    brands: ['Samsung', 'LG', 'Whirlpool', 'GE', 'Maytag', 'Kenmore', 'Frigidaire', 'Wolf', 'Bosch', 'Electrolux'],
    faqs: [
      { question: 'How much does oven repair cost?', answer: `The ${SERVICE_FEE} service fee covers the technician visit and diagnosis. Parts and labor are quoted before any work begins.` },
      { question: 'Do you repair all brands of ovens and stoves?', answer: 'Yes, we service all major brands including luxury models like Wolf.' },
      { question: 'Are your technicians qualified for gas stoves?', answer: 'Yes, all gas appliance work is performed by licensed technicians.' },
      { question: 'Can repairs be done the same day?', answer: 'Same-day repair is available in most cases. Book online or call to check availability.' }
    ]
  },
  dishwasher: {
    name: 'Dishwasher',
    seoTitle: 'Dishwasher Repair in Fort Lauderdale | $99 Service Fee',
    metaDescription: 'Dishwasher repair in South Florida with a $99 service fee. Book online with Speedy or call (954) 931-7997.',
    h1: 'Dishwasher Repair in Fort Lauderdale, FL',
    image: '/visuals/page-dishwasher.webp',
    imageAlt: 'Top Speed Appliance technician repairing a dishwasher pump',
    imageMode: 'poster',
    intro: 'Top Speed Appliance provides dishwasher repair in Fort Lauderdale and nearby areas. We fix drainage, leaks, cleaning performance, and control problems on all major dishwasher brands.',
    problems: ['Not draining', 'Leaking water', 'Dishes not getting clean', 'Won\'t start', 'Loud noises', 'Door latch issues', 'Error codes'],
    brands: ['Samsung', 'LG', 'Whirlpool', 'GE', 'Bosch', 'KitchenAid', 'Frigidaire', 'Maytag', 'Miele', 'Electrolux'],
    faqs: [
      { question: 'How much does dishwasher repair cost?', answer: `The ${SERVICE_FEE} service fee covers the technician visit and diagnosis. Parts and labor are quoted before any work begins.` },
      { question: 'Why is my dishwasher not draining?', answer: 'Clogged filters, drain hoses, or failed drain pumps are common causes. We inspect and repair them.' },
      { question: 'Do you repair built-in dishwashers?', answer: 'Yes, we service built-in and portable dishwashers from all major brands.' },
      { question: 'Do you offer a warranty?', answer: 'Yes, all repairs come with a 12-month warranty on parts and labor.' }
    ]
  },
  microwave: {
    name: 'Microwave',
    seoTitle: 'Microwave Repair in Fort Lauderdale | $99 Service Fee',
    metaDescription: 'Microwave repair in South Florida with a $99 service fee. Book online with Speedy or call (954) 931-7997.',
    h1: 'Microwave Repair in Fort Lauderdale, FL',
    image: '/images/service/microwave-service.webp',
    imageAlt: 'Built-in stainless steel Sharp microwave drawer in a white kitchen',
    intro: 'Top Speed Appliance provides microwave repair in Fort Lauderdale and nearby areas. We fix heating failures, control panel problems, turntable issues, and door faults on built-in and countertop models.',
    problems: ['Not heating', 'Turntable not turning', 'Control panel not responding', 'Door not closing properly', 'Sparking or arcing', 'Loud humming', 'Error codes'],
    brands: ['Samsung', 'LG', 'Whirlpool', 'GE', 'Panasonic', 'Sharp', 'Frigidaire', 'Kenmore', 'Bosch', 'KitchenAid'],
    faqs: [
      { question: 'How much does microwave repair cost?', answer: `The ${SERVICE_FEE} service fee covers the technician visit and diagnosis. Parts and labor are quoted before any work begins.` },
      { question: 'Is it worth repairing a microwave?', answer: 'Often yes. We diagnose the fault first so you can decide whether repair or replacement makes more sense.' },
      { question: 'Do you repair built-in microwaves?', answer: 'Yes, we service built-in, over-the-range, and countertop microwaves.' },
      { question: 'Can you come out the same day?', answer: 'Same-day service is available in most areas. Book online or call to check availability.' }
    ]
  },
  wineCooler: {
    name: 'Wine Cooler',
    seoTitle: 'Wine Cooler Repair in South Florida | Book Online',
    metaDescription: 'Wine cooler repair in South Florida for units that are not cooling, humming, or leaking. Book online with Speedy or call (954) 931-7997.',
    h1: 'Wine Cooler Repair in South Florida',
    image: '/images/service/wine-cooler-service.webp',
    imageAlt: 'Built-in stainless steel wine cooler with wood shelving and glass door',
    intro: 'Top Speed Appliance provides wine cooler repair across South Florida. We restore cooling and temperature control in built-in and freestanding wine coolers, fix fan and compressor faults, and repair door seal and thermostat problems.',
    problems: ['Wine cooler not cooling', 'Temperature fluctuating', 'Compressor running constantly', 'Fan not spinning', 'Door not sealing', 'Water leaking inside', 'Display or control panel errors'],
    brands: ['Sub-Zero', 'Wolf', 'Viking', 'Whirlpool', 'Frigidaire', 'GE', 'Haier', 'Danby', 'EdgeStar', 'NewAir'],
    faqs: [
      { question: 'Why is my wine cooler not cooling?', answer: 'Common causes include a failed fan, a faulty thermostat, or a compressor problem. We diagnose the fault before recommending repairs.' },
      { question: 'Can you repair built-in and freestanding wine coolers?', answer: 'Yes, we service both built-in and freestanding wine coolers from major brands.' },
      { question: 'Is it worth repairing a wine cooler?', answer: 'Often yes. We diagnose the fault first so you can decide whether repair or replacement makes more sense.' },
      { question: 'Can you come out the same day?', answer: 'Same-day service is available in most areas. Book online or call to check availability.' }
    ]
  },
  garbageDisposal: {
    name: 'Garbage Disposal',
    seoTitle: 'Garbage Disposal Repair in South Florida | Book Online',
    metaDescription: 'Garbage disposal repair in South Florida for jammed, leaking, and non-working units. Book online with Speedy or call (954) 931-7997.',
    h1: 'Garbage Disposal Repair in South Florida',
    image: '/images/service/garbage-disposal-service.webp',
    imageAlt: 'Garbage disposal repair under a kitchen sink',
    intro: 'Top Speed Appliance provides garbage disposal repair across South Florida. We clear jams, stop leaks, and replace failed motors and switches on most major brands, so your kitchen sink drains properly again.',
    problems: ['Disposal humming but not turning', 'Jammed or stuck blades', 'Leaking from the unit', 'Slow draining sink', 'Disposal not turning on', 'Foul odors', 'Constant tripping of the reset button'],
    brands: ['InSinkErator', 'Waste King', 'Moen', 'Kitchenaid', 'Frigidaire', 'GE', 'Whirlpool', 'Bosch', 'Badger', 'Emerson'],
    faqs: [
      { question: 'Why is my garbage disposal humming but not spinning?', answer: 'This is often a jam or a stuck flywheel. We clear the blockage and test the motor before recommending any parts.' },
      { question: 'Is it cheaper to repair or replace a garbage disposal?', answer: 'We diagnose the fault first so you can decide whether repair or replacement makes more sense.' },
      { question: 'Do you repair all garbage disposal brands?', answer: 'Yes, we service major brands including InSinkErator and Waste King.' },
      { question: 'Can you come out the same day?', answer: 'Same-day service is available in most areas. Book online or call to check availability.' }
    ]
  },
  commercial: {
    name: 'Commercial Appliance',
    seoTitle: 'Commercial Appliance Repair in South Florida | Book Online',
    metaDescription: 'Commercial appliance repair in South Florida for restaurants, hotels, and businesses. Book online with Speedy or call (954) 931-7997.',
    h1: 'Commercial Appliance Repair in South Florida',
    image: '/visuals/visual-commercial.jpg',
    imageAlt: 'Top Speed Appliance commercial appliance repair',
    imageMode: 'poster',
    intro: 'Top Speed Appliance provides commercial appliance repair for restaurants, hotels, apartment complexes, and offices across South Florida. We keep commercial kitchen and laundry equipment running with fast response and clear quotes.',
    problems: ['Commercial refrigerator not cooling', 'Walk-in cooler issues', 'Commercial oven not heating', 'Dishwasher not sanitizing', 'Ice machine not producing ice', 'Commercial washer or dryer breakdowns', 'Gas burner problems'],
    brands: ['Hobart', 'True', 'Traulsen', 'Beverage-Air', 'Viking', 'Blodgett', 'Frymaster', 'Manitowoc', 'Speed Queen', 'Electrolux'],
    ctaTitle: 'Ready to Book Commercial Service?',
    pricing: {
      label: 'Pricing',
      amount: 'Custom Quote',
      note: 'Commercial repairs are quoted after diagnosis, and you approve the quote before work begins. Book online or call to schedule a visit.'
    },
    benefits: COMMERCIAL_BENEFITS,
    relatedLinks: COMMERCIAL_RELATED_LINKS,
    faqs: [
      { question: 'Do you repair restaurant equipment?', answer: 'Yes, we service commercial kitchen equipment including refrigeration, cooking, and dishwashing appliances.' },
      { question: 'How are commercial repairs priced?', answer: 'Commercial repairs are quoted after diagnosis, and you approve the quote before any work begins.' },
      { question: 'Can you schedule visits around my business hours?', answer: 'Yes, call us to discuss a schedule that fits your business.' },
      { question: 'Can you respond to an urgent breakdown?', answer: 'Call (954) 931-7997 and we will check availability for urgent repairs.' }
    ]
  },
  home: {
    name: 'Home Appliance',
    seoTitle: 'Home Appliance Repair in South Florida | $99 Service Fee',
    metaDescription: 'Home appliance repair in South Florida with a $99 service fee. Book online with Speedy or call (954) 931-7997.',
    h1: 'Home Appliance Repair in South Florida',
    image: '/images/service/expert-team-banner.webp',
    imageAlt: 'Top Speed Appliance technicians at work',
    intro: 'Top Speed Appliance repairs the appliances in your home across South Florida, including washers, dryers, refrigerators, ovens, dishwashers, and microwaves. Book online or call to get your appliance working again.',
    problems: ['Appliance not turning on', 'Not heating or cooling', 'Leaks and drainage problems', 'Strange noises', 'Error codes', 'Control panel problems'],
    brands: ['Samsung', 'LG', 'Whirlpool', 'GE', 'Maytag', 'Kenmore', 'Frigidaire', 'Bosch', 'Electrolux', 'KitchenAid'],
    faqs: [
      { question: 'Which home appliances do you repair?', answer: 'We repair washers, dryers, refrigerators, ovens and stoves, dishwashers, and microwaves.' },
      { question: 'How much does a home appliance repair cost?', answer: `The ${SERVICE_FEE} service fee covers the technician visit and diagnosis. Parts and labor are quoted before any work begins.` },
      { question: 'Do you offer same-day service?', answer: 'Same-day service is available in most areas. Book online or call to check availability.' },
      { question: 'Do you offer a warranty?', answer: 'Yes, all repairs come with a 12-month warranty on parts and labor.' }
    ]
  },
  installation: {
    name: 'Appliance Installation',
    seoTitle: 'Appliance Installation in South Florida | Book Online',
    metaDescription: 'Professional appliance installation in South Florida. Book online with Speedy or call (954) 931-7997 for a quote.',
    h1: 'Appliance Installation in South Florida',
    image: '/images/service/appliance-installation-service.webp',
    imageAlt: 'Appliance installation by Top Speed Appliance',
    intro: 'Top Speed Appliance installs washers, dryers, refrigerators, ranges, dishwashers, and microwaves in South Florida homes and businesses. We connect each appliance to its water, gas, or electrical lines and confirm it runs correctly before we leave.',
    listTitle: 'Installation Services We Provide',
    problems: ['Washer and dryer hookup', 'Refrigerator and ice maker water line', 'Range and oven connection', 'Dishwasher installation', 'Built-in microwave installation'],
    brands: ['Samsung', 'LG', 'Whirlpool', 'GE', 'Maytag', 'Kenmore', 'Frigidaire', 'Bosch', 'Electrolux', 'KitchenAid'],
    ctaTitle: 'Ready to Schedule Your Installation?',
    pricing: {
      label: 'Pricing',
      amount: 'Custom Quote',
      note: 'Installation is quoted based on your appliance and the hookups it needs. Book online or call for an exact price.'
    },
    benefits: INSTALLATION_BENEFITS,
    relatedLinks: INSTALLATION_RELATED_LINKS,
    faqs: [
      { question: 'How much does appliance installation cost?', answer: 'Installation is quoted based on the appliance and the hookups it requires. Book online or call for an exact price.' },
      { question: 'What is included in an installation?', answer: 'Installation connects the appliance to its water, gas, or electrical lines and confirms it runs correctly.' },
      { question: 'Can you install an appliance I bought elsewhere?', answer: 'Call us with the appliance model and we will confirm whether we can install it.' },
      { question: 'Can you schedule installation the same day?', answer: 'Same-day installation is available in most areas. Book online or call to check availability.' }
    ]
  },
  commercialRefrigeration: {
    name: 'Commercial Refrigeration',
    seoTitle: 'Commercial Refrigeration Repair in South Florida | Book Online',
    metaDescription: 'Commercial refrigeration repair in South Florida for walk-in coolers, reach-ins, freezers, and ice machines. Book online or call (954) 931-7997.',
    h1: 'Commercial Refrigeration Repair in South Florida',
    image: '/images/service/commercial-refrigeration-service.webp',
    imageAlt: 'Commercial refrigeration repair',
    intro: 'Top Speed Appliance repairs commercial refrigeration for restaurants, grocers, and food service businesses across South Florida. We restore cooling in walk-in coolers, reach-in units, freezers, and ice machines with fast response.',
    listTitle: 'Commercial Refrigeration Problems We Fix',
    problems: ['Walk-in cooler not holding temperature', 'Reach-in unit not cooling', 'Commercial freezer frosting over', 'Ice machine not producing ice', 'Condenser and fan failures', 'Door gasket leaks', 'Refrigerant leaks'],
    brands: ['True', 'Traulsen', 'Beverage-Air', 'Hoshizaki', 'Manitowoc', 'Hobart', 'Turbo Air', 'Kolpak', 'Continental', 'Migali'],
    ctaTitle: 'Ready to Book Commercial Refrigeration Service?',
    pricing: COMMERCIAL_PRICING,
    benefits: COMMERCIAL_BENEFITS,
    faqs: [
      { question: 'Do you repair walk-in coolers and freezers?', answer: 'Yes, we service walk-in coolers, walk-in freezers, reach-in units, and prep tables.' },
      { question: 'Can you repair an ice machine during service hours?', answer: 'Yes, we schedule ice machine repairs around your business hours. Call to confirm availability.' },
      { question: 'How are commercial refrigeration repairs priced?', answer: 'Repairs are quoted after diagnosis, and you approve the quote before any work begins.' },
      { question: 'What should I do while I wait for a technician?', answer: 'Keep doors closed, move perishable food to working units if possible, and call us for urgent help.' }
    ]
  },
  commercialCooking: {
    name: 'Commercial Cooking Equipment',
    seoTitle: 'Commercial Cooking Equipment Repair in South Florida | Book Online',
    metaDescription: 'Commercial cooking equipment repair in South Florida for ovens, ranges, fryers, and griddles. Book online or call (954) 931-7997.',
    h1: 'Commercial Cooking Equipment Repair in South Florida',
    image: '/images/service/commercial-cooking-service.webp',
    imageAlt: 'Commercial cooking equipment repair',
    intro: 'Top Speed Appliance repairs commercial cooking equipment for restaurants, hotels, and catering kitchens across South Florida. We service ovens, ranges, fryers, and griddles with clear quotes and minimal downtime.',
    listTitle: 'Commercial Cooking Problems We Fix',
    problems: ['Commercial oven not heating', 'Range burners not lighting', 'Fryer not heating or recovering', 'Griddle temperature problems', 'Faulty ignition or thermostats', 'Gas line and burner issues', 'Control board errors'],
    brands: ['Vulcan', 'Blodgett', 'Frymaster', 'Garland', 'Southbend', 'Hobart', 'Montague', 'Star', 'Imperial', 'Wolf'],
    ctaTitle: 'Ready to Book Commercial Cooking Service?',
    pricing: COMMERCIAL_PRICING,
    benefits: COMMERCIAL_BENEFITS,
    faqs: [
      { question: 'Do you repair gas and electric commercial cooking equipment?', answer: 'Yes, we service both gas and electric commercial ovens, ranges, fryers, and griddles.' },
      { question: 'Can you repair a fryer that is not heating?', answer: 'Yes, we diagnose heating elements, thermostats, and controls on commercial fryers.' },
      { question: 'How are commercial cooking repairs priced?', answer: 'Repairs are quoted after diagnosis, and you approve the quote before any work begins.' },
      { question: 'Do you offer same-day service for restaurants?', answer: 'Same-day service is available in many areas. Call us to check availability for urgent breakdowns.' }
    ]
  },
  commercialDishwasher: {
    name: 'Commercial Dishwasher',
    seoTitle: 'Commercial Dishwasher Repair in South Florida | Book Online',
    metaDescription: 'Commercial dishwasher repair in South Florida, including sanitizing and booster problems. Book online or call (954) 931-7997.',
    h1: 'Commercial Dishwasher Repair in South Florida',
    image: '/images/service/commercial-dishwasher-service.webp',
    imageAlt: 'Commercial dishwasher repair',
    intro: 'Top Speed Appliance repairs commercial dishwashers for restaurants, schools, and food service operations across South Florida. We restore wash, rinse, and sanitizing performance so your kitchen stays compliant and running.',
    listTitle: 'Commercial Dishwasher Problems We Fix',
    problems: ['Dishes not sanitizing', 'Booster heater not heating', 'Low or no rinse pressure', 'Machine not filling', 'Leaking water', 'Door or limit switch faults', 'Chemical dispenser problems'],
    brands: ['Hobart', 'Jackson', 'Champion', 'Moyer Diebel', 'Insinger', 'Meiko', 'Halo', 'Vulcan', 'Electrolux', 'True'],
    ctaTitle: 'Ready to Book Commercial Dishwasher Service?',
    pricing: COMMERCIAL_PRICING,
    benefits: COMMERCIAL_BENEFITS,
    faqs: [
      { question: 'Why is my commercial dishwasher not sanitizing?', answer: 'Common causes include a failed booster heater, low rinse temperature, or a clogged spray arm. We test and repair each one.' },
      { question: 'Do you repair Hobart and Jackson dishwashers?', answer: 'Yes, we service major commercial dishwasher brands including Hobart and Jackson.' },
      { question: 'How are commercial dishwasher repairs priced?', answer: 'Repairs are quoted after diagnosis, and you approve the quote before any work begins.' },
      { question: 'Can you schedule repairs outside busy hours?', answer: 'Yes, we schedule visits around your business hours. Call to confirm a time.' }
    ]
  },
  commercialLaundry: {
    name: 'Commercial Laundry',
    seoTitle: 'Commercial Laundry Equipment Repair in South Florida | Book Online',
    metaDescription: 'Commercial laundry equipment repair in South Florida for hotels, apartments, and laundromats. Book online or call (954) 931-7997.',
    h1: 'Commercial Laundry Equipment Repair in South Florida',
    image: '/images/service/commercial-laundry-service.webp',
    imageAlt: 'Commercial laundry equipment repair',
    intro: 'Top Speed Appliance repairs commercial washers and dryers for apartment complexes, hotels, and laundromats across South Florida. We keep high-volume laundry equipment running with fast response and clear quotes.',
    listTitle: 'Commercial Laundry Problems We Fix',
    problems: ['Commercial washer not spinning', 'Commercial dryer not heating', 'Coin or card reader faults', 'Water leaks and drain problems', 'Door lock failures', 'Error codes', 'Belt and drum noises'],
    brands: ['Speed Queen', 'Alliance', 'Continental', 'Dexter', 'Wascomat', 'Electrolux', 'Huebsch', 'Unimac', 'Girbau', 'Maytag'],
    ctaTitle: 'Ready to Book Commercial Laundry Service?',
    pricing: COMMERCIAL_PRICING,
    benefits: COMMERCIAL_BENEFITS,
    faqs: [
      { question: 'Do you repair commercial washers for apartment complexes?', answer: 'Yes, we service commercial washers and dryers for apartment complexes, hotels, and laundromats.' },
      { question: 'Can you repair coin and card-operated machines?', answer: 'Yes, we troubleshoot coin and card readers along with the mechanical and electrical parts.' },
      { question: 'How are commercial laundry repairs priced?', answer: 'Repairs are quoted after diagnosis, and you approve the quote before any work begins.' },
      { question: 'Do you offer a warranty on commercial repairs?', answer: 'Yes, all repairs come with a 12-month warranty on parts and labor.' }
    ]
  },
  washerDryerInstallation: {
    name: 'Washer & Dryer Installation',
    seoTitle: 'Washer and Dryer Installation in South Florida | Book Online',
    metaDescription: 'Washer and dryer installation in South Florida, including hookups and stacking kits. Book online or call (954) 931-7997 for a quote.',
    h1: 'Washer and Dryer Installation in South Florida',
    image: '/images/service/washer-dryer-service.webp',
    imageAlt: 'Washer and dryer installation',
    intro: 'Top Speed Appliance installs washers and dryers in South Florida homes and apartments. We connect water supply, drain, power, and gas or venting, then test the cycles before we leave.',
    listTitle: 'Washer and Dryer Installation Services',
    problems: ['Washer water supply and drain hookup', 'Electric dryer connection', 'Gas dryer connection and leak test', 'Stacking kit installation', 'Dryer vent hookup', 'Leveling and vibration setup'],
    brands: ['Samsung', 'LG', 'Whirlpool', 'GE', 'Maytag', 'Kenmore', 'Frigidaire', 'Speed Queen', 'Bosch', 'Electrolux'],
    ctaTitle: 'Ready to Schedule Washer and Dryer Installation?',
    pricing: INSTALLATION_PRICING,
    benefits: INSTALLATION_BENEFITS,
    faqs: [
      { question: 'Do you install stacked washers and dryers?', answer: 'Yes, we install stacking kits and connect both units to water, drain, power, and venting.' },
      { question: 'Can you connect a gas dryer?', answer: 'Yes, we connect gas dryers and check every connection for leaks before we leave.' },
      { question: 'How much does washer and dryer installation cost?', answer: 'Installation is quoted based on the hookups your home needs. Book online or call for an exact price.' },
      { question: 'Can you install a washer and dryer I bought elsewhere?', answer: 'Yes, call us with the model numbers and we will confirm the installation.' }
    ]
  },
  refrigeratorInstallation: {
    name: 'Refrigerator Installation',
    seoTitle: 'Refrigerator Installation in South Florida | Book Online',
    metaDescription: 'Refrigerator installation in South Florida, including ice maker water lines and built-in units. Book online or call (954) 931-7997.',
    h1: 'Refrigerator Installation in South Florida',
    image: '/images/service/refrigerator-service.webp',
    imageAlt: 'Refrigerator installation',
    intro: 'Top Speed Appliance installs refrigerators in South Florida homes, including French door, side-by-side, and built-in models. We run ice maker and water dispenser lines and level the unit so it cools correctly from day one.',
    listTitle: 'Refrigerator Installation Services',
    problems: ['Ice maker water line hookup', 'Water dispenser connection', 'Built-in refrigerator install', 'Leveling and clearance check', 'Door alignment and seal setup', 'Temperature test before handoff'],
    brands: ['Samsung', 'LG', 'Whirlpool', 'GE', 'Maytag', 'Frigidaire', 'KitchenAid', 'Sub-Zero', 'Bosch', 'Electrolux'],
    ctaTitle: 'Ready to Schedule Refrigerator Installation?',
    pricing: INSTALLATION_PRICING,
    benefits: INSTALLATION_BENEFITS,
    faqs: [
      { question: 'Do you connect the ice maker and water dispenser?', answer: 'Yes, we connect the water line and confirm the ice maker and dispenser work before we leave.' },
      { question: 'Do you install built-in refrigerators?', answer: 'Yes, we install built-in and counter-depth refrigerators and check the clearances.' },
      { question: 'How much does refrigerator installation cost?', answer: 'Installation is quoted based on the model and the hookups it needs. Book online or call for an exact price.' },
      { question: 'Can you remove my old refrigerator?', answer: 'Call us when you book and we will confirm whether old unit removal is included.' }
    ]
  },
  rangeOvenInstallation: {
    name: 'Range & Oven Installation',
    seoTitle: 'Range and Oven Installation in South Florida | Book Online',
    metaDescription: 'Range and oven installation in South Florida for electric, gas, and induction models. Book online or call (954) 931-7997 for a quote.',
    h1: 'Range and Oven Installation in South Florida',
    image: '/images/service/oven-stove-service.webp',
    imageAlt: 'Range and oven installation',
    intro: 'Top Speed Appliance installs electric, gas, and induction ranges and wall ovens in South Florida homes. We connect power or gas, anchor the unit safely, and test every burner and oven function before we leave.',
    listTitle: 'Range and Oven Installation Services',
    problems: ['Electric range connection', 'Gas range and gas line hookup', 'Induction range installation', 'Built-in wall oven installation', 'Anti-tip bracket installation', 'Burner and oven function test'],
    brands: ['Samsung', 'LG', 'Whirlpool', 'GE', 'Maytag', 'Frigidaire', 'KitchenAid', 'Bosch', 'Electrolux', 'Wolf'],
    ctaTitle: 'Ready to Schedule Range or Oven Installation?',
    pricing: INSTALLATION_PRICING,
    benefits: INSTALLATION_BENEFITS,
    faqs: [
      { question: 'Do you install gas ranges?', answer: 'Yes, we connect gas ranges and test every connection for leaks before we leave.' },
      { question: 'Do you install induction ranges?', answer: 'Yes, we install induction ranges and confirm the electrical requirements first.' },
      { question: 'How much does range installation cost?', answer: 'Installation is quoted based on the range type and the connections it needs. Book online or call for an exact price.' },
      { question: 'Do you install built-in wall ovens?', answer: 'Yes, we install built-in wall ovens and check the cabinet clearances.' }
    ]
  },
  dishwasherInstallation: {
    name: 'Dishwasher Installation',
    seoTitle: 'Dishwasher Installation in South Florida | Book Online',
    metaDescription: 'Dishwasher installation in South Florida with water, drain, and power hookups. Book online or call (954) 931-7997 for a quote.',
    h1: 'Dishwasher Installation in South Florida',
    image: '/images/service/dishwasher-service.webp',
    imageAlt: 'Dishwasher installation',
    intro: 'Top Speed Appliance installs built-in and portable dishwashers in South Florida homes. We connect the water supply, drain, and power, then run a test cycle to confirm drainage and sealing.',
    listTitle: 'Dishwasher Installation Services',
    problems: ['Water supply hookup', 'Drain line connection', 'Electrical connection', 'Built-in dishwasher install', 'Portable dishwasher setup', 'Test cycle and leak check'],
    brands: ['Samsung', 'LG', 'Whirlpool', 'GE', 'Bosch', 'KitchenAid', 'Frigidaire', 'Maytag', 'Miele', 'Electrolux'],
    ctaTitle: 'Ready to Schedule Dishwasher Installation?',
    pricing: INSTALLATION_PRICING,
    benefits: INSTALLATION_BENEFITS,
    faqs: [
      { question: 'Do you install built-in dishwashers?', answer: 'Yes, we install built-in dishwashers and connect water, drain, and power.' },
      { question: 'Do you connect the drain to a garbage disposal?', answer: 'Yes, we connect the drain hose to the disposal or drain line and test for leaks.' },
      { question: 'How much does dishwasher installation cost?', answer: 'Installation is quoted based on the connections your kitchen needs. Book online or call for an exact price.' },
      { question: 'Can you install a dishwasher I bought elsewhere?', answer: 'Call us with the model and we will confirm whether we can install it.' }
    ]
  },
  microwaveInstallation: {
    name: 'Microwave Installation',
    seoTitle: 'Microwave Installation in South Florida | Book Online',
    metaDescription: 'Microwave installation in South Florida for built-in, over-the-range, and countertop models. Book online or call (954) 931-7997.',
    h1: 'Microwave Installation in South Florida',
    image: '/images/service/microwave-service.webp',
    imageAlt: 'Microwave installation',
    intro: 'Top Speed Appliance installs built-in, over-the-range, and countertop microwaves in South Florida homes. We check the electrical outlet, mount the unit securely, and confirm the venting and controls work.',
    listTitle: 'Microwave Installation Services',
    problems: ['Over-the-range microwave mounting', 'Built-in microwave installation', 'Countertop microwave setup', 'Dedicated outlet check', 'Venting connection', 'Function test before handoff'],
    brands: ['Samsung', 'LG', 'Whirlpool', 'GE', 'Panasonic', 'Sharp', 'Frigidaire', 'KitchenAid', 'Bosch', 'Electrolux'],
    ctaTitle: 'Ready to Schedule Microwave Installation?',
    pricing: INSTALLATION_PRICING,
    benefits: INSTALLATION_BENEFITS,
    faqs: [
      { question: 'Do you install over-the-range microwaves?', answer: 'Yes, we mount over-the-range microwaves and connect the venting.' },
      { question: 'Do you install built-in microwaves?', answer: 'Yes, we install built-in microwaves and check the cabinet opening and clearances.' },
      { question: 'How much does microwave installation cost?', answer: 'Installation is quoted based on the model and mounting needs. Book online or call for an exact price.' },
      { question: 'Do I need a special outlet?', answer: 'Some built-in models need a dedicated outlet. We check your outlet and tell you before installation.' }
    ]
  }
}

/**
 * Scenario library content bands (rounds one and two) — flat illustrations that sit
 * in the content sections of a service page, below the poster hero.
 * The dryer band is vent information only: no vent price, and vent cleaning
 * is never offered as a bookable appliance service — Cleanout Vents is the
 * registered vent partner in the Top Speed network and takes those calls.
 */
const SCENARIO_BANDS = {
  refrigerator: [
    {
      src: '/visuals/scenario/repair-fridge-fan.webp',
      alt: 'Technician replacing a refrigerator evaporator fan during a repair',
      heading: 'The Fan Behind the Cold Air',
      text: 'A fridge that runs warm on top and freezes below often points at the evaporator fan — the part that moves cold air from the freezer into the fresh-food side. We test the fan and its motor before quoting the part, so the fix matches the failure.'
    },
    {
      src: '/visuals/scenario/repair-ice-maker-swap.webp',
      alt: 'Technician swapping a refrigerator ice maker unit',
      heading: 'Ice Maker Swaps, Done Clean',
      text: 'When an ice maker stops cycling or its motor burns out, a unit swap is usually faster and more reliable than chasing individual parts. We match the replacement to your model, swap it in, and confirm a full ice cycle before we leave.'
    },
    {
      src: '/visuals/scenario/repair-freezer-thaw.webp',
      alt: 'Technician thawing a frozen-up freezer evaporator during a repair',
      heading: 'Freezer Frosted Over? We Find Why',
      text: 'A freezer packed with frost is not just an eyesore — it chokes airflow and makes the compressor run nonstop. We thaw the coil safely, then find what caused the freeze-up — a defrost heater, a timer, or a door seal — so it does not come back in a month.'
    }
  ],
  washer: [
    {
      src: '/visuals/scenario/repair-washer-belt.webp',
      alt: 'Technician fitting a new drive belt on a washing machine',
      heading: 'When the Drum Will Not Turn',
      text: 'A washer that hums but will not spin or agitate often has a worn or snapped drive belt. It is one of the quickest repairs we do — the belt matched to your model, the tension checked, and a full spin cycle run before the job is closed.'
    }
  ],
  dryer: [
    {
      src: '/visuals/scenario/repair-dryer-heating.webp',
      alt: 'Technician testing a dryer heating element during a repair',
      heading: 'No Heat? We Test the Element First',
      text: 'A dryer that tumbles but never warms up usually comes down to the heating element, a thermal fuse, or the thermostat. We test each one with a meter before quoting parts — you approve the actual failure, not a guess.'
    },
    {
      src: '/visuals/scenario/vent-lint-handful.webp',
      alt: 'A handful of lint cleared from a dryer vent — the build-up that makes dryers run long',
      heading: 'Dryer Vents: The Lint You Never See',
      text: 'When a dryer runs and runs but clothes stay damp, the vent is often the real problem — lint builds up inside the duct, choking airflow and making the dryer work twice as hard. Dryer vent cleaning is handled by Cleanout Vents, our registered vent partner in the Top Speed Appliance Service Network: call 954-931-7997 and ask for Cleanout Vents.',
      moreImages: [
        { src: '/visuals/scenario/vent-before-after-duct.webp', alt: 'A dryer vent duct before and after a professional cleaning, with the lint build-up cleared' },
        { src: '/visuals/scenario/vent-airflow-test.webp', alt: 'Technician testing dryer vent airflow after a cleaning' }
      ]
    }
  ],
  oven: [
    {
      src: '/visuals/scenario/repair-oven-igniter.webp',
      alt: 'Technician replacing a gas oven igniter during a repair',
      heading: 'The Click With No Flame',
      text: 'A gas oven that clicks but never lights almost always needs an igniter — it weakens over time until it can no longer open the gas valve safely. We test the igniter draw, swap in the matched part, and confirm a full bake cycle before we go.'
    }
  ],
  dishwasher: [
    {
      src: '/visuals/scenario/repair-dishwasher-motor.webp',
      alt: 'Technician testing a dishwasher circulation motor during a repair',
      heading: 'Inside a Dishwasher Repair',
      text: 'When dishes come out gritty or the machine hums and will not spray, the circulation motor and pump are where we look first. We test the motor before quoting any part, so you approve the real fix — not a guess.'
    },
    {
      src: '/visuals/scenario/repair-dishwasher-seal.webp',
      alt: 'Technician fitting a new door seal on a dishwasher',
      heading: 'Leaks Start at the Seal',
      text: 'Puddles in front of the dishwasher usually trace back to a door seal that has gone flat or split. We check the seal, the door latch alignment, and the spray arms together — and only replace what is actually letting the water out.'
    }
  ],
  microwave: [
    {
      src: '/visuals/scenario/repair-microwave-door.webp',
      alt: 'Technician repairing a microwave door latch and switches',
      heading: 'Door Switches: Small Parts, Dead Microwave',
      text: 'A microwave that will not start with the door shut usually has a failed door switch — a safety part we test and replace with the matched component, then verify the unit heats and the interlocks work as designed.'
    }
  ],
  garbageDisposal: [
    {
      src: '/visuals/scenario/repair-disposal-jam.webp',
      alt: 'Technician clearing a jammed garbage disposal under a kitchen sink',
      heading: 'Jammed Disposal? Reset Is Not Always the Fix',
      text: 'A humming disposal that will not grind is usually jammed at the flywheel. We free it safely, check the splash guard and mounts, and test for leaks — and if the motor itself has failed, we quote the replacement before any work starts.'
    }
  ],
  installation: [
    {
      src: '/visuals/scenario/install-first-run-washer.webp',
      alt: 'First test run of a newly installed washer, checked level with hoses connected',
      heading: 'Installed, Then Proven on the First Run',
      text: 'Every washer installation ends the same way: connections checked, the unit leveled, and a full first cycle run while we are still there — so the first load you wash is not the test.'
    }
  ],
  washerDryerInstallation: [
    {
      src: '/visuals/scenario/install-first-run-washer.webp',
      alt: 'First test run of a newly installed washer, checked level with hoses connected',
      heading: 'Installed, Then Proven on the First Run',
      text: 'Every washer installation ends the same way: connections checked, the unit leveled, and a full first cycle run while we are still there — so the first load you wash is not the test.'
    }
  ]
}

/**
 * Installation flow strip (round two) — the three beats of an installation,
 * in order: measure, hookup, walkthrough. The first-run band in
 * SCENARIO_BANDS completes the flow and renders right after the strip.
 */
const INSTALL_FLOW = [
  { src: '/visuals/scenario/install-door-measure.webp', alt: 'Technician measuring a doorway and the installation space before delivery', label: '1 · Measure' },
  { src: '/visuals/scenario/install-washer-hookup.webp', alt: 'Technician connecting water hoses and power during a washer hookup', label: '2 · Hookup' },
  { src: '/visuals/scenario/install-walkthrough.webp', alt: 'Technician walking the customer through their newly installed appliance', label: '3 · Walkthrough' }
]
const INSTALL_FLOW_SERVICES = ['installation', 'washerDryerInstallation']

const ServicePageComponent = ({ service }) => {
  const attrQs = useAttributionSearch()
  const config = SERVICE_CONFIG[service] || SERVICE_CONFIG.washer
  const pricing = config.pricing || {
    label: 'Service Fee',
    amount: SERVICE_FEE,
    note: `Covers the technician visit and diagnosis for your ${config.name.toLowerCase()}. Parts and labor are quoted before any work begins.`
  }
  const benefits = config.benefits || DEFAULT_BENEFITS

  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: config.seoTitle,
        page_path: window.location.pathname,
        service_type: service
      })
    }
  }, [service, config])

  const trackEvent = (eventName) => {
    if (window.gtag) {
      window.gtag('event', eventName, {
        event_category: 'Booking',
        event_label: `${service}_repair`
      })
    }
  }

  const bookingButtons = (className) => (
    <div className="service-ctas">
      <button
        type="button"
        className={`cta-button cta-primary ${className}`}
        onClick={() => { trackEvent('schedule_service'); openSpeedy() }}
      >
        Book Online with Speedy
      </button>
      <ServiceBookButton source="service-page" className={`cta-button cta-primary ${className}`} />
      <a href={PHONE_HREF} className="cta-button cta-secondary" onClick={() => trackEvent('click_call')}>
        Call to Book: {PHONE_DISPLAY}
      </a>
    </div>
  )

  return (
    <div className="service-page">
      {config.image && (
        <figure className={`ts-poster ${config.imageMode === 'poster' ? 'ts-poster-graphic' : 'ts-poster-photo'}`}>
          <img src={config.image} alt={config.imageAlt} />
        </figure>
      )}
      <section className="service-hero">
        <div className="service-hero-content">
          <h1>{config.h1}</h1>
          <p className="service-intro">{config.intro}</p>
          {bookingButtons('service-hero-cta')}
        </div>
      </section>

      <section className="service-section service-pricing">
        <div className="service-price-card">
          <p className="service-price-label">{pricing.label}</p>
          <p className="service-price-amount">{pricing.amount}</p>
          <p className="service-price-note">{pricing.note}</p>
          {bookingButtons('service-price-cta')}
        </div>
      </section>

      <section className="service-section">
        <h2>{config.listTitle || `Common ${config.name} Problems We Fix`}</h2>
        <ul className="problems-list">
          {config.problems.map((problem) => (
            <li key={problem}>{problem}</li>
          ))}
        </ul>
      </section>

      {INSTALL_FLOW_SERVICES.includes(service) && (
        <section className="service-section">
          <h2>How an Installation Flows</h2>
          <p>Every installation follows the same three beats — measured first, hooked up and tested, then walked through with you — and finishes with the first full run, shown below.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginTop: 18, maxWidth: 980 }}>
            {INSTALL_FLOW.map((step) => (
              <figure key={step.src} style={{ margin: 0 }}>
                <img
                  src={step.src}
                  alt={step.alt}
                  loading="lazy"
                  style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 14, border: '1.5px solid #D8E2F2' }}
                />
                <figcaption style={{ marginTop: 8, fontWeight: 600 }}>{step.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {(SCENARIO_BANDS[service] || []).map((band) => (
        <section className="service-section" key={band.src}>
          <h2>{band.heading}</h2>
          <p>{band.text}</p>
          <figure style={{ margin: '18px 0 0', maxWidth: 760 }}>
            <img
              src={band.src}
              alt={band.alt}
              loading="lazy"
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 14, border: '1.5px solid #D8E2F2' }}
            />
          </figure>
          {band.moreImages && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 16, maxWidth: 760 }}>
              {band.moreImages.map((extra) => (
                <figure key={extra.src} style={{ margin: 0 }}>
                  <img
                    src={extra.src}
                    alt={extra.alt}
                    loading="lazy"
                    style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 14, border: '1.5px solid #D8E2F2' }}
                  />
                </figure>
              ))}
            </div>
          )}
        </section>
      ))}

      {config.relatedLinks && (
        <section className="service-section">
          <h2>Explore Our {config.name} Services</h2>
          <ul className="cities-list">
            {config.relatedLinks.map((link) => (
              <li key={link.href}><a href={withAttribution(link.href, attrQs)}>{link.label}</a></li>
            ))}
          </ul>
        </section>
      )}

      <section className="service-section">
        <h2>Brands We Service</h2>
        <p className="brands-text">{config.brands.join(', ')}</p>
      </section>

      <section className="service-section">
        <h2>Why Choose Top Speed Appliance</h2>
        <ul className="benefits-list">
          {benefits.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>
      </section>

      <section className="service-section">
        <h2>Service Areas</h2>
        <p>We service appliance repair in:</p>
        <ul className="cities-list">
          <li><a href={withAttribution('/appliance-repair-fort-lauderdale', attrQs)}>Appliance Repair in Fort Lauderdale</a></li>
          <li><a href={withAttribution('/appliance-repair-hollywood-fl', attrQs)}>Appliance Repair in Hollywood</a></li>
          <li><a href={withAttribution('/appliance-repair-plantation-fl', attrQs)}>Appliance Repair in Plantation</a></li>
          <li><a href={withAttribution('/appliance-repair-pembroke-pines-fl', attrQs)}>Appliance Repair in Pembroke Pines</a></li>
          <li><a href={withAttribution('/appliance-repair-delray-beach-fl', attrQs)}>Appliance Repair in Delray Beach</a></li>
          <li><a href={withAttribution('/appliance-repair-boynton-beach-fl', attrQs)}>Appliance Repair in Boynton Beach</a></li>
          <li><a href={withAttribution('/appliance-repair-jupiter-fl', attrQs)}>Appliance Repair in Jupiter</a></li>
          <li><a href={withAttribution('/appliance-repair-palm-beach-gardens-fl', attrQs)}>Appliance Repair in Palm Beach Gardens</a></li>
        </ul>
      </section>

      <section className="service-cta-middle">
        <h2>{config.ctaTitle || `Ready to Book Your ${config.name} Repair?`}</h2>
        {bookingButtons('service-middle-cta')}
      </section>

      <section className="service-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {config.faqs.map((faq) => (
            <div key={faq.question} className="faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="service-final-cta">
        <h2>Contact Top Speed Appliance Today</h2>
        <p>Book online or call {PHONE_DISPLAY}.</p>
        {bookingButtons('service-final-book')}
      </section>
    </div>
  )
}

export default ServicePageComponent
