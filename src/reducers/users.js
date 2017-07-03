import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_ERROR } from '../constants/actions';
const initialState = {
    isFetching: false,
        didInvalidate: true,
    items: []
};

export default function users(state = initialState,action) {
  /*  if(action.type === 'FETCH_USER_SUCCESS'){
        return action.payload;
    }*/
    switch (action.type) {
        case FETCH_REQUEST: //Действие, информирующее редюсер о том, что запрос начался.
            //return state;
        //return {...state, isFetching: true};
           // return {...state, isFetching: true};
            return {...state,
                ...{
                    isFetching: true,
                    didInvalidate: false}};
        case FETCH_SUCCESS: //Действие, информирующее редюсер о том, что запрос успешно завершился.
            //return {...state, items: action.payload}; // перезаписиваем получеными данными
            //return  [...state, ...action.payload] ; //если нужно добавить в существующий стейт
            return {...state,
                ...{
                isFetching: false,
                    didInvalidate: false,
                items: action.payload}};
        case FETCH_ERROR: //Действие, информирующее редюсер о том, что запрос завершился неудачей.
            return {...state,
                ...{
                    isFetching: false,
                    didInvalidate: false,
                    error: action.error.toString()
                }};
        default:
            return state;
    }
}