const initialState = {
  isNeedAuthorization: false
};

const ActionType = {
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`
};

const ActionCreator = {
  requireAuthorization: (bool) => ({
    type: ActionType.REQUIRE_AUTHORIZATION,
    payload: bool,
  }),
};

const reducer = (state = initialState, action) => {
  if (action.type === ActionType.REQUIRE_AUTHORIZATION) {
    return Object.assign({}, state, {
      isNeedAuthorization: action.payload,
    });
  }
  return state;
};

export {
  ActionCreator,
  reducer
};
