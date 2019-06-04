import { combineReducers } from 'redux';
import alert from './alert'
import auth from './auth'
import vehicles from './vehicles'

export default combineReducers({
    alert,
    auth,
    vehicles
});