import { GET_VEHICLES, VEHICLES_FAIL } from '../actions/types'

const initialState = {}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_VEHICLES:
            return { ...state, vehicles: payload}
        case VEHICLES_FAIL:
            return { ...state,  vehicles: []};
        default:
            return state;
    }
}