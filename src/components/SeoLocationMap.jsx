import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'

const SOUTH_FLORIDA_CENTER = [26.4, -80.2]

export default function SeoLocationMap({ locations, selectedSlug, onSelect }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const layerRef = useRef(null)
  const leafletRef = useRef(null)
  const fittedRef = useRef(false)
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    import('leaflet').then(({ default: L }) => {
      if (cancelled) return
      const map = L.map(containerRef.current, { scrollWheelZoom: false }).setView(SOUTH_FLORIDA_CENTER, 9)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18
      }).addTo(map)
      mapRef.current = map
      leafletRef.current = L
      layerRef.current = L.layerGroup().addTo(map)
      setMapReady(true)
    })

    return () => {
      cancelled = true
      mapRef.current?.remove()
      mapRef.current = null
      layerRef.current = null
      leafletRef.current = null
      fittedRef.current = false
      setMapReady(false)
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    const layer = layerRef.current
    const L = leafletRef.current
    if (!mapReady || !map || !layer || !L) return

    layer.clearLayers()
    const points = []

    locations.forEach(location => {
      if (location.lat == null || location.lng == null) return
      const latlng = [location.lat, location.lng]
      const isSelected = location.slug === selectedSlug
      points.push(latlng)

      L.circleMarker(latlng, {
        radius: isSelected ? 10 : 7,
        color: '#d10000',
        weight: 2,
        fillColor: isSelected ? '#d10000' : '#ffffff',
        fillOpacity: 1
      })
        .bindTooltip(location.name)
        .on('click', () => onSelect(location.slug))
        .addTo(layer)
    })

    if (!fittedRef.current && points.length > 0) {
      map.fitBounds(points, { padding: [24, 24] })
      fittedRef.current = true
    }
  }, [mapReady, locations, selectedSlug, onSelect])

  return (
    <div
      ref={containerRef}
      className="seo-map"
      role="region"
      aria-label="Service area map showing cities we serve"
    />
  )
}
