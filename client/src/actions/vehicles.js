import axios from 'axios';
import { GET_VEHICLES, VEHICLES_FAIL } from '../actions/types'
import { setAlert } from './alert'

export const getVehicles = () => async dispatch => {
    try {
        const res = await axios.get('/api/vehicles');
        dispatch({
            type: GET_VEHICLES,
            payload: res.data.vehicles
        })
    } catch (err) {
        const errors = err.response.data.error;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: VEHICLES_FAIL,
        })
    }

}