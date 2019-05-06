import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { deleteReservation, reservationsQuery } from '../../queries/queries';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Dimensions
} from 'react-native';
import ReservationInfo from '../../components/ReservationInfo/ReservationInfo';
import Icon from 'react-native-vector-icons/Ionicons';

class ReservationDetailScreen extends Component {
    state = {
        viewMode: "portrait"
    };

    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles);
    }

    updateStyles = dims => {
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        });
    };

    placeDeletedHandler = (id) => {
        // Deletes reservation from GraphQL backend and attempts to delete it from store
        this.props.mutate({
            // this input is defined in the const imported from queries and used at the bottom of this file
            // if the output name is the same as the variable name, just pass it into destructured component, and it will make the new object for us with appropriate keys
            variables: { id: id },
            // the store is the behind the scenes cache, global state of our application that makes state available to all components
            update: (store, { data: { deleteReservation } }) => {
                try {
                    // Reads the data from our cache for this query.
                    const currentData = store.readQuery({ query: reservationsQuery });
                    console.log(currentData, 'this is data from Reservations Query');

                    // Adds our comment from the mutation to the end.
                    const newData = currentData.reservations.filter( reservation => reservation.id !== id);
                    console.log(newData, 'this is updated data from deleteReservation');

                    // Writes our data back to the cache.
                    // Takes in 2 arguments type of data, and the data we write to the query
                    store.writeQuery({ query: reservationsQuery, data: {reservations: newData} });
                    console.log(store, ' this is store from CreateRevervation.  Key into store.data.data');
                } catch (error) {
                    console.log(error, 'Not updating store - Reservations not loaded yet');
                }
            }
        });

        alert('Reservation Successfully Deleted');

        // Removes the current page from the stack, hence "navigating back"
        this.props.navigator.pop();

        // Alternate way to change screens
        // this.props.navigator.push({
        //     screen: "bryant-mobileforming.FindReservationScreen",
        //     title: `Your Reservations`,
        //     passProps: {
        //         name: this.props.name
        //     }
        // });
    }

    render() {
        return (
            <View
                style={[
                    styles.container,
                    this.state.viewMode === "portrait"
                        ? styles.portraitContainer
                        : styles.landscapeContainer
                ]}
            >
                <ReservationInfo hotelName={this.props.selectedReservation.hotelName}/>
                <View style={styles.subContainer}>
                    <View>
                        <Text style={styles.placeName}>
                            {this.props.selectedReservation.hotelName}
                        </Text>
                    </View>
                    <View style={styles.infoText}>
                        <Text>
                            Arrival Date: {this.props.selectedReservation.arrivalDate}
                        </Text>

                        <Text>
                            Departure Date: {this.props.selectedReservation.departureDate}
                        </Text>

                        <TouchableOpacity onPress={() => this.placeDeletedHandler(this.props.selectedReservation.id)}>
                            <View style={styles.deleteButton}>
                                <Icon
                                    size={30}
                                    name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                                    color="red"
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 22,
        flex: 1
    },
    portraitContainer: {
        flexDirection: "column"
    },
    landscapeContainer: {
        flexDirection: "row"
    },
    placeDetailContainer: {
        flex: 2
    },
    placeImage: {
        width: "100%",
        // want to make sure the image doesn't underlap the map
        height: "100%"
    },
    placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
    },
    infoText: {
        alignItems: "center"
    },
    map: {
        // preconfigured styles that ensure the map will fill the surrounding container
        ...StyleSheet.absoluteFillObject
    },
    deleteButton: {
        alignItems: "center",
        marginTop: 50
    },
    subContainer: {
        flex: 1,
        justifyContent: "space-evenly"
    }
});

export default compose(
    graphql(reservationsQuery),
    graphql(deleteReservation)
)(ReservationDetailScreen);