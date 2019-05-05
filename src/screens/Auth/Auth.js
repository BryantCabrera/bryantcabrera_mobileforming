import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { reservationsQuery } from '../../queries/queries';
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

import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import validate from "../../utility/validation";
import startMainTabs from '../MainTabs/startMainTabs';
import backgroundImage from "../../assets/BryantCabrera_mobileforming_authbg.png";

class AuthScreen extends Component {
    state = {
        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
        authMode: "login",
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {
                    equalTo: "password"
                },
                touched: false
            }
        },
        isLoading: false,
        loggedUser: {
            name: "",
            email: ""
        }
    };

    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }

    
    componentWillUnmount() {
        // Modularized the function to remove eventListener so that we could call it in this life cycle hook
        Dimensions.removeEventListener("change", this.updateStyles);
    }
    
    componentDidMount() {
        
    }

    // Toggles between signup and login
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === "login" ? "signup" : "login"
            };
        });
    };

    // Modularized this function to prevent memory leaks from not detaching event listener
    updateStyles = (dims) => {
        this.setState({
            viewMode:
                dims.window.height > 500 ? "portrait" : "landscape"
        });
    }

    // Validation
        // Key is the property key in state
        // don't use this.state syntax because we only want to update the key of the particular property, so use prevState
        // **To check if this works, check Auth.js state in debugger
    updateInputState = (key, value) => {
        let connectedValue = {};

        // Checks if we have the .equalTo rule
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;

            const equalValue = this.state.controls[equalControl].value;

            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            };
        }

        if (key === "password") {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            };
        }

        this.setState(prevState => {
            return {
                controls: {
                    // ERROR: make sure when you populate prevstate, you type …prevState.propertyNameForObjectInState not …prevState because the latter will override the state for that object
                    ...prevState.controls,
                    // want to hard code and also check confirmPassword because if the user later changed just the password input, it still returned true for passwords matching
                    // make sure this confirmPassword comes 1st to avoid overriding the password check
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid:
                            key === "password"
                                ? validate(
                                    prevState.controls.confirmPassword.value,
                                    prevState.controls.confirmPassword.validationRules,
                                    connectedValue
                                )
                                : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(
                            value,
                            prevState.controls[key].validationRules,
                            connectedValue
                        ),
                        touched: true
                    }
                }
            };
        });
    };

    authHandler = () => {
        // This is the request body that I would normally pass to backend to authenticate user
            // don't need confirmPassword here, that was just for frontend
        // const authData = {
        //     email: this.state.controls.email.value,
        //     password: this.state.controls.password.value
        // };

        const name = this.state.controls.email.value.replace(/\@\S*\s?/g, '');

        this.setState({
            loggedUser: {
                name: name,
                email: this.state.controls.email.value
            }
        })

        this.props.navigator.push({
            screen: "bryant-mobileforming.FindReservationScreen",
            title: `${name}'s Reservations`,
            passProps: {
                name: name
            }
        });

        // startMainTabs();
    }

    render() {
        let headingText = null;
        let confirmPasswordControl = null;

        // only want to render this if we are not waiting for our request to finish
        let submitButton = (
            <ButtonWithBackground
                color="#29aaf4"
                onPress={this.authHandler}
                disabled={
                    (!this.state.controls.confirmPassword.valid &&
                        this.state.authMode === "signup") ||
                    !this.state.controls.email.valid ||
                    !this.state.controls.password.valid
                }
            >
                Submit
            </ButtonWithBackground>
        );

        if (this.state.viewMode === "portrait") {
            headingText = (
                <MainText>
                    <HeadingText>Please Log In</HeadingText>
                </MainText>
            );
        }

        if (this.state.authMode === "signup") {
            confirmPasswordControl = (
                <View
                    style={
                        this.state.viewMode === "portrait"
                            ? styles.portraitPasswordWrapper
                            : styles.landscapePasswordWrapper
                    }
                >
                    <DefaultInput
                        placeholder="Confirm Password"
                        style={styles.input}
                        value={this.state.controls.confirmPassword.value}
                        onChangeText={val => this.updateInputState("confirmPassword", val)}
                        valid={this.state.controls.confirmPassword.valid}
                        touched={this.state.controls.confirmPassword.touched}
                        secureTextEntry
                    />
                </View>
            );
        }

        if (this.state.isLoading) {
            submitButton = <ActivityIndicator />;
        }

        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                {/* behavior="padding" essentially pushes up the element */}
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    {headingText}
                    <ButtonWithBackground
                        color="#29aaf4"
                        onPress={this.switchAuthModeHandler}
                    >
                        Switch to {this.state.authMode === "login" ? "Sign Up" : "Login"}
                    </ButtonWithBackground>
                    {/* TouchableWithoutFeedback only takes 1 child element */}
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inputContainer}>
                            <DefaultInput
                                placeholder="Your E-Mail Address"
                                style={styles.input}
                                value={this.state.controls.email.value}
                                onChangeText={val => this.updateInputState("email", val)}
                                valid={this.state.controls.email.valid}
                                touched={this.state.controls.email.touched}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                            />
                            <View
                                style={
                                    this.state.viewMode === "portrait" ||
                                        this.state.authMode === "login"
                                        ? styles.portraitPasswordContainer
                                        : styles.landscapePasswordContainer
                                }
                            >
                                <View
                                    style={
                                        this.state.viewMode === "portrait" ||
                                            this.state.authMode === "login"
                                            ? styles.portraitPasswordWrapper
                                            : styles.landscapePasswordWrapper
                                    }
                                >
                                    <DefaultInput
                                        placeholder="Password (min. 6 chars)"
                                        style={styles.input}
                                        value={this.state.controls.password.value}
                                        onChangeText={val => this.updateInputState("password", val)}
                                        valid={this.state.controls.password.valid}
                                        touched={this.state.controls.password.touched}
                                        secureTextEntry
                                    />
                                </View>
                                {confirmPasswordControl}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                    {submitButton}
                </KeyboardAvoidingView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    backgroundImage: {
        width: "100%",
        flex: 1
    },
    inputContainer: {
        width: "80%"
    },
    input: {
        backgroundColor: "#eee",
        borderColor: "#bbb"
    },
    landscapePasswordContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    portraitPasswordContainer: {
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    landscapePasswordWrapper: {
        width: "45%"
    },
    portraitPasswordWrapper: {
        width: "100%"
    }
});

export default AuthScreen;