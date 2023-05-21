import { apiUrl } from "@/constants/api";
import { Product } from "@/entities/product";

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
    }) => {
      return {
        id,
        name,
        description,
        productCategoryId: product_category_id,
        quantity,
        cityId: city_id,
        createdAt: created_at,
      };
    }
  );
};
