import {combineReducers} from "redux";
import {reducer as data} from "./data/data.js";
import {reducer as user} from "./user/user.js";
import NameSpaces from "./name-spaces.js";

export default combineReducers({
  [NameSpaces.DATA]: data,
  [NameSpaces.USER]: user,
});
