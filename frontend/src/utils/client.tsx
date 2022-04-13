import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

// probably want to configure this from env vars later
export const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const httpLink = createHttpLink({
  uri: '/graphql',
});

export const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  cache,
  link: authLink.concat(httpLink),
});
