import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_ERROR } from '../constants/actions';
const initialState = [];

export default function users(state = initialState,action) {
  /*  if(action.type === 'FETCH_USER_SUCCESS'){
        return action.payload;
    }*/
    switch (action.type) {
        case FETCH_REQUEST: //Действие, информирующее редюсер о том, что запрос начался.
            return state;
        case FETCH_SUCCESS: //Действие, информирующее редюсер о том, что запрос успешно завершился.
            return action.payload; // перезаписиваем получеными данными
            //return  [...state, ...action.payload] ; //если нужно добавить в существующий стейт
        case FETCH_ERROR: //Действие, информирующее редюсер о том, что запрос завершился неудачей.
            return state;
        default:
            return state;
    }
}