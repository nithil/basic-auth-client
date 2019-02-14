import createReducer from '../../helpers/createReducer';

const SET_ALERT = 'SET_ALERT';

export const setAlert = alert => {
  return {
    type: SET_ALERT,
    payload: alert,
  };
};

export const alert = createReducer(null, {
  [SET_ALERT](state, { payload }) {
    return payload;
  },
});
