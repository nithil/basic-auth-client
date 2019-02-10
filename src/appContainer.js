import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';

import App from './App';
import store from './store';

const AppContainer = () => (
  <Provider store={store}>
    <ToastProvider>
      <BrowserRouter>
        <Route path='/' component={App} />
      </BrowserRouter>
    </ToastProvider>
  </Provider>
);

export default AppContainer;
