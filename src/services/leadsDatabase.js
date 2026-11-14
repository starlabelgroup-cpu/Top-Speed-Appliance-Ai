const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || null
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || null

const isConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

const normalizePhone = (value) => {
  const digits = String(value || '').replace(/\D/g, '')
  return digits.length <= 15 ? digits : digits.slice(0, 15)
}

const makeSupabaseRequest = async (method, endpoint, data = null) => {
  if (!isConfigured) {
    return { ok: false, error: 'Supabase is not configured' }
  }

  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      }
    }

    if (data !== null) {
      options.body = JSON.stringify(data)
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1${endpoint}`, options)
    const contentType = response.headers.get('content-type') || ''

    const body = contentType.includes('application/json')
      ? await response.json().catch(() => null)
      : await response.text().catch(() => '')

    if (!response.ok) {
      const message =
        typeof body === 'object' && body && 'message' in body
          ? String(body.message)
          : typeof body === 'string' && body
            ? body
            : `Supabase request failed (${response.status})`

      return { ok: false, error: message }
    }

    return { ok: true, data: body }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Network error'
    return { ok: false, error: message }
  }
}

export const leadsDatabase = {
  createLead: async (lead) => {
    const payload = {
      name: lead?.name || null,
      phone: normalizePhone(lead?.phone),
      email: lead?.email || null,
      address: lead?.address || null,
      city: lead?.city || null,
      service_type: lead?.service_type || null,
      issue_description: lead?.issue_description || null,
      lead_source: lead?.lead_source || null,
      campaign_id: lead?.campaign_id || null,
      keyword: lead?.keyword || null
    }

    if (!payload.phone) {
      return { ok: false, error: 'Phone is required' }
    }

    const result = await makeSupabaseRequest('POST', '/leads', [payload])
    if (!result.ok) return result

    if (Array.isArray(result.data) && result.data.length) {
      return { ok: true, data: result.data[0] }
    }

    return { ok: true, data: null }
  }
}
