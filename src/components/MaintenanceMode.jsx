import React, { useState } from 'react'
import { agentService } from '../services/agentService'

export default function MaintenanceMode({ sessionId, onNotify }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    applianceId: '',
    applianceName: '',
    applianceType: '',
    serviceType: 'routine',
    preferredDate: '',
    issues: []
  })
  const [schedule, setSchedule] = useState(null)
  const [loading, setLoading] = useState(false)

  const serviceTypes = [
    { id: 'routine', label: 'Routine Maintenance', desc: 'Regular cleaning and checkup' },
    { id: 'repair', label: 'Repair Service', desc: 'Fix specific issues' },
    { id: 'emergency', label: 'Emergency Service', desc: 'Urgent repair needed' }
  ]

  const commonIssues = {
    'Refrigerator': ['Not cooling properly', 'Strange noises', 'Water leaking', 'Filter needs replacement'],
    'Washer': ['Drain cleaning', 'Hose inspection', 'Door seal check', 'Vibration issues'],
    'Dryer': ['Vent cleaning', 'Lint filter maintenance', 'Heating check', 'Door alignment'],
    'Oven': ['Self-cleaning cycle', 'Heating element check', 'Temperature calibration', 'Door seal replacement'],
    'Dishwasher': ['Spray arm cleaning', 'Filter cleaning', 'Seal inspection', 'Detergent dispenser'],
    'Microwave': ['Interior cleaning', 'Turntable check', 'Door seal inspection', 'Safety inspection']
  }

  const handleScheduleMaintenance = async () => {
    if (!formData.applianceName || !formData.applianceType) {
      onNotify('Please fill in all required fields', 'warning')
      return
    }

    setLoading(true)
    try {
      const response = await agentService.scheduleMaintenance({
        appliance_id: formData.applianceId || `appliance_${Date.now()}`,
        service_type: formData.serviceType,
        preferred_date: formData.preferredDate,
        issues: formData.issues
      }, sessionId)

      if (response.success) {
        setSchedule(response.appointment)
        setStep(3)
        onNotify('Maintenance scheduled successfully!', 'success')
      } else {
        onNotify('Failed to schedule maintenance', 'error')
      }
    } catch (error) {
      console.error('Schedule error:', error)
      onNotify('Error scheduling maintenance', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="maintenance-mode">
      {step === 1 && (
        <div className="maintenance-step">
          <h3>Schedule Maintenance</h3>

          <div className="form-group">
            <label>Appliance Name *</label>
            <input
              type="text"
              placeholder="e.g., Kitchen Refrigerator"
              value={formData.applianceName}
              onChange={(e) => setFormData({ ...formData, applianceName: e.target.value })}
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>Appliance Type *</label>
            <select
              value={formData.applianceType}
              onChange={(e) => setFormData({ ...formData, applianceType: e.target.value })}
              className="select-field"
            >
              <option value="">Select appliance type...</option>
              <option value="Refrigerator">Refrigerator</option>
              <option value="Washer">Washer</option>
              <option value="Dryer">Dryer</option>
              <option value="Oven">Oven</option>
              <option value="Dishwasher">Dishwasher</option>
              <option value="Microwave">Microwave</option>
            </select>
          </div>

          <div className="form-group">
            <label>Model/Serial Number (optional)</label>
            <input
              type="text"
              placeholder="Model or serial number"
              value={formData.applianceId}
              onChange={(e) => setFormData({ ...formData, applianceId: e.target.value })}
              className="input-field"
            />
          </div>

          <button
            className="next-btn"
            onClick={() => setStep(2)}
            disabled={!formData.applianceName || !formData.applianceType}
          >
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="maintenance-step">
          <button className="back-btn" onClick={() => setStep(1)}>← Back</button>

          <h3>Service Details</h3>

          <div className="form-group">
            <label>Service Type</label>
            <div className="service-type-options">
              {serviceTypes.map(service => (
                <button
                  key={service.id}
                  className={`service-option ${formData.serviceType === service.id ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, serviceType: service.id })}
                >
                  <div className="option-title">{service.label}</div>
                  <div className="option-desc">{service.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Preferred Date</label>
            <input
              type="date"
              value={formData.preferredDate}
              onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
              className="input-field"
            />
          </div>

          {formData.applianceType && commonIssues[formData.applianceType] && (
            <div className="form-group">
              <label>Issues/Concerns</label>
              <div className="issues-checklist">
                {commonIssues[formData.applianceType].map(issue => (
                  <label key={issue} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.issues.includes(issue)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData(prev => ({
                            ...prev,
                            issues: [...prev.issues, issue]
                          }))
                        } else {
                          setFormData(prev => ({
                            ...prev,
                            issues: prev.issues.filter(i => i !== issue)
                          }))
                        }
                      }}
                    />
                    {issue}
                  </label>
                ))}
              </div>
            </div>
          )}

          <button
            className="schedule-btn"
            onClick={handleScheduleMaintenance}
            disabled={loading || !formData.applianceType}
          >
            {loading ? 'Scheduling...' : 'Schedule Maintenance'}
          </button>
        </div>
      )}

      {step === 3 && schedule && (
        <div className="maintenance-step confirmation">
          <h3>✅ Maintenance Scheduled</h3>

          <div className="confirmation-details">
            <div className="detail-row">
              <span className="label">Appointment ID:</span>
              <span className="value">{schedule.appointment_id}</span>
            </div>

            <div className="detail-row">
              <span className="label">Appliance:</span>
              <span className="value">{formData.applianceName}</span>
            </div>

            <div className="detail-row">
              <span className="label">Service Type:</span>
              <span className="value">{formData.serviceType}</span>
            </div>

            {schedule.scheduled_time && (
              <div className="detail-row">
                <span className="label">Scheduled Date:</span>
                <span className="value">
                  {new Date(schedule.scheduled_time).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            )}

            <div className="detail-row">
              <span className="label">Estimated Duration:</span>
              <span className="value">{schedule.estimated_duration}</span>
            </div>

            {formData.issues.length > 0 && (
              <div className="detail-row">
                <span className="label">Issues to Address:</span>
                <span className="value">
                  {formData.issues.map((issue, idx) => (
                    <div key={idx}>• {issue}</div>
                  ))}
                </span>
              </div>
            )}
          </div>

          <div className="next-steps">
            <h4>📋 What's Next?</h4>
            <ol>
              <li>A confirmation email will be sent to your registered email</li>
              <li>We'll call 24 hours before your appointment</li>
              <li>Our technician will arrive within the scheduled time window</li>
              <li>Payment can be made via cash, card, or online</li>
            </ol>
          </div>

          <div className="confirmation-actions">
            <button className="edit-btn" onClick={() => { setStep(2); setSchedule(null) }}>
              Edit Schedule
            </button>
            <button className="done-btn" onClick={() => {
              setStep(1)
              setSchedule(null)
              setFormData({
                applianceId: '',
                applianceName: '',
                applianceType: '',
                serviceType: 'routine',
                preferredDate: '',
                issues: []
              })
            }}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
