# 🚀 Top Speed Appliance - Complete Deployment Guide

## Overview
This guide covers deploying the full AI Agent system with:
- **Frontend**: React on Netlify
- **Backend**: Python FastAPI on Heroku
- **AI**: GPT-4 powered multi-agent system

---

## 📋 Prerequisites

1. **Accounts & Credentials**
   - GitHub account (for version control)
   - Heroku account (free tier available)
   - Netlify account (free tier available)
   - OpenAI API key (paid account required)

2. **Software**
   - Node.js 16+ and npm
   - Python 3.11
   - Git
   - Heroku CLI

3. **API Keys**
   - `OPENAI_API_KEY` from https://platform.openai.com/api-keys

---

## Part 1: Backend Deployment (Heroku)

### Step 1: Create Heroku App

```bash
# Install Heroku CLI
# Windows: choco install heroku-cli
# Mac: brew tap heroku/brew && brew install heroku
# Linux: curl https://cli-assets.heroku.com/install-ubuntu.sh | sh

# Login to Heroku
heroku login

# Create new app
heroku create topspeed-ai-agent

# Or if you already have an app
heroku apps:create topspeed-ai-agent
```

### Step 2: Configure Environment Variables

```bash
# Set OpenAI API key
heroku config:set OPENAI_API_KEY=your_openai_api_key_here

# Set other variables
heroku config:set ENVIRONMENT=production
heroku config:set OPENAI_MODEL=gpt-4-turbo-preview

# Verify config
heroku config
```

### Step 3: Prepare Repository

```bash
# Initialize git (if not already done)
git init

# Create .gitignore
echo "backend/venv/" >> .gitignore
echo "backend/.env" >> .gitignore
echo ".DS_Store" >> .gitignore
echo "node_modules/" >> .gitignore

# Add all files
git add .
git commit -m "Initial commit: Full AI Agent System"
```

### Step 4: Deploy to Heroku

```bash
# Add Heroku remote
git remote add heroku https://git.heroku.com/topspeed-ai-agent.git

# Deploy (from project root)
git push heroku main

# View logs
heroku logs --tail

# Check if it's running
curl https://topspeed-ai-agent.herokuapp.com/health
```

### Step 5: Verify Deployment

```bash
# Test endpoints
curl https://topspeed-ai-agent.herokuapp.com/
curl https://topspeed-ai-agent.herokuapp.com/health
curl https://topspeed-ai-agent.herokuapp.com/api/v1/agents

# View live app
heroku open
```

---

## Part 2: Frontend Deployment (Netlify)

### Step 1: Connect to Netlify

```bash
# Login to Netlify CLI
npm install -g netlify-cli
netlify login

# Authorize in browser when prompted
```

### Step 2: Configure Environment

```bash
# Update .env with backend URL
REACT_APP_AGENT_API_URL=https://topspeed-ai-agent.herokuapp.com/api/v1
```

### Step 3: Deploy to Netlify

**Option A: Via CLI**

```bash
npm run build

netlify deploy --prod --dir=dist
```

**Option B: Via Git (Recommended)**

1. Push code to GitHub
2. Go to https://app.netlify.com
3. Click "New site from Git"
4. Select your repository
5. Set build command: `npm run build`
6. Set publish directory: `dist`
7. Click "Deploy site"

### Step 4: Configure Custom Domain

1. In Netlify dashboard
2. Domain management → Custom domains
3. Add your domain (e.g., topspeedappliance.com)
4. Update DNS records as instructed
5. Set up SSL (auto-provided by Netlify)

---

## Part 3: Environment Configuration

### Frontend (.env)

```env
REACT_APP_AGENT_API_URL=https://topspeed-ai-agent.herokuapp.com/api/v1
```

### Backend (Heroku Config Vars)

```
OPENAI_API_KEY=<your_key>
OPENAI_MODEL=gpt-4-turbo-preview
ENVIRONMENT=production
LOG_LEVEL=INFO
CORS_ORIGINS=["https://topspeedappliance.com", "https://www.topspeedappliance.com"]
```

---

## 🔍 Monitoring & Debugging

### Heroku Logs

```bash
# View recent logs
heroku logs -n 50

# Stream live logs
heroku logs --tail

# Filter by component
heroku logs --dyno=web
```

### Common Issues

