import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
    AUTH_GET_STATUS,
    AUTH_GET_STATUS_SUCCESS,
    AUTH_GET_STATUS_FAILURE,
    AUTH_LOGOUT
} from './ActionTypes';
import axios from 'axios';

/*============================================================================
    authentication
==============================================================================*/

let host1 = window.location.hostname;

/* LOGIN */
export function loginRequest(userId, password) {
    let host1 = window.location.hostname;
    return (dispatch) => {
        dispatch(login());

        return axios.post("http://" + host1 + ":8092/aprilskin/v1/users/login", {userId, password})
            .then((response) => {
            //성공
            dispatch(loginSuccess(userId));
        }).catch((error)=> {
            //실패
            dispatch(loginFailure());
        });
    };
}



export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(username) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        username
    };
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}

/* Logout */
export function logoutRequest() {
    return (dispatch) => {
        return axios.post("http://" + host1 + ":8092/aprilskin/v1/users/logout")
            .then((response) => {
                dispatch(logout());
            });
    };
}

export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}


/* REGISTER */
export function registerRequest(userId, password) {
    return (dispatch) => {
        // Inform Register API is starting
        dispatch(register());

        return axios.post("http://" + host1 + ":8092/aprilskin/v1/users/register", { userId, password })
            .then((response) => {
                dispatch(registerSuccess());
            }).catch((error) => {
                //dispatch(registerFailure(error.response.data.code));
            });
    };
}

export function register() {
    return {
        type: AUTH_REGISTER
    };
}

export function registerSuccess() {
    return {
        type: AUTH_REGISTER_SUCCESS,
    };
}

export function registerFailure(error) {
    return {
        type: AUTH_REGISTER_FAILURE,
        error
    };
}

/* GET STATUS */
export function getStatusRequest() {
    return (dispatch) => {
        // inform Get Status API is starting
        dispatch(getStatus());

        return axios.get("http://" + host1 + ":8092/aprilskin/v1/users/list")
            .then((response) => {
                dispatch(getStatusSuccess(response.data.info.username));
            }).catch((error) => {
                dispatch(getStatusFailure());
            });
    };
}

export function getStatus() {
    return {
        type: AUTH_GET_STATUS
    };
}

export function getStatusSuccess(username) {
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        username
    };
}

export function getStatusFailure() {
    return {
        type: AUTH_GET_STATUS_FAILURE
    };
}

