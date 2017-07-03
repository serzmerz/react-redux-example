import React, { Component } from 'react';

import Menu from '../../components/Menu/Menu';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/signup';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    const redirectRoute = this.props.location.query.next || '/login';
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      redirectTo: redirectRoute
    };
  }

  signup(e) {
      e.preventDefault();
      if(this.state.password === this.state.confirmPassword)
      this.props.actions.signupUser(this.state.email, this.state.password, this.state.redirectTo);
      else alert('Password is not identical');
  }

  handleChangeEmail(event) {
    //  this.setState({email: newValue});
    this.setState({email: event.target.value});
  }
  handleChangePassword(event) {
      this.setState({password: event.target.value});
  }
  handleChangeConfirmPassword(event) {
      this.setState({confirmPassword: event.target.value});
  }

  render () {
    let res = (this.props.isAuthenticated)? <div>
    You already logined
  </div> :
    <form role='form'>
    <div className='form-group'>
        <input type='text'
          className='form-control input-lg'
          value = {this.state.email}
          onChange={this.handleChangeEmail.bind(this)}
          placeholder='Email' />
        </div>
      <div className='form-group'>
        <input type='password'
          className='form-control input-lg'
          value = {this.state.password}
          onChange={this.handleChangePassword.bind(this)}
          placeholder='Password' />
      </div>
      <div className='form-group'>
        <input type='password'
          className='form-control input-lg'
          value = {this.state.confirmPassword}
          onChange={this.handleChangeConfirmPassword.bind(this)}
          placeholder='Confirm password' />
      </div>
      <button type='submit'
        className='btn btn-lg'
        disabled={this.props.isRegistering}
        onClick={this.signup.bind(this)}>Submit</button>
  </form>;
        return (
      <div className='col-xs-12 col-md-6 col-md-offset-3'>
      <Menu/>
        <h3>Register in to view protected content!</h3>
        {this.props.statusText ? <div className='alert alert-info'>{this.props.statusText}</div> : ''}
            {res}
    </div>
    );
  }
}
//reactMixin(LoginForm.prototype, React.addons.LinkedStateMixin);

const mapStateToProps = (state) => ({
  isAuthenticated   : state.auth.isAuthenticated,
  statusText         : state.signup.statusText,
  isRegistering      : state.signup.isRegistering
});
const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
