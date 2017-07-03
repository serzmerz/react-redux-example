import {RECEIVE_PROTECTED_DATA, FETCH_PROTECTED_DATA_REQUEST} from '../constants/actions';

const initialState = {
    data: {},
    isFetching: false
};

export default function data(state = initialState,action) {
  /*  if(action.type === 'FETCH_USER_SUCCESS'){
        return action.payload;
    }*/
    switch (action.type) {
        case RECEIVE_PROTECTED_DATA:
            return {...state,
                ...{
                  'data': action.payload.data,
                  'isFetching': false}};
        case FETCH_PROTECTED_DATA_REQUEST: //Действие, информирующее редюсер о том, что запрос начался.
            return {...state,
                ...{
                  'isFetching': true}};
                default:
                    return state;
            }
        }

/*export default createReducer(initialState, {
    [RECEIVE_PROTECTED_DATA]: (state, payload) => {
        return Object.assign({}, state, {
            'data': payload.data,
            'isFetching': false
        });
    },
    [FETCH_PROTECTED_DATA_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            'isFetching': true
        });
    }
});*/
