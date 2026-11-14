# AI Ad Manager - Deployment Guide

Production deployment instructions for Top Speed Appliance AI Ad Manager system.

## 🎯 Pre-Deployment Checklist

- [ ] Backend server configured
- [ ] PostgreSQL database set up
- [ ] Twilio account configured
- [ ] Gmail Service Account created
- [ ] Google Ads API credentials (if needed)
- [ ] Environment variables set
- [ ] Frontend API URL updated
- [ ] SSL/TLS certificates ready
- [ ] Domain name registered

---

## 📋 Deployment Options

### Option 1: Heroku (Fastest - 15 minutes)

**Prerequisites:**
- Heroku account (free)
- Heroku CLI installed
- Git repository

**Steps:**

1. **Prepare backend:**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create Heroku app:**
   ```bash
   heroku login
   heroku create topspeed-ad-manager-api
   ```

3. **Add PostgreSQL:**
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```

4. **Set environment variables:**
   ```bash
   heroku config:set PORT=5000
   heroku config:set DB_NAME=topspeed_dashboard
   heroku config:set TWILIO_ACCOUNT_SID=your_sid
   heroku config:set TWILIO_AUTH_TOKEN=your_token
   heroku config:set GMAIL_FROM=service@topspeedappliance.net
   # ... (add all other variables)
   ```

5. **Load database schema:**
   ```bash
   heroku pg:psql < ../database/schema.sql
   ```

6. **Deploy:**
   ```bash
   git push heroku main
   ```

7. **Verify deployment:**
   ```bash
   heroku logs --tail
   # Visit: https://topspeed-ad-manager-api.herokuapp.com/health
   ```

8. **Update frontend .env:**
   ```env
   VITE_API_URL=https://topspeed-ad-manager-api.herokuapp.com
   ```

---

### Option 2: DigitalOcean App Platform (20 minutes)

**Prerequisites:**
- DigitalOcean account
- GitHub repository connected
- $5-12/month cost

**Steps:**

1. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/username/topspeed-ad-manager
   git push -u origin main
   ```

2. **Create app on DigitalOcean:**
   - Go to App Platform
   - Select GitHub repo
   - Auto-detect Node.js service
   - Add PostgreSQL database
   - Configure environment variables
   - Deploy

3. **Run migrations:**
   ```bash
   # SSH into app container
   doctl apps get <app-id>
   
   # Run schema
   psql -d topspeed_dashboard -f database/schema.sql
   ```

4. **Get backend URL** from App Platform dashboard

5. **Update frontend:**
   ```env
   VITE_API_URL=https://topspeed-ad-manager-<random>.ondigitalocean.app
   ```

---

### Option 3: AWS (Comprehensive - 30 minutes)

**Prerequisites:**
- AWS account
- EC2, RDS, and Route53 access

**Architecture:**
- EC2 instance for Node.js backend
- RDS for PostgreSQL
- S3 for frontend (optional)
- CloudFront CDN
- Route53 for DNS

**Backend Deployment:**

1. **Launch EC2 Instance:**
   - AMI: Ubuntu 20.04 LTS
   - Type: t3.micro (free tier)
   - Security group: Allow ports 80, 443, 5000

