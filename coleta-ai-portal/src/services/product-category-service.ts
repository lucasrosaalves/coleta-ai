import { ProductCategory } from "@/entities/product-category";

export const getProductCategories = async (): Promise<ProductCategory[]> => {
    const response = await fetch('http://localhost:8000/productCategories')
    return response.json()
}