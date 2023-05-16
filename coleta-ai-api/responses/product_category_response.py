from typing import List
from pydantic import BaseModel


class ProductCategoryResponse(BaseModel):
    id: int
    name: str