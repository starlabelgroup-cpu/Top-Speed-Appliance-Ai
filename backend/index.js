import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import pkg from 'pg'
import dotenv from 'dotenv'
import twilio from 'twilio'
import { google } from 'googleapis'
import { googleAdsManager } from './googleAdsManager.js'
import { geminiAdGenerator } from './geminiAdGenerator.js'

dotenv.config()

const { Pool } = pkg
const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Database Pool
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'topspeed_dashboard',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432
})

// Twilio Client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

// Gmail Service Account Auth
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GMAIL_SERVICE_ACCOUNT_KEY || './service-account.json',
  scopes: ['https://www.googleapis.com/auth/gmail.send']
})
const gmail = google.gmail({ version: 'v1', auth })

// Test database connection
pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('Database connection error:', err)
  } else {
    console.log('Database connected:', result.rows[0])
  }
})

// Routes

// GET /api/campaigns - Fetch campaigns
app.get('/api/campaigns', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM campaigns ORDER BY name ASC')
    res.json(result.rows)
  } catch (err) {
    console.error('Error fetching campaigns:', err)
    res.status(500).json({ error: err.message })
  }
})

// GET /api/leads - Fetch leads
app.get('/api/leads', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM leads ORDER BY timestamp DESC LIMIT 100'
    )
    res.json(result.rows)
  } catch (err) {
    console.error('Error fetching leads:', err)
    res.status(500).json({ error: err.message })
  }
})

// GET /api/stats - Get dashboard statistics
app.get('/api/stats', async (req, res) => {
  try {
    const leadsResult = await pool.query('SELECT COUNT(*) as total FROM leads')
    const revenueResult = await pool.query(
      'SELECT COALESCE(SUM(CAST(revenue AS NUMERIC)), 0) as total FROM leads WHERE paid = true'
    )
    const paidResult = await pool.query(
      'SELECT COUNT(*) as total FROM leads WHERE paid = true'
    )
    const campaignsResult = await pool.query(
      'SELECT COUNT(*) as total FROM campaigns WHERE status = $1',
      ['Active']
    )

    const totalLeads = parseInt(leadsResult.rows[0].total) || 0
    const totalRevenue = parseFloat(revenueResult.rows[0].total) || 0
    const paidLeads = parseInt(paidResult.rows[0].total) || 0
    const activeCampaigns = parseInt(campaignsResult.rows[0].total) || 0

    const conversionRate = totalLeads > 0 ? Math.round((paidLeads / totalLeads) * 100) : 0

    res.json({
      totalLeads,
      totalRevenue: Math.round(totalRevenue),
      conversionRate,
      activeCampaigns
    })
  } catch (err) {
    console.error('Error fetching stats:', err)
    res.status(500).json({
      totalLeads: 0,
      totalRevenue: 0,
      conversionRate: 0,
      activeCampaigns: 0
    })
  }
})

// POST /api/leads/:id/paid - Mark lead as paid
app.post('/api/leads/:id/paid', async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'UPDATE leads SET paid = true, updated_at = NOW() WHERE id = $1 RETURNING *',
      [id]
    )
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Lead not found' })
    }

    res.json({ success: true, lead: result.rows[0] })
  } catch (err) {
    console.error('Error marking lead as paid:', err)
    res.status(500).json({ error: err.message })
  }
})

// POST /api/leads/:id/call - Initiate Twilio call
app.post('/api/leads/:id/call', async (req, res) => {
  try {
    const { id } = req.params
    const { phone } = req.body

    if (!phone) {
      return res.status(400).json({ error: 'Phone number required' })
    }

    // Update lead status
    await pool.query(
      'UPDATE leads SET status = $1, updated_at = NOW() WHERE id = $2',
      ['Called', id]
    )

    // Initiate Twilio call (optional - requires TwiML)
    if (process.env.TWILIO_ACCOUNT_SID) {
      try {
        await twilioClient.calls.create({
          from: process.env.TWILIO_PHONE_NUMBER,
          to: phone,
          url: process.env.TWILIO_TWIML_URL || 'http://demo.twilio.com/docs/voice.xml'
        })
      } catch (twilioErr) {
        console.warn('Twilio call initiation warning:', twilioErr.message)
      }
    }

    res.json({ success: true, message: 'Call initiated' })
  } catch (err) {
    console.error('Error initiating call:', err)
    res.status(500).json({ error: err.message })
  }
})

