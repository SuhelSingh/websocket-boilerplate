import create_socket from "../../services/socket";
import { REGISTER_SOCKET,REMOVE_SOCKET } from "../actionTypes";

export const registerSocket = ws => ({
  type: REGISTER_SOCKET,
  ws
});

export const addSocket = (host, path, name) => {
  return dispatch => {
    const ws = create_socket(host, path, name, dispatch)
    return dispatch(registerSocket(ws))
  };
};

export const removeSocket = (name) => ({
  type: REMOVE_SOCKET,
  name
})
