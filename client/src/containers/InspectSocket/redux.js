import {ws_illegal_actions} from '../../services/socket/middleware'


const UPDATE_SOCKET_STATE = 'INSPECT_SOCKETS.UPDATE_SOCKET_STATE'

export const updateStateWithSocket = (socketName, socketState) => ({
  type: UPDATE_SOCKET_STATE,
  socketState,
  socketName,
})

export const updateSocketInfoToState = (socketName) => {

  const get_socket_state = (socket) => {
    let socketInfo = null
    if (socket !== null) {
      socketInfo = {
          'name':socketName,
          'socketId':socket.id,
          'connected':socket.connected.toString(),
          'uri':socket.io.uri,
          'callbacks':Object.fromEntries(
            Object.entries(socket._callbacks).map( ([k,v]) => [k,v.toString()])
        )
      }
    }
    return socketInfo
  }

  return dispatch => {
    function thunkGenerator(socket) {
      return dispatch => {
        dispatch(
          updateStateWithSocket( socketName, get_socket_state(socket))
        )
      }
    }

    const thunk = ws_illegal_actions(socketName).dispatchThunkWithSocket(
      thunkGenerator
    )
    
    dispatch( thunk )

  }

}


const reducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SOCKET_STATE:
      const newState = {...state}
      if (action.socketState == null) {
        delete newState[action.socketName]
      } else {
        newState[action.socketName] = action.socketState
      }
      return newState;
    default:
      return state;
  }
};
export default reducer