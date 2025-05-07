from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import date, datetime, timedelta
from enum import Enum

app = FastAPI()

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
    start_date: date
    end_date: date

class ReadingStatus(str, Enum):
    COMPLETED = "COMPLETED"
    MISSED = "MISSED"
    UPCOMING = "UPCOMING"

class ReadingHistory(BaseModel):
    date: date
    status: ReadingStatus
    donation_amount: Optional[float] = None

class ProgressSummary(BaseModel):
    completed: int
    missed: int
    donated: float

class DonationAmount(BaseModel):
    amount: float

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
        date=entry_date,
        status=status,
        donation_amount=donation_amount
    )
    reading_history[today + timedelta(days=i)] = ReadingHistory(
        date=today + timedelta(days=i),
        status=ReadingStatus.UPCOMING,
        donation_amount=None
    )


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/api/progress/summary")
async def get_progress_summary(date_range: DateRange) -> ProgressSummary:
    """
    Get progress summary for a date range
    Returns number of completed readings, missed readings, and total donations
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

@app.post("/api/progress/history")
async def get_reading_history(date_range: DateRange) -> List[ReadingHistory]:
    """
    Get reading history for a date range
    Returns list of dates with their status (COMPLETED, MISSED, or UPCOMING)
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
            date=current_date,
            status=status,
            donation_amount=donation_amount
        ))
        current_date = current_date + timedelta(days=1)

    return history

@app.get("/api/donation/amount")
async def get_donation_amount() -> DonationAmount:
    """
    Get the current daily donation amount
    """
    return DonationAmount(amount=daily_donation_amount)

@app.post("/api/donation/amount")
async def set_donation_amount(donation: DonationAmount) -> DonationAmount:
    """
    Set the daily donation amount
    """
    if donation.amount < 0:
        raise HTTPException(status_code=400, detail="Donation amount cannot be negative")
    
    global daily_donation_amount
    daily_donation_amount = donation.amount
    return DonationAmount(amount=daily_donation_amount)

