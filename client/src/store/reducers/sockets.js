import { REGISTER_SOCKET,REMOVE_SOCKET } from "../actionTypes";

const sockets = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_SOCKET:
      return { ...state, [action.ws.name]: action.ws }
    case REMOVE_SOCKET:
      const new_state = {...state} 
      delete new_state[action.name]
      return new_state
    default:
      return state;
  }
};

export default sockets;
