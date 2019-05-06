import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

class ReservationInfo extends Component {
    state = {
        viewMode: "portrait"
    };

    render() {
        let image = '';
        const location = {
            latitude: 0,
            longitude: 0
        };

        switch (this.props.hotelName) {
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
            <View style={styles.placeDetailContainer}>
                <View style={styles.subContainer}>
                    <Image
                        source={{ uri: image }}
                        style={styles.placeImage}
                    />
                </View>
                <View style={styles.subContainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
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
        );
    }
}

const styles = StyleSheet.create({
    placeDetailContainer: {
        flex: 2
    },
    placeImage: {
        width: "100%",
        // want to make sure the image doesn't underlap the map
        height: "100%"
    },
    map: {
        // preconfigured styles that ensure the map will fill the surrounding container
        ...StyleSheet.absoluteFillObject
    },
    subContainer: {
        flex: 1
    }
});

export default ReservationInfo;