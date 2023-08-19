import { ProductCategory } from "@/entities/product-category";
import { apiUrl } from "@/constants/api";
import { makeRequest } from "./helpers";

export const getProductCategories = async (): Promise<ProductCategory[]> => {
  const response = await makeRequest(`${apiUrl}/productCategories`);
  return response.json();
};
