from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    email: EmailStr

    model_config = ConfigDict(from_attributes=True)


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class SubmissionCreate(BaseModel):
    full_name: str
    phone: str
    address: str | None = None
    details: str | None = None


class SubmissionOut(SubmissionCreate):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
