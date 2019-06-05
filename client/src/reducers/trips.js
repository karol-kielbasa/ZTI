import { GET_TRIPS, TRIPS_FAIL } from '../actions/types'

const initialState = {}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_TRIPS:
            return { ...state, trips: payload}
        case TRIPS_FAIL:
            return { ...state };
        default:
            return state;
    }
}