**Issue: "OPENAI_API_KEY not set"**
```bash
heroku config:set OPENAI_API_KEY=sk-...
```

**Issue: "Application Error"**
```bash
# Check logs
heroku logs --tail

# Rebuild
git push heroku main --force
```

**Issue: "CORS error"**
```bash
# Update CORS origins
heroku config:set CORS_ORIGINS='["https://yoursite.com"]'

# Restart app
heroku restart
```

### Health Checks

```bash
# Backend health
curl https://topspeed-ai-agent.herokuapp.com/health

# API endpoints
curl https://topspeed-ai-agent.herokuapp.com/api/v1/agents

# Check OpenAI connection
# (Test via the UI chat)
```

---

## 📊 Performance Optimization

### Backend (Heroku)

1. **Upgrade Dyno** (if needed)
   ```bash
   heroku dyno:type premium-1x --app topspeed-ai-agent
   ```

2. **Enable Buildpack Caching**
   ```bash
   heroku buildpacks:add heroku/python
   ```

3. **Monitor Performance**
   ```bash
   heroku addons:create papertrail:choklad
   heroku addons:open papertrail
   ```

### Frontend (Netlify)

1. **Enable asset optimization** (automatic)
2. **Configure caching headers** (automatic)
3. **Monitor performance** via Netlify Analytics
4. **Enable Netlify Functions** if needed (optional)

---

## 🔐 Security Checklist

- [ ] OpenAI API key never committed to git
- [ ] CORS origins properly configured
- [ ] HTTPS enabled (auto on Netlify/Heroku)
- [ ] Environment variables secured
- [ ] Rate limiting considered
- [ ] Input validation in place
- [ ] Error messages don't expose sensitive info
- [ ] API keys rotated periodically

---

## 🆘 Troubleshooting

### Backend Deployment Issues

**Build fails with missing dependencies:**
```bash
# Ensure requirements.txt is in backend/ directory
# Or install in root and generate from there
pip freeze > backend/requirements.txt
```

**Port issues:**
```bash
# Heroku automatically assigns PORT env var
# App should use: int(os.getenv("PORT", 8000))
```

**Memory issues:**
```bash
# Check dyno type
heroku ps -a topspeed-ai-agent

# Upgrade if needed
heroku dyno:type standard-1x
```

### Frontend Deployment Issues

**Build fails:**
```bash
# Check Node version compatibility
node --version  # Should be 16+

# Clear cache and rebuild
npm cache clean --force
npm install
npm run build
```

**API calls failing after deployment:**
```bash
# Verify environment variable
echo $REACT_APP_AGENT_API_URL

# Ensure backend is running
curl https://topspeed-ai-agent.herokuapp.com/health
```

---

## 📈 Scaling & Maintenance

### Heroku Scaling

```bash
# View current dynos
heroku ps -a topspeed-ai-agent

# Scale dynos
heroku ps:scale web=2 --app topspeed-ai-agent

# Monitor metrics
heroku metrics --app topspeed-ai-agent
```

### Regular Maintenance

**Weekly:**
- Monitor logs for errors
- Check API health endpoints
- Review error rates

**Monthly:**
- Update dependencies
- Review performance metrics
- Optimize slow endpoints

**Quarterly:**
- Full system review
- Security audit
- Disaster recovery test

---

## 🚀 CI/CD Pipeline (Optional)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Heroku
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
          HEROKU_APP_NAME: topspeed-ai-agent
        run: |
          git push https://heroku:$HEROKU_API_KEY@git.heroku.com/$HEROKU_APP_NAME.git main
      
      - name: Deploy to Netlify
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        run: |
          npm run build
          netlify deploy --prod --dir=dist
```

---

## 📚 Useful Links

- Heroku Docs: https://devcenter.heroku.com/
- Netlify Docs: https://docs.netlify.com/
- OpenAI API: https://platform.openai.com/docs/api-reference
- FastAPI: https://fastapi.tiangolo.com/
- React: https://react.dev/

---

## 💬 Support

For issues or questions:
1. Check logs: `heroku logs --tail`
2. Review this guide
3. Check error messages in browser console
4. Contact support: support@topspeedappliance.com
5. Phone: 1-800-TOP-SPEED

---

**Last Updated**: November 2024
**Version**: 1.0.0
