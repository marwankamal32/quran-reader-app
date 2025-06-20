from fastapi import FastAPI, HTTPException, Depends, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date, timedelta
from enum import Enum
from sqlalchemy.orm import Session

from api.db import get_session
from api.models import User
from api.auth import get_current_user, get_current_user_optional, AuthService
from api.oauth import google_oauth
from api.config import settings

app = FastAPI(
    title="Quran Reader API",
    description="""
    API for tracking Quran reading progress and managing donations.
    
    ## Features
    * Google OAuth 2.0 authentication
    * Track daily reading progress
    * View reading history
    * Manage donation amounts for missed readings
    """,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Models
class DateRange(BaseModel):
    start_date: date = Field(
        description="Start date for the range (YYYY-MM-DD)",
        examples=["2024-03-01"]
    )
    end_date: date = Field(
        description="End date for the range (YYYY-MM-DD)",
        examples=["2024-03-31"]
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "start_date": "2024-03-01",
                "end_date": "2024-03-31"
            }
        }
    }

class GoogleAuthRequest(BaseModel):
    email: str
    name: Optional[str] = None
    picture: Optional[str] = None

class AuthResponse(BaseModel):
    access_token: str
    token_type: str
    user: dict

class UserResponse(BaseModel):
    id: str
    email: str
    name: Optional[str]
    picture: Optional[str]
    created_at: str

# Routes
@app.get("/")
async def root():
    return {"message": "Quran Reader API - Welcome!"}

# =============================================================================
# AUTH ENDPOINTS
# =============================================================================

@app.get(
    "/auth/google/login",
    summary="Initiate Google OAuth Login",
    description="Redirects to Google OAuth consent screen"
)
async def google_login():
    """Initiate Google OAuth login flow"""
    auth_data = google_oauth.generate_auth_url()
    return RedirectResponse(url=auth_data["auth_url"])

@app.get(
    "/auth/google/callback",
    response_model=AuthResponse,
    summary="Google OAuth Callback",
    description="Handle Google OAuth callback and return JWT token"
)
async def google_callback(
    code: str = Query(..., description="Authorization code from Google"),
    state: Optional[str] = Query(None, description="State parameter for CSRF protection"),
    db: Session = Depends(get_session)
):
    """Handle Google OAuth callback"""
    if not code:
        raise HTTPException(status_code=400, detail="Authorization code is required")
    
    try:
        auth_result = await google_oauth.handle_oauth_callback(code, db)
        
        # For web applications, you might want to redirect to frontend with token
        # For API clients, return the token directly
        return auth_result
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"OAuth callback failed: {str(e)}")

@app.get(
    "/auth/me",
    response_model=UserResponse,
    summary="Get Current User",
    description="Get current authenticated user information"
)
async def get_me(current_user: User = Depends(get_current_user)):
    """Get current user information"""
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        name=current_user.name,
        picture=current_user.picture,
        created_at=current_user.created_at.isoformat()
    )

@app.post(
    "/auth/logout",
    summary="Logout User",
    description="Logout current user (client should delete token)"
)
async def logout():
    """Logout user - in JWT implementation, client handles token deletion"""
    # TODO: Implement logout
    return {"message": "Successfully logged out"}


# =============================================================================
# DONATION ENDPOINTS  
# =============================================================================

