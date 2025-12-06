import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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
      // Simple validation for demo
      // TODO: Replace with actual Supabase authentication
      if (!email || !password) {
        setError('Please enter email and password')
        setLoading(false)
        return
      }

      // For now, accept any email/password combo (DEMO ONLY)
      // In production, use Supabase Auth
      if (email && password.length >= 6) {
        adminAuth.setAdminSession('admin_authenticated')
        navigate('/admin/ads-generator')
      } else {
        setError('Invalid credentials. Password must be at least 6 characters.')
      }
    } catch (err) {
      setError(err.message || 'Login failed')
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
            <p>Top Speed Appliance - AI Ad Generator</p>
          </div>

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
              Demo: Enter any email and password (6+ chars) to access
            </p>
            <p className="future-note">
              <i className="fas fa-lock"></i>
              Full Supabase authentication will be implemented after credentials are provided
            </p>
          </div>
        </div>

        <div className="login-features">
          <h3>Admin Features</h3>
          <ul>
            <li>
              <i className="fas fa-robot"></i>
              <span>AI-Powered Ad Generation</span>
            </li>
            <li>
              <i className="fas fa-fab fa-facebook"></i>
              <span>Facebook & Instagram Integration</span>
            </li>
            <li>
              <i className="fas fa-fab fa-google"></i>
              <span>Google Ads Integration</span>
            </li>
            <li>
              <i className="fas fa-chart-line"></i>
              <span>Real-time Performance Metrics</span>
            </li>
            <li>
              <i className="fas fa-database"></i>
              <span>Centralized Ad Management</span>
            </li>
            <li>
              <i className="fas fa-sync-alt"></i>
              <span>Auto-Publishing & Scheduling</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
