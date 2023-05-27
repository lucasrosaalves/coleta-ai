from sqlmodel import create_engine, SQLModel


engine = create_engine("sqlite:///database.db")


def create_metadata() -> None:
    SQLModel.metadata.create_all(engine)
