import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Dimensions
} from 'react-native';
import MapView from "react-native-maps";
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

    placeDeletedHandler = () => {
        // this.props.onDeletePlace(this.props.selectedPlace.key);

        // Removes the current page from the stack, hence "navigating back"
        this.props.navigator.pop();
    }

    render() {
        let image = '';
        const location = {
            latitude: 0,
            longitude: 0
        };

        switch (this.props.selectedReservation.hotelName) {
            case 'DoubleTree, Downtown Los Angeles':
                image = 'https://i.imgur.com/qvz4Ms0.jpg';
                location.latitude = 34.0504;
                location.longitude = -118.2428;
                break;
            case 'Hilton Checkers, Los Angeles':
                image = 'https://i.imgur.com/BbX7IA0.jpg';
                location.latitude = 34.049810;
                location.longitude = -118.255082;
                break;
            case 'DoubleTree, West Los Angeles':
                image = 'https://i.imgur.com/l4Y28vt.jpg';
                location.latitude = 33.983803;
                location.longitude = -118.396515;
                break;
            case 'Hilton, LAX':
                image = 'https://i.imgur.com/3wqsQxA.jpg';
                location.latitude = 33.946461;
                location.longitude = -118.381616;
                break;
            case 'Hampton Inn & Suites, Hollywood':
                image = 'https://i.imgur.com/00swvth.jpg';
                location.latitude = 34.092073;
                location.longitude = -118.327262;
                break;
            default:
                image = 'https://i.imgur.com/BZMZhmG.png';
                location.latitude = 33.996907;
                location.longitude = -118.307448;
        }

        return (
            <View
                style={[
                    styles.container,
                    this.state.viewMode === "portrait"
                        ? styles.portraitContainer
                        : styles.landscapeContainer
                ]}
            >
                <View style={styles.placeDetailContainer}>
                    <View style={styles.subContainer}>
                        <Image
                            source={{ uri: image }}
                            style={styles.placeImage}
                        />
                    </View>
                    <View style={styles.subContainer}>
                        <MapView
                            initialRegion={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                                latitudeDelta: 0.0122,
                                longitudeDelta:
                                    Dimensions.get("window").width /
                                    Dimensions.get("window").height *
                                    0.0122,
                                zoom: 1
                            }}
                            style={styles.map}
                        >
                            {/* Doesn't need to be conditional because there will be no case where we'll try to render this without having the marker */}
                            <MapView.Marker coordinate={location} />
                        </MapView>
                    </View>
                </View>
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

                        <TouchableOpacity onPress={this.placeDeletedHandler}>
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
        alignItems: "center"
    },
    subContainer: {
        flex: 1
    }
});


export default ReservationDetailScreen;