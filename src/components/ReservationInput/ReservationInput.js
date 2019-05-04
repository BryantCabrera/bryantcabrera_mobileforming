import React from 'react';

import DefaultInput from "../UI/DefaultInput/DefaultInput";

const placeInput = props => (
    <DefaultInput
        placeholder="Your Name"
        onChangeText={props.onChangeText}
        value={props.reservationData.value}
        valid={props.reservationData.valid}
        touched={props.reservationData.touched}
    />
);

export default placeInput;