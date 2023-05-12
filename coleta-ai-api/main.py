import uvicorn
from fastapi import FastAPI

from repositories import engine, product_repository


app = FastAPI()


engine.create_metadata()

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/products")
def get_products(product_category_id: int, limit: int = 50, offset: int = 0):
    return product_repository.get_products(product_category_id, limit, offset)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
