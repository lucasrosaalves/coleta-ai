from datetime import datetime
from typing import List
from pydantic import BaseModel


class ProductResponse(BaseModel):
    id: int
    name: str
    description: str
    product_category_id: int
    quantity: int
    city_id: int
    created_at: datetime
    pictures: List[str]
