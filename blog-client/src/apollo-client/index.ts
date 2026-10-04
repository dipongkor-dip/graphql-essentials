import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import config from "../config/venv";

export const getAuthCookie = () => {
  if (typeof document === "undefined") {
    return null;
  }

  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));

  return value ? decodeURIComponent(value.split("=").slice(1).join("=")) : null;
};

export const setAuthCookie = (token: string) => {
  const value = `Bearer ${token}`;
  document.cookie = `token=${encodeURIComponent(value)}; path=/; max-age=86400; SameSite=Lax`;
};

const authLink = setContext((_, { headers }) => {
  const authToken = getAuthCookie();

  return {
    headers: {
      ...headers,
      authorization: authToken || "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(new HttpLink({ uri: config.baseUrl })),
  cache: new InMemoryCache(),
});

export const clearAuthCookie = () => {
  if (typeof document !== "undefined") {
    document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
  }

  void client.clearStore();
};
