import {SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../constants/actions';
   const initialState = {
       isRegistering: false,
       statusText: null
   };

   export default function signup(state = initialState,action) {
      switch (action.type) {
        case SIGNUP_REQUEST: //Действие, информирующее редюсер о том, что запрос начался.
            return {...state,
                ...{
                  'isRegistering': true,
                  'statusText': null}};
        case SIGNUP_SUCCESS: //Действие, информирующее редюсер о том, что запрос успешно завершился.
            return {...state,
                ...{
                  'isRegistering': false,
                  'statusText': 'You have been successfully signup in.'}};
        case SIGNUP_FAILURE: //Действие, информирующее редюсер о том, что запрос завершился неудачей.
            return {...state,
                ...{
                  'isRegistering': false,
                  'statusText': `Signup Error: ${action.payload.status} ${action.payload.statusText}`
                }};
        default:
                    return state;
      }
   }
