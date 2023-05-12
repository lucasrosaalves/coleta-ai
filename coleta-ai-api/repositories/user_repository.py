from typing import Optional
from entities.user import User
from sqlmodel import Session, select

from .engine import engine


def get_user_by_id(user_id: int) -> Optional[User]:
    with Session(engine) as session:
        query = select(User).where(User.id == user_id)
        return session.exec(query).first()


def insert_or_update(user: User) -> None:
    with Session(engine) as session:
        session.add(user)
        session.commit()
