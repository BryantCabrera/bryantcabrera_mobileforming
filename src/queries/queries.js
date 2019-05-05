import gql from "graphql-tag";

// 1st line makes sure right value is passed
//the $ denotes a variable, and we are saying that variable must look like whatever comes after the : (defined in our server schema)
//this input variable will be called in the createUser mutation
//the 2nd object is the response we want back from the database

export const createReservation = gql`
    mutation createReservation($data: ReservationCreateInput!) {
        createReservation(data: $data) {
            id
            name
            hotelName
            arrivalDate
            departureDate
        }
    }
`

export const reservationsQuery = gql`
    query {
        reservations {
            id
            name
            hotelName
            arrivalDate
            departureDate
        }
    }
`

export const usersReservationsQuery = gql`
    query reservations($name: String!) {
        reservations(where: { name_contains: $name }) {
            id
            name
            hotelName
            arrivalDate
            departureDate
        }
    }
`