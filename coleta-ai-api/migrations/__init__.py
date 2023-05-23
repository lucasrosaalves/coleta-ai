from typing import List
from entities.city import City
from entities.product_category import ProductCategory
from entities.region import Region
from repositories import city_repository, product_category_repository, region_repository


def run_migration() -> None:
    categories = product_category_repository.get_product_categories()
    if len(categories) > 0:
        return
    product_categories = _create_product_categories()
    for product_category in product_categories:
        product_category_repository.insert_or_update(product_category)

    regions = _create_regions()
    for region in regions:
        region_repository.insert_or_update(region)
    regions = region_repository.get_regions()

    cities = _create_cities(regions)
    for city in cities:
        city_repository.insert_or_update(city)
    
    
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

def _create_regions() -> List[Region]:
    return [
        Region(name="Rio de Janeiro")
    ]

def _create_cities(regions: List[Region]) -> List[City]:
    return [
        City(name="Petrópolis", region_id=[region.id for region in regions if region.name == "Rio de Janeiro"][0])
    ]