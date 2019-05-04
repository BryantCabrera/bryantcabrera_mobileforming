/**
 * @format
*/

import App from './App';
App();

// /**
//  * @format
//  */

// // import { Navigation } from "react-native-navigation";
// import { AppRegistry } from 'react-native';
// import App from './App';
// import { name as appName } from './app.json';
// import { ApolloProvider } from 'react-apollo';
// import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';

// const client = new ApolloClient({
//     // HttpLink is responsible for fetching GraphQL results from a GraphQL server
//     link: new HttpLink({
//         uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'
//         // headers: {
//         //     authorization: 'YOUR_TOKEN' // on production you need to store token
//         //     //in storage or in redux persist, for demonstration purposes we do this like that
//         // }
//     }),
//     // InMemoryCache helps with data store normalization
//     cache: new InMemoryCache()
// });

// const ApolloApp = () => (
//     <ApolloProvider client={client}>
//         {App}
//     </ApolloProvider>
// );

// AppRegistry.registerComponent(appName, () => ApolloApp);