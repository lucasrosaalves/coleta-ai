from typing import List
from entities.product_picture import ProductPicture
from sqlmodel import Session, select

from .engine import engine


def get_product_pictures(product_id: int) -> List[ProductPicture]:
    with Session(engine) as session:
        query = select(ProductPicture).where(ProductPicture.product_id == product_id)
        return session.exec(query).all()


def insert_or_update(product_pictures: List[ProductPicture]) -> None:
    with Session(engine) as session:
        session.add_all(product_pictures)
        session.commit()