// POST /api/leads/:id/email - Send email via Gmail
app.post('/api/leads/:id/email', async (req, res) => {
  try {
    const { id } = req.params
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email required' })
    }

    // Get lead details
    const leadResult = await pool.query('SELECT * FROM leads WHERE id = $1', [id])
    if (leadResult.rows.length === 0) {
      return res.status(404).json({ error: 'Lead not found' })
    }

    const lead = leadResult.rows[0]

    // Construct email
    const message = [
      `From: ${process.env.GMAIL_FROM}`,
      `To: ${email}`,
      'Subject: Follow-up from Top Speed Appliance',
      'Content-Type: text/html; charset="UTF-8"',
      '',
      `<html>`,
      `<body>`,
      `<h2>Hi ${lead.name},</h2>`,
      `<p>Thank you for your interest in Top Speed Appliance repairs!</p>`,
      `<p><strong>Service Requested:</strong> ${lead.service}</p>`,
      `<p>We're ready to help with your appliance needs. Call us today for a free quote!</p>`,
      `<p><strong>Phone:</strong> ${process.env.COMPANY_PHONE || '(555) 123-4567'}</p>`,
      `<p>Best regards,<br>Top Speed Appliance Team</p>`,
      `</body>`,
      `</html>`
    ].join('\n')

    // Send via Gmail if configured
    if (process.env.GMAIL_SERVICE_ACCOUNT_KEY) {
      try {
        const base64Message = Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_')
        
        await gmail.users.messages.send({
          userId: 'me',
          requestBody: {
            raw: base64Message
          }
        })
      } catch (gmailErr) {
        console.warn('Gmail send warning:', gmailErr.message)
      }
    }

    // Update lead status
    await pool.query(
      'UPDATE leads SET status = $1, updated_at = NOW() WHERE id = $2',
      ['Emailed', id]
    )

    res.json({ success: true, message: 'Email sent' })
  } catch (err) {
    console.error('Error sending email:', err)
    res.status(500).json({ error: err.message })
  }
})

// POST /api/leads - Create new lead
app.post('/api/leads', async (req, res) => {
  try {
    const { name, phone, email, service, campaign } = req.body

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone required' })
    }

    const result = await pool.query(
      'INSERT INTO leads (name, phone, email, service, campaign, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, phone, email || null, service || 'General Repair', campaign || 'Direct', 'New']
    )

    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('Error creating lead:', err)
    res.status(500).json({ error: err.message })
  }
})

// POST /api/campaigns - Create new campaign
app.post('/api/campaigns', async (req, res) => {
  try {
    const { name, budget_micros, status } = req.body

    if (!name || !budget_micros) {
      return res.status(400).json({ error: 'Name and budget required' })
    }

    const result = await pool.query(
      'INSERT INTO campaigns (name, budget_micros, status) VALUES ($1, $2, $3) RETURNING *',
      [name, budget_micros, status || 'Active']
    )

    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('Error creating campaign:', err)
    res.status(500).json({ error: err.message })
  }
})

// ===== NEW: Google Ads & Gemini Integration Routes =====

// GET /api/google-ads/config - Get Google Ads configuration status
app.get('/api/google-ads/config', (req, res) => {
  const config = googleAdsManager.validateConfiguration()
  res.json(config)
})

// GET /api/gemini/config - Get Gemini configuration status
app.get('/api/gemini/config', (req, res) => {
  const config = geminiAdGenerator.validateConfiguration()
  res.json(config)
})

// POST /api/generate-ads - Generate ads using Gemini
app.post('/api/generate-ads', async (req, res) => {
  try {
    const {
      productCategory = 'refrigerator repair',
      platform = 'google',
      audience = 'homeowners',
      tone = 'urgent',
      count = 3
    } = req.body

    console.log('Generating ads with Gemini:', { productCategory, platform, audience, tone })

    const ads = await geminiAdGenerator.generateAdCopy({
      productCategory,
      platform,
      audience,
      tone,
      count
    })

    // Save generated ads to database
    for (const ad of ads) {
      try {
        await pool.query(
          'INSERT INTO generated_ads (headline1, headline2, headline3, description1, description2, final_url, status, platform) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
          [
            ad.headline1,
            ad.headline2,
            ad.headline3,
            ad.description1,
            ad.description2,
            ad.finalUrl || 'https://topspeedappliance.com',
            ad.status,
            ad.platform
          ]
        )
      } catch (dbErr) {
        console.warn('Could not save ad to database:', dbErr)
      }
    }

    res.json({
      success: true,
      count: ads.length,
      ads: ads
    })
  } catch (err) {
    console.error('Error generating ads:', err)
    res.status(500).json({ error: err.message })
  }
})

