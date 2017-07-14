import React, { Component } from 'react';

import { connect } from 'react-redux'
import Menu from '../Menu/Menu';
import socket from '../../utils';

import ChatLog from './ChatLog';

import * as messageActions from '../../actions/messageActions'
import * as roomActions from '../../actions/room'
import { bindActionCreators } from 'redux'

class About extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input : '',
      messages: props.messages,
      connected: false
    }
    this._init = this._init.bind(this)
    /*this.handleOnChange = this.handleOnChange.bind(this)
     this.handleOnSubmit = this.handleOnSubmit.bind(this)
     this._handleMessageEvent = this._handleMessageEvent.bind(this)
     this._handleFileUpload = this._handleFileUpload.bind(this)*/

  }
    componentWillMount(){
     /*socket.on('chat message', function(msg){
      this.setState({messages: [...this.state.messages,msg]});
    }.bind(this));
    console.log('mount');*/
    this._init()
  }

  _init(){
    if(!(this.state.connected)){
      this.props.fetchRoom()
      socket.emit('subscribe', {room: this.props.room.id})
        this.setState({connected: true})
    }
  }

  handleChangeMessage(event) {
    this.setState({message: event.target.value});
  }

  sendMessage(e){
    e.preventDefault();
    socket.emit('chat message', this.state.message);
    this.setState({message: ''});
  }
    render() {
        return (
            <div>
                <Menu />

                <ChatLog messages={this.state.messages}/>
                This is our cool music app
                {/*<ul>
                   {this.state.messages.map((user, index) =>
                       <li key={index}>
                           {user}
                       </li>
                   )}
               </ul>*/}
               <div>
                   <input type="text" value = {this.state.message}
                    onChange={this.handleChangeMessage.bind(this)} />
                   <button onClick={this.sendMessage.bind(this)}>Send message</button>
               </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
  return { messages: state.activeRoom.messages, room: state.activeRoom, user: state.user }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createMessage: messageActions.saveMessage, fetchRoom: roomActions.fetchRoomData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
