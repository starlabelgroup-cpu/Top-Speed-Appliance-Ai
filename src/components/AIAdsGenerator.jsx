import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { openaiService } from '../services/openaiService'
import { geminiService } from '../services/geminiService'
import { googleAdsService } from '../services/googleAdsService'
import { adsDatabase } from '../services/adsDatabase'
import '../styles/ai-ads-generator.css'

function AIAdsGenerator() {
  const [launchComplete, setLaunchComplete] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  // Form controls
  const [productCategory, setProductCategory] = useState('refrigerators')
  const [platform, setPlatform] = useState('facebook')
  const [audience, setAudience] = useState('homeowners')
  const [tone, setTone] = useState('urgent')
  const [budget, setBudget] = useState(100)
  const [generationSpeed, setGenerationSpeed] = useState('medium')
  const [adLimit, setAdLimit] = useState(50)

  // Toggle controls
  const [autoGeneration, setAutoGeneration] = useState(false)
  const [autoPublish, setAutoPublish] = useState(false)
  const [abTesting, setAbTesting] = useState(true)
  const [budgetOptimization, setBudgetOptimization] = useState(true)

  // Generated ads and metrics
  const [generatedAds, setGeneratedAds] = useState([])
  const [metrics, setMetrics] = useState({
    adsGenerated: 0,
    adsPublished: 0,
    estimatedReach: '0',
    systemUptime: '100%'
  })
  const [activityFeed, setActivityFeed] = useState([])
  const [platformStats, setPlatformStats] = useState({
    facebook: { ads: 0, ctr: '0%', cpc: '$0', conversions: 0 },
    google: { ads: 0, ctr: '0%', cpc: '$0', conversions: 0 }
  })

  // Google Ads Analysis State
  const [wastedSpendData, setWastedSpendData] = useState([])
  const [geminiAnalysis, setGeminiAnalysis] = useState(null)
  const [analysisLoading, setAnalysisLoading] = useState(false)
  const [analysisError, setAnalysisError] = useState(null)
  const [savedAnalyses, setSavedAnalyses] = useState([])

  // Load initial data
  useEffect(() => {
    startLaunchSequence()
    loadAds()
    loadMetrics()
  }, [])

  const startLaunchSequence = () => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      if (progress >= 100) {
        clearInterval(interval)
        setLaunchComplete(true)
        addActivity('System startup complete', 'success')
      }
    }, 400)
  }

  const loadAds = async () => {
    try {
      const ads = await adsDatabase.getAds()
      setGeneratedAds(ads)
    } catch (err) {
      console.error('Failed to load ads:', err)
    }
  }

  const loadMetrics = async () => {
    try {
      const dbMetrics = await adsDatabase.getMetrics()
      setMetrics(prev => ({
        ...prev,
        adsGenerated: dbMetrics?.totalGenerated || 0,
        adsPublished: dbMetrics?.totalPublished || 0
      }))

      setPlatformStats({
        facebook: {
          ...platformStats.facebook,
          ads: dbMetrics?.byPlatform?.facebook || 0
        },
        google: {
          ...platformStats.google,
          ads: dbMetrics?.byPlatform?.google || 0
        }
      })
    } catch (err) {
      console.error('Failed to load metrics:', err)
    }
  }

  const generateAds = async () => {
    setLoading(true)
    setError(null)
    try {
      const ads = await openaiService.generateAds({
        productCategory,
        platform,
        audience,
        tone,
        count: 3,
        budget
      })

      // Save ads to database
      for (const ad of ads) {
        try {
          await adsDatabase.saveAd({
            ...ad,
            productCategory,
            audience,
            tone
          })
        } catch (err) {
          console.warn('Failed to save individual ad:', err)
        }
      }

      setGeneratedAds(prev => [...ads, ...prev])
      addActivity(`AI generated ${ads.length} new ad variations`, 'robot')
      setSuccessMessage(`Successfully generated ${ads.length} new ads!`)
      setTimeout(() => setSuccessMessage(null), 3000)

      // Update metrics
      setMetrics(prev => ({
        ...prev,
        adsGenerated: prev.adsGenerated + ads.length
      }))
    } catch (err) {
      setError(err.message || 'Failed to generate ads. Check your OpenAI API key.')
      addActivity(`Ad generation failed: ${err.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  const approveAd = async (ad) => {
    try {
      await adsDatabase.updateAdStatus(ad.id, 'approved')
      setGeneratedAds(prev =>
        prev.map(a => a.id === ad.id ? { ...a, status: 'approved' } : a)
      )
      addActivity(`Ad approved: "${ad.headline}"`, 'check')
      setSuccessMessage('Ad approved!')
      setTimeout(() => setSuccessMessage(null), 2000)
    } catch (err) {
      setError('Failed to approve ad')
    }
  }

  const publishAd = async (ad) => {
    try {
      await adsDatabase.updateAdStatus(ad.id, 'published')
      setGeneratedAds(prev =>
        prev.map(a => a.id === ad.id ? { ...a, status: 'published' } : a)
      )
      addActivity(`Published ad to ${ad.platform === 'facebook' ? 'Facebook' : 'Google'} Ads`, 'broadcast')
      setMetrics(prev => ({
        ...prev,
        adsPublished: prev.adsPublished + 1
      }))
      setSuccessMessage('Ad published!')
      setTimeout(() => setSuccessMessage(null), 2000)
    } catch (err) {
      setError('Failed to publish ad')
    }
  }

  const deleteAd = async (ad) => {
    if (window.confirm('Are you sure you want to delete this ad?')) {
      try {
        await adsDatabase.deleteAd(ad.id)
        setGeneratedAds(prev => prev.filter(a => a.id !== ad.id))
        addActivity(`Ad deleted: "${ad.headline}"`, 'trash')
      } catch (err) {
        setError('Failed to delete ad')
      }
    }
  }

  const addActivity = (text, icon = 'info') => {
    const activity = {
      id: Date.now(),
      text,
      icon,
      time: 'Just now'
    }
    setActivityFeed(prev => [activity, ...prev].slice(0, 10))
  }

  const forceGenerateAds = () => {
    generateAds()
  }

  const toggleAutoGeneration = () => {
    setAutoGeneration(!autoGeneration)
    addActivity(
      autoGeneration ? 'Auto-generation disabled' : 'Auto-generation enabled',
      autoGeneration ? 'pause' : 'play'
    )
  }

  // Google Ads Analysis with Gemini
  const analyzeGoogleAds = async () => {
    setAnalysisLoading(true)
    setAnalysisError(null)
    try {
      // Mock wasted spend data for demo
      const mockWastedSpendData = [
        { searchTerm: 'free appliance repair', spend: 85.50, conversions: 0, impressions: 250 },
        { searchTerm: 'cheap refrigerator', spend: 72.30, conversions: 0, impressions: 180 },
        { searchTerm: 'appliance repair complaints', spend: 65.00, conversions: 0, impressions: 95 },
        { searchTerm: 'used appliances', spend: 58.75, conversions: 0, impressions: 140 },
        { searchTerm: 'appliance warranty', spend: 52.20, conversions: 0, impressions: 110 }
      ]

      setWastedSpendData(mockWastedSpendData)
      addActivity('Analyzing Google Ads performance data...', 'search')

      // Analyze with Gemini
      const analysis = await geminiService.analyzeGoogleAds(mockWastedSpendData)
      setGeminiAnalysis(analysis)
      addActivity('Gemini analysis completed', 'brain')

      // Save analysis to database
      try {
        await adsDatabase.saveAnalysis({
          type: 'google-ads-wasted-spend',
          data: mockWastedSpendData,
          analysis: analysis.analysis,
          timestamp: new Date().toISOString()
        })
        addActivity('Analysis saved to database', 'save')
      } catch (err) {
        console.warn('Failed to save analysis:', err)
      }

      setSuccessMessage('Google Ads analysis completed successfully!')
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err) {
      setAnalysisError(err.message || 'Failed to analyze Google Ads. Check your API keys.')
      addActivity(`Google Ads analysis failed: ${err.message}`, 'error')
    } finally {
      setAnalysisLoading(false)
    }
  }

  // Generate ads using Gemini instead of OpenAI
  const generateAdsWithGemini = async () => {
    setLoading(true)
    setError(null)
    try {
      const ads = await geminiService.generateAdCopy({
        productCategory,
        platform,
        audience,
        tone,
        count: 3,
        focusKeyword: 'appliance repair'
      })

      // Save ads to database
      for (const ad of ads) {
        try {
          await adsDatabase.saveAd({
            ...ad,
            productCategory,
            audience,
            tone
          })
        } catch (err) {
          console.warn('Failed to save ad:', err)
        }
      }

      setGeneratedAds(prev => [...ads, ...prev])
      addActivity(`Gemini generated ${ads.length} new ad variations`, 'robot')
      setSuccessMessage(`Successfully generated ${ads.length} new ads with Gemini!`)
      setTimeout(() => setSuccessMessage(null), 3000)

      setMetrics(prev => ({
        ...prev,
        adsGenerated: prev.adsGenerated + ads.length
      }))
    } catch (err) {
      setError(err.message || 'Failed to generate ads. Check your Gemini API key.')
      addActivity(`Ad generation failed: ${err.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  if (!launchComplete) {
    return (
      <section className="launch-screen" id="ads-launch">
        <div className="launch-content">
          <div className="launch-logo">
            <i className="fas fa-bolt"></i>
          </div>
          <div className="launch-title">TOP SPEED AI</div>
          <div className="launch-subtitle">Ad Generator System Launch</div>
          <div className="progress-container">
            <div className="progress-bar" id="progressBar"></div>
          </div>
          <div className="status-message" id="statusMessage">
            Initializing AI engine...
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="ai-ads-generator" className="ai-ads-generator-section">
      <div className="ads-back-link">
        <Link to="/">← Back to Home</Link>
      </div>

      {/* System Header */}
      <div className="system-header">
        <div className="system-title">
          <div className="system-icon">
            <i className="fas fa-bolt"></i>
          </div>
          <h1>AI Ad Generator System</h1>
        </div>
        <div className="system-status">
          <div className="status-indicator"></div>
          <div>SYSTEM ACTIVE • AI GENERATING ADS</div>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="alert alert-error">
          <i className="fas fa-exclamation-circle"></i>
          <span>{error}</span>
          <button onClick={() => setError(null)} className="alert-close">&times;</button>
        </div>
      )}
      {successMessage && (
        <div className="alert alert-success">
          <i className="fas fa-check-circle"></i>
          <span>{successMessage}</span>
        </div>
      )}

      <div className="dashboard-layout">
        {/* Control Panel */}
        <div className="control-panel">
          <div className="panel-section">
            <div className="panel-title">AI CONTROLS</div>
            <div className="ai-controls">
              <div className="control-item">
                <label>Auto-Generation</label>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={autoGeneration}
                    onChange={toggleAutoGeneration}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="control-item">
                <label>Auto-Publish</label>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={autoPublish}
                    onChange={() => setAutoPublish(!autoPublish)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="control-item">
                <label>A/B Testing</label>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={abTesting}
                    onChange={() => setAbTesting(!abTesting)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="control-item">
                <label>Budget Optimization</label>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={budgetOptimization}
                    onChange={() => setBudgetOptimization(!budgetOptimization)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="panel-section">
            <div className="panel-title">SETTINGS</div>
            <div className="ai-controls">
              <div className="control-item-full">
                <label>Generation Speed</label>
                <select
                  value={generationSpeed}
                  onChange={(e) => setGenerationSpeed(e.target.value)}
                  className="select-control"
                >
                  <option value="slow">Slow (Quality)</option>
                  <option value="medium">Medium (Balanced)</option>
                  <option value="fast">Fast (Volume)</option>
                </select>
              </div>

              <div className="control-item-full">
                <label>Daily Ad Limit</label>
                <input
                  type="number"
                  value={adLimit}
                  onChange={(e) => setAdLimit(parseInt(e.target.value))}
                  min="10"
                  max="500"
                  className="input-control"
                />
              </div>
            </div>
          </div>

          <div className="panel-section">
            <div className="panel-title">QUICK ACTIONS</div>
            <div className="quick-actions">
              <button
                className="btn-action"
                onClick={forceGenerateAds}
                disabled={loading}
              >
                <i className="fas fa-bolt"></i> Generate Ads
              </button>
              <button className="btn-action" onClick={() => {}}>
                <i className="fas fa-pause"></i> Pause System
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="content-area">
          {/* Metrics */}
          <div className="system-metrics">
            <div className="metric-card">
              <div className="metric-label">GENERATED TODAY</div>
              <div className="metric-value">{metrics.adsGenerated}</div>
              <div className="metric-label-small">Total ads created</div>
            </div>

            <div className="metric-card">
              <div className="metric-label">PUBLISHED</div>
              <div className="metric-value">{metrics.adsPublished}</div>
              <div className="metric-label-small">Across platforms</div>
            </div>

            <div className="metric-card">
              <div className="metric-label">ESTIMATED REACH</div>
              <div className="metric-value">2.4M</div>
              <div className="metric-label-small">Potential impressions</div>
            </div>

            <div className="metric-card">
              <div className="metric-label">SYSTEM UPTIME</div>
              <div className="metric-value">100%</div>
              <div className="metric-label-small">No issues</div>
            </div>
          </div>

          {/* Ad Controls */}
          <div className="ad-controls-section">
            <h3>Generation Settings</h3>
            <div className="controls-grid">
              <div className="control-group">
                <label>Product Category</label>
                <select
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                >
                  <option value="all">All Appliances</option>
                  <option value="refrigerators">Refrigerators</option>
                  <option value="washers">Washers & Dryers</option>
                  <option value="ovens">Ovens & Ranges</option>
                  <option value="dishwashers">Dishwashers</option>
                  <option value="microwaves">Microwaves</option>
                </select>
              </div>

              <div className="control-group">
                <label>Platform</label>
                <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                  <option value="all">All Platforms</option>
                  <option value="facebook">Facebook & Instagram</option>
                  <option value="google">Google Ads</option>
                </select>
              </div>

              <div className="control-group">
                <label>Target Audience</label>
                <select value={audience} onChange={(e) => setAudience(e.target.value)}>
                  <option value="all">All Audiences</option>
                  <option value="homeowners">Homeowners</option>
                  <option value="renters">Renters</option>
                  <option value="business">Business Owners</option>
                  <option value="firsttime">First-Time Buyers</option>
                </select>
              </div>

              <div className="control-group">
                <label>Ad Tone</label>
                <select value={tone} onChange={(e) => setTone(e.target.value)}>
                  <option value="professional">Professional</option>
                  <option value="urgent">Urgent & Sale-Focused</option>
                  <option value="friendly">Friendly & Helpful</option>
                  <option value="luxury">Luxury & Premium</option>
                </select>
              </div>

              <div className="control-group">
                <label>Daily Budget ($)</label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(parseInt(e.target.value))}
                  min="10"
                  max="10000"
                />
              </div>
            </div>

            <button
              className="btn-generate"
              onClick={generateAds}
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Generating...
                </>
              ) : (
                <>
                  <i className="fas fa-magic"></i> Generate New Ads
                </>
              )}
            </button>
          </div>

          {/* Generated Ads */}
          <div className="generated-ads-section">
            <h3>Generated Ads ({generatedAds.length})</h3>
            {generatedAds.length === 0 ? (
              <div className="empty-state">
                <i className="fas fa-inbox"></i>
                <p>No ads generated yet. Create your first ad by clicking "Generate New Ads"</p>
              </div>
            ) : (
              <div className="ads-grid">
                {generatedAds.map((ad) => (
                  <div key={ad.id} className="ad-card">
                    <div className={`ad-platform ${ad.platform}`}>
                      <i className={`fab fa-${ad.platform === 'facebook' ? 'facebook-f' : 'google'}`}></i>
                      {ad.platform === 'facebook' ? 'Facebook & Instagram' : 'Google Ads'}
                      {ad.status === 'published' && (
                        <span className="status-badge published">Published</span>
                      )}
                      {ad.status === 'approved' && (
                        <span className="status-badge approved">Approved</span>
                      )}
                    </div>

                    <div className="ad-content">
                      <h4 className="ad-headline">{ad.headline}</h4>
                      <p className="ad-description">{ad.description}</p>
                      <div className="ad-cta">{ad.cta}</div>
                    </div>

                    <div className="ad-footer">
                      <div className="ad-meta">
                        <span className="meta-item">{ad.keyPoint}</span>
                      </div>
                      <div className="ad-actions">
                        {ad.status !== 'published' && (
                          <>
                            {ad.status !== 'approved' && (
                              <button
                                className="action-btn approve"
                                onClick={() => approveAd(ad)}
                                title="Approve ad"
                              >
                                <i className="fas fa-check"></i>
                              </button>
                            )}
                            {ad.status === 'approved' && (
                              <button
                                className="action-btn publish"
                                onClick={() => publishAd(ad)}
                                title="Publish ad"
                              >
                                <i className="fas fa-paper-plane"></i>
                              </button>
                            )}
                          </>
                        )}
                        <button
                          className="action-btn delete"
                          onClick={() => deleteAd(ad)}
                          title="Delete ad"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Google Ads Analysis Section */}
          <div className="google-ads-analysis-section">
            <h3>Google Ads Performance Analysis</h3>

            {analysisError && (
              <div className="alert alert-error">
                <i className="fas fa-exclamation-circle"></i>
                <span>{analysisError}</span>
                <button onClick={() => setAnalysisError(null)} className="alert-close">&times;</button>
              </div>
            )}

            <div className="analysis-controls">
              <button
                className="btn-action"
                onClick={analyzeGoogleAds}
                disabled={analysisLoading}
              >
                {analysisLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Analyzing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-brain"></i> Analyze Wasted Spend
                  </>
                )}
              </button>
              <button
                className="btn-action"
                onClick={generateAdsWithGemini}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Generating...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sparkles"></i> Generate with Gemini
                  </>
                )}
              </button>
            </div>

            {/* Wasted Spend Data */}
            {wastedSpendData.length > 0 && (
              <div className="wasted-spend-container">
                <h4>Wasted Spend Terms (High Cost, Zero Conversions)</h4>
                <div className="terms-list">
                  {wastedSpendData.map((item, idx) => (
                    <div key={idx} className="term-item">
                      <div className="term-info">
                        <span className="term-text">{item.searchTerm}</span>
                        <span className="term-metrics">
                          Spent: ${item.spend.toFixed(2)} | Impressions: {item.impressions}
                        </span>
                      </div>
                      <span className="warning-badge">0 Conversions</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gemini Analysis Results */}
            {geminiAnalysis && (
              <div className="gemini-analysis-container">
                <h4>Gemini AI Recommendations</h4>
                <div className="analysis-content">
                  <p>{geminiAnalysis.analysis}</p>
                  <div className="analysis-meta">
                    <span className="meta-badge">{geminiAnalysis.model}</span>
                    <span className="meta-timestamp">{new Date(geminiAnalysis.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            {wastedSpendData.length === 0 && !geminiAnalysis && (
              <div className="empty-analysis-state">
                <i className="fas fa-chart-line"></i>
                <p>Click "Analyze Wasted Spend" to identify underperforming keywords and get AI-powered recommendations</p>
              </div>
            )}
          </div>

          {/* Activity Feed */}
          <div className="activity-section">
            <h3>System Activity</h3>
            <div className="activity-list">
              {activityFeed.length === 0 ? (
                <p className="no-activity">No recent activity</p>
              ) : (
                activityFeed.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      <i className={`fas fa-${activity.icon}`}></i>
                    </div>
                    <div className="activity-text">
                      <p>{activity.text}</p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AIAdsGenerator
