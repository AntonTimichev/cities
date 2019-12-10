import {combineReducers} from "redux";

import NameSpaces from "./name-spaces.js";

import {reducer as data} from "./data/data.js";
import {reducer as user} from "./user/user.js";
import {reducer as review} from "./review/review.js";
import {reducer as favorites} from "./favorites/favorites.js";

export default combineReducers({
  [NameSpaces.DATA]: data,
  [NameSpaces.USER]: user,
  [NameSpaces.REVIEW]: review,
  [NameSpaces.FAVORITES]: favorites
});
