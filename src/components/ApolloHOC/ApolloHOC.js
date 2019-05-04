import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import hoistNonReactStatic from 'hoist-non-react-statics';

const client = new ApolloClient({
    uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'
});

// This is a Higher Order Component (HOC) that will be used to wrap screens to bind them to the Apollo Client/GraphQL
export default apolloAndReduxProviderHOC = (WrappedComponent) => {
    class Enhance extends React.Component {
        render() {
            return (
                <ApolloProvider client={client}>
                    <WrappedComponent {...this.props} />
                </ApolloProvider>
            )
        }
    }
    //Copies the static methods over to enhanced component
    hoistNonReactStatic(Enhance, WrappedComponent)
    return Enhance
}