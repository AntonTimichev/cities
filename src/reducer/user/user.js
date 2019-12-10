const initialState = {
  isAuthorizationRequired: false,
  user: null
};

const ActionType = {
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
  AUTHENTICATE_USER: `AUTHENTICATE_USER`
};

const Operation = {
  authenticateUser: (user) => (dispatch, _getState, api) => {
    api.post(`/login`, user)
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.setUser(response.data));
        }
      });
  },
  checkAuth: () => (dispatch, _getState, api) => {
    api.get(`/login`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.setUser(response.data));
        }
      });
  }
};

const ActionCreator = {
  requireAuthorization: (bool) => ({
    type: ActionType.REQUIRE_AUTHORIZATION,
    payload: bool,
  }),
  setUser: (data) => ({
    type: ActionType.AUTHENTICATE_USER,
    payload: data
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUTHENTICATE_USER:
      return Object.assign({}, state, {
        user: action.payload
      });
    case ActionType.REQUIRE_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload
      });
  }
  return state;
};

export {
  ActionCreator,
  Operation,
  reducer
};
