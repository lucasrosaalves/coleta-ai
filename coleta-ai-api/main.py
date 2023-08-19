from typing import Annotated
import uvicorn
from fastapi import Depends, FastAPI, HTTPException, Header
from entities.user import User
from migrations import run_migration
from repositories import engine
from requests.create_product_request import CreateProductRequest
from requests.login_request import LoginRequest
from services import (
    auth_service,
    product_category_service,
    product_service,
    city_service,
)
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
engine.create_metadata()

run_migration()


async def validate_auth(token: Annotated[str | None, Header()] = None):
    if not token:
        raise HTTPException(status_code=401, detail="Invalid user")
    user = auth_service.extract_user_from_token(token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid user")
    return user


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/login")
def login(request: LoginRequest):
    return auth_service.login(request)


@app.get("/products/{id}")
def get_product(id: int, _: Annotated[User, Depends(validate_auth)]):
    return product_service.get_product(id)


@app.get("/products")
def get_products(product_category_id: int, limit: int = 50, offset: int = 0):
    return product_service.get_products(product_category_id, limit, offset)


@app.post("/products")
def post_products(
    request: CreateProductRequest, user: Annotated[User, Depends(validate_auth)]
):
    return product_service.create_product(request, user.id)


@app.get("/productCategories")
def get_product_categories():
    return product_category_service.get_product_categories()


@app.get("/cities")
def get_cities():
    return city_service.get_cities()


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
