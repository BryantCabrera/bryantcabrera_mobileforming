import React from 'react';
import { ApolloProvider } from 'react-apollo';
import hoistNonReactStatic from 'hoist-non-react-statics';

export default apolloAndReduxProviderHOC = (WrappedComponent, store, client) => {
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