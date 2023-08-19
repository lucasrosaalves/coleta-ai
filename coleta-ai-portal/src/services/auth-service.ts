import { apiUrl } from "@/constants/api";


const KEY = "portal_token"

export const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(KEY) != null
  }

  return false;
}

export const login = async (email: string, password: string) => {
  const response = await fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password
    }),
  });

  if (response.status !== 200) {
    throw new Error("Could not log in");
  }

  const content = await response.json();

  localStorage.setItem(KEY, content);
};

