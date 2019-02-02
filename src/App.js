import './index.css';

import React, { Component } from 'react';

import { authRoutes, routes } from './routes';

class App extends Component {
  render() {
    return <div className='appContent'>{routes()}</div>;
  }
}

export default App;
