import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as roomActions from'../../actions/room';
import { bindActionCreators } from 'redux';
//import NewRoom from '../newRoom'
import socket from '../../utils';

class RoomsContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      input: '',
      connected: false
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleNewRoom = this.handleNewRoom.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.fetchRooms = this.fetchRooms.bind(this);
  }

  componentDidMount(){
    this.fetchRooms()
  }

  handleOnClick(room){
    socket.emit("unsubscribe");
    socket.emit("subscribe", { room: room.id});
    this.props.joinRoom(room);
  }

  handleNewRoom(ev) {
    ev.preventDefault();
    this.props.newRoom(this.state.input);
    this.setState({input: ''})
  }

  handleOnChange(ev) {
    this.setState({input: ev.target.value})
  }

  fetchRooms(){
    if (!this.state.connected) {
      this.props.fetchRoomList();
      this.state.connected = true
    }
  }

  render() {
    const rooms = this.props.rooms.map((room) => {
      return (
        <li key={room.title} onClick={this.handleOnClick.bind(null, room)}>
          {room.title}
        </li>
      )
    });

    return (
      <div>
      <ul>
            {rooms}
            {/*<NewRoom handleOnChange={this.handleOnChange}
             handleNewRoom={this.handleNewRoom}
             value={this.state.input}/>*/}
</ul>
      </div>
    )

  }

}

function mapStateToProps(state, ownProps) {
 return { rooms: state.rooms }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ joinRoom: roomActions.fetchRoomData,
     newRoom: roomActions.newRoom,
      fetchRoomList: roomActions.fetchRoomList
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsContainer)
