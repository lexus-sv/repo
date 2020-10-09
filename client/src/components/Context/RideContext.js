import {createContext} from 'react';

function noop(){}

export const RideTimeContext = createContext({
    hours: 1,
    bikeId: null,
    rending: noop
});