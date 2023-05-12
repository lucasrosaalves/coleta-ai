from typing import List
from entities.product_category import ProductCategory
from sqlmodel import Session, select

from .engine import engine


def get_product_categories() -> List[ProductCategory]:
    with Session(engine) as session:
        query = select(ProductCategory)
        return session.exec(query).all()


def insert_or_update(product_category: ProductCategory) -> None:
    with Session(engine) as session:
        session.add(product_category)
        session.commit()
