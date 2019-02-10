import createReducer from '../../helpers/createReducer';

let actions = {};
actions.LOAD_USER_SESSION = 'containers/authentication/LOAD_USER_SESSION';
actions.UPDATE_USER_SESSION = 'containers/authentication/UPDATE_USER_SESSION';

export const setUserSession = userSession => {
  if (userSession && userSession._id) {
    return {
      type: actions.LOAD_USER_SESSION,
      payload: userSession,
    };
  } else {
    return {
      type: 'USER_LOGOUT',
      payload: null,
    };
  }
};

export const updateUserSession = userSession => {
  return {
    type: actions.UPDATE_USER_SESSION,
    payload: userSession,
  };
};

export const userSession = createReducer(null, {
  [actions.LOAD_USER_SESSION](state, { payload }) {
    return { ...payload };
  },
  [actions.UPDATE_USER_SESSION](state, { payload }) {
    if (state && state._id === payload._id) {
      return payload;
    }
    return state;
  },
});
