import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { usersReservationsQuery } from '../../queries/queries';

const ReservationsList = ({ name }) => (
    <Query query={usersReservationsQuery} variables={{ name }}>
        {(reservations, { loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error! ${error}`;

            return (
                data.reervations.map(({ id, name }) => (
                    <Text>
                        {id}
                        {name}
                    </Text>
                ))
            );
        }}
    </Query>
);

export default ReservationsList;