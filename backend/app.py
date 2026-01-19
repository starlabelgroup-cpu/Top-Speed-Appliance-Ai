"""
Top Speed Appliance AI Agent System
Production-ready FastAPI backend with multi-agent support
"""

import os
import json
import logging
from datetime import datetime
from typing import Dict, List, Optional
from functools import lru_cache

from fastapi import FastAPI, HTTPException, BackgroundTasks, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from dotenv import load_dotenv
import openai

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ============================================================================
# CONFIGURATION
# ============================================================================

class Config:
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    OPENAI_MODEL = os.getenv('OPENAI_MODEL', 'gpt-4-turbo-preview')
    API_PREFIX = '/api/v1'
    CORS_ORIGINS = ['*']  # Update this in production
    ENVIRONMENT = os.getenv('ENVIRONMENT', 'production')

config = Config()

if not config.OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY environment variable is not set")

# Initialize OpenAI client
openai.api_key = config.OPENAI_API_KEY

# ============================================================================
# PYDANTIC MODELS
# ============================================================================

class ChatRequest(BaseModel):
    query: str
    session_id: str
    customer_id: Optional[str] = None
    context: Optional[Dict] = {}

class DiagnosticRequest(BaseModel):
    appliance_type: str
    symptoms: List[str]
    brand: Optional[str] = None
    model: Optional[str] = None
    session_id: Optional[str] = None

class RecommendationRequest(BaseModel):
    appliance_type: str
    budget: Optional[float] = 2000
    required_features: List[str] = []
    energy_efficiency_preference: str = "medium"
    session_id: Optional[str] = None

class MaintenanceRequest(BaseModel):
    appliance_id: str
    service_type: str = "routine"
    preferred_date: Optional[str] = None
    issues: List[str] = []
    session_id: Optional[str] = None

class DiagnosisResult(BaseModel):
    likely_causes: List[str]
    probability: List[float]
    severity: str
    immediate_actions: List[str]
    parts_needed: List[str]
    estimated_repair_time: str
    diy_possible: bool
    safety_warnings: List[str]

# ============================================================================
# AI AGENT CLASSES
# ============================================================================

class BaseAgent:
    def __init__(self, name: str, role: str):
        self.name = name
        self.role = role
        self.model = config.OPENAI_MODEL
        self.temperature = 0.3

    async def get_response(self, prompt: str) -> str:
        """Get response from OpenAI"""
        try:
            response = openai.ChatCompletion.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": self.get_system_prompt()
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=self.temperature,
                max_tokens=2000
            )
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"OpenAI API error: {e}")
            raise

    def get_system_prompt(self) -> str:
        """Override in subclasses"""
        return f"You are {self.name}, {self.role}"

class DiagnosticAgent(BaseAgent):
    def __init__(self):
        super().__init__("Dr. Diagnosto", "expert appliance diagnostic specialist")
        self.temperature = 0.2

    def get_system_prompt(self) -> str:
        return """You are Dr. Diagnosto, an expert appliance diagnostic specialist at Top Speed Appliance.

You specialize in diagnosing appliance problems with accuracy and providing clear guidance.

When analyzing appliance issues:
1. Consider the most likely causes first
2. Assess the severity (low, medium, high, critical)
3. Provide immediate safety actions if needed
4. Explain if DIY repair is possible
5. List parts that might be needed
6. Estimate repair time
7. Always prioritize customer safety

Always respond in JSON format with these fields:
- likely_causes: list of probable causes
- probability: list of probabilities (0-1)
- severity: low/medium/high/critical
- immediate_actions: list of immediate steps
- parts_needed: list of parts
- estimated_repair_time: estimated duration
- diy_possible: boolean
- safety_warnings: list of warnings"""

    async def diagnose(self, appliance_type: str, symptoms: List[str], brand: str = None, model: str = None) -> Dict:
        """Diagnose appliance issue"""
        prompt = f"""
        Diagnose this appliance issue:
        
        Appliance: {appliance_type}
        Brand: {brand or 'Unknown'}
        Model: {model or 'Unknown'}
        Symptoms: {', '.join(symptoms)}
        
        Provide a JSON response with the required fields.
        """
        
        response_text = await self.get_response(prompt)
        
        try:
            return json.loads(response_text)
        except json.JSONDecodeError:
            return {
                "likely_causes": [response_text[:100]],
                "probability": [0.5],
                "severity": "medium",
                "immediate_actions": ["Contact a professional technician"],
                "parts_needed": [],
                "estimated_repair_time": "2-4 hours",
                "diy_possible": False,
                "safety_warnings": ["Ensure power is off before any work"]
            }

