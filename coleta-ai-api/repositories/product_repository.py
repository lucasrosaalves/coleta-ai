from typing import List, Optional
from entities.product import Product
from sqlmodel import Session, select

from .engine import engine


def get_product(id: int) -> Optional[Product]:
    with Session(engine) as session:
        query = select(Product).where(Product.id == id)
        return session.exec(query).first()


def get_products(product_category_id: int, limit: int, offset: int) -> List[Product]:
    with Session(engine) as session:
        query = (
            select(Product)
            .where(Product.product_category_id == product_category_id)
            .where(Product.active)
            .order_by(Product.created_at)
            .offset(offset)
            .limit(limit)
        )
        return session.exec(query).all()


def insert_or_update(product: Product) -> Product:
    with Session(engine) as session:
        session.add(product)
        session.commit()
        session.refresh(product)
        return product
