# server/tests/test_models.py
import pytest
from sqlalchemy.orm import Session
from api.db import init_db, get_db, engine
from api.models import Base, User
from datetime import datetime

@pytest.fixture
def db():
    # Create test database
    Base.metadata.create_all(bind=engine)
    db = next(get_db())
    try:
        yield db
    finally:
        db.close()
        # Clean up after test
        Base.metadata.drop_all(bind=engine)

def test_create_user(db: Session):
    # Create a test user
    user = User(
        email="test@example.com",
        name="Test User",
        picture="https://example.com/pic.jpg",
    )
    
    # Add to database
    db.add(user)
    db.commit()
    db.refresh(user)
    
    # Query the user
    saved_user = db.query(User).filter(User.email == "test@example.com").first()
    
    # Assertions
    assert saved_user is not None
    assert saved_user.email == "test@example.com"
    assert saved_user.name == "Test User"
    assert saved_user.picture == "https://example.com/pic.jpg"
    assert isinstance(saved_user.created_at, datetime)
    assert isinstance(saved_user.updated_at, datetime)
