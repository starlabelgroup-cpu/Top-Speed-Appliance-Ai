import { supabase } from './supabaseClient'
import { SEO_COUNTIES, SEO_CITIES_BY_COUNTY, getCitySlug } from '../data/seoLeadData'
import { SEO_CITY_COORDS } from '../data/seoLocationGeo'

export function buildStaticLocations() {
  return SEO_COUNTIES.flatMap(county =>
    (SEO_CITIES_BY_COUNTY[county.slug] || []).map(city => {
      const slug = getCitySlug(city)
      const coords = SEO_CITY_COORDS[slug] || {}
      return {
        slug,
        name: city,
        countySlug: county.slug,
        countyName: county.name,
        lat: coords.lat ?? null,
        lng: coords.lng ?? null
      }
    })
  )
}

export async function loadSeoLocations() {
  const fallback = { source: 'static', locations: buildStaticLocations() }
  if (!supabase) return fallback

  try {
    const { data, error } = await supabase
      .from('seo_locations')
      .select('slug, name, county_slug, county_name, lat, lng')
      .eq('active', true)
      .order('name')

    if (error || !data?.length) return fallback

    return {
      source: 'supabase',
      locations: data.map(row => ({
        slug: row.slug,
        name: row.name,
        countySlug: row.county_slug,
        countyName: row.county_name,
        lat: row.lat,
        lng: row.lng
      }))
    }
  } catch {
    return fallback
  }
}
