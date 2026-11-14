# 🔗 Frontend-Backend Integration Guide

## Overview

This guide explains how the React frontend communicates with the Python FastAPI backend running on Heroku.

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│  Browser (React App on Netlify)                     │
│  - AdvancedAIAgent.jsx                              │
│  - AgentChat.jsx                                    │
│  - DiagnosticMode.jsx                               │
│  - RecommendationMode.jsx                           │
│  - MaintenanceMode.jsx                              │
└─────────────────┬───────────────────────────────────┘
                  │
                  │ HTTPS Requests
                  │ (REST API)
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  Heroku (Python FastAPI Backend)                    │
│  - app.py (Main application)                        │
│  - DiagnosticAgent (Dr. Diagnosto)                  │
│  - SalesAgent (Selina Sales)                        │
│  - MaintenanceAgent (Marty Maintenance)             │
│  - SupportAgent (Cara Care)                         │
│  - Orchestrator (Routes requests)                   │
└─────────────────┬───────────────────────────────────┘
                  │
                  │ API Calls
                  │
                  ▼
         ┌─────────────────────┐
         │   OpenAI GPT-4      │
         │   (Model Engine)    │
         └─────────────────────┘
```

---

## API Endpoints

### Base URL
```
Production: https://topspeed-ai-agent.herokuapp.com/api/v1
Development: http://localhost:8000/api/v1
```

### Endpoints

#### 1. Chat Endpoint
**POST** `/api/v1/chat`

Send a message and get AI response.

**Request:**
```json
{
  "query": "My refrigerator is not cooling properly",
  "session_id": "session_12345",
  "customer_id": "cust_123",
  "context": {}
}
```

**Response:**
```json
{
  "success": true,
  "response": "I can help with that...",
  "suggested_action": "diagnose",
  "agent_used": "orchestrator",
  "session_id": "session_12345",
  "timestamp": "2024-11-29T12:00:00"
}
```

#### 2. Diagnose Endpoint
**POST** `/api/v1/diagnose`

Get detailed diagnosis for an appliance issue.

**Request:**
```json
{
  "appliance_type": "refrigerator",
  "symptoms": ["Not cooling", "Loud noise"],
  "brand": "LG",
  "model": "LFXS28968S",
  "session_id": "session_12345"
}
```

**Response:**
```json
{
  "success": true,
  "diagnosis": {
    "likely_causes": ["Compressor issue", "Condenser coils dirty"],
    "probability": [0.8, 0.6],
    "severity": "high",
    "immediate_actions": ["Unplug the refrigerator", "Clear the area"],
    "parts_needed": ["Compressor", "Condenser coils"],
    "estimated_repair_time": "4-6 hours",
    "diy_possible": false,
    "safety_warnings": ["Electrical hazard"]
  },
  "appliance_type": "refrigerator",
  "timestamp": "2024-11-29T12:00:00"
}
```

#### 3. Recommend Endpoint
**POST** `/api/v1/recommend`

Get appliance recommendations.

**Request:**
```json
{
  "appliance_type": "refrigerator",
  "budget": 2500,
  "required_features": ["Smart Home", "Ice Maker"],
  "energy_efficiency_preference": "high",
  "session_id": "session_12345"
}
```

**Response:**
```json
{
  "success": true,
  "recommendations": [
    {
      "brand": "LG",
      "model": "LFXS28968S",
      "price": 2499,
      "key_features": ["Smart Home", "Ice Maker", "Water Dispenser"],
      "energy_rating": "Energy Star",
      "warranty": "5 years",
      "estimated_annual_cost": 150
    }
  ],
  "count": 3,
  "timestamp": "2024-11-29T12:00:00"
}
```

#### 4. Schedule Maintenance Endpoint
**POST** `/api/v1/schedule-maintenance`

Schedule a maintenance appointment.

**Request:**
```json
{
  "appliance_id": "fridge_001",
  "service_type": "routine",
  "preferred_date": "2024-12-15",
  "issues": ["Annual maintenance", "Filter replacement"],
  "session_id": "session_12345"
}
```

**Response:**
```json
{
  "success": true,
  "appointment": {
    "appointment_id": "APT_20241129120000",
    "service_type": "routine",
    "scheduled_time": "2024-11-29T12:00:00",
    "estimated_duration": "2 hours",
    "maintenance_tasks": ["Inspection", "Cleaning"],
    "parts_to_bring": ["Water filter"],
    "preparation_steps": ["Turn off power", "Clear area"]
  },
  "appliance_id": "fridge_001",
  "timestamp": "2024-11-29T12:00:00"
}
```

#### 5. Health Check Endpoint
**GET** `/health`

Check if backend is operational.

**Response:**
```json
{
  "status": "healthy",
  "service": "Top Speed Appliance AI Agent",
  "timestamp": "2024-11-29T12:00:00",
  "environment": "production"
}
```

#### 6. List Agents Endpoint
**GET** `/api/v1/agents`

Get list of available agents.

**Response:**
```json
{
  "success": true,
  "agents": [
    {"name": "Dr. Diagnosto", "role": "Appliance Diagnostics"},
    {"name": "Selina Sales", "role": "Product Recommendations"},
    {"name": "Marty Maintenance", "role": "Preventive Maintenance"},
    {"name": "Cara Care", "role": "Customer Support"}
  ],
  "timestamp": "2024-11-29T12:00:00"
}
```

---

## Frontend Implementation

### 1. API Service (src/services/agentService.js)

The service handles all API communication:

```javascript
import { agentService } from '../services/agentService'

