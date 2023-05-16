from typing import List
from repositories import product_category_repository
from entities.product_category import ProductCategory


def get_product_categories() -> List[ProductCategory]:
    entities = product_category_repository.get_product_categories()
    return [ProductCategory(**entity.dict()) for entity in entities]
