import React, { useState } from 'react'
import { agentService } from '../services/agentService'

export default function DiagnosticMode({ sessionId, onNotify }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    applianceType: '',
    brand: '',
    model: '',
    symptoms: [],
    age: ''
  })
  const [diagnosis, setDiagnosis] = useState(null)
  const [loading, setLoading] = useState(false)

  const appliances = ['Refrigerator', 'Washer', 'Dryer', 'Oven', 'Dishwasher', 'Microwave', 'HVAC']
  const commonSymptoms = {
    'Refrigerator': ['Not cooling', 'Loud noise', 'Leaking water', 'Frost buildup', 'Door not sealing'],
    'Washer': ['Not spinning', 'Leaking water', 'Loud noise', 'Won\'t drain', 'Error codes'],
    'Dryer': ['Not heating', 'Takes too long', 'Loud noise', 'Not starting', 'Burning smell'],
    'Oven': ['Not heating', 'Uneven cooking', 'Burning smell', 'Door won\'t close', 'Display error'],
    'Dishwasher': ['Not cleaning', 'Not draining', 'Leaking', 'Loud noise', 'Arm not spinning'],
    'Microwave': ['Not heating', 'Sparking', 'Turntable stuck', 'Door stuck', 'Loud noise'],
    'HVAC': ['Not cooling', 'Not heating', 'Strange noise', 'Blowing cold air', 'Thermostat issues']
  }

  const handleApplianceSelect = (appliance) => {
    setFormData({ ...formData, applianceType: appliance, symptoms: [] })
    setStep(2)
  }

  const handleSymptomToggle = (symptom) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }))
  }

  const handleDiagnose = async () => {
    if (formData.symptoms.length === 0) {
      onNotify('Please select at least one symptom', 'warning')
      return
    }

    setLoading(true)
    try {
      const response = await agentService.diagnoseAppliance({
        appliance_type: formData.applianceType.toLowerCase(),
        symptoms: formData.symptoms,
        brand: formData.brand,
        model: formData.model
      }, sessionId)

      if (response.success) {
        setDiagnosis(response.diagnosis)
        setStep(3)
        onNotify('Diagnosis complete!', 'success')
      } else {
        onNotify('Failed to get diagnosis', 'error')
      }
    } catch (error) {
      console.error('Diagnosis error:', error)
      onNotify('Error analyzing appliance', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="diagnostic-mode">
      {step === 1 && (
        <div className="diagnostic-step">
          <h3>Select Your Appliance</h3>
          <div className="appliance-grid">
            {appliances.map(app => (
              <button
                key={app}
                className="appliance-btn"
                onClick={() => handleApplianceSelect(app)}
              >
                {app}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && formData.applianceType && (
        <div className="diagnostic-step">
          <button className="back-btn" onClick={() => setStep(1)}>← Back</button>
          
          <h3>What's wrong with your {formData.applianceType}?</h3>
          
          <div className="form-group">
            <label>Brand (optional)</label>
            <input
              type="text"
              placeholder="e.g., LG, Samsung, Whirlpool"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Model (optional)</label>
            <input
              type="text"
              placeholder="Model number"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Select Symptoms</label>
            <div className="symptoms-grid">
              {commonSymptoms[formData.applianceType]?.map(symptom => (
                <button
                  key={symptom}
                  className={`symptom-btn ${formData.symptoms.includes(symptom) ? 'selected' : ''}`}
                  onClick={() => handleSymptomToggle(symptom)}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          <button
            className="diagnose-btn"
            onClick={handleDiagnose}
            disabled={loading || formData.symptoms.length === 0}
          >
            {loading ? 'Analyzing...' : 'Get Diagnosis'}
          </button>
        </div>
      )}

      {step === 3 && diagnosis && (
        <div className="diagnostic-step diagnosis-result">
          <button className="back-btn" onClick={() => { setStep(2); setDiagnosis(null) }}>← Back</button>
          
          <h3>Diagnosis Results</h3>

          <div className="diagnosis-section">
            <h4>🎯 Likely Causes</h4>
            <ol>
              {diagnosis.likely_causes?.map((cause, idx) => (
                <li key={idx}>
                  {cause}
                  {diagnosis.probability && diagnosis.probability[idx] && (
                    <span className="probability"> ({(diagnosis.probability[idx] * 100).toFixed(0)}%)</span>
                  )}
                </li>
              ))}
            </ol>
          </div>

          <div className="diagnosis-section">
            <h4>⚠️ Severity</h4>
            <p className={`severity-badge severity-${diagnosis.severity}`}>
              {diagnosis.severity?.toUpperCase()}
            </p>
          </div>

          {diagnosis.immediate_actions && diagnosis.immediate_actions.length > 0 && (
            <div className="diagnosis-section">
              <h4>🚨 Immediate Actions</h4>
              <ul>
                {diagnosis.immediate_actions.map((action, idx) => (
                  <li key={idx}>{action}</li>
                ))}
              </ul>
            </div>
          )}

          {diagnosis.safety_warnings && diagnosis.safety_warnings.length > 0 && (
            <div className="diagnosis-section warning">
              <h4>⚠️ Safety Warnings</h4>
              <ul>
                {diagnosis.safety_warnings.map((warning, idx) => (
                  <li key={idx}>{warning}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="diagnosis-section">
            <h4>🔧 Repair Complexity</h4>
            <p>
              <strong>DIY Possible:</strong> {diagnosis.diy_possible ? '✅ Yes' : '❌ No'}
            </p>
            <p>
              <strong>Estimated Time:</strong> {diagnosis.estimated_repair_time}
            </p>
          </div>

          {diagnosis.parts_needed && diagnosis.parts_needed.length > 0 && (
            <div className="diagnosis-section">
              <h4>🛠️ Parts Needed</h4>
              <ul>
                {diagnosis.parts_needed.map((part, idx) => (
                  <li key={idx}>{part}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            className="schedule-service-btn"
            onClick={() => {
              onNotify('Redirecting to booking...', 'info')
              // Would trigger booking flow
            }}
          >
            Schedule Professional Service
          </button>
        </div>
      )}
    </div>
  )
}
