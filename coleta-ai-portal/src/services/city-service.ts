import { apiUrl } from "@/constants/api";
import { City } from "@/entities/city";
import { makeRequest } from "./helpers";

export const getCities = async (): Promise<City[]> => {
  const response = await makeRequest(`${apiUrl}/cities`);
  return response.json();
};