class SalesAgent(BaseAgent):
    def __init__(self):
        super().__init__("Selina Sales", "premium appliance sales consultant")

    def get_system_prompt(self) -> str:
        return """You are Selina Sales, a premium appliance sales consultant at Top Speed Appliance.

You help customers find the perfect appliance for their needs by understanding their:
- Budget
- Space constraints
- Required features
- Energy efficiency preferences
- Brand preferences

You provide honest recommendations and explain value propositions.

When recommending appliances, consider:
1. Total cost of ownership, not just purchase price
2. Energy efficiency ratings
3. Warranty coverage
4. Customer reviews and ratings
5. Available rebates and incentives

Always respond in JSON format with recommendation arrays."""

    async def recommend(self, appliance_type: str, budget: float = 2000, features: List[str] = None, energy_efficiency: str = "medium") -> Dict:
        """Get appliance recommendations"""
        prompt = f"""
        Recommend {appliance_type} based on:
        - Budget: ${budget}
        - Features: {', '.join(features) if features else 'Any'}
        - Energy efficiency: {energy_efficiency}
        
        Provide 3-5 recommendations in JSON format with:
        - brand, model, price
        - key_features: list
        - energy_rating
        - warranty
        - estimated_annual_cost
        """
        
        response_text = await self.get_response(prompt)
        
        try:
            recommendations = json.loads(response_text)
            if not isinstance(recommendations, list):
                recommendations = [recommendations]
            return {"recommendations": recommendations}
        except:
            return {
                "recommendations": [
                    {
                        "brand": "Premium Brand",
                        "model": f"{appliance_type} Pro",
                        "price": budget,
                        "key_features": features or [],
                        "energy_rating": "Energy Star",
                        "warranty": "5 years"
                    }
                ]
            }

class MaintenanceAgent(BaseAgent):
    def __init__(self):
        super().__init__("Marty Maintenance", "preventive maintenance specialist")

    def get_system_prompt(self) -> str:
        return """You are Marty Maintenance, a preventive maintenance specialist at Top Speed Appliance.

You create personalized maintenance schedules to prevent appliance failures and extend lifespan.

For each appliance type, recommend:
1. Routine maintenance tasks
2. Maintenance schedules (weekly, monthly, seasonal, annual)
3. Common wear patterns
4. Parts likely to need replacement

Always prioritize prevention over expensive repairs."""

    async def schedule(self, appliance_type: str, service_type: str = "routine", issues: List[str] = None) -> Dict:
        """Schedule maintenance"""
        prompt = f"""
        Schedule maintenance for {appliance_type}
        Service type: {service_type}
        Issues: {', '.join(issues) if issues else 'Routine maintenance'}
        
        Create a maintenance schedule with:
        - estimated_duration
        - recommended_frequency
        - maintenance_tasks: list
        - parts_to_bring: list
        - preparation_steps: list
        """
        
        response_text = await self.get_response(prompt)
        
        try:
            schedule = json.loads(response_text)
        except:
            schedule = {
                "estimated_duration": "2 hours",
                "recommended_frequency": "Annually",
                "maintenance_tasks": ["Inspection", "Cleaning"],
                "parts_to_bring": [],
                "preparation_steps": ["Turn off power", "Clear area around appliance"]
            }
        
        return {
            "appointment_id": f"APT_{datetime.now().strftime('%Y%m%d%H%M%S')}",
            "service_type": service_type,
            "scheduled_time": datetime.now().isoformat(),
            "estimated_duration": schedule.get("estimated_duration", "2 hours"),
            "maintenance_tasks": schedule.get("maintenance_tasks", []),
            "parts_to_bring": schedule.get("parts_to_bring", []),
            "preparation_steps": schedule.get("preparation_steps", [])
        }

class SupportAgent(BaseAgent):
    def __init__(self):
        super().__init__("Cara Care", "customer support specialist")
        self.temperature = 0.5

    def get_system_prompt(self) -> str:
        return """You are Cara Care, a caring customer support specialist at Top Speed Appliance.

You handle general customer inquiries with warmth and professionalism.

Your capabilities:
- Answer questions about services
- Provide general appliance information
- Direct customers to appropriate resources
- Solve problems compassionately

Always be helpful, clear, and professional."""

    async def assist(self, query: str) -> Dict:
        """Provide customer support"""
        response_text = await self.get_response(query)
        
        return {
            "response": {
                "answer": response_text,
                "suggested_actions": [],
                "requires_human": len(response_text) < 50,
                "confidence": 0.8
            },
            "agent": self.name
        }

# ============================================================================
# ORCHESTRATOR
# ============================================================================

