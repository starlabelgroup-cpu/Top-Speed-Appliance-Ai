import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/ad-manager-dashboard.css'

function AdManagerDashboard() {
  const [campaigns, setCampaigns] = useState([])
  const [leads, setLeads] = useState([])
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalRevenue: 0,
    conversionRate: 0,
    activeCampaigns: 0
  })
  const [activeTab, setActiveTab] = useState('campaigns')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [campaignsRes, leadsRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/api/campaigns`),
        fetch(`${API_URL}/api/leads`),
        fetch(`${API_URL}/api/stats`)
      ])

      if (!campaignsRes.ok || !leadsRes.ok || !statsRes.ok) {
        throw new Error('Backend API is unavailable. Please ensure the server is running at ' + API_URL)
      }

      const parseJSON = async (response) => {
        const contentType = response.headers.get('content-type')
        if (!contentType?.includes('application/json')) {
          throw new Error('Invalid response format from server')
        }
        return response.json()
      }

      const campaignsData = await parseJSON(campaignsRes)
      const leadsData = await parseJSON(leadsRes)
      const statsData = await parseJSON(statsRes)

      setCampaigns(campaignsData || [])
      setLeads(leadsData || [])
      setStats(statsData || { totalLeads: 0, totalRevenue: 0, conversionRate: 0, activeCampaigns: 0 })
      setError(null)
    } catch (err) {
      const errorMsg = err instanceof TypeError && err.message.includes('fetch')
        ? `Cannot connect to backend at ${API_URL}. Make sure the server is running.`
        : err.message
      setError(errorMsg)
      console.error('Fetch error:', err)
      setCampaigns([])
      setLeads([])
      setStats({ totalLeads: 0, totalRevenue: 0, conversionRate: 0, activeCampaigns: 0 })
    } finally {
      setLoading(false)
    }
  }

  const markPaidJob = async (leadId) => {
    try {
      const res = await fetch(`${API_URL}/api/leads/${leadId}/paid`, { method: 'POST' })
      if (!res.ok) throw new Error('Failed to mark as paid')
      
      setLeads(leads.map(l => l.id === leadId ? { ...l, paid: true } : l))
    } catch (err) {
      setError(err.message)
    }
  }

  const callLead = async (leadId, phone) => {
    try {
      const res = await fetch(`${API_URL}/api/leads/${leadId}/call`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      })
      if (!res.ok) throw new Error('Failed to initiate call')
      
      setLeads(leads.map(l => l.id === leadId ? { ...l, status: 'Called' } : l))
    } catch (err) {
      setError(err.message)
    }
  }

  const emailLead = async (leadId, email) => {
    try {
      const res = await fetch(`${API_URL}/api/leads/${leadId}/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      if (!res.ok) throw new Error('Failed to send email')
      
      alert('Email sent successfully!')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="ad-manager-section">
      <div className="dashboard-back-link">
        <Link to="/">← Back to Home</Link>
      </div>

      <div className="dashboard-header">
        <h1>AI Ad Manager Dashboard</h1>
        <p>Manage campaigns, leads, and revenue tracking</p>
      </div>

      {error && (
        <div className="alert alert-error">
          <i className="fas fa-exclamation-circle"></i>
          <span>{error}</span>
          <button onClick={() => setError(null)} className="alert-close">&times;</button>
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-user-tie"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalLeads}</div>
            <div className="stat-label">Total Leads</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">${stats.totalRevenue.toLocaleString()}</div>
            <div className="stat-label">Total Revenue</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.conversionRate}%</div>
            <div className="stat-label">Conversion Rate</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-bullseye"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.activeCampaigns}</div>
            <div className="stat-label">Active Campaigns</div>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'campaigns' ? 'active' : ''}`}
          onClick={() => setActiveTab('campaigns')}
        >
          <i className="fas fa-bullseye"></i> Campaigns
        </button>
        <button
          className={`tab-button ${activeTab === 'leads' ? 'active' : ''}`}
          onClick={() => setActiveTab('leads')}
        >
          <i className="fas fa-users"></i> Leads ({leads.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <i className="fas fa-chart-bar"></i> Analytics
        </button>
      </div>

      {loading && <div className="loading-spinner">Loading...</div>}

      {activeTab === 'campaigns' && !loading && (
        <div className="campaigns-section">
          <h2>Google Ads Campaigns</h2>
          <div className="table-container">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Campaign Name</th>
                  <th>Budget</th>
                  <th>Status</th>
                  <th>Impressions</th>
                  <th>Clicks</th>
                  <th>CTR</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="empty-cell">No campaigns found</td>
                  </tr>
                ) : (
                  campaigns.map(campaign => (
                    <tr key={campaign.id}>
                      <td className="campaign-name">{campaign.name}</td>
                      <td>${(campaign.budget_micros / 1e6).toFixed(2)}</td>
                      <td><span className={`status-badge ${campaign.status.toLowerCase()}`}>{campaign.status}</span></td>
                      <td>{campaign.impressions || 0}</td>
                      <td>{campaign.clicks || 0}</td>
                      <td>{campaign.ctr || '0%'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'leads' && !loading && (
        <div className="leads-section">
          <h2>Lead Management</h2>
          <div className="leads-grid">
            {leads.length === 0 ? (
              <div className="empty-state">
                <i className="fas fa-inbox"></i>
                <p>No leads yet</p>
              </div>
            ) : (
              leads.map(lead => (
                <div key={lead.id} className="lead-card">
                  <div className="lead-header">
                    <h3>{lead.name}</h3>
                    <span className={`status-badge ${lead.status.toLowerCase()}`}>
                      {lead.status}
                    </span>
                  </div>

                  <div className="lead-details">
                    <p><strong>Phone:</strong> {lead.phone}</p>
                    <p><strong>Service:</strong> {lead.service}</p>
                    <p><strong>Campaign:</strong> {lead.campaign}</p>
                    <p><strong>Email:</strong> {lead.email || 'N/A'}</p>
                    <p><strong>Date:</strong> {new Date(lead.timestamp).toLocaleDateString()}</p>
                  </div>

                  <div className="lead-status">
                    {!lead.paid ? (
                      <span className="unpaid-badge">Unpaid</span>
                    ) : (
                      <span className="paid-badge">Paid</span>
                    )}
                  </div>

                  <div className="lead-actions">
                    <button
                      className="btn-action btn-call"
                      onClick={() => callLead(lead.id, lead.phone)}
                      title="Call this lead"
                    >
                      <i className="fas fa-phone"></i> Call
                    </button>
                    <button
                      className="btn-action btn-email"
                      onClick={() => emailLead(lead.id, lead.email)}
                      title="Send email to lead"
                    >
                      <i className="fas fa-envelope"></i> Email
                    </button>
                    <button
                      className="btn-action btn-paid"
                      onClick={() => markPaidJob(lead.id)}
                      disabled={lead.paid}
                      title="Mark as paid job"
                    >
                      <i className="fas fa-check"></i> {lead.paid ? 'Paid' : 'Mark Paid'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && !loading && (
        <div className="analytics-section">
          <h2>Performance Analytics</h2>
          <div className="analytics-grid">
            <div className="analytics-card">
              <h3>Lead Source Distribution</h3>
              <p>Google Ads: {leads.filter(l => l.campaign.includes('Google')).length}</p>
              <p>Facebook: {leads.filter(l => l.campaign.includes('Facebook')).length}</p>
              <p>Direct: {leads.filter(l => l.campaign.includes('Direct')).length}</p>
            </div>

            <div className="analytics-card">
              <h3>Conversion Summary</h3>
              <p>Total Leads: {stats.totalLeads}</p>
              <p>Converted: {leads.filter(l => l.paid).length}</p>
              <p>Conversion Rate: {stats.conversionRate}%</p>
            </div>

            <div className="analytics-card">
              <h3>Revenue Tracking</h3>
              <p>Total Revenue: ${stats.totalRevenue.toLocaleString()}</p>
              <p>Avg. Deal Value: ${leads.length > 0 ? (stats.totalRevenue / leads.length).toFixed(2) : 0}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default AdManagerDashboard
