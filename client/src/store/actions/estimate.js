import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_DEBUG } from "../actionTypes";

export const loadDebug = debug_obj => ({
  type: LOAD_DEBUG,
  debug_obj
});

export const fetchDebug = () => {
  return dispatch => {
    return apiCall("GET", "http://localhost:5000/random_string")
      .then(res => {
        dispatch(loadDebug(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};