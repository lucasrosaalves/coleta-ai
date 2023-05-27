from typing import Optional
from sqlmodel import SQLModel, Field


class ProductCategory(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
