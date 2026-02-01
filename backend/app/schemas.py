from pydantic import BaseModel, Field
from typing import Optional
from app.models import UserRole

# Auth
class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: "UserInfo"

class UserInfo(BaseModel):
    id: int
    username: str
    full_name: Optional[str]
    role: UserRole
    local_id: Optional[int]
    local_nombre: Optional[str]

# Users
class UserCreate(BaseModel):
    username: str = Field(..., min_length=3)
    password: str = Field(..., min_length=4)
    full_name: Optional[str] = None
    role: UserRole = UserRole.EMPLEADO
    local_id: Optional[int] = None

class UserRead(BaseModel):
    id: int
    username: str
    full_name: Optional[str]
    role: UserRole
    is_active: bool
    local_id: Optional[int]
    
    class Config:
        from_attributes = True

# Locales
class LocalCreate(BaseModel):
    nombre: str = Field(..., min_length=1)
    direccion: Optional[str] = None

class LocalRead(BaseModel):
    id: int
    nombre: str
    direccion: Optional[str]
    
    class Config:
        from_attributes = True
