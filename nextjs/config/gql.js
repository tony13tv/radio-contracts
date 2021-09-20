import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: 'http://localhost:1337/graphql',
});

const authLink = setContext((_, {headers}) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('jwt');
    if (token)
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        }
    return {}
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink), cache: new InMemoryCache()
})