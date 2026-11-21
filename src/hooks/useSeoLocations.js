import { useEffect, useState } from 'react'
import { loadSeoLocations } from '../services/seoLocationsService'

export function useSeoLocations() {
  const [state, setState] = useState({ status: 'loading', source: null, locations: [] })

  useEffect(() => {
    let cancelled = false
    loadSeoLocations().then(result => {
      if (!cancelled) setState({ status: 'ready', ...result })
    })
    return () => {
      cancelled = true
    }
  }, [])

  return state
}
