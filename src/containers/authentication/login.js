import React, { Component } from 'react';
import { connect } from 'react-redux';

import API from '../../api/baseApi';

import { setAlert } from '../alert/reducer';
import { setUserSession } from './reducer';

import LoginForm from '../../components/authentication/loginForm';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailValid: false,
      passwordValid: false,
      emailErrorMessage: '',
      passwordErrorMessage: '',
      isDisabled: false,
      isLoading: false,
    };
  }

  setTextState = key => e => {
    this.setState({ [key]: e.target.value });
  };

  handleSubmit = event => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    this.setState({ validated: true });
    if (form.checkValidity()) {
      this.submitForm();
    }
  };

  submitForm = async () => {
    this.setState({ isDisabled: true, isLoading: true });
    let user = {
      email: this.state.email,
      password: this.state.password,
    };
    try {
      const apiResponse = await API('post', 'auth/login', { ...user });
      const loginResponse = apiResponse.data;
      this.props.dispatch(
        setAlert({
          type: 'Success',
          message: loginResponse.message,
        })
      );
      this.setState({ isDisabled: false, isLoading: false });
      this.props.dispatch(setUserSession(loginResponse.data));
      this.props.history.push('/');
    } catch (error) {
      console.error({ error });
      this.setState({ isDisabled: false, isLoading: false });
    }
  };

  render() {
    return (
      <div style={{ minHeight: '100%' }}>
        <LoginForm
          email={this.state.email}
          password={this.state.password}
          updateEmail={this.setTextState('email')}
          updatePassword={this.setTextState('password')}
          submitForm={this.submitForm}
          isDisabled={this.state.isDisabled}
          isLoading={this.props.isLoading}
          handleSubmit={this.handleSubmit}
          validated={this.state.validated}
        />
      </div>
    );
  }
}

export default connect()(Login);
