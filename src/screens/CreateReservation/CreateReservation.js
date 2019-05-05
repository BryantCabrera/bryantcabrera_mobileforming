import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { createReservation, reservationsQuery } from '../../queries/queries';
import {
    View,
    Text,
    TextInput,
    Button,
    Picker,
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

        console.log(this.props, ' this is props.data.reservations.');
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
                        onChangeText={(value) => this.inputChangedHandler(value, 'name')}
                    />
                    
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
                            onDateChange={(date) => this.datePickedHandler(date, 'departureDate')}
                        />
                    </View>

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
    },
    hotelPicker: {
        height: 200,
        width: "95%",
        margin: 5
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