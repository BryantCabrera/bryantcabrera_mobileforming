import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const listItem = (props) => (
    <TouchableOpacity onPress={props.onItemPressed}>
        <View style={styles.listItem}>
            <Image source={{ uri: props.hotelImage }} style={styles.hotelImage} />
            <Text>{props.hotelName} // {props.arrivalDate} to {props.departureDate}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        marginBottom: 5,
        padding: 10,
        backgroundColor: "#eee",
        flexDirection: "row",
        alignItems: "center"
    },
    //react native automatically uses cover property
    hotelImage: {
        marginRight: 8,
        height: 30,
        width: 30
    }
});

export default listItem;