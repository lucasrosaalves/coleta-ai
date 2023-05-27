from typing import List
from repositories import city_repository
from responses.city_response import CityResponse


def get_cities() -> List[CityResponse]:
    entities = city_repository.get_cities()
    return [CityResponse(**entity.dict()) for entity in entities]
