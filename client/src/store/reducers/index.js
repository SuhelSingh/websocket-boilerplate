import { combineReducers } from "redux";
import errors from "./errors";
import messages from "./messages";

const rootReducer = combineReducers({
  errors,
  messages
});

export default rootReducer;
