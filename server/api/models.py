# server/api/models/base.py
import uuid
from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, String, DateTime, Boolean
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=True)
    picture = Column(String, nullable=True)
    google_id = Column(String, unique=True, nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    def __init__(self, email: str, name: str = None, picture: str = None, google_id: str = None, id: str = None):
        self.id = id if id is not None else str(uuid.uuid4())
        self.email = email
        self.name = name
        self.picture = picture
        self.google_id = google_id
        self.is_active = True
