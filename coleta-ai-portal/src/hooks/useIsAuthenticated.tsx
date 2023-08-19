import { isAuthenticated } from "@/services/auth-service";

export const useIsAuthenticated = () => {
  return isAuthenticated();
};
