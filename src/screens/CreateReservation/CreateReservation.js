import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
    Image,
    ActivityIndicator
} from 'react-native';
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import ReservationInput from "../../components/ReservationInput/ReservationInput";
import validate from "../../utility/validation";

class CreateReservationScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: "orange"
    }

    constructor(props) {
        super(props);

        // Here, we specify a navigation method whenever a navigation event occurs
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    componentWillMount() {
        this.reset();
    }

    reset = () => {
        this.setState({
            controls: {
                name: {
                    value: "",
                    valid: false,
                    touched: false,
                    validationRules: {
                        notEmpty: true
                    }
                },
                hotelName: {
                    value: "",
                    valid: false,
                    touched: false,
                    validationRules: {
                        notEmpty: true
                    }
                },
                arrivalDate: {
                    value: null,
                    valid: false
                },
                departureDate: {
                    value: null,
                    valid: false
                }
            },
            isLoading: false,
            reservationCreated: false
        });
    };

    onNavigatorEvent = event => {
        // redirects user and makes other tab functionalities work on tab change by resetting placeAdded in state
        if (event.type === "ScreenChangedEvent") {
            if (event.id === "willAppear") {
                // resets placeAdded prop
                this.setState({
                    reservationCreated: false
                });
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

    nameChangedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    name: {
                        ...prevState.controls.name,
                        value: val,
                        valid: validate(val, prevState.controls.name.validationRules),
                        touched: true
                    }
                }
            };
        });
    };

    hotelNameChangedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    hotelName: {
                        ...prevState.controls.hotelName,
                        value: val,
                        valid: validate(val, prevState.controls.hotelName.validationRules),
                        touched: true
                    }
                }
            };
        });
    };

    datePickedHandler = image => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        value: image,
                        valid: true
                    }
                }
            };
        });
    }

    reservationCreatedHandler = () => {
        alert('Reservation Successfully Created');
        this.reset();

        // Alternate way to tab, but immediately goes there without waiting for the Place to add/create
        // this.props.navigator.switchToTab({tabIndex: 0});
    };

    render() {
        let submitButton = (
            <Button
                title="Reserve!"
                onPress={this.reservationCreatedHandler}
                disabled={
                    !this.state.controls.name.valid
                    // ||
                    // !this.state.controls.hotelName.valid ||
                    // !this.state.controls.arrivalDate.valid ||
                    // !this.state.controls.departureDate.valid
                }
            />
        );

        if (this.state.isLoading) {
            submitButton = <ActivityIndicator />;
        }

        return (
            
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Book with Us!</HeadingText>
                    </MainText>
                    <ReservationInput
                        reservationData={this.state.controls.name}
                        onChangeText={this.nameChangedHandler}
                    />
                    <View style={styles.button}>
                        {submitButton}
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "80%",
        height: 150
    },
    button: {
        margin: 8
    },
    previewImage: {
        width: "100%",
        height: "100%"
    }
});

export default CreateReservationScreen;