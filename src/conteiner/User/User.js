import React from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/users';
import Menu from '../../components/Menu/Menu';

const User = ({ users, onGetUsers}) => {
        //componentDidMount(){}
     //для первоначальной загрузки стейта из api,
    // не думаю что так правильно
  /*  componentDidMount(){
        onGetUsers();
    }*/
    return (
        <div>
        <Menu/>
            <div>
                <button onClick={onGetUsers}>Get users</button>
            </div>
            <ul>
                {users.map((user, index) =>
                    <li key={index}>
                        id: {user.id}
                        username: {user.username}
                    </li>
                )}
            </ul>
        </div>
            );
};
/*const component(){
    return componentDidMount(){
        onGetUsers();
    }
}*/
const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return {
        users: state.users
    };
};

export default connect(mapStateToProps
,
dispatch => ({
    onGetUsers: () => {
        dispatch(getUsers());
    }
}))(User);