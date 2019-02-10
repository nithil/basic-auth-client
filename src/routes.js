import Loadable from 'react-loadable';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoadingComponent from './components/loadingComponent';

const PageNotFound = Loadable({
  loader: () => import(/* webpackChunkName: 'PageNotFound' */ './components/404/pageNotFound'),
  loading: LoadingComponent,
});

const Login = Loadable({
  loader: () => import(/* webpackChunkName: 'Login' */ './containers/authentication/login'),
  loading: LoadingComponent,
});

export const routes = () => {
  return (
    <Switch>
      {/* <Route path='/' exact component={PageNotFound} /> */}
      <Route component={PageNotFound} />
    </Switch>
  );
};

export const authRoutes = () => {
  return (
    <Switch>
      <Route path='/' exact component={Login} />
      <Route path='/login' component={Login} />
      <Route component={PageNotFound} />
    </Switch>
  );
};
