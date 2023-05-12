from typing import List
from pydantic import BaseModel


class CreateProductRequest(BaseModel):
    name: str
    description: str
    product_category_id: int
    quantity: str
    city_id: int
    pictures: List[str]