from pydantic import BaseModel


class ProductCategoryResponse(BaseModel):
    id: int
    name: str
