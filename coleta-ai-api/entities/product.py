from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field


class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    description: str
    product_category_id: int
    quantity: str
    city_id: int
    user_id: int
    active: bool
    created_at: datetime