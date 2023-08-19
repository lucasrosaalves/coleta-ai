export type CreateProductRequest = {
  name: string;
  description: string;
  selectedCategoryId: number;
  selectedCityId: number;
  quantity?: number;
  picture: string;
};
