import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    ImageBackground,
    Dimensions,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native';
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import ReservationInput from "../../components/ReservationInput/ReservationInput";

class CreateReservationScreen extends Component {
    componentDidMount() {

    }

    render() {
        return (
            
            <Text>
                This is CreateReservation.
            </Text>
        )
    }
}

export default CreateReservationScreen;