// POST /api/google-ads/create-campaign - Create campaign and auto-generate ads
app.post('/api/google-ads/create-campaign', async (req, res) => {
  try {
    const {
      name,
      budgetMicros,
      productCategory = 'appliance repair',
      tone = 'urgent'
    } = req.body

    if (!name || !budgetMicros) {
      return res.status(400).json({ error: 'Campaign name and budget required' })
    }

    // Create campaign
    const campaignResult = await googleAdsManager.createCampaign({
      name,
      budgetMicros
    })

    // Auto-generate ads for the campaign
    console.log('Auto-generating ads for new campaign:', name)
    const ads = await geminiAdGenerator.generateAdCopy({
      productCategory,
      platform: 'google',
      audience: 'homeowners',
      tone,
      count: 3,
      focusKeyword: name
    })

    // Save campaign to database
    const campaignRes = await pool.query(
      'INSERT INTO campaigns (name, budget_micros, status) VALUES ($1, $2, $3) RETURNING *',
      [name, budgetMicros, 'Active']
    )

    // Save generated ads
    for (const ad of ads) {
      try {
        await googleAdsManager.createAd(campaignRes.rows[0].id, {
          headline: ad.headline1,
          description: ad.description1,
          finalUrl: ad.finalUrl || 'https://topspeedappliance.com',
          displayUrl: 'topspeedappliance.com'
        })
      } catch (adErr) {
        console.warn('Could not create ad:', adErr)
      }
    }

    res.status(201).json({
      success: true,
      campaign: campaignRes.rows[0],
      generatedAds: ads
    })
  } catch (err) {
    console.error('Error creating campaign:', err)
    res.status(500).json({ error: err.message })
  }
})

// POST /api/optimize-ad - Analyze and optimize existing ad
app.post('/api/optimize-ad', async (req, res) => {
  try {
    const { adId, headline, description, clicks, impressions, conversions } = req.body

    const analysis = await geminiAdGenerator.analyzeAndOptimize({
      headline,
      description,
      clicks: clicks || 0,
      impressions: impressions || 0,
      conversions: conversions || 0
    })

    res.json({
      success: true,
      adId,
      analysis
    })
  } catch (err) {
    console.error('Error optimizing ad:', err)
    res.status(500).json({ error: err.message })
  }
})

// POST /api/generate-ad-variations - Generate variations of existing ad
app.post('/api/generate-ad-variations', async (req, res) => {
  try {
    const { headline1, description1, variationType = 'aggressive' } = req.body

    const variations = await geminiAdGenerator.generateVariations(
      { headline1, description1 },
      variationType
    )

    res.json({
      success: true,
      variations
    })
  } catch (err) {
    console.error('Error generating variations:', err)
    res.status(500).json({ error: err.message })
  }
})

// POST /api/metrics - Log analytics metrics
app.post('/api/metrics', (req, res) => {
  try {
    const { metric, data, timestamp, userAgent, url } = req.body

    console.log(`[${timestamp}] ${metric}:`, {
      url,
      userAgent: userAgent?.substring(0, 50) + '...',
      data
    })

    res.json({ success: true, received: true })
  } catch (err) {
    console.error('Error logging metric:', err)
    res.status(500).json({ error: err.message })
  }
})

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    googleAds: googleAdsManager.validateConfiguration(),
    gemini: geminiAdGenerator.validateConfiguration()
  })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`)
  console.log(`📊 Database: ${process.env.DB_NAME || 'topspeed_dashboard'}`)
  console.log(`📱 Twilio: ${process.env.TWILIO_ACCOUNT_SID ? 'Configured' : 'Not configured'}`)
  console.log(`📧 Gmail: ${process.env.GMAIL_SERVICE_ACCOUNT_KEY ? 'Configured' : 'Not configured'}`)
})
