import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form } from 'react-bootstrap';

const LoginForm = props => (
  <Form noValidate validated={props.validated} style={{ width: '300px' }} onSubmit={props.handleSubmit}>
    <Form.Group controlId='formBasicEmail'>
      <Form.Label>Email address</Form.Label>
      <Form.Control required type='email' placeholder='Enter email' value={props.email} onChange={props.updateEmail} />
      <Form.Control.Feedback type='invalid'>Please provide a valid Email</Form.Control.Feedback>
    </Form.Group>

    <Form.Group controlId='formBasicPassword'>
      <Form.Label>Password</Form.Label>
      <Form.Control
        required
        type='password'
        placeholder='Password'
        autoComplete='password'
        value={props.password}
        onChange={props.updatePassword}
      />
      <Form.Control.Feedback type='invalid'>Please enter a valid Password</Form.Control.Feedback>
    </Form.Group>
    <Button variant='primary' size='lg' block type='submit' disabled={props.isDisabled}>
      {props.isLoading ? 'Logging in...' : 'Login'}
    </Button>
  </Form>
);

LoginForm.propTypes = {
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  updatePassword: PropTypes.func,
  submitForm: PropTypes.func,
  updateEmail: PropTypes.func,
  forgotPassword: PropTypes.func,
};

export default LoginForm;
