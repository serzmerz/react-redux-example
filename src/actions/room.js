import { checkHttpStatus, parseJSON } from '../utils';
import {API_URL} from '../constants/actions';

export function joinRoom(roomData) {
  const payload = roomData.response.messages;
  return { type: 'JOIN_ROOM', payload}
}

export function newRoom(room) {
  const newRoom = { title: room, messages: [{user: 'Chat Bot', content: 'Be Kind'}]}
  return (dispatch) => {
    return  fetch(API_URL+'/chat/rooms', {
       method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(newRoom)
        })
    .then(checkHttpStatus)
    .then(parseJSON)
      .then((response) => {
        dispatch(newRoomSuccess(newRoom))
      })
    //return response
 }
}

export function newRoomSuccess(payload){
  return { type: 'NEW_ROOM', payload }
}

export function updateRoomList(payload){
  return { type: 'UPDATE_ROOM_LIST', payload}
}
export function fetchRoomData(){
  console.log('in fetch room');
  return (dispatch) => {
    return fetch(API_URL+'/chat/messages')
    .then(checkHttpStatus)
    .then(parseJSON)
      .then((response) => {
        dispatch(joinRoom(response))
      })
    //return response
  }

}

export function fetchRoomList(){
  return (dispatch) => {
    return fetch(API_URL+'/chat/rooms')
    .then(checkHttpStatus)
    .then(parseJSON)
      .then((response) => {
        dispatch(updateRoomList(response.response))
      })
    //return response

  }
}
