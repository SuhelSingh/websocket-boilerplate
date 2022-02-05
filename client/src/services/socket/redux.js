

const UPDATE_SOCKET_STATE = 'SOCKET_STATE.UPDATE_STATE'
const UPDATE_ALL_SOCKET_STATES = 'SOCKET_STATE.UPDATE_ALL_SOCKET_STATES'

export const updateStateWithSocket = (socketName, socketState) => ({
  type: UPDATE_SOCKET_STATE,
  socketState,
  socketName,
})
//export 

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
    case UPDATE_ALL_SOCKET_STATES:
      return action.newState
    default:
      return state;
  }
};
export default reducer