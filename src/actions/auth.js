import { checkHttpStatus, parseJSON } from '../utils';
import {LOGIN_USER_REQUEST, LOGIN_USER_FAILURE,
   LOGIN_USER_SUCCESS, LOGOUT_USER, API_URL} from '../constants/actions';
import { browserHistory } from 'react-router';
//import jwtDecode from 'jwt-decode';

export function loginUserSuccess(token, refreshToken) {
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token,
      refreshToken: refreshToken
    }
  }
}

export function loginUserFailure(error) {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return {
        type: LOGOUT_USER
    }
}

export function logoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(logout());
        //dispatch(pushState(null, '/login'));
    }
}

export function loginUser(email, password, redirect="/") {
    return function(dispatch) {
        dispatch(loginUserRequest());
            return fetch(API_URL+'/auth?permanent=true', {
               method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify({username: email, password: password})
                })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    //let decoded = jwtDecode(response.token.accessToken);
                    dispatch(loginUserSuccess(response.token.accessToken, response.token.refreshToken));
                  //dispatch(pushState(null, "/"));
                  browserHistory.push(redirect);
                } catch (e) {
                  console.log(e);
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error));
            })
    }
}


export function refreshTokenUser(refreshToken) {
    return function(dispatch) {
        dispatch(loginUserRequest());
            return fetch(API_URL+'/auth/token?permanent=true', {
               method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify({refreshToken: refreshToken})
                })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    //let decoded = jwtDecode(response.token.accessToken);
                    dispatch(loginUserSuccess(response.token.accessToken, response.token.refreshToken));
                  //dispatch(pushState(null, "/"));
                //  browserHistory.goBack();
                } catch (e) {
                  console.log(e);
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error));
            })
    }
}
