import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const listItem = (props) => (
    <TouchableOpacity onPress={props.onItemPressed}>
        <View style={styles.listItem}>
            <Image source={{ uri: props.hotelImage }} style={styles.hotelImage} />
            <View style={styles.listText}>
                <Text>{props.hotelName}</Text>
                <Text>{props.arrivalDate} to {props.departureDate}</Text>
            </View>
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
        height: 40,
        width: 40
    },
    listText: {
        flexDirection: "column",
        justifyContent: "center",
        width: "85%"
    }
});

export default listItem;