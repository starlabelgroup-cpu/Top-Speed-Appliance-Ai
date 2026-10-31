// API Service for Top Speed Appliance AI Agent Backend
// Uses a remote FastAPI backend when configured; otherwise provides safe local fallbacks.

const rawBaseUrl =
  import.meta.env.VITE_REACT_APP_AGENT_API_URL || import.meta.env.VITE_AGENT_API_URL || null

const normalizeBaseUrl = (value) => {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (!trimmed) return null
  return trimmed.endsWith('/') ? trimmed.slice(0, -1) : trimmed
}

const API_BASE_URL = normalizeBaseUrl(rawBaseUrl)

const nowIso = () => new Date().toISOString()

const pickWithinBudget = (items, budget) => {
  const list = [...items].sort((a, b) => a.price - b.price)
  const underOrEqual = list.filter((i) => i.price <= budget)
  const over = list.filter((i) => i.price > budget)

  const result = []

  const preferred = underOrEqual.length ? underOrEqual : list
  const best = preferred.reduce((acc, cur) => {
    if (!acc) return cur
    const accDiff = Math.abs(acc.price - budget)
    const curDiff = Math.abs(cur.price - budget)
    return curDiff < accDiff ? cur : acc
  }, null)

  if (best) result.push(best)

  for (const candidate of underOrEqual.reverse()) {
    if (result.length >= 3) break
    if (result.some((r) => r.model === candidate.model && r.brand === candidate.brand)) continue
    result.push(candidate)
  }

  for (const candidate of over) {
    if (result.length >= 5) break
    if (result.some((r) => r.model === candidate.model && r.brand === candidate.brand)) continue
    result.push(candidate)
  }

  return result.slice(0, 5)
}

const asArray = (value) => (Array.isArray(value) ? value : [])

const formatEnergyRating = (preference) => {
  if (preference === 'high') return 'Energy Star (High Efficiency)'
  if (preference === 'low') return 'Standard'
  return 'Energy Star'
}

