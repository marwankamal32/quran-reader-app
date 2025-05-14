from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date, timedelta
from enum import Enum
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from server.api.db import get_session
from server.api.models import User

app = FastAPI(
    title="Quran Reader API",
    description="""
    API for tracking Quran reading progress and managing donations.
    
    ## Features
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
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Models
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

class ReadingStatus(str, Enum):
    COMPLETED = "COMPLETED"
    MISSED = "MISSED"
    UPCOMING = "UPCOMING"

class ReadingHistory(BaseModel):
    day: date = Field(description="Day of the reading")
    status: ReadingStatus = Field(description="Status of the reading")
    donation_amount: Optional[float] = Field(
        default=None,
        description="Donation amount if reading was missed"
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "day": "2024-03-01",
                "status": "COMPLETED",
                "donation_amount": None
            }
        }
    }

class ProgressSummary(BaseModel):
    completed: int = Field(description="Number of completed readings")
    missed: int = Field(description="Number of missed readings")
    donated: float = Field(description="Total amount donated in dollars")

    model_config = {
        "json_schema_extra": {
            "example": {
                "completed": 20,
                "missed": 10,
                "donated": 50.0
            }
        }
    }

class DonationAmount(BaseModel):
    amount: float = Field(
        description="Donation amount in dollars",
        ge=0,
        examples=[5.0]
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "amount": 5.0
            }
        }
    }

# In-memory storage (replace with database in production)
daily_donation_amount = 5.0  # Default $5

# Dummy data for reading history
today = date.today()
reading_history = {}

# Previous 30 days: mix of COMPLETED and MISSED
for i in range(1, 31):
    entry_date = today - timedelta(days=i)
    # Alternate between COMPLETED and MISSED for variety
    if i % 3 == 0:
        status = ReadingStatus.MISSED
        donation_amount = daily_donation_amount
    else:
        status = ReadingStatus.COMPLETED
        donation_amount = None
    reading_history[entry_date] = ReadingHistory(
        day=entry_date,
        status=status,
        donation_amount=donation_amount
    )
    reading_history[today + timedelta(days=i)] = ReadingHistory(
        day=today + timedelta(days=i),
        status=ReadingStatus.UPCOMING,
        donation_amount=None
    )

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post(
    "/api/progress/summary",
    response_model=ProgressSummary,
    summary="Get Progress Summary",
    description="Get a summary of completed readings, missed readings, and total donations for a date range."
)
async def get_progress_summary(date_range: DateRange) -> ProgressSummary:
    """
    Get progress summary for a date range.
    
    - **start_date**: Start date for the range (YYYY-MM-DD)
    - **end_date**: End date for the range (YYYY-MM-DD)
    
    Returns:
    - **completed**: Number of completed readings
    - **missed**: Number of missed readings
    - **donated**: Total amount donated in dollars
    """
    completed = 0
    missed = 0
    donated = 0.0

    current_date = date_range.start_date
    while current_date <= date_range.end_date:
        if current_date in reading_history:
            if reading_history[current_date].status == ReadingStatus.COMPLETED:
                completed += 1
            elif reading_history[current_date].status == ReadingStatus.MISSED:
                missed += 1
                donated += daily_donation_amount
        current_date = current_date + timedelta(days=1)

    return ProgressSummary(
        completed=completed,
        missed=missed,
        donated=round(donated, 2)
    )

@app.post(
    "/api/progress/history",
    response_model=List[ReadingHistory],
    summary="Get Reading History",
    description="Get detailed reading history for a date range, including status and donation amounts."
)
async def get_reading_history(date_range: DateRange) -> List[ReadingHistory]:
    """
    Get reading history for a date range.
    
    - **start_date**: Start date for the range (YYYY-MM-DD)
    - **end_date**: End date for the range (YYYY-MM-DD)
    
    Returns a list of reading records with:
    - **day**: Day of the reading
    - **status**: Status (COMPLETED, MISSED, or UPCOMING)
    - **donation_amount**: Donation amount if reading was missed
    """
    history = []
    current_date = date_range.start_date
    today = date.today()

    while current_date <= date_range.end_date:
        status = ReadingStatus.UPCOMING
        donation_amount = None

        if current_date in reading_history:
            status = reading_history[current_date].status
            if status == ReadingStatus.MISSED:
                donation_amount = daily_donation_amount
        elif current_date < today:
            status = ReadingStatus.MISSED
            donation_amount = daily_donation_amount

        history.append(ReadingHistory(
            day=current_date,
            status=status,
            donation_amount=donation_amount
        ))
        current_date = current_date + timedelta(days=1)

    return history

@app.get(
    "/api/donation/amount",
    response_model=DonationAmount,
    summary="Get Donation Amount",
    description="Get the current daily donation amount for missed readings."
)
async def get_donation_amount() -> DonationAmount:
    """
    Get the current daily donation amount.
    
    Returns:
    - **amount**: Current donation amount in dollars
    """
    return DonationAmount(amount=daily_donation_amount)

@app.post(
    "/api/donation/amount",
    response_model=DonationAmount,
    summary="Set Donation Amount",
    description="Set the daily donation amount for missed readings."
)
async def set_donation_amount(donation: DonationAmount) -> DonationAmount:
    """
    Set the daily donation amount.
    
    - **amount**: New donation amount in dollars (must be non-negative)
    
    Returns:
    - **amount**: Updated donation amount
    """
    if donation.amount < 0:
        raise HTTPException(
            status_code=400,
            detail="Donation amount cannot be negative"
        )
    
    global daily_donation_amount
    daily_donation_amount = donation.amount
    return DonationAmount(amount=daily_donation_amount)


class GoogleAuthRequest(BaseModel):
    email: str
    name: Optional[str] = None
    picture: Optional[str] = None

@app.post("/google")
async def google_auth(request: GoogleAuthRequest, db: Session = Depends(get_session)):
    try:
        # Find or create user
        user = db.query(User).filter(User.email == request.email).first()
        
        if not user:
            # Create new user
            user = User(
                email=request.email,
                name=request.name,
                picture=request.picture
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        
        return {
            "status": "success",
            "user": {
                "email": user.email,
                "name": user.name,
                "picture": user.picture
            }
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))