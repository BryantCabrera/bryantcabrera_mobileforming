/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    // HttpLink is responsible for fetching GraphQL results from a GraphQL server
    link: new HttpLink(),
    // InMemoryCache helps with data store normalization
    cache: new InMemoryCache()
});

AppRegistry.registerComponent(appName, () => {
    return (
        <ApolloProvider client={client}>
            App
        </ApolloProvider>
    );
});