class Orchestrator:
    def __init__(self):
        self.diagnostic_agent = DiagnosticAgent()
        self.sales_agent = SalesAgent()
        self.maintenance_agent = MaintenanceAgent()
        self.support_agent = SupportAgent()

    async def route_request(self, query: str, context: Dict = None) -> Dict:
        """Route request to appropriate agent"""
        query_lower = query.lower()
        
        # Determine intent
        if any(word in query_lower for word in ['broken', 'not working', 'problem', 'issue', 'repair', 'fix']):
            return {"response": "I can help diagnose the issue.", "suggested_action": "diagnose"}
        elif any(word in query_lower for word in ['buy', 'purchase', 'recommend', 'looking for', 'best', 'cheapest']):
            return {"response": "Let me help you find the perfect appliance.", "suggested_action": "recommend"}
        elif any(word in query_lower for word in ['maintain', 'maintenance', 'clean', 'service', 'schedule']):
            return {"response": "I can help schedule maintenance.", "suggested_action": "maintenance"}
        else:
            response = await self.support_agent.assist(query)
            return response

# ============================================================================
# FASTAPI APPLICATION
# ============================================================================

app = FastAPI(
    title="Top Speed Appliance AI Agent",
    description="Production-ready AI assistant for appliance support",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize orchestrator
orchestrator = Orchestrator()

# ============================================================================
# ENDPOINTS
# ============================================================================

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "service": "Top Speed Appliance AI Agent",
        "version": "1.0.0",
        "status": "operational",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "Top Speed Appliance AI Agent",
        "timestamp": datetime.now().isoformat(),
        "environment": config.ENVIRONMENT
    }

@app.post("/api/v1/chat")
async def chat(request: ChatRequest):
    """Chat with AI assistant"""
    try:
        result = await orchestrator.route_request(request.query, request.context)
        
        return {
            "success": True,
            "response": result.get("response", ""),
            "suggested_action": result.get("suggested_action"),
            "agent_used": result.get("agent", "orchestrator"),
            "session_id": request.session_id,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Chat error: {e}")
        return {
            "success": False,
            "error": str(e),
            "response": "I'm experiencing technical difficulties. Please try again."
        }

@app.post("/api/v1/diagnose")
async def diagnose(request: DiagnosticRequest):
    """Diagnose appliance issue"""
    try:
        diagnosis = await orchestrator.diagnostic_agent.diagnose(
            appliance_type=request.appliance_type,
            symptoms=request.symptoms,
            brand=request.brand,
            model=request.model
        )
        
        return {
            "success": True,
            "diagnosis": diagnosis,
            "appliance_type": request.appliance_type,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Diagnosis error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/v1/recommend")
async def recommend(request: RecommendationRequest):
    """Get appliance recommendations"""
    try:
        recommendations = await orchestrator.sales_agent.recommend(
            appliance_type=request.appliance_type,
            budget=request.budget,
            features=request.required_features,
            energy_efficiency=request.energy_efficiency_preference
        )
        
        return {
            "success": True,
            "recommendations": recommendations.get("recommendations", []),
            "count": len(recommendations.get("recommendations", [])),
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Recommendation error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/v1/schedule-maintenance")
async def schedule_maintenance(request: MaintenanceRequest):
    """Schedule maintenance appointment"""
    try:
        appointment = await orchestrator.maintenance_agent.schedule(
            appliance_type=request.service_type,
            service_type=request.service_type,
            issues=request.issues
        )
        
        return {
            "success": True,
            "appointment": appointment,
            "appliance_id": request.appliance_id,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Scheduling error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/agents")
async def list_agents():
    """List available agents"""
    return {
        "success": True,
        "agents": [
            {"name": "Dr. Diagnosto", "role": "Appliance Diagnostics"},
            {"name": "Selina Sales", "role": "Product Recommendations"},
            {"name": "Marty Maintenance", "role": "Preventive Maintenance"},
            {"name": "Cara Care", "role": "Customer Support"}
        ],
        "timestamp": datetime.now().isoformat()
    }

# ============================================================================
# ERROR HANDLERS
# ============================================================================

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.detail,
            "timestamp": datetime.now().isoformat()
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled error: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": "Internal server error",
            "timestamp": datetime.now().isoformat()
        }
    )

# ============================================================================
# STARTUP/SHUTDOWN
# ============================================================================

@app.on_event("startup")
async def startup_event():
    logger.info("Starting Top Speed Appliance AI Agent")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Shutting down Top Speed Appliance AI Agent")

# ============================================================================
# MAIN
# ============================================================================

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
