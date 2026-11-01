-- Create campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  budget_micros BIGINT,
  status VARCHAR(50) DEFAULT 'Active',
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  ctr VARCHAR(10) DEFAULT '0%',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  service VARCHAR(255),
  campaign VARCHAR(255),
  status VARCHAR(50) DEFAULT 'New',
  paid BOOLEAN DEFAULT false,
  revenue NUMERIC(10, 2) DEFAULT 0,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_paid ON leads(paid);
CREATE INDEX IF NOT EXISTS idx_leads_campaign ON leads(campaign);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);

-- Insert sample campaigns
INSERT INTO campaigns (name, budget_micros, status, impressions, clicks, ctr)
VALUES
  ('Appliance Repair - Google Ads', 900000000, 'Active', 15420, 385, '2.5%'),
  ('Facebook - Refrigerator Repair', 500000000, 'Active', 8920, 156, '1.75%'),
  ('YouTube - Emergency Repair', 300000000, 'Paused', 5200, 89, '1.7%'),
  ('Display Network', 200000000, 'Active', 3450, 45, '1.3%')
ON CONFLICT DO NOTHING;

-- Create generated_ads table for Gemini-generated ad copies
CREATE TABLE IF NOT EXISTS generated_ads (
  id SERIAL PRIMARY KEY,
  headline1 VARCHAR(255),
  headline2 VARCHAR(255),
  headline3 VARCHAR(255),
  description1 TEXT,
  description2 TEXT,
  final_url VARCHAR(500),
  display_url VARCHAR(255),
  platform VARCHAR(50) DEFAULT 'google',
  status VARCHAR(50) DEFAULT 'draft',
  ctr VARCHAR(10) DEFAULT '0%',
  conversions INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for generated ads
CREATE INDEX IF NOT EXISTS idx_generated_ads_status ON generated_ads(status);
CREATE INDEX IF NOT EXISTS idx_generated_ads_platform ON generated_ads(platform);

-- Insert sample leads
INSERT INTO leads (name, phone, email, service, campaign, status, paid, revenue)
VALUES
  ('John Smith', '(305) 555-0101', 'john@example.com', 'Refrigerator Repair', 'Google Ads', 'New', false, 0),
  ('Sarah Johnson', '(305) 555-0102', 'sarah@example.com', 'Washer & Dryer Repair', 'Facebook', 'Called', true, 250),
  ('Mike Davis', '(305) 555-0103', 'mike@example.com', 'Oven & Stove Repair', 'Google Ads', 'New', false, 0),
  ('Lisa Anderson', '(305) 555-0104', 'lisa@example.com', 'Dishwasher Repair', 'YouTube', 'Converted', true, 350),
  ('Tom Wilson', '(305) 555-0105', 'tom@example.com', 'General Appliance Repair', 'Google Ads', 'Called', true, 300),
  ('Emma Brown', '(305) 555-0106', 'emma@example.com', 'Refrigerator Repair', 'Facebook', 'New', false, 0),
  ('Robert Taylor', '(305) 555-0107', 'robert@example.com', 'Washer & Dryer Repair', 'Google Ads', 'Converted', true, 275),
  ('Jessica White', '(305) 555-0108', 'jessica@example.com', 'Oven & Stove Repair', 'Display Network', 'New', false, 0)
ON CONFLICT DO NOTHING;