// Send a chat message
const response = await agentService.sendMessage(query, sessionId)

// Get diagnosis
const diagnosis = await agentService.diagnoseAppliance(payload, sessionId)

// Get recommendations
const recommendations = await agentService.getRecommendations(payload, sessionId)

// Schedule maintenance
const appointment = await agentService.scheduleMaintenance(payload, sessionId)
```

### 2. Environment Configuration

Create `.env` file in project root:

```env
REACT_APP_AGENT_API_URL=https://topspeed-ai-agent.herokuapp.com/api/v1
```

For development:
```env
REACT_APP_AGENT_API_URL=http://localhost:8000/api/v1
```

### 3. Error Handling

The service includes automatic error handling:

```javascript
try {
  const response = await agentService.sendMessage(query, sessionId)
  if (response.success) {
    // Handle success
  } else {
    // Handle API error
    onNotify('API Error: ' + response.error, 'error')
  }
} catch (error) {
  // Handle network error
  onNotify('Network error. Please try again.', 'error')
}
```

---

## Data Flow Examples

### Example 1: Chat Message

```
User types: "My fridge is not cooling"
                    ↓
Browser sends POST /api/v1/chat
{
  query: "My fridge is not cooling",
  session_id: "session_123"
}
                    ↓
Orchestrator routes to SupportAgent
                    ↓
SupportAgent calls OpenAI GPT-4
                    ↓
Response: "I can help diagnose..."
                    ↓
Frontend displays response with suggested action
                    ↓
User clicks "Diagnose" button
                    ↓
Switch to DiagnosticMode
```

### Example 2: Diagnostic Flow

```
User selects appliance: Refrigerator
User selects symptoms: ["Not cooling", "Loud noise"]
                    ↓
Browser sends POST /api/v1/diagnose
{
  appliance_type: "refrigerator",
  symptoms: ["Not cooling", "Loud noise"],
  brand: "LG",
  model: "LFXS28968S"
}
                    ↓
DiagnosticAgent analyzes symptoms
DiagnosticAgent calls OpenAI GPT-4
                    ↓
Response includes:
- likely_causes
- severity
- immediate_actions
- parts_needed
- safety_warnings
                    ↓
Frontend displays diagnosis results
```

### Example 3: Recommendation Flow

```
User fills out preference form:
- Budget: $2500
- Features: ["Smart Home", "Ice Maker"]
- Energy: "High efficiency"
                    ↓
Browser sends POST /api/v1/recommend
{
  appliance_type: "refrigerator",
  budget: 2500,
  required_features: ["Smart Home", "Ice Maker"],
  energy_efficiency_preference: "high"
}
                    ↓
SalesAgent generates recommendations
SalesAgent calls OpenAI GPT-4
                    ↓
Response includes 3-5 appliance options
                    ↓
Frontend displays recommendation cards
User can view details or click "Buy Now"
```

---

## Session Management

Each user session is tracked with:

```javascript
const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
// Example: session_1701264000000_abc123def456
```

All API calls include the session ID for tracking conversation history (future feature).

---

## Error Handling & Status Codes

### Success Responses
- **200 OK**: Successful request
- **Response**: Always includes `"success": true`

### Error Responses
- **400 Bad Request**: Invalid input
- **500 Internal Server Error**: Server error
- **Response**: Includes `"success": false` and `"error": "message"`

### Frontend Notification Types

```javascript
// Success
onNotify('Request successful', 'success')

