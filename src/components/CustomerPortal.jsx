import React, { useState, useEffect } from 'react'
import '../styles/customer-portal.css'

export default function CustomerPortal() {
  const [activeTab, setActiveTab] = useState('bookings')
  const [bookings, setBookings] = useState([])
  const [serviceHistory, setServiceHistory] = useState([])
  const [customer, setCustomer] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const lastBooking = localStorage.getItem('lastBooking')
    const lastPayment = localStorage.getItem('pendingPayment')
    
    if (lastBooking) {
      const booking = JSON.parse(lastBooking)
      setBookings([
        {
          id: 'BK-001',
          date: new Date(booking.preferredDate).toLocaleDateString(),
          time: booking.preferredTime,
          appliance: booking.appliance,
          issue: booking.issue,
          status: 'scheduled',
          technician: 'John Smith'
        }
      ])
    }

    const mockHistory = [
      {
        id: 'SVC-001',
        date: '2024-11-15',
        appliance: 'Refrigerator',
        issue: 'Not cooling properly',
        resolution: 'Replaced compressor',
        cost: 450,
        status: 'completed'
      },
      {
        id: 'SVC-002',
        date: '2024-10-20',
        appliance: 'Washer',
        issue: 'Drain issue',
        resolution: 'Cleaned drain filter',
        cost: 89,
        status: 'completed'
      }
    ]
    setServiceHistory(mockHistory)
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (loginEmail) {
      setCustomer({ email: loginEmail, name: 'Customer' })
      setIsLoggedIn(true)
      setShowLoginModal(false)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCustomer(null)
    setLoginEmail('')
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'scheduled':
        return 'status-scheduled'
      case 'completed':
        return 'status-completed'
      case 'in-progress':
        return 'status-in-progress'
      case 'cancelled':
        return 'status-cancelled'
      default:
        return 'status-pending'
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="portal-login-page">
        <div className="login-card">
          <h1>Customer Portal</h1>
          <p>Sign in to view your bookings and service history</p>
          <button onClick={() => setShowLoginModal(true)} className="login-btn">
            Sign In
          </button>
        </div>

        {showLoginModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="modal-close" onClick={() => setShowLoginModal(false)}>×</button>
              <h2>Sign In</h2>
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
                <button type="submit" className="modal-btn">Sign In</button>
              </form>
              <p className="modal-note">Demo: Use any email to continue</p>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="customer-portal">
      <div className="portal-header">
        <div className="portal-welcome">
          <h1>Welcome, {customer?.name}!</h1>
          <p>{customer?.email}</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">Sign Out</button>
      </div>

      <div className="portal-tabs">
        <button
          className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          Upcoming Bookings ({bookings.filter(b => b.status === 'scheduled').length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Service History ({serviceHistory.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'account' ? 'active' : ''}`}
          onClick={() => setActiveTab('account')}
        >
          Account Settings
        </button>
      </div>

      {activeTab === 'bookings' && (
        <div className="tab-content">
          {bookings.length > 0 ? (
            <div className="bookings-grid">
              {bookings.map(booking => (
                <div key={booking.id} className="booking-card">
                  <div className="booking-header">
                    <div className="booking-id">{booking.id}</div>
                    <span className={`status-badge ${getStatusBadgeClass(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="booking-details">
                    <div className="detail-item">
                      <span className="label">Date & Time:</span>
                      <span className="value">{booking.date} at {booking.time}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Appliance:</span>
                      <span className="value">{booking.appliance}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Issue:</span>
                      <span className="value">{booking.issue}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Technician:</span>
                      <span className="value">{booking.technician}</span>
                    </div>
                  </div>
                  <div className="booking-actions">
                    <button className="action-btn primary">Reschedule</button>
                    <button className="action-btn secondary">Cancel</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No upcoming bookings</p>
              <a href="#booking" className="empty-state-link">Schedule Service</a>
            </div>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="tab-content">
          {serviceHistory.length > 0 ? (
            <div className="history-grid">
              {serviceHistory.map(service => (
                <div key={service.id} className="history-card">
                  <div className="history-header">
                    <div className="history-id">{service.id}</div>
                    <span className={`status-badge ${getStatusBadgeClass(service.status)}`}>
                      {service.status}
                    </span>
                  </div>
                  <div className="history-details">
                    <div className="detail-item">
                      <span className="label">Date:</span>
                      <span className="value">{new Date(service.date).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Appliance:</span>
                      <span className="value">{service.appliance}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Issue:</span>
                      <span className="value">{service.issue}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Resolution:</span>
                      <span className="value">{service.resolution}</span>
                    </div>
                    <div className="detail-item cost-item">
                      <span className="label">Cost:</span>
                      <span className="value">${service.cost.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No service history yet</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'account' && (
        <div className="tab-content account-settings">
          <div className="settings-card">
            <h3>Profile Information</h3>
            <div className="setting-item">
              <label>Email</label>
              <input type="email" value={customer?.email} readOnly />
            </div>
            <div className="setting-item">
              <label>Name</label>
              <input type="text" value={customer?.name} disabled />
            </div>
          </div>

          <div className="settings-card">
            <h3>Preferences</h3>
            <div className="setting-checkbox">
              <input type="checkbox" id="email-notifications" defaultChecked />
              <label htmlFor="email-notifications">Email notifications for bookings</label>
            </div>
            <div className="setting-checkbox">
              <input type="checkbox" id="sms-notifications" />
              <label htmlFor="sms-notifications">SMS reminders (coming soon)</label>
            </div>
          </div>

          <div className="settings-card">
            <h3>Danger Zone</h3>
            <button className="btn-delete">Delete Account</button>
          </div>
        </div>
      )}
    </div>
  )
}
