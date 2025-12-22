import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { mockAppointments, getStatusColor, getStatusLabel } from '../data/mockServiceData'

function Dashboard() {
  const [activeTab, setActiveTab] = useState('profile')
  const [customer, setCustomer] = useState({
    name: localStorage.getItem('customerName') || 'John Doe',
    email: localStorage.getItem('customerEmail') || 'john@example.com',
    phone: localStorage.getItem('customerPhone') || '(954) 931-7997',
    address: localStorage.getItem('customerAddress') || '123 Main St, Miami, FL 33101',
    serviceAddress: localStorage.getItem('customerServiceAddress') || '123 Main St, Miami, FL 33101',
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(customer)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [newDate, setNewDate] = useState('')
  const [newTime, setNewTime] = useState('')

  const handleEditChange = (field, value) => {
    setEditData({ ...editData, [field]: value })
  }

  const handleSaveProfile = () => {
    setCustomer(editData)
    localStorage.setItem('customerName', editData.name)
    localStorage.setItem('customerEmail', editData.email)
    localStorage.setItem('customerPhone', editData.phone)
    localStorage.setItem('customerAddress', editData.address)
    localStorage.setItem('customerServiceAddress', editData.serviceAddress)
    setIsEditing(false)
    alert('Profile updated successfully!')
  }

  const handleReschedule = () => {
    if (!newDate || !newTime) {
      alert('Please select a date and time')
      return
    }
    alert(`Appointment rescheduled to ${newDate} at ${newTime}`)
    setShowRescheduleModal(false)
    setSelectedAppointment(null)
  }

  const handleCancelAppointment = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      alert('Appointment cancelled successfully')
    }
  }

  return (
    <section id="dashboard" className="dashboard">
      <div className="dashboard-container">
        <Link to="/" className="back-link">← Back to Home</Link>

        <header className="dashboard-header">
          <h1>Customer Account</h1>
          <p className="welcome-message">Welcome, {customer.name}!</p>
        </header>

        <div className="dashboard-tabs">
          <button
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile Information
          </button>
          <button
            className={`tab-button ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            Service History
          </button>
          <button
            className={`tab-button ${activeTab === 'portal' ? 'active' : ''}`}
            onClick={() => setActiveTab('portal')}
          >
            Customer Portal
          </button>
        </div>

        {activeTab === 'profile' && (
          <div className="dashboard-content">
            <div className="profile-section">
              <div className="section-header">
                <h2>Personal Information</h2>
                {!isEditing && (
                  <button className="edit-button" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </button>
                )}
              </div>

              {isEditing ? (
                <form className="profile-form">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      value={editData.name}
                      onChange={(e) => handleEditChange('name', e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      value={editData.email}
                      onChange={(e) => handleEditChange('email', e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      id="phone"
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => handleEditChange('phone', e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Billing Address</label>
                    <input
                      id="address"
                      type="text"
                      value={editData.address}
                      onChange={(e) => handleEditChange('address', e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="serviceAddress">Service Address</label>
                    <input
                      id="serviceAddress"
                      type="text"
                      value={editData.serviceAddress}
                      onChange={(e) => handleEditChange('serviceAddress', e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-actions">
                    <button type="button" className="save-button" onClick={handleSaveProfile}>
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => {
                        setIsEditing(false)
                        setEditData(customer)
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="profile-display">
                  <div className="info-row">
                    <span className="info-label">Name:</span>
                    <span className="info-value">{customer.name}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{customer.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Phone:</span>
                    <span className="info-value">{customer.phone}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Billing Address:</span>
                    <span className="info-value">{customer.address}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Service Address:</span>
                    <span className="info-value">{customer.serviceAddress}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="dashboard-content">
            <div className="appointments-section">
              <h2>Service History & Appointments</h2>

              {mockAppointments.length === 0 ? (
                <p className="no-appointments">No service appointments found.</p>
              ) : (
                <div className="appointments-list">
                  {mockAppointments.map((appointment) => (
                    <div key={appointment.id} className="appointment-card">
                      <div className="appointment-header">
                        <h3>{appointment.service}</h3>
                        <span
                          className="appointment-status"
                          style={{ backgroundColor: getStatusColor(appointment.status) }}
                        >
                          {getStatusLabel(appointment.status)}
                        </span>
                      </div>

                      <div className="appointment-details">
                        <div className="detail-row">
                          <span className="detail-label">📅 Date:</span>
                          <span className="detail-value">{appointment.date}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">⏰ Time:</span>
                          <span className="detail-value">{appointment.time}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">👨‍🔧 Technician:</span>
                          <span className="detail-value">{appointment.technician}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">📍 Address:</span>
                          <span className="detail-value">{appointment.address}</span>
                        </div>

                        {appointment.status === 'completed' ? (
                          <div className="detail-row">
                            <span className="detail-label">💰 Cost:</span>
                            <span className="detail-value">{appointment.actualCost}</span>
                          </div>
                        ) : (
                          <div className="detail-row">
                            <span className="detail-label">💰 Estimated Cost:</span>
                            <span className="detail-value">{appointment.estimatedCost}</span>
                          </div>
                        )}
                      </div>

                      {appointment.status === 'scheduled' && (
                        <div className="appointment-actions">
                          <button
                            className="reschedule-button"
                            onClick={() => {
                              setSelectedAppointment(appointment)
                              setShowRescheduleModal(true)
                            }}
                          >
                            Reschedule
                          </button>
                          <button
                            className="cancel-appointment-button"
                            onClick={() => handleCancelAppointment(appointment.id)}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'portal' && (
          <div className="dashboard-content">
            <div className="portal-section">
              <h2>HouseCall Pro Customer Portal</h2>
              <p className="portal-description">
                Access your complete service history, manage appointments, and view invoices directly from our customer portal.
              </p>

              <div className="portal-features">
                <div className="feature-item">
                  <span className="feature-icon">📋</span>
                  <div>
                    <h3>Service History</h3>
                    <p>View all past and upcoming service appointments</p>
                  </div>
                </div>

                <div className="feature-item">
                  <span className="feature-icon">📅</span>
                  <div>
                    <h3>Manage Appointments</h3>
                    <p>Reschedule or cancel appointments online</p>
                  </div>
                </div>

                <div className="feature-item">
                  <span className="feature-icon">💵</span>
                  <div>
                    <h3>View Invoices</h3>
                    <p>Access and download your service invoices</p>
                  </div>
                </div>

                <div className="feature-item">
                  <span className="feature-icon">💬</span>
                  <div>
                    <h3>Contact Support</h3>
                    <p>Message our team directly through the portal</p>
                  </div>
                </div>
              </div>

              <button
                className="portal-access-btn"
                onClick={() => window.open('https://client.housecallpro.com/customer_portal/request-link?token=8d8427149b1b4af097d0fa3874bcf202', '_blank')}
                aria-label="Log in to HouseCall Pro customer portal"
              >
                <span>🔐</span> Log In to Portal
              </button>
            </div>
          </div>
        )}

        {showRescheduleModal && selectedAppointment && (
          <div className="modal-overlay" onClick={() => setShowRescheduleModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Reschedule Appointment</h2>
              <p className="modal-subtitle">Service: {selectedAppointment.service}</p>

              <div className="modal-form">
                <div className="form-group">
                  <label htmlFor="new-date">New Date</label>
                  <input
                    id="new-date"
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="new-time">New Time</label>
                  <input
                    id="new-time"
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="modal-actions">
                  <button className="confirm-button" onClick={handleReschedule}>
                    Confirm Reschedule
                  </button>
                  <button
                    className="close-button"
                    onClick={() => {
                      setShowRescheduleModal(false)
                      setSelectedAppointment(null)
                      setNewDate('')
                      setNewTime('')
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Dashboard
