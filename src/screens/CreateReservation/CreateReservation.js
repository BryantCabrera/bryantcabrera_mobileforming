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
import DatePicker from 'react-native-datepicker'
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

    getToday = () => {
        // gets today's date
        let today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        today = yyyy + '-' + mm + '-' + dd;

        return today;
    }

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
        // Button disable logic
        let submitButton = (
            <Button
                title="Reserve!"
                onPress={this.reservationCreatedHandler}
                disabled={
                    !this.state.controls.name.valid ||
                    !this.state.controls.hotelName.valid ||
                    !this.state.controls.arrivalDate.valid ||
                    !this.state.controls.departureDate.valid
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

                    <DatePicker
                        style={{ width: 200 }}
                        date={this.getToday()}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate={this.getToday()}
                        maxDate="2025-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => this.datePickedHandler()}
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