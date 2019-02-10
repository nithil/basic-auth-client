import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import monitorReducersEnhancer from './monitorReducer';
import rootReducer from '../reducers';

let middleWares = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
  const createLogger = require('redux-logger').createLogger;
  middleWares = [...middleWares, createLogger()];
}

const middlewareEnhancer = applyMiddleware(...middleWares);
const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);
const store = createStore(rootReducer, composedEnhancers);

export default store;
