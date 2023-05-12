import uvicorn
from fastapi import FastAPI
from repositories import engine
from requests.create_product_request import CreateProductRequest
from services import product_service


app = FastAPI()


engine.create_metadata()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/products")
def get_products(product_category_id: int, limit: int = 50, offset: int = 0):
    return product_service.get_products(product_category_id, limit, offset)


@app.post("/products")
def post_products(request: CreateProductRequest):
    return product_service.create_product(request)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
