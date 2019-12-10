const initialState = {
  user: null,
  isLogin: false,
  loginErrorStatus: false
};

const ActionType = {
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
  LOGIN_USER: `LOGIN_USER`,
  LOGOUT_USER: `LOGOUT_USER`,
  IS_LOGIN: `IS_LOGIN`,
  NEED_UPDATE: `NEED_UPDATE`,
  LOGIN_ERROR_STATUS: `LOGIN_ERROR`
};

const Operation = {
  loginUser: (user) => async (dispatch, _getState, apiProvider) => {
    try {
      const {data} = await apiProvider.loginUser(`/login`, user);
      dispatch(ActionCreator.loginError(false));
      dispatch(ActionCreator.isLogin(true));
      dispatch(ActionCreator.loginUser(data));
    } catch (_e) {
      dispatch(ActionCreator.loginError(true));
    }
  },

  checkAuth: () => async (dispatch, _getState, apiProvider) => {
    try {
      const {data} = await apiProvider.checkAuth(`/login`);
      dispatch(ActionCreator.loginUser(data));
    } catch (_e) {
      dispatch(ActionCreator.loginUser(null));
    }
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
  }),

  isLogin: (bool) => ({
    type: ActionType.IS_LOGIN,
    payload: bool
  }),

  loginError: (bool) => ({
    type: ActionType.LOGIN_ERROR_STATUS,
    payload: bool
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

    case ActionType.IS_LOGIN:
      return Object.assign({}, state, {
        isLogin: action.payload
      });

    case ActionType.LOGIN_ERROR_STATUS:
      return Object.assign({}, state, {
        loginErrorStatus: action.payload
      });
  }
  return state;
};

export {
  ActionCreator,
  Operation,
  reducer
};
