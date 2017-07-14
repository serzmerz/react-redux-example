const initialState = [
    { id: 1,
      title: 'Music is Life',
     messages: [ { user: 'ChatBot', message: 'Welcome to React Chat -- Built using React, Redux, Express, and Socket.io'}, { user:'Scott Mescudi', message: 'Wait, what are these words?'} ]
     },
    { id: 2,
      title: 'Come share your feelings',
     messages: [ {user: 'Scott Mescudi', message: 'Someone explain Sockets to me Please'}, {user: 'Q-Tip', message: 'I have no idea'}]
    }
  ];

export default function roomReducer(state = initialState, action) {
  debugger
  switch(action.type) {
    case 'NEW_ROOM':
      return [...state, action.payload]
    case 'UPDATE_ROOM_LIST':
      if(action.payload.data.length < 1){
        action.payload.data = false
      }
      return action.payload.data || state
    default:
     return state;
  }
}
