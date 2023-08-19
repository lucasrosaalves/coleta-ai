from datetime import datetime
from typing import List, Optional

from fastapi import HTTPException
from entities.product import Product
from entities.product_picture import ProductPicture
from repositories import product_repository, product_picture_repository, user_repository
from requests.create_product_request import CreateProductRequest
from responses.product_response import ProductResponse


def get_product(id: int) -> Optional[ProductResponse]:
    entity = product_repository.get_product(id)
    if entity is None:
        return None
    pictures = product_picture_repository.get_product_pictures(id)
    user = user_repository.get_user_by_id(entity.user_id)
    return ProductResponse(
        **entity.dict(),
        pictures=[picture.content for picture in pictures],
        user_name=user.name if user else None,
        user_phone=user.phone if user else None,
    )


def get_products(
    product_category_id: int, limit: int, offset: int
) -> List[ProductResponse]:
    entities = product_repository.get_products(product_category_id, limit, offset)
    response: List[ProductResponse] = []

    for entity in entities:
        pictures = product_picture_repository.get_product_pictures(entity.id)
        response.append(
            ProductResponse(
                **entity.dict(), pictures=[picture.content for picture in pictures]
            )
        )
    return response


def create_product(request: CreateProductRequest, user_id: int) -> None:
    product = Product(
        name=request.name,
        description=request.description,
        product_category_id=request.product_category_id,
        quantity=request.quantity,
        city_id=request.city_id,
        user_id=user_id,
        active=True,
        created_at=datetime.utcnow(),
    )
    product = product_repository.insert_or_update(product)
    product_picture_repository.insert_or_update(
        [ProductPicture(product_id=product.id, content=request.picture)]
    )
