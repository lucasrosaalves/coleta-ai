import { apiUrl } from "@/constants/api";
import { Product } from "@/entities/product";
import { CreateProductRequest } from "@/requests/create-product-request";
import { makeRequest } from "./helpers";

export const getProduct = async (id: number): Promise<Product | undefined> => {
  const response = await makeRequest(`${apiUrl}/products/${id}`);
  const content = await response.json();
  return content ? mapJsonResponse(content) : undefined;
};

export const getProducts = async (
  productCategoryId: number
): Promise<Product[]> => {
  const response = await makeRequest(
    `${apiUrl}/products?product_category_id=${productCategoryId}`
  );
  const content: any[] = await response.json();
  return content.map(mapJsonResponse);
};

const mapJsonResponse = (data: any): Product => {
  const {
    id,
    name,
    description,
    product_category_id,
    quantity,
    city_id,
    created_at,
    pictures,
    user_name,
    user_phone,
  } = data;
  return {
    id,
    name,
    description,
    productCategoryId: product_category_id,
    quantity,
    cityId: city_id,
    createdAt: created_at,
    pictures,
    usePhone: user_phone,
    userName: user_name,
  };
};

export const createProduct = async (request: CreateProductRequest) => {
  const body = {
    ...request,
    product_category_id: request.selectedCategoryId,
    city_id: request.selectedCityId,
  };
  await makeRequest(`${apiUrl}/products`, body, "POST");
};
