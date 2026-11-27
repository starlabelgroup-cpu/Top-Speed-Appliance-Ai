// Mock database layer for development (no PostgreSQL required)
// In production, this should be replaced with a real PostgreSQL connection

let campaigns = []
let leads = []
let generatedAds = []
let nextCampaignId = 1
let nextLeadId = 1
let nextAdId = 1

// Initialize sample data
campaigns.push({
  id: nextCampaignId++,
  name: 'Refrigerator Repair Campaign',
  budget_micros: 500000000,
  status: 'Active',
  created_at: new Date(),
  updated_at: new Date()
})

export const mockDatabase = {
  // Campaigns
  getCampaigns: async () => {
    return campaigns
  },

  createCampaign: async (name, budget_micros, status = 'Active') => {
    const campaign = {
      id: nextCampaignId++,
      name,
      budget_micros,
      status,
      created_at: new Date(),
      updated_at: new Date()
    }
    campaigns.push(campaign)
    return campaign
  },

  // Leads
  getLeads: async (limit = 100) => {
    return leads.slice(-limit).reverse()
  },

  createLead: async (name, phone, email = null, service = 'General Repair', campaign = 'Direct', status = 'New') => {
    const lead = {
      id: nextLeadId++,
      name,
      phone,
      email,
      service,
      campaign,
      status,
      paid: false,
      revenue: null,
      timestamp: new Date(),
      updated_at: new Date()
    }
    leads.push(lead)
    return lead
  },

  markLeadPaid: async (leadId) => {
    const lead = leads.find(l => l.id === leadId)
    if (lead) {
      lead.paid = true
      lead.updated_at = new Date()
      return lead
    }
    return null
  },

  updateLeadStatus: async (leadId, status) => {
    const lead = leads.find(l => l.id === leadId)
    if (lead) {
      lead.status = status
      lead.updated_at = new Date()
      return lead
    }
    return null
  },

  // Generated Ads
  getGeneratedAds: async (limit = 50) => {
    return generatedAds.slice(-limit).reverse()
  },

  saveGeneratedAd: async (ad) => {
    const newAd = {
      id: nextAdId++,
      ...ad,
      created_at: new Date()
    }
    generatedAds.push(newAd)
    return newAd
  },

  // Stats
  getStats: async () => {
    const totalLeads = leads.length
    const paidLeads = leads.filter(l => l.paid).length
    const totalRevenue = leads
      .filter(l => l.paid && l.revenue)
      .reduce((sum, l) => sum + parseInt(l.revenue || 0), 0)
    const activeCampaigns = campaigns.filter(c => c.status === 'Active').length

    return {
      totalLeads,
      totalRevenue: Math.round(totalRevenue),
      conversionRate: totalLeads > 0 ? Math.round((paidLeads / totalLeads) * 100) : 0,
      activeCampaigns
    }
  }
}

// Helper to mock PostgreSQL pool.query interface
export const mockPool = {
  query: async (sql, params = []) => {
    // Handle common SQL patterns
    if (sql.includes('SELECT * FROM campaigns')) {
      return { rows: campaigns }
    }
    if (sql.includes('SELECT * FROM leads')) {
      return { rows: leads.slice().reverse().slice(0, 100) }
    }
    if (sql.includes('SELECT COUNT(*) as total FROM leads')) {
      return { rows: [{ total: leads.length }] }
    }
    if (sql.includes('SELECT COALESCE(SUM(CAST(revenue AS NUMERIC)), 0) as total FROM leads WHERE paid = true')) {
      const total = leads
        .filter(l => l.paid && l.revenue)
        .reduce((sum, l) => sum + parseInt(l.revenue || 0), 0)
      return { rows: [{ total }] }
    }
    if (sql.includes('SELECT COUNT(*) as total FROM leads WHERE paid = true')) {
      return { rows: [{ total: leads.filter(l => l.paid).length }] }
    }
    if (sql.includes('SELECT COUNT(*) as total FROM campaigns WHERE status = $1')) {
      return { rows: [{ total: campaigns.filter(c => c.status === params[0]).length }] }
    }
    if (sql.includes('INSERT INTO leads')) {
      const lead = {
        id: nextLeadId++,
        name: params[0],
        phone: params[1],
        email: params[2],
        service: params[3],
        campaign: params[4],
        status: params[5],
        paid: false,
        timestamp: new Date(),
        updated_at: new Date()
      }
      leads.push(lead)
      return { rows: [lead] }
    }
    if (sql.includes('INSERT INTO campaigns')) {
      const campaign = {
        id: nextCampaignId++,
        name: params[0],
        budget_micros: params[1],
        status: params[2],
        created_at: new Date(),
        updated_at: new Date()
      }
      campaigns.push(campaign)
      return { rows: [campaign] }
    }
    if (sql.includes('UPDATE leads SET paid = true')) {
      const lead = leads.find(l => l.id === params[1])
      if (lead) {
        lead.paid = true
        lead.updated_at = new Date()
        return { rows: [lead] }
      }
      return { rows: [] }
    }
    if (sql.includes('UPDATE leads SET status = $1')) {
      const lead = leads.find(l => l.id === params[1])
      if (lead) {
        lead.status = params[0]
        lead.updated_at = new Date()
        return { rows: [lead] }
      }
      return { rows: [] }
    }
    if (sql.includes('INSERT INTO generated_ads')) {
      const ad = {
        id: nextAdId++,
        headline1: params[0],
        headline2: params[1],
        headline3: params[2],
        description1: params[3],
        description2: params[4],
        final_url: params[5],
        status: params[6],
        platform: params[7],
        created_at: new Date()
      }
      generatedAds.push(ad)
      return { rows: [ad] }
    }
    return { rows: [] }
  }
}
