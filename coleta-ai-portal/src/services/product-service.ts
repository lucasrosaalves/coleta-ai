import { apiUrl } from "@/constants/api";
import { Product } from "@/entities/product";
import { CreateProductRequest } from "@/requests/create-product-request";

export const getProducts = async (
  productCategoryId: number
): Promise<Product[]> => {
  const response = await fetch(
    `${apiUrl}/products?product_category_id=${productCategoryId}`
  );
  const content: any[] = await response.json();
  return content.map(
    ({
      id,
      name,
      description,
      product_category_id,
      quantity,
      city_id,
      created_at,
      pictures,
    }) => {
      return {
        id,
        name,
        description,
        productCategoryId: product_category_id,
        quantity,
        cityId: city_id,
        createdAt: created_at,
        pictures,
      };
    }
  );
};

export const createProduct = async (request: CreateProductRequest) => {
  await fetch(`${apiUrl}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...request,
      product_category_id: request.selectedCategoryId,
      city_id: request.selectedCityId,
    }),
  });
};
