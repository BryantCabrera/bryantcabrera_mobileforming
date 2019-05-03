/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    // HttpLink is responsible for fetching GraphQL results from a GraphQL server
    link: new HttpLink(),
    // InMemoryCache helps with data store normalization
    cache: new InMemoryCache()
});

export default class App extends Component {
  render() {
      return (
          <ApolloProvider client={client}>
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to BryantCabrera_mobileforming</Text>
                <Text style={styles.instructions}>To get started, please Log In</Text>
                <Text style={styles.instructions}>instructions</Text>
            </View>
          </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
