import './index.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authRoutes, routes } from './routes';

import { setUserSession } from './containers/authentication/reducer';

import Alert from './containers/alert';
import ConnectivityListener from './connectivityListener';
import LoadingComponent from './components/loadingComponent';

class App extends Component {
  state = { isLoadingSession: true };
  componentDidMount() {
    try {
      if (!this.props.userSession) {
        const userSession = JSON.parse(localStorage.getItem('x-user-session'));
        if (userSession) {
          this.props.dispatch(setUserSession(userSession));
        }
      }
    } catch (error) {
      console.error({ error });
    } finally {
      this.setState({ isLoadingSession: false });
    }
  }

  render() {
    if (this.state.isLoadingSession) {
      return <LoadingComponent isLoading={true} />;
    }
    return (
      <>
        <ConnectivityListener />
        <Alert key='alert' />
        <div className='app-content'>{this.props.userSession ? routes() : authRoutes()}</div>
      </>
    );
  }
}

const mapStateToProps = ({ userSession }) => ({
  userSession,
});

export default connect(mapStateToProps)(App);
