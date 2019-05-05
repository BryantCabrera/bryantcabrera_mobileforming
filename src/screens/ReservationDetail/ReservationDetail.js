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
        return (
            <Text>
                This is ReservationDetail.
            </Text>
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