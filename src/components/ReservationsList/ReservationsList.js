import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ListItem from '../ListItem/ListItem';

const placeList = (props) => {
    return (
        <FlatList
            style={styles.listContainer}
            data={props.reservations}
            renderItem={(info) => (
                <ListItem
                    // .value comes from how we wrote the object in this.setState in the function handler in App.js
                    hotelName={info.item.hotelName}
                    // hotelImage={info.item.image}
                    arrivalDate={info.item.arrivalDate}
                    departureDate={info.item.departureDate}
                    onItemPressed={() => props.onItemSelected(info.item.id)}
                />
            )}
        />
    )
}

const styles = StyleSheet.create({
    listContainer: {
        width: "100%"
    }
})

export default placeList;

// import React from "react";
// import { Query } from "react-apollo";
// import gql from "graphql-tag";
// import { usersReservationsQuery } from '../../queries/queries';

// const ReservationsList = ({ name }) => (
//     <Query query={usersReservationsQuery} variables={{ name }}>
//         {(reservations, { loading, error, data }) => {
//             if (loading) return null;
//             if (error) return `Error! ${error}`;

//             return (
//                 data.reervations.map(({ id, name }) => (
//                     <Text>
//                         {id}
//                         {name}
//                     </Text>
//                 ))
//             );
//         }}
//     </Query>
// );

// export default ReservationsList;