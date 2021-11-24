import { combineReducers } from "redux";

import usersReducer from "./users";
import dialogReducer from "./dialog";

const rootReducer = combineReducers({
  userState: usersReducer,
  dialogState: dialogReducer,
});

export default rootReducer;
