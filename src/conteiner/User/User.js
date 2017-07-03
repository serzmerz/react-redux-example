import React from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/users';
import Menu from '../../components/Menu/Menu';

/*const callMe(func){
  func();
}*/

const User = ({ users, onGetUsers}) => {

    if(users.didInvalidate) {
         onGetUsers();//для первоначальной загрузки стейта из api,
         // не думаю что так правильно
     }
     //const usr = onGetUsers();
    let res;
    if(users.isFetching) {
        res = <div>Загрузка...</div> ;
    }
    else if(users.error) res = <div>{users.error}</div>;
    else res = <ul>
        {users.items.map((user, index) =>
            <li key={index}>
                id: {user.id}
                username: {user.username}
            </li>
        )}
    </ul>;
    return (
        <div>
        <Menu/>
            <div>
                <button onClick={onGetUsers}>Get users</button>
            </div>
            {res}
        </div>
            );
};
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
