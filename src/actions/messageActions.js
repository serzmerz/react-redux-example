import { checkHttpStatus, parseJSON } from '../utils';
import {API_URL} from '../constants/actions';

export function saveMessage(data) {
  let payload;
  // debugger
    payload = {room: data.room, newMessage:
       {user: data.newMessage.user,
         content: data.newMessage.message}}

  return { type: 'NEW_MESSAGE', payload }
}

export function createMessage(data) {
 return (dispatch) => {
    return fetch(API_URL+'/chat/messages', {
       method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
            body: JSON.parse(data.newMessage.message)
        })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then((response) => {
      dispatch(saveMessage({room: data.room, message: response.data}))
    })
  }
}
