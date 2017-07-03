import React, { Component } from 'react';

import Menu from '../Menu/Menu';
import io from 'socket.io-client';

class About extends Component {

  constructor(props) {
    super(props);
    this.state = {
      socket: io('http://localhost:3001'),
      messages: [],
      message: ''
    };
  }
    componentWillMount(){
     this.state.socket.on('chat message', function(msg){
      this.setState({messages: [...this.state.messages,msg]});
    }.bind(this));
    console.log('mount');
  }

  handleChangeMessage(event) {
    this.setState({message: event.target.value});
  }

  sendMessage(e){
    e.preventDefault();
    this.state.socket.emit('chat message', this.state.message);
    this.setState({message: ''});
  }
    render() {
        return (
            <div>
                <Menu />
                This is our cool music app
                <ul>
                   {this.state.messages.map((user, index) =>
                       <li key={index}>
                           {user}
                       </li>
                   )}
               </ul>
               <div>
                   <input type="text" value = {this.state.message}
                    onChange={this.handleChangeMessage.bind(this)} />
                   <button onClick={this.sendMessage.bind(this)}>Send message</button>
               </div>
            </div>
        );
    }
}

export default About;
