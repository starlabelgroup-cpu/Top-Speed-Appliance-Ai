import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'
import AdminSupabaseSetupNotice from './AdminSupabaseSetupNotice'
import { adminAuth } from '../utils/adminAuth'
import '../styles/admin-login.css'

function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!email || !password) {
        setError('Please enter email and password')
        setLoading(false)
        return
      }

      if (!supabase) {
        setError('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Netlify.')
        setLoading(false)
        return
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (signInError) {
        setError(signInError.message || 'Login failed')
        setLoading(false)
        return
      }

      adminAuth.setAdminSession('admin_authenticated')
      navigate('/admin/leads')
    } catch (err) {
      setError(err?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-page">
      <Link to="/" className="login-back-link">← Back to Home</Link>

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h1>Admin Access</h1>
            <p>Top Speed Appliance Admin Panel</p>
          </div>

          {!supabase && <AdminSupabaseSetupNotice />}

          {error && (
            <div className="login-error">
              <i className="fas fa-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@topspeed.com"
                className="form-input"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="btn-login"
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Logging in...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i> Sign In
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p className="demo-note">
              <i className="fas fa-info-circle"></i>
              Admin panel access - Sign in with your Supabase admin user
            </p>
          </div>
        </div>

        <div className="login-features">
          <h3>Access Available</h3>
          <ul>
            <li>
              <i className="fas fa-tasks"></i>
              <span>Manage Business Content</span>
            </li>
            <li>
              <i className="fas fa-cog"></i>
              <span>System Configuration</span>
            </li>
            <li>
              <i className="fas fa-analytics"></i>
              <span>View Analytics & Metrics</span>
            </li>
            <li>
              <i className="fas fa-users"></i>
              <span>User Management</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
