import { apiUrl } from "@/constants/api";
import { City } from "@/entities/city";

export const getCities = async (): Promise<City[]> => {
  const response = await fetch(`${apiUrl}/cities`);
  return response.json();
};
