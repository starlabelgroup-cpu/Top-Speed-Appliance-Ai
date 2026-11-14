# AI Ad Manager - Complete Setup Guide

Complete system for managing Google Ads campaigns, leads, and revenue tracking for Top Speed Appliance with AI-powered insights.

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Frontend Setup](#frontend-setup)
3. [Backend Setup](#backend-setup)
4. [Database Setup](#database-setup)
5. [Environment Configuration](#environment-configuration)
6. [API Integration](#api-integration)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### For Development (5 minutes)

```bash
# Terminal 1: Start Frontend (already set up)
cd topspeed-appliance
npm run dev

# Terminal 2: Start Backend
cd backend
npm install
npm run dev

# Terminal 3: Set up Database
psql -U postgres -d topspeed_dashboard -f ../database/schema.sql

# Access Dashboard
# Frontend: http://localhost:5173/admin/ad-manager
# Backend API: http://localhost:5000
```

---

## 📱 Frontend Setup

### File Structure

```
src/
├── components/
│   └── AdManagerDashboard.jsx (NEW - Main dashboard component)
└── styles/
    └── ad-manager-dashboard.css (NEW - Dashboard styles)
```

### Route Added to App.jsx

```jsx
<Route
  path="/admin/ad-manager"
  element={adminAuth.hasAdminAccess() ? <AdManagerDashboard /> : <Navigate to="/admin/login" />}
/>
```

### Environment Variable (Frontend)

Add to your `.env` file:

```
VITE_API_URL=http://localhost:5000
```

### Features

- ✅ Campaign management & tracking
- ✅ Lead capture & management
- ✅ Real-time statistics
- ✅ Call & email integration
- ✅ Revenue tracking
- ✅ Conversion analytics
- ✅ Responsive design

---

## 🖥️ Backend Setup

### Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp ../.env.example .env
   # Edit .env with your credentials
   ```

4. **Start backend:**
   ```bash
   npm run dev    # Development with auto-reload
   # OR
   npm start      # Production
   ```

### Backend Structure

```
backend/
├── index.js         (Express server with all routes)
└── package.json     (Dependencies)
```

### Available Endpoints

#### GET /api/campaigns
Fetch all Google Ads campaigns

```bash
curl http://localhost:5000/api/campaigns
```

#### GET /api/leads
Fetch all leads

```bash
curl http://localhost:5000/api/leads
```

#### GET /api/stats
Get dashboard statistics

```bash
curl http://localhost:5000/api/stats
```

#### POST /api/leads/:id/paid
Mark a lead as paid job

```bash
curl -X POST http://localhost:5000/api/leads/1/paid
```

#### POST /api/leads/:id/call
Initiate a Twilio call

```bash
curl -X POST http://localhost:5000/api/leads/1/call \
  -H "Content-Type: application/json" \
  -d '{"phone": "+13055551234"}'
```

#### POST /api/leads/:id/email
Send an email to a lead

```bash
curl -X POST http://localhost:5000/api/leads/1/email \
  -H "Content-Type: application/json" \
  -d '{"email": "customer@example.com"}'
```

#### POST /api/leads
Create a new lead

```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "+13055551234",
    "email": "john@example.com",
    "service": "Refrigerator Repair",
    "campaign": "Google Ads"
  }'
```

#### POST /api/campaigns
Create a new campaign

```bash
curl -X POST http://localhost:5000/api/campaigns \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Campaign",
    "budget_micros": 500000000,
    "status": "Active"
  }'
```

#### GET /health
Health check endpoint

```bash
curl http://localhost:5000/health
```

---

## 🗄️ Database Setup

### Prerequisites

- PostgreSQL 12+ installed and running
- Database user created with password

### Setup Steps

1. **Create database:**
   ```bash
   createdb topspeed_dashboard
   ```

2. **Load schema:**
   ```bash
   psql -U postgres -d topspeed_dashboard -f database/schema.sql
   ```

3. **Verify installation:**
   ```bash
   psql -U postgres -d topspeed_dashboard -c "\dt"
   ```

### Schema

```sql
-- Campaigns table
campaigns (id, name, budget_micros, status, impressions, clicks, ctr)

-- Leads table
leads (id, name, phone, email, service, campaign, status, paid, revenue)
```

### Sample Data

The schema includes sample campaigns and leads for testing.

---

## 🔐 Environment Configuration

### Frontend (.env in project root)

```env
# API URL for Ad Manager Backend
VITE_API_URL=http://localhost:5000

# For production
# VITE_API_URL=https://api.topspeedappliance.com
```

### Backend (.env in backend folder)

#### Database
```env
DB_USER=postgres
DB_PASSWORD=your_secure_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=topspeed_dashboard
```

#### Twilio (Call Tracking)
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

**Get Twilio Credentials:**
1. Go to https://www.twilio.com
2. Sign up for account
3. Navigate to Console Dashboard
4. Find Account SID and Auth Token
5. Purchase a phone number

#### Gmail (Email Notifications)
```env
GMAIL_SERVICE_ACCOUNT_KEY=./service-account.json
GMAIL_FROM=service@topspeedappliance.net
```

**Get Gmail Service Account:**
1. Go to Google Cloud Console
2. Create new project
3. Enable Gmail API
4. Create Service Account
5. Download JSON key file
6. Place in backend root directory as `service-account.json`

#### Google Ads API (Optional - Data Sync)
```env
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_ADS_DEVELOPER_TOKEN=your_token_here
GOOGLE_ADS_CUSTOMER_ID=123-456-7890
GOOGLE_ADS_REFRESH_TOKEN=your_refresh_token_here
```

**Get Google Ads Credentials:**
1. Go to Google Cloud Console
2. Create OAuth 2.0 credentials
3. Get Customer ID from Google Ads account
4. Request Google Ads API access

---

## 🔗 API Integration

### Adding Real Google Ads Data

Currently, the system shows sample data. To integrate real Google Ads API:

1. **Update backend/index.js** to fetch from Google Ads API:
   ```javascript
   // Replace mock data with:
   const { GoogleAdsApi } = require('google-ads-api')
   
   const client = new GoogleAdsApi({
     client_id: process.env.GOOGLE_CLIENT_ID,
     client_secret: process.env.GOOGLE_CLIENT_SECRET,
     developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN
   })
   ```

2. **Query campaigns:**
   ```javascript
   const campaigns = await client.Customer({
     customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID,
     refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN
   }).campaigns.list()
   ```

### Twilio Integration

Call tracking is configured to:
1. Accept phone number from frontend
2. Initiate call using Twilio SDK
3. Log call event in database
4. Update lead status

### Gmail Integration

Email notifications:
1. Accept email from frontend
2. Compose professional email
3. Send using Gmail Service Account
4. Update lead status

---

## 🚀 Deployment

### Heroku Deployment (Recommended)

**Backend:**
```bash
# Install Heroku CLI
npm i -g heroku

# Login
heroku login

# Create app
heroku create topspeed-ad-manager-api

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set DB_USER=postgres
heroku config:set TWILIO_ACCOUNT_SID=xxx
# ... (set all variables)

# Deploy
git push heroku main
```

**Frontend:**
Update `.env` to point to Heroku backend:
```env
VITE_API_URL=https://topspeed-ad-manager-api.herokuapp.com
```

### Docker Deployment

**Dockerfile (Backend):**
```dockerfile
FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

**Build and run:**
```bash
docker build -t topspeed-ad-manager .
docker run -p 5000:5000 --env-file .env topspeed-ad-manager
```

### Self-Hosted Deployment

1. **Install Node.js** on your server
2. **Install PostgreSQL**
3. **Clone repository**
4. **Configure `.env`**
5. **Run database migrations**
6. **Start backend:** `npm start`
7. **Start frontend:** `npm run build && npm run preview`
8. **Use Nginx/Apache** as reverse proxy

---

## 🐛 Troubleshooting

### "Cannot connect to database"
- **Solution:** Ensure PostgreSQL is running
  ```bash
  # macOS
  brew services start postgresql
  
  # Linux
  sudo systemctl start postgresql
  ```

### "TWILIO_ACCOUNT_SID not configured"
- **Solution:** Add Twilio credentials to backend `.env`
- **Test:** Use Twilio Console to verify credentials

### "Gmail service account error"
- **Solution:** Verify `service-account.json` exists and is valid JSON
- **Check:** Path should be `backend/service-account.json`

### "Frontend shows 'Cannot reach backend'"
- **Solution:** Ensure backend is running on port 5000
  ```bash
  curl http://localhost:5000/health
  ```

### "Leads not saving to database"
- **Solution:** Check PostgreSQL connection
  ```bash
  psql -U postgres -d topspeed_dashboard -c "SELECT * FROM leads;"
  ```

### "Port 5000 already in use"
- **Solution:** Change port in backend `.env` and frontend `.env`
  ```env
  PORT=5001
  VITE_API_URL=http://localhost:5001
  ```

---

## 📊 Dashboard Features

### Campaigns Tab
- View all Google Ads campaigns
- Track budget, impressions, clicks, CTR
- Campaign status (Active/Paused)

### Leads Tab
- View all leads from campaigns
- Lead details (name, phone, email, service)
- Call & email integration
- Mark as paid job
- Track lead status

### Analytics Tab
- Lead source breakdown
- Conversion metrics
- Revenue tracking
- Average deal value

### Stats Dashboard
- Total leads count
- Total revenue
- Conversion rate
- Active campaigns

---

## 🔄 Real-Time Data Sync

Frontend automatically refreshes data every 30 seconds:

```javascript
useEffect(() => {
  fetchData()
  const interval = setInterval(fetchData, 30000)
  return () => clearInterval(interval)
}, [])
```

Modify interval in `AdManagerDashboard.jsx` if needed.

---

## 📈 Next Steps

1. ✅ Deploy backend to production
2. ✅ Set up PostgreSQL database
3. ✅ Configure Twilio account
4. ✅ Set up Gmail notifications
5. ✅ Connect Google Ads API (optional)
6. ✅ Monitor analytics dashboard
7. ✅ Train team on usage

---

## 📞 Support

For issues:
- Check troubleshooting section above
- Review backend logs: `npm run dev`
- Verify environment variables
- Check database connection

---

**Last Updated:** December 2024  
**Version:** 1.0.0
