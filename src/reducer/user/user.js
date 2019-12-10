
const initialState = {
  isAuthorizationRequired: false,
  user: null
};

const ActionType = {
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
  LOGIN_USER: `LOGIN_USER`,
  LOGOUT_USER: `LOGOUT_USER`
};

const Operation = {
  loginUser: (user, history) => (dispatch, _getState, api) => {
    api.post(`/login`, user)
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.loginUser(response.data));
          history.goBack();
        }
        history.push(`/`);
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.log(e.message));
  },
  checkAuth: () => (dispatch, _getState, api) => {
    api.get(`/login`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.loginUser(response.data));
        }
      })
      .catch((e) => {
        dispatch(ActionCreator.loginUser(null));
        // eslint-disable-next-line no-console
        console.error(e.message);
      });
  }
};

const ActionCreator = {
  loginUser: (data) => ({
    type: ActionType.LOGIN_USER,
    payload: data
  }),
  logoutUser: () => ({
    type: ActionType.LOGOUT_USER,
    payload: null
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOGIN_USER:
      return Object.assign({}, state, {
        user: action.payload
      });
    case ActionType.LOGOUT_USER:
      return Object.assign({}, state, {
        user: action.payload
      });
  }
  return state;
};

export {
  ActionCreator,
  Operation,
  reducer
};
