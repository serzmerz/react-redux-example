const initialState = {
  id: 1,
    title: 'Music is Life',
    messages: [
      { user: 'ChatBot',
       content:
       'Welcome to React Chat -- Built using React, Redux, Express, and Socket.io'},
       { user: 'Scott Mescudi', content: 'Wait, what are these words?'}]
  };

export default function activeRoom(state = initialState, action) {
  switch(action.type) {
    case 'JOIN_ROOM':
      return Object.assign({}, state.activeRoom, {
        title: (action.payload.room /*|| action.payload[0].room*/),
        messages: action.payload
      });
    case 'NEW_MESSAGE':
      return Object.assign({}, action.payload.room, {
        messages: [...action.payload.room.messages, action.payload.newMessage]
      })
    default:
     return state;
  }
}
