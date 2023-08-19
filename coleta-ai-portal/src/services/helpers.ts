export const makeRequest = async (
  url: string,
  body?: any,
  method: "POST" | "GET" = "GET"
) => {
  const bodyContent = body ? JSON.stringify(body) : undefined;
  const token = localStorage.getItem("portal_token");

  return await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      token: token ?? "",
    },
    body: bodyContent,
  });
};
