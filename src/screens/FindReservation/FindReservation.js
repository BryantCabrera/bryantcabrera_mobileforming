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
import ReservationsList from '../../components/ReservationsList/ReservationsList';

class FindReservationScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: "orange"
    }

    state = {
        userName: '',
        // reservations: null,
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
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    componentDidMount() {
        // console.log(this.props.data.reservations, ' props res from Find')
        // this.setState({
        //     userName: this.props.name,
        //     reservations: this.props.data.reservations
        // });
    }

    onNavigatorEvent = event => {
        if (event.type === "ScreenChangedEvent") {
            if (event.id === "willAppear") {
                this.props.data.refetch();
                console.log(this.props, 'props from Find');
            }
        }

        // these types are ids defined in startMainTabs.js leftButtons property
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    }

    itemSelectedHandler = id => {
        const selectedReservation = this.props.data.reservations.find(place => {
            return place.id === id;
        });

        this.props.navigator.push({
            screen: "bryant-mobileforming.ReservationDetailScreen",
            title: selectedReservation.hotelName,
            passProps: {
                selectedReservation: selectedReservation,
                name: this.props.name
            }
        });
    };

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
        let content = (
            // Wrap 2D content with Animated.View
            // can use dynamically managed value
            // style contains a JavaScript object
            <Animated.View
                style={{
                    // can only use this.state.removeAnim on Animated.View, it's not just a value
                    opacity: this.state.removeAnim,
                    transform: [
                        {
                            // .interpolate() lets you use the value managed by React and convert it to a different value
                            scale: this.state.removeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [12, 1]
                            })
                        }
                    ]
                }}
            >
                <TouchableOpacity onPress={this.reservationsSearchHandler}>
                    <View style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>Your Reservations</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );

        if (this.state.reservationsLoaded) {
            content = (
                <Animated.View
                    style={{
                        opacity: this.state.placesAnim
                    }}
                >
                    <ReservationsList
                        reservations={this.props.data.reservations}
                        onItemSelected={this.itemSelectedHandler}
                    />
                </Animated.View>
            );
        }

        return (
            <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
                {content}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    searchButton: {
        borderColor: "orange",
        borderWidth: 3,
        borderRadius: 50,
        padding: 20
    },
    searchButtonText: {
        color: "orange",
        fontWeight: "bold",
        fontSize: 26
    }
});

const FindReservationsQuery = graphql(usersReservationsQuery, {
    options: {
        fetchPolicy: 'network-only'
    }
})(FindReservationScreen);

export default FindReservationsQuery;