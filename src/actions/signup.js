import { checkHttpStatus, parseJSON } from '../utils';
import {SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
   API_URL} from '../constants/actions';
import { browserHistory } from 'react-router';

export function signupSuccess() {
  return {
    type: SIGNUP_SUCCESS
  }
}

export function signupFailure(error) {
  return {
    type: SIGNUP_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function signupRequest() {
  return {
    type: SIGNUP_REQUEST
  }
}

export function signupUser(email, password, redirect="/") {
    return function(dispatch) {
        dispatch(signupRequest());
            return fetch(API_URL+'/auth/signup', {
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
                    dispatch(signupSuccess());
                  //dispatch(pushState(null, "/"));
                  browserHistory.push(redirect);
                } catch (e) {
                  console.log(e);
                    dispatch(signupFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid data'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(signupFailure(error));
            })
    }
}
