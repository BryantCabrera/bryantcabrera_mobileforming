/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'
});

AppRegistry.registerComponent(appName, () => {
    return (
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    );
});