import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { usersReservationsQuery } from '../../queries/queries';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated
} from 'react-native';

class FindReservationScreen extends Component {
    state = {
        placesLoaded: false,
        // You can call this anything you want
        // It instantiates a new Animated.Value
            // The argument passed in is the initial vlaue
        removeAnim: new Animated.Value(1),
        placesAnim: new Animated.Value(0)
    };

    render() {
        return (
            <Text>
                This is FindReservation.
            </Text>
        )
    }
}

// export default FindReservationScreen;

const FindReservationsQuery = graphql(usersReservationsQuery)(FindReservationScreen);

export default FindReservationsQuery;