import React from 'react'

const hasSupabaseUrl = Boolean(import.meta.env.VITE_SUPABASE_URL)
const hasSupabaseAnonKey = Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY)

export default function AdminSupabaseSetupNotice() {
  const statusLabel = hasSupabaseUrl && hasSupabaseAnonKey ? 'Configured' : 'Not configured'

  return (
    <section className="admin-setup-notice" aria-label="Supabase setup">
      <div className="admin-setup-notice-header">
        <i className="fas fa-database admin-setup-notice-icon" aria-hidden="true"></i>
        <div className="admin-setup-notice-heading">
          <h2 className="admin-setup-notice-title">Database Setup</h2>
          <p className="admin-setup-notice-subtitle">Status: {statusLabel}</p>
        </div>
      </div>

      <ul className="admin-setup-notice-list">
        <li className="admin-setup-notice-item">
          In Netlify, set environment variables:
          <div className="admin-setup-notice-vars">
            <code className="admin-setup-notice-var">VITE_SUPABASE_URL</code>
            <code className="admin-setup-notice-var">VITE_SUPABASE_ANON_KEY</code>
          </div>
        </li>
        <li className="admin-setup-notice-item">Trigger a new deploy after saving env vars.</li>
        <li className="admin-setup-notice-item">Then sign in here with your Supabase admin user to view leads.</li>
      </ul>

      <div className="admin-setup-notice-status">
        <span className="admin-setup-notice-status-chip" data-status={hasSupabaseUrl ? 'set' : 'missing'}>
          URL: {hasSupabaseUrl ? 'set' : 'missing'}
        </span>
        <span className="admin-setup-notice-status-chip" data-status={hasSupabaseAnonKey ? 'set' : 'missing'}>
          Anon key: {hasSupabaseAnonKey ? 'set' : 'missing'}
        </span>
      </div>
    </section>
  )
}