const fallbackCatalog = {
  refrigerator: [
    {
      brand: 'Whirlpool',
      model: 'WRF535SWHZ',
      price: 1799,
      original_price: 1999,
      energy_rating: 'Energy Star',
      features: ['French Door', 'Ice Maker', 'Fingerprint Resistant'],
      warranty: '1 year parts & labor',
      rating: 4.6
    },
    {
      brand: 'LG',
      model: 'LFXS28968S',
      price: 2199,
      original_price: 2499,
      energy_rating: 'Energy Star',
      features: ['Smart Home', 'Door-in-Door', 'Ice Maker', 'Water Dispenser'],
      warranty: '1 year parts & labor',
      rating: 4.7
    },
    {
      brand: 'GE',
      model: 'GNE27JYMFS',
      price: 1699,
      energy_rating: 'Energy Star',
      features: ['French Door', 'Humidity Controlled Crispers', 'LED Lighting'],
      warranty: '1 year parts & labor',
      rating: 4.5
    },
    {
      brand: 'Samsung',
      model: 'RF28R7351SG',
      price: 2499,
      original_price: 2899,
      energy_rating: 'Energy Star',
      features: ['Smart Home', 'FlexZone', 'Ice Maker', 'Water Dispenser'],
      warranty: '1 year parts & labor',
      rating: 4.4
    },
    {
      brand: 'Frigidaire',
      model: 'FFSS2615TS',
      price: 1299,
      energy_rating: 'Energy Star',
      features: ['Side-by-Side', 'Ice Maker Ready', 'Water Dispenser'],
      warranty: '1 year parts & labor',
      rating: 4.3
    }
  ],
  washer: [
    {
      brand: 'LG',
      model: 'WM4000HWA',
      price: 949,
      original_price: 1099,
      energy_rating: 'Energy Star',
      features: ['Steam Clean', 'Large Capacity', 'Smart Connect'],
      warranty: '1 year parts & labor',
      rating: 4.7
    },
    {
      brand: 'Whirlpool',
      model: 'WFW5620HW',
      price: 899,
      energy_rating: 'Energy Star',
      features: ['Quiet Operation', 'Steam Clean', 'Adaptive Wash'],
      warranty: '1 year parts & labor',
      rating: 4.5
    },
    {
      brand: 'Samsung',
      model: 'WF45T6000AW',
      price: 799,
      energy_rating: 'Energy Star',
      features: ['Large Capacity', 'Smart Connect', 'Self Clean+'],
      warranty: '1 year parts & labor',
      rating: 4.4
    },
    {
      brand: 'GE',
      model: 'GFW550SSNWW',
      price: 849,
      energy_rating: 'Energy Star',
      features: ['Sanitize Cycle', 'Large Capacity', 'OdorBlock'],
      warranty: '1 year parts & labor',
      rating: 4.3
    },
    {
      brand: 'Maytag',
      model: 'MHW5630HW',
      price: 999,
      original_price: 1149,
      energy_rating: 'Energy Star',
      features: ['Extra Power', 'Steam Clean', 'Rapid Wash'],
      warranty: '10-year limited parts (select components)',
      rating: 4.6
    }
  ],
  dryer: [
    {
      brand: 'LG',
      model: 'DLEX4000W',
      price: 999,
      energy_rating: 'Energy Star',
      features: ['Smart Sensing', 'Steam Refresh', 'Sanitize Cycle'],
      warranty: '1 year parts & labor',
      rating: 4.7
    },
    {
      brand: 'Whirlpool',
      model: 'WED5620HW',
      price: 849,
      energy_rating: 'Energy Star',
      features: ['Wrinkle Shield', 'Quick Dry', 'Quiet Operation'],
      warranty: '1 year parts & labor',
      rating: 4.5
    },
    {
      brand: 'Samsung',
      model: 'DVE45T6000W',
      price: 799,
      energy_rating: 'Energy Star',
      features: ['Smart Sensing', 'Steam Sanitize', 'Sensor Dry'],
      warranty: '1 year parts & labor',
      rating: 4.4
    },
    {
      brand: 'GE',
      model: 'GFD55ESSNWW',
      price: 899,
      energy_rating: 'Energy Star',
      features: ['Sanitize Cycle', 'Steam', 'Damp Alert'],
      warranty: '1 year parts & labor',
      rating: 4.3
    },
    {
      brand: 'Maytag',
      model: 'MED5630HW',
      price: 949,
      energy_rating: 'Energy Star',
      features: ['Extra Power', 'Quick Dry', 'Wrinkle Prevent'],
      warranty: '10-year limited parts (select components)',
      rating: 4.6
    }
  ],
  oven: [
    {
      brand: 'GE',
      model: 'JB645RKSS',
      price: 699,
      energy_rating: 'Standard',
      features: ['Self-Cleaning', 'Multiple Racks', 'Fast Preheat'],
      warranty: '1 year parts & labor',
      rating: 4.5
    },
    {
      brand: 'Samsung',
      model: 'NE63A6511SS',
      price: 899,
      original_price: 999,
      energy_rating: 'Standard',
      features: ['Convection', 'Self-Cleaning', 'Wifi Control'],
      warranty: '1 year parts & labor',
      rating: 4.4
    },
    {
      brand: 'Whirlpool',
      model: 'WFE515S0JS',
      price: 649,
      energy_rating: 'Standard',
      features: ['Self-Cleaning', 'Warm Zone', 'Hidden Bake Element'],
      warranty: '1 year parts & labor',
      rating: 4.3
    },
    {
      brand: 'Frigidaire',
      model: 'FFEF3054TS',
      price: 599,
      energy_rating: 'Standard',
      features: ['Quick Boil', 'Self-Cleaning', 'Large Capacity'],
      warranty: '1 year parts & labor',
      rating: 4.2
    },
    {
      brand: 'LG',
      model: 'LREL6323S',
      price: 1099,
      original_price: 1199,
      energy_rating: 'Standard',
      features: ['Convection', 'Air Fry', 'Smart Home'],
      warranty: '1 year parts & labor',
      rating: 4.6
    }
  ],
  dishwasher: [
    {
      brand: 'Bosch',
      model: 'SHEM63W55N',
      price: 999,
      original_price: 1149,
      energy_rating: 'Energy Star',
      features: ['Quiet Operation', 'Soil Sensors', 'Auto Cycle'],
      warranty: '1 year parts & labor',
      rating: 4.8
    },
    {
      brand: 'Whirlpool',
      model: 'WDT750SAKZ',
      price: 749,
      energy_rating: 'Energy Star',
      features: ['Third Rack', 'Quiet Operation', 'Heated Dry'],
      warranty: '1 year parts & labor',
      rating: 4.5
    },
    {
      brand: 'GE',
      model: 'GDT665SSNSS',
      price: 699,
      energy_rating: 'Energy Star',
      features: ['Steam Prewash', 'Multiple Cycles', 'Dry Boost'],
      warranty: '1 year parts & labor',
      rating: 4.3
    },
    {
      brand: 'Samsung',
      model: 'DW80R5061US',
      price: 649,
      energy_rating: 'Energy Star',
      features: ['Quiet Operation', 'Smart Control', 'StormWash'],
      warranty: '1 year parts & labor',
      rating: 4.2
    },
    {
      brand: 'Frigidaire',
      model: 'FFCD2418US',
      price: 449,
      energy_rating: 'Energy Star',
      features: ['Multiple Cycles', 'Heated Dry', 'Quick Wash'],
      warranty: '1 year parts & labor',
      rating: 4.1
    }
  ],
  microwave: [
    {
      brand: 'Panasonic',
      model: 'NN-SN966S',
      price: 279,
      original_price: 319,
      energy_rating: 'Standard',
      features: ['Inverter Tech', 'Sensor Cooking', 'Turbo Defrost'],
      warranty: '1 year parts & labor',
      rating: 4.7
    },
    {
      brand: 'GE',
      model: 'JES1145SHSS',
      price: 139,
      energy_rating: 'Standard',
      features: ['Compact Size', 'Auto Cook', 'Turntable'],
      warranty: '1 year parts & labor',
      rating: 4.4
    },
    {
      brand: 'Samsung',
      model: 'MS19M8020TG',
      price: 229,
      energy_rating: 'Standard',
      features: ['Sensor Cooking', 'Smart Presets', 'Ceramic Enamel'],
      warranty: '1 year parts & labor',
      rating: 4.5
    },
    {
      brand: 'Whirlpool',
      model: 'WMC30516HZ',
      price: 129,
      energy_rating: 'Standard',
      features: ['Compact Size', 'Quick Reheat', 'Popcorn Preset'],
      warranty: '1 year parts & labor',
      rating: 4.2
    },
    {
      brand: 'LG',
      model: 'LMC0975ST',
      price: 159,
      energy_rating: 'Standard',
      features: ['Smart Presets', 'EasyClean', 'Quiet Operation'],
      warranty: '1 year parts & labor',
      rating: 4.3
    }
  ]
}

