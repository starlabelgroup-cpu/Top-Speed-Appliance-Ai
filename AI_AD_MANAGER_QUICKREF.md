# AI Ad Manager - Quick Reference

Fast reference guide for developers and admins.

## 🚀 Start Development (3 Commands)

```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
cd backend && npm run dev

# Terminal 3: Database
createdb topspeed_dashboard
psql -d topspeed_dashboard -f database/schema.sql
```

**Access:** `http://localhost:5173/admin/ad-manager`

---

## 📁 Project Structure

```
.
├── src/
│   ├── components/
│   │   └── AdManagerDashboard.jsx         (Main component)
│   └── styles/
│       └── ad-manager-dashboard.css       (Styles)
├── backend/
│   ├── index.js                           (Express server)
│   └── package.json
├── database/
│   └── schema.sql                         (DB schema)
├── .env.example                           (Env template)
├── AI_AD_MANAGER_SETUP.md                 (Full setup guide)
├── DEPLOYMENT_AI_AD_MANAGER.md            (Deploy guide)
└── AI_AD_MANAGER_QUICKREF.md             (This file)
```

---

## 🔌 API Endpoints (Quick Reference)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/campaigns` | Fetch campaigns |
| GET | `/api/leads` | Fetch leads |
| GET | `/api/stats` | Get dashboard stats |
| POST | `/api/leads` | Create lead |
| POST | `/api/campaigns` | Create campaign |
| POST | `/api/leads/:id/paid` | Mark as paid |
| POST | `/api/leads/:id/call` | Call lead |
| POST | `/api/leads/:id/email` | Email lead |
| GET | `/health` | Health check |

---

## 🔑 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

### Backend (.env in /backend)
```env
# Database
DB_USER=postgres
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=topspeed_dashboard

# Twilio
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1234567890

# Gmail
GMAIL_SERVICE_ACCOUNT_KEY=./service-account.json
GMAIL_FROM=service@topspeedappliance.net

# Server
PORT=5000
```

---

## 🗄️ Database Commands

```bash
# Connect to database
psql -U postgres -d topspeed_dashboard

# Load schema
psql -d topspeed_dashboard -f database/schema.sql

# View tables
\dt

# View leads
SELECT * FROM leads;

# View campaigns
SELECT * FROM campaigns;

# Count leads
SELECT COUNT(*) FROM leads;

# Total revenue
SELECT SUM(revenue) FROM leads WHERE paid = true;

# Leads by campaign
SELECT campaign, COUNT(*) FROM leads GROUP BY campaign;

# Exit
\q
```

---

## 🚀 Deployment Quick Links

- **Heroku:** 15 minutes → https://www.heroku.com
- **DigitalOcean:** 20 minutes → https://www.digitalocean.com
- **AWS:** 30 minutes → https://aws.amazon.com
- **Vercel (Frontend):** 5 minutes → https://vercel.com
- **Netlify (Frontend):** 5 minutes → https://netlify.com

See `DEPLOYMENT_AI_AD_MANAGER.md` for detailed instructions.

---

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5000 in use | `lsof -i :5000` then `kill -9 <PID>` |
| DB connection error | Check PostgreSQL running: `brew services start postgresql` |
| Frontend can't reach backend | Verify `VITE_API_URL` in .env |
| Twilio not working | Check `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` |
| Gmail not working | Verify `service-account.json` exists in backend/ |
| Node_modules error | Delete `node_modules`, run `npm install` |

---

## 📊 Dashboard Features

### Campaigns Tab
- View all Google Ads campaigns
- Monitor budget, impressions, clicks
- Track CTR and campaign status

### Leads Tab
- Manage leads from all campaigns
- Call leads (Twilio integration)
- Email leads (Gmail integration)
- Mark as paid job
- Track status and revenue

### Analytics Tab
- Lead source breakdown
- Conversion metrics
- Revenue tracking
- Average deal value

### Stats
- Total leads count
- Total revenue
- Conversion rate %
- Active campaigns count

---

## 💻 Code Snippets

### Fetch campaigns
```javascript
const response = await fetch(`${API_URL}/api/campaigns`)
const campaigns = await response.json()
```