2. **Install dependencies:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   sudo apt install nodejs npm postgresql-client -y
   ```

3. **Deploy backend:**
   ```bash
   git clone <repo>
   cd backend
   npm install
   npm run build
   ```

4. **Use PM2 for process management:**
   ```bash
   npm i -g pm2
   pm2 start index.js --name "ad-manager"
   pm2 startup
   pm2 save
   ```

5. **Create RDS PostgreSQL database:**
   - Engine: PostgreSQL 12+
   - DB Instance Class: db.t3.micro
   - Storage: 20 GB
   - Multi-AZ: No (for dev)

6. **Load schema:**
   ```bash
   psql -h <rds-endpoint> -U postgres -d topspeed_dashboard -f database/schema.sql
   ```

7. **Set environment variables:**
   ```bash
   # On EC2 instance
   export DB_HOST=<rds-endpoint>
   export DB_USER=postgres
   export DB_PASSWORD=<secure-password>
   # ... (other variables)
   ```

8. **Use Nginx as reverse proxy:**
   ```bash
   sudo apt install nginx -y
   ```

   Create `/etc/nginx/sites-available/ad-manager`:
   ```nginx
   server {
     listen 80;
     server_name api.topspeedappliance.com;

     location / {
       proxy_pass http://localhost:5000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

   Enable and start:
   ```bash
   sudo ln -s /etc/nginx/sites-available/ad-manager /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl start nginx
   ```

---

### Option 4: Docker + Your Own Server (40 minutes)

**Prerequisites:**
- Linux server with Docker
- Docker and Docker Compose installed
- SSH access to server

**Steps:**

1. **Create docker-compose.yml:**
   ```yaml
   version: '3.8'
   services:
     backend:
       build: ./backend
       ports:
         - "5000:5000"
       environment:
         - DB_HOST=postgres
         - DB_USER=postgres
         - DB_PASSWORD=secure_password
         - TWILIO_ACCOUNT_SID=${TWILIO_ACCOUNT_SID}
       depends_on:
         - postgres
     postgres:
       image: postgres:13
       environment:
         POSTGRES_DB: topspeed_dashboard
         POSTGRES_PASSWORD: secure_password
       volumes:
         - db_data:/var/lib/postgresql/data
         - ./database/schema.sql:/docker-entrypoint-initdb.d/schema.sql
   volumes:
     db_data:
   ```

2. **Deploy:**
   ```bash
   docker-compose up -d
   ```

3. **Verify:**
   ```bash
   docker ps
   curl http://localhost:5000/health
   ```

4. **Setup Nginx reverse proxy** (same as AWS option)

5. **Update frontend:**
   ```env
   VITE_API_URL=https://api.topspeedappliance.com
   ```

---

## 🔒 Security Configuration

### HTTPS/SSL Setup

**Using Let's Encrypt:**
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot certonly --nginx -d api.topspeedappliance.com
sudo certbot auto-renew --dry-run
```

### Environment Variables

**Never commit .env files!**

Use platform-specific secret management:
- Heroku: `heroku config:set KEY=value`
- DigitalOcean: App Platform Env Vars
- AWS: Systems Manager Parameter Store
- Docker: Use `.env.production` (not in git)

### Database Security

- Use strong passwords (20+ characters)
- Enable SSL for database connections
- Restrict IP access to database
- Enable automated backups
- Use read-only replicas for analytics

### API Security

- Enable CORS (configured in backend)
- Use rate limiting (add to backend):
  ```javascript
  const rateLimit = require('express-rate-limit')
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
  app.use(limiter)
  ```

---

## 📊 Monitoring & Maintenance

### Application Monitoring

**Heroku:**
```bash
heroku logs --tail
heroku metrics
```

**DigitalOcean:**
- Dashboard monitoring
- Application alerting

**AWS:**
- CloudWatch monitoring
- SNS notifications

### Database Backups

**Heroku:**
```bash
heroku pg:backups:schedule --at '02:00 UTC'
heroku pg:backups
```

**PostgreSQL (Manual):**
```bash
pg_dump topspeed_dashboard > backup_$(date +%Y%m%d).sql
```

### Performance Tuning

- Add database indexes (already in schema)
- Enable caching for campaigns/leads
- Use connection pooling
- Monitor slow queries

---

## 🚀 Post-Deployment

### Verification Checklist

- [ ] Backend health check: `/health` returns OK
- [ ] Campaigns endpoint: `/api/campaigns` returns data
- [ ] Leads endpoint: `/api/leads` returns data
- [ ] Database connection working
- [ ] Twilio calls functional
- [ ] Gmail emails sending
- [ ] Frontend connects to backend
- [ ] Dashboard loads without errors
- [ ] Stats display correctly
- [ ] Lead actions (call, email, mark paid) work

### User Training

1. **Admin access:**
   - Navigate to `/admin/login`
   - Use credentials
   - Access `/admin/ad-manager`

2. **Dashboard features:**
   - View campaigns
   - Manage leads
   - Track revenue
   - Monitor analytics

3. **Actions:**
   - Call leads with Twilio
   - Send emails
   - Mark paid jobs
   - Export reports

---

## 🔄 Continuous Deployment

**GitHub Actions (CI/CD):**

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Heroku

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
        run: |
          git push https://heroku:$HEROKU_API_KEY@git.heroku.com/topspeed-ad-manager-api.git main
```

---

## 📱 Frontend Build & Deployment

### Build for Production

```bash
npm run build
```

This creates `dist/` folder.

### Deploy to Vercel (Recommended for Frontend)

```bash
npm i -g vercel
vercel
```

Set environment variable:
```
VITE_API_URL=https://your-backend-url.com
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## 💰 Cost Estimation

| Platform | Cost | Notes |
|----------|------|-------|
| Heroku | $7-50/mo | Dyno + PostgreSQL |
| DigitalOcean | $5-12/mo | Basic droplet |
| AWS | $10-30/mo | EC2 + RDS |
| Vercel | Free-$20/mo | Frontend hosting |

---

## 🆘 Troubleshooting Deployment

### Backend won't start
```bash
# Check logs
heroku logs --tail

# Verify environment variables
heroku config

# Test database connection
heroku pg:psql
```

### Database connection failed
```bash
# Check database URL
heroku config | grep DATABASE_URL

# Test connection
psql <database-url>
```

### Frontend can't reach backend
- Check backend URL in `.env`
- Verify CORS is enabled
- Check backend is running
- Check firewall rules

---

## 📞 Rollback Plan

If deployment fails:

**Heroku:**
```bash
# Rollback to previous version
heroku releases
heroku rollback v5
```

**Docker:**
```bash
# Use previous image tag
docker run -d prev-image-tag
```

---

**Last Updated:** December 2024  
**Version:** 1.0.0
