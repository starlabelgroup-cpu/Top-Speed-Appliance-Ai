# ⚡ Quick Start - Deploy in 30 Minutes

## 🎯 What You're Deploying

- **Frontend**: React AI Assistant UI (Netlify)
- **Backend**: Python FastAPI with GPT-4 agents (Heroku)
- **Features**: Chat, Diagnose, Recommend, Maintain

---

## ✅ Prerequisites (5 min)

1. **Get OpenAI API Key**
   - Go to https://platform.openai.com/api-keys
   - Create new secret key
   - Keep it safe! 🔐

2. **Create Accounts** (if not existing)
   - Heroku: https://heroku.com
   - Netlify: https://netlify.com
   - GitHub: https://github.com

3. **Install Tools**
   ```bash
   npm install -g heroku-cli
   npm install -g netlify-cli
   ```

---

## 🚀 Deploy Backend to Heroku (10 min)

### 1. Create Heroku App
```bash
heroku login
heroku create topspeed-ai-agent
```

### 2. Set Environment Variable
```bash
heroku config:set OPENAI_API_KEY=sk-your-key-here
```

### 3. Deploy Code
```bash
git add .
git commit -m "Deploy AI Agent"
git push heroku main
```

### 4. Verify It's Running
```bash
heroku open
# Should show: {"service": "Top Speed Appliance AI Agent"}
```

**✅ Backend is live at:** `https://topspeed-ai-agent.herokuapp.com`

---

## 🎨 Deploy Frontend to Netlify (10 min)

### 1. Configure Backend URL
Edit `.env`:
```
REACT_APP_AGENT_API_URL=https://topspeed-ai-agent.herokuapp.com/api/v1
```

### 2. Build
```bash
npm run build
```

### 3. Deploy with CLI
```bash
netlify login
netlify deploy --prod --dir=dist
```

Or **via GitHub**:
1. Push to GitHub
2. Go to https://app.netlify.com
3. "New site from Git"
4. Select repo
5. Build command: `npm run build`
6. Publish: `dist`
7. Deploy

**✅ Frontend is live at:** `https://your-site.netlify.app`

---

## 🧪 Test It Works (5 min)

### 1. Backend Health Check
```bash
curl https://topspeed-ai-agent.herokuapp.com/health
# Should return: {"status": "healthy"}
```

### 2. Test API
```bash
curl -X POST https://topspeed-ai-agent.herokuapp.com/api/v1/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "Hello", "session_id": "test"}'
```

### 3. Test in Browser
1. Open your Netlify site
2. Click the AI bubble (bottom right)
3. Type a message
4. Should get response!

---

## 🔧 Configuration Summary

### Heroku Config Vars
```bash
OPENAI_API_KEY=sk-your-key
ENVIRONMENT=production
OPENAI_MODEL=gpt-4-turbo-preview
```

### Frontend .env
```
REACT_APP_AGENT_API_URL=https://topspeed-ai-agent.herokuapp.com/api/v1
```

---

## 📊 What Each Component Does

| Component | Purpose | Tech |
|-----------|---------|------|
| AI Bubble | Entry point for chat | React |
| Agent Chat | Multi-turn conversations | React + API |
| Diagnostic Mode | Troubleshoot appliances | Python + GPT-4 |
| Recommendation Mode | Suggest new appliances | Python + GPT-4 |
| Maintenance Mode | Schedule service | Python + GPT-4 |

---

## 🆘 Troubleshooting Quick Fixes

### Backend won't deploy
```bash
# Check logs
heroku logs --tail

# Verify runtime.txt exists
# Verify requirements.txt is in backend/

# Force rebuild
git push heroku main --force
```

### API calls failing
```bash
# Check health
curl https://topspeed-ai-agent.herokuapp.com/health

# Check CORS
heroku config | grep CORS

# Verify OpenAI key
heroku config | grep OPENAI_API_KEY
```

### Frontend can't reach backend
```bash
# Verify .env
cat .env | grep REACT_APP_AGENT_API_URL

# Rebuild frontend
npm run build
netlify deploy --prod --dir=dist

# Check browser console for errors
# (F12 → Console tab)
```

---

## 📈 Next Steps

### After Deployment

1. **Monitor**
   ```bash
   heroku logs --tail
   ```

2. **Add Custom Domain**
   - Netlify: Domain settings
   - Heroku: Heroku Domains

3. **Set Up Auto-Deploys**
   - Connect GitHub to Netlify
   - Push changes → auto-deploy

4. **Scale if Needed**
   ```bash
   heroku dyno:type standard-1x
   ```

### Optional Enhancements

- [ ] Custom domain (topspeedappliance.com)
- [ ] User authentication
- [ ] Database for chat history
- [ ] Email notifications
- [ ] SMS support (Twilio)
- [ ] Analytics dashboard

---

## 📚 Documentation

For detailed info, see:
- **DEPLOYMENT_GUIDE.md** - Full deployment steps
- **INTEGRATION_GUIDE.md** - How frontend talks to backend
- **README.md** - System overview

---

## ✨ You Did It! 🎉

Your AI Agent System is now **live and operational**!

**Test it:**
1. Open your frontend URL
2. Click AI Assistant bubble
3. Chat with Dr. Diagnosto!

**Share:**
```
🤖 Try our new AI Assistant:
https://your-site.netlify.app
```

---

## 💬 Need Help?

1. Check the logs:
   ```bash
   heroku logs --tail
   ```

2. Read the guides:
   - DEPLOYMENT_GUIDE.md
   - INTEGRATION_GUIDE.md

3. Test manually:
   ```bash
   curl https://topspeed-ai-agent.herokuapp.com/health
   ```

4. Contact: support@topspeedappliance.com

---

**Version**: 1.0.0  
**Ready to Deploy**: ✅ YES
