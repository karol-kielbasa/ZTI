import axios from 'axios';
import { GET_TRIPS, TRIPS_FAIL } from '../actions/types'

export const getTrips = ({userId}) => async dispatch => {
    try {
        const res = await axios.get(`/api/trips/${userId}`);
        dispatch({
            type: GET_TRIPS,
            payload: res.data.trips
        })
    } catch (err) {
        dispatch({
            type: TRIPS_FAIL,
        })
    }

}