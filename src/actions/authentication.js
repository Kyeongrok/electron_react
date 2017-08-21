import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE
} from './ActionTypes';
import axios from 'axios';
import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    login: {
        status: 'INIT'
    },
    status: {
        isLoggedIn: false,
        currentUser: '',
    }
};

export default function authentication(state, action) {
    if(typeof state === "undefined")
        state = initialState;

    switch(action.type) {
        /* LOGIN */
        case types.AUTH_LOGIN:
            return update(state, {
                login: {
                    status: { $set: 'WAITING' }
                }
            });
        case types.AUTH_LOGIN_SUCCESS:
            return update(state, {
                login: {
                    status: { $set: 'SUCCESS' }
                },
                status: {
                    isLoggedIn: { $set: true },
                    currentUser: { $set: action.username }
                }
            });
        case types.AUTH_LOGIN_FAILURE:
            return update(state, {
                login: {
                    status: { $set: 'FAILURE' }
                }
            });
        default:
            return state;
    }
}

/*============================================================================
    authentication
==============================================================================*/

/* LOGIN */
export function loginRequest(username, password) {
    let host1 = window.location.hostname;
    return (dispatch) => {
        dispatch(login());

        return axios.post("http://" + host1 + ":8092/aprilskin/v1/users/login", {username, password})
            .then((response) => {
            //성공
            dispatch(loginSuccess(username));
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