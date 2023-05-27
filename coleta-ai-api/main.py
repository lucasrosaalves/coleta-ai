import uvicorn
from fastapi import FastAPI
from migrations import run_migration
from repositories import engine
from requests.create_product_request import CreateProductRequest
from services import product_category_service, product_service, city_service
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


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/products")
def get_products(product_category_id: int, limit: int = 50, offset: int = 0):
    return product_service.get_products(product_category_id, limit, offset)


@app.post("/products")
def post_products(request: CreateProductRequest):
    return product_service.create_product(request)


@app.get("/productCategories")
def get_product_categories():
    return product_category_service.get_product_categories()


@app.get("/cities")
def get_cities():
    return city_service.get_cities()


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
