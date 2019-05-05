import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ListItem from '../ListItem/ListItem';

const placeList = (props) => {
    return (
        <FlatList
            style={styles.listContainer}
            data={props.reservations}
            renderItem={(info) => {
                let image = '';

                switch (info.item.hotelName) {
                    case 'DoubleTree, Downtown Los Angeles':
                        image = 'https://i.imgur.com/qvz4Ms0.jpg';
                        break;
                    case 'Hilton Checkers, Los Angeles':
                        image = 'https://i.imgur.com/BbX7IA0.jpg';
                        break;
                    case 'DoubleTree, West Los Angeles':
                        image = 'https://i.imgur.com/l4Y28vt.jpg';
                        break;
                    case 'Hilton, LAX':
                        image = 'https://i.imgur.com/Bct0UUc.jpg';
                        break;
                    case 'Hampton Inn & Suites, Hollywood':
                        image = 'https://i.imgur.com/00swvth.jpg';
                        break;
                    default:
                        image = 'https://i.imgur.com/BZMZhmG.png';
                }

                console.log(image, 'this is image');

                return <ListItem
                    // .value comes from how we wrote the object in this.setState in the function handler in App.js
                    hotelName={info.item.hotelName}
                    hotelImage={image}
                    arrivalDate={info.item.arrivalDate}
                    departureDate={info.item.departureDate}
                    onItemPressed={() => props.onItemSelected(info.item.id)}
                />
            }}
            keyExtractor={(item, index) => index.toString()}
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