from typing import List
from entities.product_category import ProductCategory
from repositories import product_category_repository


def run_migration() -> None:
    categories = product_category_repository.get_product_categories()
    if len(categories) > 0:
        return
    product_categories = _create_product_categories()
    for product_category in product_categories:
        product_category_repository.insert_or_update(product_category)
    
    
def _create_product_categories() -> List[ProductCategory]:
    return [
        ProductCategory(name="Matéria Orgânica"),
        ProductCategory(name="Metais"),
        ProductCategory(name="Vidro"),
        ProductCategory(name="Plástico"),
        ProductCategory(name="Papel e Papelão"),
        ProductCategory(name="Embalagem multicamada"),
        ProductCategory(name="Texteis, couros e borracha"),
        ProductCategory(name="Rejeitos"),
    ]