import { combineReducers } from 'redux';
import alert from './alert'
import auth from './auth'
import vehicles from './vehicles'
import trips from './trips'

export default combineReducers({
    alert,
    auth,
    vehicles,
    trips
});