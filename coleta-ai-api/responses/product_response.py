from datetime import datetime
from typing import List
from pydantic import BaseModel


class ProductResponse(BaseModel):
    id: int
    name: str
    description: str
    product_category_id: int
    quantity: str
    city_id: int
    created_at: datetime