const normalizeApplianceKey = (value) => {
  if (typeof value !== 'string') return 'refrigerator'
  const cleaned = value.toLowerCase().trim()
  if (cleaned.includes('dish')) return 'dishwasher'
  if (cleaned.includes('micro')) return 'microwave'
  if (cleaned.includes('fridge') || cleaned.includes('refrig')) return 'refrigerator'
  if (cleaned.includes('wash')) return 'washer'
  if (cleaned.includes('dry')) return 'dryer'
  if (cleaned.includes('oven') || cleaned.includes('range')) return 'oven'
  return cleaned
}

const applyPreferencesToRecommendations = ({
  base,
  budget,
  requiredFeatures,
  energyPreference
}) => {
  const required = new Set(asArray(requiredFeatures).map((f) => String(f)))
  const rating = formatEnergyRating(energyPreference)

  const enhanced = base.map((rec) => {
    const features = Array.from(
      new Set([
        ...asArray(rec.features),
        ...Array.from(required).filter(Boolean).slice(0, 3)
      ])
    )

    return {
      ...rec,
      energy_rating: rec.energy_rating === 'Energy Star' ? rating : rec.energy_rating,
      features
    }
  })

  const selected = pickWithinBudget(enhanced, Number.isFinite(budget) ? budget : 2000)

  const sorted = selected.sort((a, b) => {
    if (a.price === b.price) return (b.rating || 0) - (a.rating || 0)
    return Math.abs(a.price - budget) - Math.abs(b.price - budget)
  })

  return sorted
}

