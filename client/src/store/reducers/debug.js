import { LOAD_DEBUG } from "../actionTypes";

const debug = (state = null, action) => {
  switch (action.type) {
    case LOAD_DEBUG:
      return action.debug_obj;
    default:
      return state;
  }
};

export default debug;
