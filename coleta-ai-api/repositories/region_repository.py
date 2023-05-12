from typing import List
from entities.region import Region
from sqlmodel import Session, select

from .engine import engine


def get_regions() -> List[Region]:
    with Session(engine) as session:
        query = select(Region)
        return session.exec(query).all()


def insert_or_update(region: Region) -> None:
    with Session(engine) as session:
        session.add(region)
        session.commit()
