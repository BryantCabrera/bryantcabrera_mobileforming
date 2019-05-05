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
        reservationsLoaded: false,
        // You can call this anything you want
        // It instantiates a new Animated.Value
            // The argument passed in is the initial vlaue
        removeAnim: new Animated.Value(1),
        reservationsAnim: new Animated.Value(0)
    };

    constructor(props) {
        super(props);

        // // Here, we specify a navigation method whenever a navigation event occurs
        // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    reservationsLoadedHandler = () => {
        Animated.timing(this.state.reservationsAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    };

    reservationsSearchHandler = () => {
        // Some animations don't focus on timing, just getting the animation to look right
        // React will handle the timing passed in as 1st argument
        // toValue is the value the initial value will hit
        Animated.timing(this.state.removeAnim, {
            toValue: 0,
            duration: 500,
            // Usually set this to true to make it more performant in JavaScript
            useNativeDriver: true
        }).start(() => {
            this.setState({
                reservationsLoaded: true
            });
            this.reservationsLoadedHandler();
        });
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