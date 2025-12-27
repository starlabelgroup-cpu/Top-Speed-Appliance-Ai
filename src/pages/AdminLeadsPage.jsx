import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../services/supabaseClient'
import { adminAuth } from '../utils/adminAuth'
import '../styles/admin-leads.css'

const STATUS_OPTIONS = ['new', 'contacted', 'booked', 'completed', 'lost']

function formatPhone(value) {
  const digits = String(value || '').replace(/\D/g, '')
  if (!digits) return '—'
  if (digits.length === 10) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  return value
}

function formatDate(value) {
  const date = value ? new Date(value) : null
  if (!date || Number.isNaN(date.valueOf())) return '—'
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit'
  })
}

export default function AdminLeadsPage() {
  const navigate = useNavigate()
  const [session, setSession] = useState(null)
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const filteredLeads = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return leads

    return leads.filter((lead) => {
      const parts = [
        lead.name,
        lead.phone,
        lead.email,
        lead.city,
        lead.service_type,
        lead.issue_description,
        lead.lead_source,
        lead.campaign_id,
        lead.keyword,
        lead.status
      ]
        .filter(Boolean)
        .map((v) => String(v).toLowerCase())

      return parts.some((p) => p.includes(term))
    })
  }, [leads, search])

  const loadSessionAndLeads = async () => {
    setError('')

    if (!adminAuth.isAdmin()) {
      setLoading(false)
      navigate('/admin/login')
      return
    }

    if (!supabase) {
      setLoading(false)
      setError('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Netlify.')
      return
    }

    const { data } = await supabase.auth.getSession()
    const nextSession = data?.session || null
    setSession(nextSession)

    if (!nextSession) {
      setLoading(false)
      navigate('/admin/login')
      return
    }

    const { data: rows, error: fetchError } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError(fetchError.message || 'Failed to load leads')
      setLeads([])
    } else {
      setLeads(Array.isArray(rows) ? rows : [])
    }

    setLoading(false)
  }

  useEffect(() => {
    loadSessionAndLeads().catch((err) => {
      setError(err?.message || 'Failed to load admin dashboard')
      setLoading(false)
    })
  }, [])

  const updateStatus = async (id, status) => {
    if (!supabase || !session) return

    const previous = leads
    setLeads((cur) => cur.map((lead) => (lead.id === id ? { ...lead, status } : lead)))

    const { error: updateError } = await supabase.from('leads').update({ status }).eq('id', id)

    if (updateError) {
      setLeads(previous)
      setError(updateError.message || 'Failed to update status')
    }
  }

  const handleRefresh = () => {
    setLoading(true)
    loadSessionAndLeads().catch(() => {
      setLoading(false)
    })
  }

  const handleLogout = async () => {
    try {
      if (supabase) {
        await supabase.auth.signOut()
      }
    } finally {
      adminAuth.clearAdminSession()
      navigate('/')
    }
  }

  return (
    <main className="admin-leads-page">
      <header className="admin-leads-header">
        <div className="admin-leads-header-left">
          <Link to="/" className="admin-leads-back-link">← Back to Home</Link>
          <h1 className="admin-leads-title">Lead Dashboard</h1>
          <p className="admin-leads-subtitle">View and update incoming leads from the website.</p>
        </div>

        <div className="admin-leads-header-actions">
          <button type="button" className="admin-leads-btn" onClick={handleRefresh} disabled={loading}>
            Refresh
          </button>
          <button type="button" className="admin-leads-btn secondary" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </header>

      <section className="admin-leads-toolbar">
        <div className="admin-leads-search">
          <label className="admin-leads-search-label" htmlFor="admin-leads-search">Search</label>
          <input
            id="admin-leads-search"
            className="admin-leads-search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name, phone, city, service type, status..."
          />
        </div>

        <div className="admin-leads-stats">
          <div className="admin-leads-stat">
            <div className="admin-leads-stat-value">{filteredLeads.length}</div>
            <div className="admin-leads-stat-label">Leads</div>
          </div>
          <div className="admin-leads-stat">
            <div className="admin-leads-stat-value">{filteredLeads.filter((l) => l.status === 'new').length}</div>
            <div className="admin-leads-stat-label">New</div>
          </div>
        </div>
      </section>

      {error && (
        <div className="admin-leads-error" role="status">
          {error}
        </div>
      )}

      {loading ? (
        <div className="admin-leads-loading">Loading leads…</div>
      ) : (
        <div className="admin-leads-table-wrap">
          <table className="admin-leads-table">
            <thead>
              <tr>
                <th className="admin-leads-col-name">Name</th>
                <th className="admin-leads-col-phone">Phone</th>
                <th className="admin-leads-col-city">City</th>
                <th className="admin-leads-col-service">Service</th>
                <th className="admin-leads-col-source">Source</th>
                <th className="admin-leads-col-created">Created</th>
                <th className="admin-leads-col-status">Status</th>
                <th className="admin-leads-col-actions">Call</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="admin-leads-cell-name">{lead.name || '—'}</td>
                    <td className="admin-leads-cell-phone">{formatPhone(lead.phone)}</td>
                    <td className="admin-leads-cell-city">{lead.city || '—'}</td>
                    <td className="admin-leads-cell-service">{lead.service_type || '—'}</td>
                    <td className="admin-leads-cell-source">{lead.lead_source || '—'}</td>
                    <td className="admin-leads-cell-created">{formatDate(lead.created_at)}</td>
                    <td className="admin-leads-cell-status">
                      <select
                        className="admin-leads-status-select"
                        value={lead.status || 'new'}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="admin-leads-cell-actions">
                      {lead.phone ? (
                        <a className="admin-leads-call-link" href={`tel:${lead.phone}`}>
                          Call
                        </a>
                      ) : (
                        '—'
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="admin-leads-empty" colSpan={8}>
                    No leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
