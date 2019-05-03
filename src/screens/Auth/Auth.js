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
import startMainTabs from '../MainTabs/startMainTabs';

class AuthScreen extends Component {
    componentDidMount() {
        startMainTabs();
    }

    render() {
        return (
            <Text>
                This is Auth.
            </Text>
        )
    }
}

export default AuthScreen;