import { combineReducers } from 'redux';

import { userSession } from '../containers/authentication/reducer';
import { roles } from '../containers/role/reducer';
import { alert } from '../containers/alert/reducer';

const appReducer = combineReducers({
  userSession,
  alert,
  roles,
});

const rootReducer = (state, action) => {
  // Reset the store to initial state
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
