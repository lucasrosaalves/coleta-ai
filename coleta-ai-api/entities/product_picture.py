from typing import Optional
from sqlmodel import SQLModel, Field


class ProductPicture(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    product_id: int
    content: str
