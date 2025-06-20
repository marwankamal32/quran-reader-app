import uuid
from sqlalchemy.orm import declarative_base, mapped_column, Mapped
from sqlalchemy import Column, String, DateTime, Boolean
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String, nullable=True)
    picture: Mapped[str] = mapped_column(String, nullable=True)
    google_id: Mapped[str] = mapped_column(String, unique=True, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    def __init__(self, email: str, name: str = None, picture: str = None, google_id: str = None, id: str = None):
        self.id = id if id is not None else str(uuid.uuid4())
        self.email = email
        self.name = name
        self.picture = picture
        self.google_id = google_id
        self.is_active = True
