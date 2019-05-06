import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { createReservation, reservationsQuery } from '../../queries/queries';
import {
    View,
    Text,
    Button,
    Picker,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import ReservationInput from "../../components/ReservationInput/ReservationInput";
import DatePicker from 'react-native-datepicker';
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
        const today = this.getToday();

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
                    value: "Hilton, LAX",
                    valid: true,
                    touched: false,
                    validationRules: {
                        notEmpty: true
                    }
                },
                arrivalDate: {
                    value: today,
                    valid: true
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

    inputChangedHandler = (val, type) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [type]: {
                        ...prevState.controls[type],
                        value: val,
                        valid: validate(val, prevState.controls[type].validationRules),
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

    getTomorrow = () => {
        const today = new Date();
        let tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        return tomorrow;
    }

    datePickedHandler = (date, type) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [type]: {
                        value: date,
                        valid: true
                    }
                }
            };
        });
    }

    reservationCreatedHandler = () => {
        this.setState({
            isLoading: true
        });

        const newReservation = {
            name: this.state.controls.name.value,
            hotelName: this.state.controls.hotelName.value,
            arrivalDate: this.state.controls.arrivalDate.value,
            departureDate: this.state.controls.departureDate.value
        }

        this.props.mutate({
            // this input is defined in the const imported from queries and used at the bottom of this file
            // if the output name is the same as the variable name, just pass it into destructured component, and it will make the new object for us with appropriate keys
            variables: { data: newReservation },
            // the store is the behind the scenes cache, global state of our application that makes state available to all components
            update: (store, { data: { createReservation } }) => {
                try {
                    // Reads the data from our cache for this query.
                    const newData = store.readQuery({ query: reservationsQuery });
                    console.log(newData, 'this is data from CreateReservation');
    
                    // Adds our comment from the mutation to the end.
                    newData.reservations.push(createReservation);
                    console.log(newData, 'this is updated data from CreateRevervation');
    
                    // Writes our data back to the cache.
                    // Takes in 2 arguments type of data, and the data we write to the query
                    store.writeQuery({ query: reservationsQuery, data: newData });
                    console.log(store, ' this is store from CreateRevervation');
                } catch (error) {
                    console.log(error, 'Not updating store - Reservations not loaded yet');
                }
            }
        });
        
        this.reset();

        alert('Reservation Successfully Created');

        // Alternate way to tab, but immediately goes there without waiting for the Place to add/create
        this.props.navigator.switchToTab({tabIndex: 0});
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

        let image = '';
        const location = {
            latitude: 0,
            longitude: 0
        };

        switch (this.state.controls.hotelName.value) {
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
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Book with Us!</HeadingText>
                    </MainText>

                    <ReservationInput
                        reservationData={this.state.controls.name}
                        onChangeText={(value) => this.inputChangedHandler(value, 'name')}
                    />

                    <MapView
                        provider={PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.0122,
                            longitudeDelta:
                                Dimensions.get("window").width /
                                Dimensions.get("window").height *
                                0.0122
                        }}
                        region={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.0122,
                            longitudeDelta:
                                Dimensions.get("window").width /
                                Dimensions.get("window").height *
                                0.0122
                        }}
                        style={styles.map}
                    >
                        {/* Doesn't need to be conditional because there will be no case where we'll try to render this without having the marker */}
                        <MapView.Marker coordinate={location} />
                    </MapView>

                    <Picker
                        selectedValue={this.state.controls.hotelName.value}
                        style={styles.hotelPicker}
                        onValueChange={(itemValue, itemIndex) =>
                            this.inputChangedHandler(itemValue, 'hotelName')
                        }>
                        <Picker.Item label="DoubleTree, Downtown Los Angeles" value="DoubleTree, Downtown Los Angeles" />
                        <Picker.Item label="Hilton Checkers, Los Angeles" value="Hilton Checkers, Los Angeles" />
                        <Picker.Item label="DoubleTree, West Los Angeles" value="DoubleTree, West Los Angeles" />
                        <Picker.Item label="Hilton, LAX" value="Hilton, LAX" />
                        <Picker.Item label="Hampton Inn & Suites, Hollywood" value="Hampton Inn & Suites, Hollywood" />
                    </Picker>

                    <View style={styles.datePicker}>
                        <Text style={styles.datePickerText}>
                            Arrive:
                        </Text>
                        <DatePicker
                            style={{ width: 200 }}
                            date={this.state.controls.arrivalDate.value}
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
                            onDateChange={(date) => this.datePickedHandler(date, 'arrivalDate')}
                        />
                    </View>

                    <View style={styles.datePicker}>
                        <Text style={styles.datePickerText}>
                            Depart:
                        </Text>
                        <DatePicker
                            style={{ width: 200 }}
                            date={this.state.controls.departureDate.value}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate={this.getTomorrow()}
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
                            onDateChange={(date) => this.datePickedHandler(date, 'departureDate')}
                        />
                    </View>

                    {/* <View style={styles.placeDetailContainer}>
                        <View style={styles.subContainer}>
                            <Image
                                source={{ uri: image }}
                                style={styles.placeImage}
                            />
                        </View>
                        
                    </View> */}

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
        height: "100%",
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
    },
    // placeDetailContainer: {
    //     flex: 2
    // },
    hotelPicker: {
        height: 200,
        width: "95%",
        margin: 5
    },
    subContainer: {
        flex: 1
    },
    datePicker: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 5
    },
    datePickerText: {
        fontWeight: "800"
    },
    placeImage: {
        width: "100%",
        // want to make sure the image doesn't underlap the map
        height: "100%"
    },
    map: {
        width: 200,
        height: 200
    }
});

// const CreateReservationWithMutation = graphql(createReservation)(CreateReservationScreen);

// export default CreateReservationWithMutation;

export default compose(
    graphql(reservationsQuery),
    graphql(createReservation)
)(CreateReservationScreen);


// const cache = new InMemoryCache();
// const link = new HttpLink({
//     uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'
// })
// const client = new ApolloClient({
//     cache,
//     link
// })

// export default (
//     <ApolloProvider client={client}>
//         {CreateReservationWithMutation}
//     </ApolloProvider>
// );