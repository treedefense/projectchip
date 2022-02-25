import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

// probably want to configure this from env vars later
export const cache = new InMemoryCache();

export const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  cache,
});