const fallbackRecommendationsResponse = (payload) => {
  const applianceKey = normalizeApplianceKey(payload?.appliance_type)
  const catalog = fallbackCatalog[applianceKey] || fallbackCatalog.refrigerator

  const recommendations = applyPreferencesToRecommendations({
    base: catalog,
    budget: payload?.budget,
    requiredFeatures: payload?.required_features,
    energyPreference: payload?.energy_efficiency_preference
  })

  return {
    success: true,
    recommendations,
    count: recommendations.length,
    timestamp: nowIso(),
    degraded: true
  }
}

const fallbackDiagnosisResponse = (payload) => {
  const symptoms = asArray(payload?.symptoms).map((s) => String(s))
  const hasLeak = symptoms.some((s) => /leak/i.test(s))
  const hasNoHeatOrCool = symptoms.some((s) => /(not cooling|not heating|won't heat|won't cool)/i.test(s))
  const hasNoise = symptoms.some((s) => /(loud|noise|strange)/i.test(s))

  const likelyCauses = []
  if (hasNoHeatOrCool) likelyCauses.push('Airflow restriction (dirty filter/coil or blocked vent)')
  if (hasLeak) likelyCauses.push('Loose hose/connection or worn door seal')
  if (hasNoise) likelyCauses.push('Worn bearing, fan, or motor component')

  if (!likelyCauses.length) {
    likelyCauses.push('General wear and tear or maintenance needed')
    likelyCauses.push('Sensor or control board calibration issue')
  }

  const severity = hasNoHeatOrCool ? 'high' : hasLeak ? 'medium' : 'low'

  const immediateActions = []
  if (hasLeak) immediateActions.push('Turn off water supply if safe and dry the area to prevent damage')
  if (hasNoHeatOrCool) immediateActions.push('Check filters/vents and confirm power is stable (breaker/outlet)')
  if (hasNoise) immediateActions.push('Stop using if grinding noises continue to avoid further damage')

  const safetyWarnings = []
  if (payload?.appliance_type?.toLowerCase?.().includes('oven')) {
    safetyWarnings.push('If you smell gas, leave the area and contact your gas provider immediately')
  }

  return {
    success: true,
    diagnosis: {
      likely_causes: likelyCauses,
      probability: likelyCauses.map((_, idx) => (idx === 0 ? 0.55 : 0.25)),
      severity,
      immediate_actions: immediateActions,
      safety_warnings: safetyWarnings,
      diy_possible: severity !== 'high',
      estimated_repair_time: severity === 'high' ? '1-2 hours (professional recommended)' : '30-60 minutes',
      parts_needed: severity === 'high' ? ['Diagnostic service call'] : []
    },
    appliance_type: payload?.appliance_type,
    timestamp: nowIso(),
    degraded: true
  }
}

const fallbackMaintenanceResponse = (payload) => {
  const preferredDate = payload?.preferred_date ? new Date(payload.preferred_date) : null
  const date = preferredDate && !Number.isNaN(preferredDate.valueOf()) ? preferredDate : new Date(Date.now() + 86400000)

  const scheduled = new Date(date)
  scheduled.setHours(10, 0, 0, 0)

  return {
    success: true,
    appointment: {
      appointment_id: `apt_${Date.now()}`,
      scheduled_time: scheduled.toISOString(),
      estimated_duration: payload?.service_type === 'repair' ? '2-3 hours' : '60-90 minutes',
      notes: 'This is a tentative slot. Our team will confirm by phone/text.'
    },
    appliance_id: payload?.appliance_id,
    timestamp: nowIso(),
    degraded: true
  }
}

