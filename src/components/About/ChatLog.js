import React from 'react'
//import { Col, Grid, Row } from 'react-bootstrap'
//import ChatDetail from './chatDetail'
import RoomsContainer from './roomsConteiner'

export default (props) => {
  console.log(props.messages);
  /*const messages = props.messages.map ( (message) => {
    return ( <div> user: {message.user}
       message: {message.content}</div> ) })*/

       const messages = props.messages.map((message, index) =>
           <li key={index}>
               user: {message.user}
               message: {message.content}
           </li>
       )

  return (
    <div>
        <RoomsContainer />
              <div>
              <p>Messages</p>
              <ul>{messages}</ul>
              </div>
    </div>
  )
}
