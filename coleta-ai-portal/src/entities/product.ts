export interface Product {
  id: number;
  name: string;
  description: string;
  productCategoryId: number;
  quantity: number;
  cityId: number;
  createdAt: Date;
  pictures: string[];
  userName?: string;
  usePhone?: string;
}
