import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_ERROR, API_URL } from '../constants/actions';
function fetchRequest(){
    return {
        type: FETCH_REQUEST
    }
}

function fetchSuccess(payload) {
    return {
        type: FETCH_SUCCESS,
        payload
    }
}

function fetchError() {
    return {
        type: FETCH_ERROR
    }
}

function fetchPosts() {
    return fetch(API_URL+'/user', { method: 'GET'})
        .then( response => Promise.all([response, response.json()]));
}

export const getUsers = () => dispatch => {
    dispatch(fetchRequest()); //Действие, информирующее редюсер о том, что запрос начался.
    return fetchPosts().then(([response, json]) =>{
        if(response.status === 200 && json.response.success === true){
            console.log(json.response.users);
            dispatch(fetchSuccess(json.response.users)) //Действие, информирующее редюсер о том, что запрос успешно завершился.
        }
        else{
            dispatch(fetchError()) //Действие, информирующее редюсер о том, что запрос завершился неудачей.
        }
    })
};