// Warning
onNotify('Please select at least one option', 'warning')

// Error
onNotify('Network error. Please try again.', 'error')

// Info
onNotify('Processing your request...', 'info')
```

---

## CORS Configuration

### Development
- No CORS restrictions (allow localhost)

### Production
- Only allow traffic from `topspeedappliance.com`
- Configured in Heroku environment variables:
```bash
heroku config:set CORS_ORIGINS='["https://topspeedappliance.com", "https://www.topspeedappliance.com"]'
```

---

## Rate Limiting (Future)

When implementing rate limiting:

```javascript
// Backend: 100 requests per minute per IP
# Heroku config
heroku config:set RATE_LIMIT=100
heroku config:set RATE_LIMIT_WINDOW=60

// Frontend: Automatic retry with backoff
const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // milliseconds
```

---

## Testing the Integration

### 1. Local Testing

```bash
# Terminal 1: Start backend
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python app.py

# Terminal 2: Start frontend
npm install
npm run dev

# Test in browser
# http://localhost:5173/
# Update REACT_APP_AGENT_API_URL=http://localhost:8000/api/v1
```

### 2. Manual API Testing

```bash
# Using curl
curl -X POST http://localhost:8000/api/v1/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Hello",
    "session_id": "test_session"
  }'

# Or use Postman
# Import the API collection from docs
```

### 3. End-to-End Testing

1. Open the deployed Netlify site
2. Click the AI Assistant bubble
3. Test each mode:
   - Chat
   - Diagnose
   - Recommend
   - Maintain
4. Verify responses are from backend
5. Check browser console for errors

---

## Deployment Verification

After deploying:

1. **Check Frontend**
   - Open deployed URL
   - AI bubble should appear
   - Click and chat

2. **Check Backend**
   ```bash
   curl https://topspeed-ai-agent.herokuapp.com/health
   ```

3. **Check Integration**
   - Send message in UI
   - Should see response
   - Browser console should show no CORS errors

4. **Check All Agents**
   ```bash
   curl https://topspeed-ai-agent.herokuapp.com/api/v1/agents
   ```

---

## Troubleshooting

### Issue: "Failed to fetch"

**Cause**: Backend not running or unreachable

**Solution**:
```bash
# Check backend health
curl https://topspeed-ai-agent.herokuapp.com/health

# Check Heroku logs
heroku logs --tail -a topspeed-ai-agent
```

### Issue: "CORS error"

**Cause**: Frontend domain not in CORS whitelist

**Solution**:
```bash
# Update Heroku config
heroku config:set CORS_ORIGINS='["https://yoursite.netlify.app"]'

# Restart app
heroku restart
```

### Issue: "API returns error"

**Cause**: Invalid request format or OpenAI error

**Solution**:
1. Check browser network tab for request
2. Verify request format matches API spec
3. Check Heroku logs for details
4. Verify OpenAI API key is valid

### Issue: "Slow responses"

**Cause**: OpenAI API delay or server load

**Solution**:
1. Wait - OpenAI can take 3-5 seconds
2. Add loading indicator
3. Upgrade Heroku dyno if needed
4. Check Heroku metrics

---

## Performance Optimization

### Frontend
- Component memoization
- Message virtualization for long chats
- Lazy load mode components

### Backend
- Response caching (future)
- Batch processing (future)
- Database optimization (future)

---

## Security Considerations

1. **API Key Protection**
   - OpenAI key only on backend
   - Never expose in frontend code

2. **CORS Validation**
   - Whitelist specific domains
   - Reject cross-origin requests

3. **Input Validation**
   - Validate all API inputs
   - Sanitize user messages

4. **Error Messages**
   - Don't expose system errors
   - Generic error messages to clients

---

## Future Enhancements

- [ ] WebSocket support for real-time chat
- [ ] Message history with database
- [ ] User authentication
- [ ] Rate limiting per user
- [ ] Advanced logging and analytics
- [ ] Webhook integrations
- [ ] Caching layer (Redis)
- [ ] Database for persistence

---

**Version**: 1.0.0
**Last Updated**: November 2024
