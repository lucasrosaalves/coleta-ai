from typing import List
from entities.city import City
from sqlmodel import Session, select

from .engine import engine


def get_cities() -> List[City]:
    with Session(engine) as session:
        query = select(City)
        return session.exec(query).all()


def get_cities_by_region_id(region_id: int) -> List[City]:
    with Session(engine) as session:
        query = select(City).where(City.region_id == region_id)
        return session.exec(query).all()

def insert_or_update(city: City) -> None:
    with Session(engine) as session:
        session.add(city)
        session.commit()
