import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { getToken } from './cookies';

// probably want to configure this from env vars later
export const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URI,
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
});
