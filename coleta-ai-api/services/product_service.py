from datetime import datetime
from typing import List
from entities.product import Product
from repositories import product_repository
from requests import create_product_request
from responses.product_response import ProductResponse


def get_products(
    product_category_id: int, limit: int, offset: int
) -> List[ProductResponse]:
    entities = product_repository.get_products(product_category_id, limit, offset)

    return [ProductResponse(**entity.dict()) for entity in entities]


def create_product(request: create_product_request) -> None:
    product = Product(
        name=request.name,
        description=request.description,
        product_category_id=request.product_category_id,
        quantity=request.quantity,
        city_id=request.city_id,
        user_id=1,
        active=True,
        created_at=datetime.utcnow(),
    )
    return product_repository.insert_or_update(product)
