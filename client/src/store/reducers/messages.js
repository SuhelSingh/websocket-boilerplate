import { LOAD_DEBUG } from "../actionTypes";

const message = (state = [], action) => {
  switch (action.type) {
    case LOAD_DEBUG:
      return [...action.debug_obj];
    default:
      return state;
  }
};

export default message;
