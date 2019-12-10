import NameSpaces from "../name-spaces.js";

const NAME_SPACE = NameSpaces.USER;

export const getIsAuth = (state) => state[NAME_SPACE].user !== null;
export const getIsLogin = (state) => state[NAME_SPACE].isLogin;
export const getLoginErrorStatus = (state) => state[NAME_SPACE].loginErrorStatus;
export const getUserParams = (state) => {
  const user = state[NAME_SPACE].user;
  const userParams = {
    id: -1,
    avatar: ``,
    email: ``
  };
  if (user) {
    userParams.id = user.id;
    userParams.avatar = `https://es31-server.appspot.com/six-cities${user.avatar_url}`;
    userParams.email = user.email;
  }
  return userParams;
};
