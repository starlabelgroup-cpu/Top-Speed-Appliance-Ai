import React, { useEffect } from 'react'
import { BOOKING_CONFIG } from '../config/bookingConfig'

export default function SEOSchema() {
  useEffect(() => {
    const mainSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://topspeedappliance.com',
      name: BOOKING_CONFIG.BUSINESS_NAME,
      image: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2F55f8330765584b548ff08a3d1f6b6116?format=webp&width=800',
      description: 'Top Speed Appliance provides professional appliance repair services in South Florida. Expert technicians, fast service, affordable prices.',
      url: 'https://topspeedappliance.com',
      telephone: BOOKING_CONFIG.PHONE_NUMBER,
      email: 'service@topspeedappliance.net',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'US',
        addressRegion: 'FL',
        addressLocality: 'Miami',
        postalCode: '33101'
      },
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
        'https://www.facebook.com/topspeedappliance',
        'https://www.instagram.com/topspeedappliance',
        'https://appliancepro.net',
        'https://appliancereferral.com',
        'https://primehomeconnect.com',
        'https://applianceconnect.com'
      ],
      potentialAction: {
        '@type': 'ReserveAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: BOOKING_CONFIG.BOOKING_URL,
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
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: '99',
        highPrice: '500'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '2500'
      },
      hasMap: 'https://www.google.com/maps/place/Top+Speed+Appliance',
      isPartOf: {
        '@type': 'Organization',
        name: 'TopSpeed Appliance Network',
        url: 'https://topspeedappliance.com',
        description: 'Interconnected appliance service ecosystem featuring service dispatch, mobile apps, referral programs, and lead generation.',
        sameAs: [
          'https://appliancepro.net',
          'https://appliancereferral.com',
          'https://primehomeconnect.com',
          'https://applianceconnect.com'
        ]
      }
    }

    const networkSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'TopSpeed Appliance Network',
      url: 'https://topspeedappliance.com',
      logo: 'https://cdn.builder.io/api/v1/image/assets%2Fa186f40324f047e6b518d0ea27bf7f66%2F55f8330765584b548ff08a3d1f6b6116?format=webp&width=800',
      description: 'A comprehensive appliance service network including service dispatch, mobile booking app, referral program, home service platform, and lead generation.',
      sameAs: [
        'https://www.facebook.com/topspeedappliance',
        'https://www.instagram.com/topspeedappliance',
        'https://appliancepro.net',
        'https://appliancereferral.com',
        'https://primehomeconnect.com',
        'https://applianceconnect.com'
      ],
      subOrganization: [
        {
          '@type': 'SoftwareApplication',
          name: 'AppliancePro',
          url: 'https://appliancepro.net',
          applicationCategory: 'MobileApplication'
        },
        {
          '@type': 'Organization',
          name: 'ApplianceReferral',
          url: 'https://appliancereferral.com'
        },
        {
          '@type': 'SoftwareApplication',
          name: 'PrimeHomeConnect',
          url: 'https://primehomeconnect.com'
        },
        {
          '@type': 'Organization',
          name: 'ApplianceConnect',
          url: 'https://applianceconnect.com'
        }
      ]
    }

    // Add main business schema
    const mainScript = document.createElement('script')
    mainScript.type = 'application/ld+json'
    mainScript.textContent = JSON.stringify(mainSchema)
    document.head.appendChild(mainScript)

    // Add network organization schema
    const networkScript = document.createElement('script')
    networkScript.type = 'application/ld+json'
    networkScript.textContent = JSON.stringify(networkSchema)
    document.head.appendChild(networkScript)

    return () => {
      if (mainScript.parentNode) {
        mainScript.parentNode.removeChild(mainScript)
      }
      if (networkScript.parentNode) {
        networkScript.parentNode.removeChild(networkScript)
      }
    }
  }, [])

  return null
}
