import createReducer from '../../helpers/createReducer';

import API from '../../api/baseApi';

let actions = {};
actions.LOAD_ROLES = 'containers/roles/LOAD_ROLES';
actions.ADD_ROLE = 'containers/roles/ADD_ROLE';
actions.UPDATE_ROLE = 'containers/roles/UPDATE_ROLE';
actions.REMOVE_ROLE = 'containers/roles/REMOVE_ROLE';

export function fetchRoles() {
  return async dispatch => {
    try {
      const apiResponse = await API('get', 'roles');
      const roles = apiResponse.data.data;
      dispatch(loadRoles(roles));
    } catch (error) {
      console.error(error);
    }
  };
}

export const loadRoles = (roles = []) => {
  return {
    type: actions.LOAD_ROLES,
    payload: roles,
  };
};

export const addRole = (role = []) => {
  return {
    type: actions.ADD_ROLE,
    payload: role,
  };
};

export const removeRole = (role = []) => {
  return {
    type: actions.REMOVE_ROLE,
    payload: role,
  };
};

export const roles = createReducer([], {
  [actions.LOAD_ROLES]: (_state, { payload }) => payload,
  [actions.ADD_ROLE]: (state, { payload }) => {
    return [...state, payload];
  },
  [actions.UPDATE_ROLE]: (state, { payload }) => {
    const updatedItems = state.map(item => {
      if (item._id === payload._id) {
        return { ...item, ...payload };
      }
      return item;
    });
    return updatedItems;
  },
  [actions.REMOVE_ROLE]: (state, { payload }) => {
    const newState = [...state];
    const itemIndexToRemove = state.findIndex(item => item._id === payload._id);

    if (itemIndexToRemove !== -1) newState.splice(itemIndexToRemove, 1);
    return newState;

    // const newState = state.filter(item => item._id !== payload._id);
    // return newState;
  },
});
