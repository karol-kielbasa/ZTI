import { REGISTER_FAIL, REGISTER_SUCCESS, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_FAIL:
            return { ...state, ...payload, loading: false }
        case REGISTER_SUCCESS:
            return { ...state, ...payload, loading: false }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            localStorage.setItem('user', payload.user);
            return { ...state, isAuthenticated: true, loading: false, token: payload.token, user:payload.user };
        case LOGOUT:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return { ...state, ...payload, isAuthenticated: false, loading: false, token: null, user: null, vehicles:[], trips:[], };
        default:
            return state;
    }
}