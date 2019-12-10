import NameSpaces from "../name-spaces.js";

const NAME_SPACE = NameSpaces.USER;

export const getIsAuth = (state) => state[NAME_SPACE].user !== null;