### Create lead
```javascript
fetch(`${API_URL}/api/leads`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    phone: '+13055551234',
    email: 'john@example.com',
    service: 'Refrigerator Repair',
    campaign: 'Google Ads'
  })
})
```

### Call a lead
```javascript
fetch(`${API_URL}/api/leads/123/call`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ phone: '+13055551234' })
})
```

### Email a lead
```javascript
fetch(`${API_URL}/api/leads/123/email`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'john@example.com' })
})
```

---

## 📱 Frontend Components

### AdManagerDashboard.jsx
Main component located in `src/components/AdManagerDashboard.jsx`

**Key State:**
- `campaigns` - All campaigns
- `leads` - All leads
- `stats` - Dashboard statistics
- `activeTab` - Current tab (campaigns/leads/analytics)
- `loading` - Loading state
- `error` - Error messages

**Key Functions:**
- `fetchData()` - Fetch all data from API
- `markPaidJob(leadId)` - Mark lead as paid
- `callLead(leadId, phone)` - Initiate call
- `emailLead(leadId, email)` - Send email

---

## 🖥️ Backend Structure

### index.js
Main Express server in `backend/index.js`

**Setup:**
- Express app
- CORS middleware
- PostgreSQL pool
- Twilio client
- Gmail auth

**Routes:**
- Campaign endpoints
- Lead endpoints
- Statistics endpoints
- Health check

---

## 📦 Dependencies

### Frontend
- React 18.3.1
- React Router 7.9.6
- CSS3 (no external CSS library)

### Backend
- Express 4.18.2
- PostgreSQL (pg)
- Twilio 4.0.0
- Google APIs
- CORS

---

## 🔐 Security Notes

⚠️ **Never commit .env files!**

```bash
# Add to .gitignore
.env
.env.local
service-account.json
```

**Security checklist:**
- ✅ All secrets in environment variables
- ✅ CORS enabled for frontend domain
- ✅ Database credentials secured
- ✅ Twilio token protected
- ✅ Gmail key file not in git
- ✅ HTTPS in production

---

## 📈 Performance Tips

- Database queries cached
- Lead data auto-refreshes every 30 seconds
- Responsive design optimized
- Lazy loading for images
- Minimal JavaScript

---

## 🎯 Development Workflow

1. **Create feature branch:**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make changes** in `src/components/` or `backend/`

3. **Test locally** at `http://localhost:5173`

4. **Commit changes:**
   ```bash
   git add .
   git commit -m "Add new feature"
   ```

5. **Push and create PR:**
   ```bash
   git push origin feature/new-feature
   ```

---

## 📞 Support Resources

- **Setup:** `AI_AD_MANAGER_SETUP.md`
- **Deployment:** `DEPLOYMENT_AI_AD_MANAGER.md`
- **API Docs:** Backend endpoints documented in setup guide
- **Troubleshooting:** Both guides include troubleshooting sections

---

## 🎓 Learning Resources

- **Express.js:** https://expressjs.com
- **PostgreSQL:** https://www.postgresql.org/docs
- **React:** https://react.dev
- **Twilio:** https://www.twilio.com/docs
- **Gmail API:** https://developers.google.com/gmail/api

---

## ✅ Pre-Launch Checklist

- [ ] Backend running on localhost:5000
- [ ] Database populated with schema
- [ ] Frontend connects to backend
- [ ] Campaigns tab shows data
- [ ] Leads tab shows data
- [ ] Stats display correctly
- [ ] Call button functional (Twilio configured)
- [ ] Email button functional (Gmail configured)
- [ ] Mark paid button works
- [ ] Analytics tab calculates correctly
- [ ] No console errors
- [ ] Responsive on mobile

---

## 🚀 Quick Deploy Checklist

- [ ] Backend `.env` configured
- [ ] Database `.env` configured
- [ ] Frontend `VITE_API_URL` set correctly
- [ ] SSL/TLS certificates ready
- [ ] Domain name configured
- [ ] Backups enabled
- [ ] Monitoring configured
- [ ] Error alerts set up

---

**Last Updated:** December 2024  
**Version:** 1.0.0

For detailed information, see `AI_AD_MANAGER_SETUP.md` or `DEPLOYMENT_AI_AD_MANAGER.md`
