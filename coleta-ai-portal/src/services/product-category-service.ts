import { ProductCategory } from "@/entities/product-category";
import { apiUrl } from "@/constants/api";

export const getProductCategories = async (): Promise<ProductCategory[]> => {
  const response = await fetch(`${apiUrl}/productCategories`);
  return response.json();
};
