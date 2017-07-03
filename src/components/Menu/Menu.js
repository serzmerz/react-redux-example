import React, { Component } from 'react';
import { Link } from 'react-router';

class Menu extends Component {
    render() {
        return (
            <div>
                <Link to="/">Tracks</Link>
                <Link to="/about">About</Link>
                <Link to="/user">User</Link>
                <Link to="/login">Login</Link>
                <Link to="/protected">Protected</Link>
            </div>
        );
    }
}

export default Menu;
