import React, { useState } from 'react'
import { agentService } from '../services/agentService'

export default function RecommendationMode({ sessionId, onNotify }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    applianceType: '',
    budget: 2000,
    features: [],
    energyEfficiency: 'medium',
    space: {}
  })
  const [recommendations, setRecommendations] = useState(null)
  const [loading, setLoading] = useState(false)

  const appliances = ['Refrigerator', 'Washer', 'Dryer', 'Oven', 'Dishwasher', 'Microwave']
  
  const featuresByType = {
    'Refrigerator': ['Smart Home', 'Ice Maker', 'Water Dispenser', 'French Door', 'Energy Star', 'Inverter Compressor'],
    'Washer': ['Steam Clean', 'Smart Connect', 'Large Capacity', 'Quiet Operation', 'Energy Star', 'Auto Detergent'],
    'Dryer': ['Steam Refresh', 'Smart Sensing', 'Quick Dry', 'Quiet Operation', 'Energy Star', 'Sanitize Cycle'],
    'Oven': ['Convection', 'Self-Cleaning', 'Smart Preheating', 'Multiple Racks', 'Induction', 'Wifi Control'],
    'Dishwasher': ['Quiet Operation', 'Multiple Cycles', 'Energy Star', 'Soil Sensors', 'Smart Control', 'Quick Wash'],
    'Microwave': ['Sensor Cooking', 'Smart Presets', 'Quiet Operation', 'Compact Size', 'Inverter Tech', 'Quick Reheat']
  }

  const handleGetRecommendations = async () => {
    if (!formData.applianceType) {
      onNotify('Please select an appliance type', 'warning')
      return
    }

    setLoading(true)
    try {
      const response = await agentService.getRecommendations({
        appliance_type: formData.applianceType.toLowerCase(),
        budget: formData.budget,
        required_features: formData.features,
        energy_efficiency_preference: formData.energyEfficiency
      }, sessionId)

      if (response.success) {
        setRecommendations(response.recommendations)
        setStep(2)
        onNotify('Found great options for you!', 'success')
      } else {
        onNotify('Failed to get recommendations', 'error')
      }
    } catch (error) {
      onNotify('Recommendations are temporarily unavailable. Please try again shortly.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="recommendation-mode">
      {step === 1 && (
        <div className="recommendation-step">
          <h3>Find Your Perfect Appliance</h3>

          <div className="form-group">
            <label>What appliance are you looking for?</label>
            <div className="appliance-options">
              {appliances.map(app => (
                <button
                  key={app}
                  className={`appliance-option ${formData.applianceType === app ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, applianceType: app })}
                >
                  {app}
                </button>
              ))}
            </div>
          </div>

          {formData.applianceType && (
            <>
              <div className="form-group">
                <label>Budget: ${formData.budget}</label>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="100"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
                  className="budget-slider"
                />
                <div className="budget-labels">
                  <span>$500</span>
                  <span>$5000+</span>
                </div>
              </div>

              <div className="form-group">
                <label>Energy Efficiency</label>
                <div className="energy-options">
                  {['low', 'medium', 'high'].map(level => (
                    <button
                      key={level}
                      className={`energy-btn ${formData.energyEfficiency === level ? 'selected' : ''}`}
                      onClick={() => setFormData({ ...formData, energyEfficiency: level })}
                    >
                      {level === 'low' && '💚 Standard'}
                      {level === 'medium' && '💛 Energy Efficient'}
                      {level === 'high' && '💚 Premium Efficient'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Must-Have Features</label>
                <div className="features-grid">
                  {featuresByType[formData.applianceType]?.map(feature => (
                    <button
                      key={feature}
                      className={`feature-btn ${formData.features.includes(feature) ? 'selected' : ''}`}
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          features: prev.features.includes(feature)
                            ? prev.features.filter(f => f !== feature)
                            : [...prev.features, feature]
                        }))
                      }}
                    >
                      ✓ {feature}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="recommend-btn"
                onClick={handleGetRecommendations}
                disabled={loading}
              >
                {loading ? 'Finding Options...' : 'Get Recommendations'}
              </button>
            </>
          )}
        </div>
      )}

      {step === 2 && recommendations && (
        <div className="recommendation-step results">
          <button className="back-btn" onClick={() => { setStep(1); setRecommendations(null) }}>← Back</button>
          
          <h3>Top Recommendations</h3>

          <div className="recommendations-list">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="recommendation-card">
                <div className="rec-header">
                  <h4>{rec.brand} {rec.model}</h4>
                  {idx === 0 && <span className="top-pick-badge">🏆 Best Match</span>}
                </div>

                <div className="rec-price">
                  <span className="price">${rec.price?.toLocaleString()}</span>
                  {rec.original_price && rec.original_price > rec.price && (
                    <span className="original-price">${rec.original_price?.toLocaleString()}</span>
                  )}
                </div>

                {rec.energy_rating && (
                  <div className="energy-rating">
                    <span className="rating-label">Energy Rating:</span>
                    <span className="rating-value">{rec.energy_rating}</span>
                  </div>
                )}

                {rec.features && (
                  <div className="rec-features">
                    <h5>Key Features:</h5>
                    <ul>
                      {rec.features.slice(0, 5).map((feature, i) => (
                        <li key={i}>✓ {feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {rec.warranty && (
                  <div className="rec-warranty">
                    <strong>Warranty:</strong> {rec.warranty}
                  </div>
                )}

                {rec.rating && (
                  <div className="rec-rating">
                    <strong>Customer Rating:</strong> {rec.rating}/5 ⭐
                  </div>
                )}

                <div className="rec-actions">
                  <button className="view-btn" onClick={() => onNotify(`Viewing ${rec.brand} ${rec.model}`)}>
                    View Details
                  </button>
                  <button className="buy-btn" onClick={() => onNotify('Redirecting to store...')}>
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="recommendation-tips">
            <h4>💡 Tips for Buying</h4>
            <ul>
              <li>Compare warranties across brands</li>
              <li>Check installation costs</li>
              <li>Look for seasonal sales and rebates</li>
              <li>Read customer reviews carefully</li>
              <li>Ask about trade-in programs</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
