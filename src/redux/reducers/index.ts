import { combineReducers } from "redux";

import usersReducer from "./users";

const rootReducer = combineReducers({
  userState: usersReducer,
});

export default rootReducer;
