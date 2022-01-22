import { combineReducers } from "redux";
import errors from "./errors";
import messages from "./messages";
import debug from "./debug";

const rootReducer = combineReducers({
  errors,
  messages,
  debug,
});

export default rootReducer;
