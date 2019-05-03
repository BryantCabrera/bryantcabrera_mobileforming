/**
 * @format
 */

// import { Navigation } from "react-native-navigation";
import App from './App';
import { name as appName } from './app.json';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    // HttpLink is responsible for fetching GraphQL results from a GraphQL server
    link: new HttpLink({
        uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev',
        headers: {
            authorization: 'YOUR_TOKEN' // on production you need to store token
            //in storage or in redux persist, for demonstration purposes we do this like that
        }
    }),
    // InMemoryCache helps with data store normalization
    cache: new InMemoryCache()
});

AppRegistry.registerComponent(appName, () => {
    return (
        <ApolloProvider client={client}>
            {App}
        </ApolloProvider>
    );
});

// Update for react-native-naivgation version2
// Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => {
//     return (
//         <ApolloProvider client={client}>
//             App
//         </ApolloProvider>
//     );
// });

// Navigation.events().registerAppLaunchedListener(() => {
//     Navigation.setRoot({
//         root: {
//             component: {
//                 name: "bryant-mobileforming.AuthScreen"
//             }
//         }
//     });
// });