import React from 'react'
import { BOOKING_CONFIG } from '../config/bookingConfig'

/**
 * Organization / LocalBusiness structured data.
 *
 * Rendered as real <script type="application/ld+json"> elements so the
 * schemas are present in the server-prerendered HTML (crawlers and AI
 * answer engines that do not execute JavaScript still see them).
 * Previously these were injected from useEffect, which left the served
 * HTML with no structured data at all. Content is unchanged.
 */
const mainSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://topspeedappliance.net',
      name: BOOKING_CONFIG.BUSINESS_NAME,
      image: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2F55f8330765584b548ff08a3d1f6b6116?format=webp&width=800',
      description: 'Top Speed Appliance provides professional appliance repair services in South Florida. Expert technicians, fast service, affordable prices.',
      url: 'https://topspeedappliance.net',
      telephone: BOOKING_CONFIG.PHONE_NUMBER,
      email: 'service@topspeedappliance.net',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '6810 N State Rd 7, Suite 341',
        addressCountry: 'US',
        addressRegion: 'FL',
        addressLocality: 'Coconut Creek',
        postalCode: '33073'
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '19:00'
      },
      makesOffer: [
        'Refrigerator Repair',
        'Washer Repair',
        'Dryer Repair',
        'Oven and Range Repair',
        'Dishwasher Repair',
        'Freezer and Ice Maker Repair',
        'Microwave Repair',
        'Garbage Disposal Repair',
        'Appliance Installation'
      ].map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name }
      })),
      areaServed: {
        '@type': 'City',
        name: [
          'Miami',
          'Fort Lauderdale',
          'West Palm Beach',
          'Deerfield Beach',
          'Boca Raton',
          'Pompano Beach',
          'Coral Springs',
          'Sunrise'
        ]
      },
      priceRange: '$',
      sameAs: [
        'https://www.facebook.com/profile.php?id=61596590488055',
        'https://www.instagram.com/rome64220/',
        'https://www.instagram.com/topspeedappliance/',
        'https://www.instagram.com/rom64220/',
        'https://topspeedserviceos.com/',
        'https://www.topspeedappliance.net/',
        'https://www.appliancepro.net/',
        'https://pepperlists.com/',
        'https://appliancereferral.com/'
      ],
      parentOrganization: {
        '@type': 'Organization',
        '@id': 'https://topspeedserviceos.com/#organization',
        name: 'Top Speed Appliance',
        url: 'https://topspeedserviceos.com/'
      },
      potentialAction: {
        '@type': 'ReserveAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://www.topspeedappliance.net/service-request',
          actionPlatform: [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform'
          ]
        },
        result: {
          '@type': 'Reservation',
          name: 'Book Appliance Repair Service'
        }
      },
      hasMap: 'https://www.google.com/maps/place/Top+Speed+Appliance',
      isPartOf: {
        '@type': 'Organization',
        '@id': 'https://topspeedserviceos.com/#organization',
        name: 'Top Speed Appliance',
        url: 'https://topspeedserviceos.com/'
      }
    }

const networkSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://topspeedserviceos.com/#organization',
      name: 'Top Speed Appliance',
      url: 'https://topspeedserviceos.com/',
      logo: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2F55f8330765584b548ff08a3d1f6b6116?format=webp&width=800',
      description: 'A comprehensive appliance service network including service dispatch, mobile booking app, referral program, home service platform, and lead generation.',
      sameAs: [
        'https://www.facebook.com/profile.php?id=61596590488055',
        'https://www.instagram.com/rome64220/',
        'https://www.instagram.com/topspeedappliance/',
        'https://www.instagram.com/rom64220/',
        'https://topspeedserviceos.com/',
        'https://www.topspeedappliance.net/',
        'https://www.appliancepro.net/',
        'https://pepperlists.com/',
        'https://appliancereferral.com/'
      ]
    }

export default function SEOSchema() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(mainSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(networkSchema) }} />
    </>
  )
}
