import { combineReducers } from "redux";
import errors from "./errors";
import debug from "./debug";
import estimate from '../../containers/Estimate/redux'
//import inspectSocket from '../../containers/InspectSocket/redux'
import sockets from '../../services/socket/redux'


const rootReducer = combineReducers({
  errors,
  debug,
  estimate,
  sockets
});

export default rootReducer;
