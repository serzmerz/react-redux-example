import { checkHttpStatus, parseJSON } from '../utils';
import {FETCH_PROTECTED_DATA_REQUEST,
     RECEIVE_PROTECTED_DATA, API_URL} from '../constants/actions';
//import { pushState } from 'redux-router';
import {loginUserFailure, refreshTokenUser} from './auth';
import { browserHistory } from 'react-router';

import series from 'async/series';
import async from 'async';

export function receiveProtectedData(data) {
    return {
        type: RECEIVE_PROTECTED_DATA,
        payload: {
            data: data
        }
    }
}

export function fetchProtectedDataRequest() {
  return {
    type: FETCH_PROTECTED_DATA_REQUEST
  }
}

export function fetchProtectedData(token) {

    return (dispatch, state) => {
        dispatch(fetchProtectedDataRequest());
        return fetch(API_URL+'/auth/me', {
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                dispatch(receiveProtectedData(response));
            })
            .catch(error => {
                if(error.response.status === 401) {
                  /*  parseJSON(error.response).then(response =>{
                      if(response.response.error === 'jwt expired'){
                        console.log(response.response.error);
                        let refreshToken = localStorage.getItem('refreshToken');
                        dispatch(refreshTokenUser(refreshToken));
                      }
                    })
                    .catch(err => {
                      dispatch(loginUserFailure(err));
                    })*/
                    dispatch(loginUserFailure(error));
                    browserHistory.push('/login');
                  //dispatch(pushState(null, '/login'));
                }
            })
       }
}
