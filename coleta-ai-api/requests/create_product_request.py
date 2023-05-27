from pydantic import BaseModel


class CreateProductRequest(BaseModel):
    name: str
    description: str
    product_category_id: int
    city_id: int
    quantity: str
    picture: str
