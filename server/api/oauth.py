import secrets
import httpx
from typing import Dict, Any, Optional
from urllib.parse import urlencode
from fastapi import HTTPException, status
from google.auth.transport import requests
from google.oauth2 import id_token
from sqlalchemy.orm import Session

from .config import settings
from .models import User
from .auth import AuthService


class GoogleOAuthService:
    def __init__(self):
        self.client_id = settings.GOOGLE_CLIENT_ID
        self.client_secret = settings.GOOGLE_CLIENT_SECRET
        self.redirect_uri = settings.GOOGLE_REDIRECT_URI
        self.scopes = settings.GOOGLE_SCOPES
        
        # Google OAuth URLs
        self.auth_url = "https://accounts.google.com/o/oauth2/auth"
        self.token_url = "https://oauth2.googleapis.com/token"
        self.userinfo_url = "https://www.googleapis.com/oauth2/v2/userinfo"

    def generate_auth_url(self, state: Optional[str] = None) -> Dict[str, str]:
        """Generate Google OAuth authorization URL"""
        if not state:
            state = secrets.token_urlsafe(32)
        
        params = {
            "client_id": self.client_id,
            "redirect_uri": self.redirect_uri,
            "scope": " ".join(self.scopes),
            "response_type": "code",
            "access_type": "offline",
            "state": state,
            "prompt": "consent"
        }
        
        auth_url = f"{self.auth_url}?{urlencode(params)}"
        
        return {
            "auth_url": auth_url,
            "state": state
        }

    async def exchange_code_for_token(self, code: str) -> Dict[str, Any]:
        """Exchange authorization code for access token"""
        data = {
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "code": code,
            "grant_type": "authorization_code",
            "redirect_uri": self.redirect_uri,
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(self.token_url, data=data)
            
            if response.status_code != 200:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Failed to exchange code for token"
                )
            
            return response.json()

    async def get_user_info(self, access_token: str) -> Dict[str, Any]:
        """Get user information from Google"""
        headers = {"Authorization": f"Bearer {access_token}"}
        
        async with httpx.AsyncClient() as client:
            response = await client.get(self.userinfo_url, headers=headers)
            
            if response.status_code != 200:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Failed to get user info from Google"
                )
            
            return response.json()

    def verify_id_token(self, id_token_str: str) -> Dict[str, Any]:
        """Verify Google ID token"""
        try:
            # Verify the token
            idinfo = id_token.verify_oauth2_token(
                id_token_str, requests.Request(), self.client_id
            )
            
            # Verify the issuer
            if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise ValueError('Wrong issuer.')
            
            return idinfo
        except ValueError as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid ID token: {str(e)}"
            )

    def find_or_create_user(self, user_info: Dict[str, Any], db: Session) -> User:
        """Find existing user or create new one from Google user info"""
        google_id = user_info.get("id")
        email = user_info.get("email")
        name = user_info.get("name")
        picture = user_info.get("picture")
        
        if not google_id or not email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid user information from Google"
            )
        
        # Try to find user by Google ID first
        user = db.query(User).filter(User.google_id == google_id).first()
        
        if not user:
            # Try to find user by email
            user = db.query(User).filter(User.email == email).first()
            
            if user:
                # Update existing user with Google ID
                user.google_id = google_id
                user.name = name or user.name
                user.picture = picture or user.picture
            else:
                # Create new user
                user = User(
                    email=email,
                    name=name,
                    picture=picture,
                    google_id=google_id
                )
                db.add(user)
        else:
            # Update existing user info
            user.email = email
            user.name = name or user.name
            user.picture = picture or user.picture
        
        db.commit()
        db.refresh(user)
        return user

    async def handle_oauth_callback(self, code: str, db: Session) -> Dict[str, Any]:
        """Handle the complete OAuth callback flow"""
        # Exchange code for tokens
        token_data = await self.exchange_code_for_token(code)
        
        # Get user info using access token
        user_info = await self.get_user_info(token_data["access_token"])
        
        # Optionally verify ID token if provided
        if "id_token" in token_data:
            id_token_info = self.verify_id_token(token_data["id_token"])
            # Merge information from both sources
            user_info.update(id_token_info)
        
        # Find or create user
        user = self.find_or_create_user(user_info, db)
        
        # Generate JWT token for our application
        jwt_token = AuthService.create_user_token(user)
        
        return {
            "access_token": jwt_token,
            "token_type": "bearer",
            "user": {
                "id": user.id,
                "email": user.email,
                "name": user.name,
                "picture": user.picture
            }
        }


# Create global instance
google_oauth = GoogleOAuthService() 