const fallbackChatResponse = (query) => {
  const text = String(query || '').trim()
  const lower = text.toLowerCase()

  const suggested = []
  if (/recommend|buy|new|replace/.test(lower)) suggested.push('recommend')
  if (/diagnos|not working|broken|leak|noise|error/.test(lower)) suggested.push('diagnose')
  if (/mainten|schedule|appointment|service/.test(lower)) suggested.push('maintenance')

  if (!suggested.length) suggested.push('questions')

  let answer =
    "I can help with appliance troubleshooting, recommendations, and scheduling. Tell me what appliance you have and what's going on." 

  if (suggested.includes('recommend')) {
    answer =
      'I can recommend options based on your budget and must-have features. Switch to Recommendation mode and choose your appliance type to get a short list.'
  } else if (suggested.includes('diagnose')) {
    answer =
      "Let's narrow it down. Switch to Diagnostic mode, select your appliance, and pick the symptoms you're seeing." 
  } else if (suggested.includes('maintenance')) {
    answer =
      'I can help schedule maintenance. Switch to Maintenance mode and provide the appliance name/type and a preferred date.'
  }

  return {
    success: true,
    response: {
      answer,
      suggested_actions: suggested,
      suggested_action: suggested[0],
      confidence: 0.6,
      requires_human: false
    },
    agent_used: 'Cara Care',
    timestamp: nowIso(),
    degraded: true
  }
}

const apiCall = async (endpoint, method = 'GET', data = null) => {
  if (!API_BASE_URL) {
    return {
      success: false,
      error: 'AI backend is not configured',
      timestamp: nowIso()
    }
  }

  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }

    if (data) {
      options.body = JSON.stringify(data)
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options)

    const contentType = response.headers.get('content-type') || ''
    const isJson = contentType.includes('application/json')

    const body = isJson ? await response.json().catch(() => null) : await response.text().catch(() => '')

    if (!response.ok) {
      const message =
        typeof body === 'object' && body && 'error' in body
          ? String(body.error)
          : `API error: ${response.status} ${response.statusText}`

      return {
        success: false,
        error: message,
        status: response.status,
        timestamp: nowIso()
      }
    }

    if (typeof body === 'object' && body) return body

    return {
      success: true,
      response: body,
      timestamp: nowIso()
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Network error'
    return {
      success: false,
      error: message,
      timestamp: nowIso()
    }
  }
}

export const agentService = {
  sendMessage: async (query, sessionId) => {
    const payload = {
      query,
      session_id: sessionId,
      context: {}
    }

    const result = await apiCall('/chat', 'POST', payload)
    if (result.success) return result

    return fallbackChatResponse(query)
  },

  diagnoseAppliance: async (payload, sessionId) => {
    const result = await apiCall('/diagnose', 'POST', {
      ...payload,
      session_id: sessionId
    })

    if (result.success) return result

    return fallbackDiagnosisResponse(payload)
  },

  getRecommendations: async (payload, sessionId) => {
    const result = await apiCall('/recommend', 'POST', {
      ...payload,
      session_id: sessionId
    })

    if (result.success) return result

    return fallbackRecommendationsResponse(payload)
  },

  scheduleMaintenance: async (payload, sessionId) => {
    const result = await apiCall('/schedule-maintenance', 'POST', {
      ...payload,
      session_id: sessionId
    })

    if (result.success) return result

    return fallbackMaintenanceResponse(payload)
  },

  healthCheck: async () => {
    return apiCall('/health', 'GET')
  },

  listAgents: async () => {
    return apiCall('/agents', 'GET')
  },

  getMetrics: async () => {
    return apiCall('/metrics', 'GET')
  }
}

// Health check interval (check every 30 seconds)
let healthCheckInterval = null

export const startHealthCheck = () => {
  if (!API_BASE_URL) return
  if (healthCheckInterval) return

  healthCheckInterval = setInterval(() => {
    agentService.healthCheck().catch(() => {})
  }, 30000)
}

export const stopHealthCheck = () => {
  if (healthCheckInterval) {
    clearInterval(healthCheckInterval)
    healthCheckInterval = null
  }
}
