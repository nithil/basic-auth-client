import './index.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authRoutes, routes } from './routes';

import ConnectivityListener from './connectivityListener';
import Alert from './containers/alert';

class App extends Component {
  render() {
    return (
      <>
        <ConnectivityListener />
        <Alert />
        <div className='app-content'>{this.props.userSession ? routes() : authRoutes()}</div>
      </>
    );
  }
}

const mapStateToProps = ({ userSession }) => ({
  userSession,
});

export default connect(mapStateToProps)(App);
