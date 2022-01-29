import { combineReducers } from "redux";
import errors from "./errors";
import messages from "./messages";
import debug from "./debug";
import sockets from "./sockets";

const rootReducer = combineReducers({
  errors,
  messages,
  debug,
  sockets,
});

export default rootReducer;
