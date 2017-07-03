import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
   LOGOUT_USER } from '../constants/actions';
   import jwtDecode from 'jwt-decode';

   const initialState = {
       token: null,
       refreshToken: null,
       userName: null,
       isAuthenticated: false,
       isAuthenticating: false,
       statusText: null
   };
export default function auth(state = initialState,action) {
  /*  if(action.type === 'FETCH_USER_SUCCESS'){
        return action.payload;
    }*/
    switch (action.type) {
        case LOGIN_USER_REQUEST: //Действие, информирующее редюсер о том, что запрос начался.
            return {...state,
                ...{
                  'isAuthenticating': true,
                  'statusText': null}};
        case LOGIN_USER_SUCCESS: //Действие, информирующее редюсер о том, что запрос успешно завершился.
            return {...state,
                ...{
                  'isAuthenticating': false,
                  'isAuthenticated': true,
                  'token': action.payload.token,
                  'refreshToken': action.payload.refreshToken,
                  'userName': jwtDecode(action.payload.token).userName,
                  'statusText': 'You have been successfully logged in.'}};
        case LOGIN_USER_FAILURE: //Действие, информирующее редюсер о том, что запрос завершился неудачей.
            return {...state,
                ...{
                  'isAuthenticating': false,
                  'isAuthenticated': false,
                  'token': null,
                  'refreshToken': null,
                  'userName': null,
                  'statusText': `Authentication Error: ${action.payload.status} ${action.payload.statusText}`
                }};
        case LOGOUT_USER:
              return {...state,
                        ...{
                          'isAuthenticated': false,
                          'token': null,
                          'refreshToken': null,
                          'userName': null,
                          'statusText': 'You have been successfully logged out.'
                }};
        default:
            return state;
    }
}
