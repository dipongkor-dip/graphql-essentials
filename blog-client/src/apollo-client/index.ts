import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import config from "../config/venv";

export const client = new ApolloClient({
  link: new HttpLink({ uri: config.baseUrl }),
  cache: new InMemoryCache(),
});
