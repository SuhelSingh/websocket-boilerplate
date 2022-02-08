import createDefaultSocket from './createDefaultSocket'

// Function to get action creators specific to a websocket
export const ws_actions = (socketName='defaultSocket') => {

  const connect = (host='ws://localhost:5000', socketConfig = null) => {
    return {
      type: 'SOCKET.CONNECT',
      host,
      socketConfig,
      socketName,
    }
  }
  const connectIfNotExists = (host='ws://localhost:5000', socketConfig = null) => ({
    type: 'SOCKET.CONNECT_IF_NOT_CONNECTED',
    host,
    socketConfig,
    socketName,
  })

  const updateState = () => ({type: 'SOCKET.UPDATE_STATE',socketName})

  const disconnect = () => ({type: 'SOCKET.DISCONNECT',socketName})

  const remove = () => ({type: 'SOCKET.REMOVE',socketName})

  const emit = (eventName, payload, ack=null) => ({
    type: 'SOCKET.EMIT',
    eventName,
    payload,
    ack,
    socketName,
  })
  const send = (payload, ack=null) => ({
    type: 'SOCKET.SEND',
    payload,
    ack,
    socketName,
  })

  // Dictionary of Middleware Action Creators
  return {
    connect
    , connectIfNotExists
    , updateState
    , disconnect
    , remove
    , emit
    , send
  } 
}
export const update_all_socket_states = () => ({type:'SOCKET.UPDATE_ALL_SOCKET_STATES'})

// Same thing, but for illegal actions (that include non-serializeable functions)
export const ws_illegal_actions = (socketName='defaultSocket') => {
  // Adds a websocket to the list of sockets
  const add = (ws) => ({
    type: 'SOCKET_ILLEGAL.ADD',
    ws,
    socketName
  })

  // Dispatches a thunk after providing it with a socket
  const dispatchThunkWithSocket = (thunkGenerator) => ({
    type: 'SOCKET_ILLEGAL.DISPATCH_THUNK_WITH_SOCKET',
    thunkGenerator, // callback should have the form: (socket) => {return thunk}
    socketName,
  })

  // Adds a callback to a pre-existing socket. 
  //   In order for the callback to access the store as well as the socket
  //   the function must be a generator that accepts (store, socket) and returns the actual callback
  const addCallbackToSocket = (callbackGenerator) => ({
    type: 'SOCKET_ILLEGAL.ADD_CALLBACK',
    name: callbackGenerator.name,
    eventCallback: callbackGenerator, //  (store, socket) => {return action}
    socketName,
  })

  // Dictionary of Middleware Action Creators
  return {
    add // illegal
    , dispatchThunkWithSocket // illegal
    , addCallbackToSocket
  } 
}



// The actual socket middleware
const socketMiddleware = () => {
  let sockets = {};

  // How we're representing sockets in the redux store:
  const representSocketInfo = (socketName) => {
    if (socketName in sockets) {
      const socket = sockets[socketName]
      return {
          'name':socketName,
          'socketId':socket.id,
          'connected':socket.connected.toString(),
          'uri':socket.io.uri,
          'callbacks':Object.fromEntries(
            Object.entries(socket._callbacks).map( ([k,v]) => [k,v.toString()])
          )
      }
    } else {
      return null
    }
  }

  // Middleware 
  return store => next => action => {
    
    if (action.type.split('.')[0] === 'SOCKET') {
 
      let subtype = action.type.split('.')[1] 
      let socket = (typeof sockets[action.socketName] === 'undefined') ? null : sockets[action.socketName];  
      
      switch (subtype) {
        case 'CONNECT':
          sockets[action.socketName] = createDefaultSocket(action.host, action.socketConfig)(store)
          store.dispatch(ws_actions(action.socketName).updateState())
          break;
        case 'CONNECT_IF_NOT_CONNECTED':
          if ((socket==null) || (!socket.connected)) {
            store.dispatch( ws_actions(action.socketName).connect(action.host, action.socketConfig) )
          }
          break;
        case 'UPDATE_ALL_SOCKET_STATES':
          const newState = Object.fromEntries( 
            (Object.keys(sockets)).map( s => [s,representSocketInfo()] ) 
          )
          store.dispatch({type:'SOCKET_STATE.UPDATE_ALL', newState })
          break;
        case 'UPDATE_STATE':
          const newSocketInfo = representSocketInfo(action.socketName)
          store.dispatch({
            type:'SOCKET_STATE.UPDATE_STATE', 
            socketState:newSocketInfo, 
            socketName:action.socketName 
          })
          break;
        case 'DISCONNECT':
          socket.disconnect()
          break;
        case 'REMOVE':
          if (action.socketName in sockets) {
            delete sockets[action.socketName]
          }
          store.dispatch(ws_actions(action.socketName).updateState())
          break;
        case 'EMIT':
          console.log([action.eventName, JSON.stringify(action.payload), action.ack])
          socket.emit(
            action.eventName, JSON.stringify(action.payload), action.ack
          )
          break;
        case 'SEND':
          socket.send(
            JSON.stringify(action.payload), action.ack
          )
          break;
        default:
          return next(action)
      }
    } else if (action.type.split('.')[0] === 'SOCKET_ILLEGAL') {

      let subtype = action.type.split('.')[1] 

      switch (subtype) {
        case 'ADD':
          sockets[action.socketName] = action.ws 
          break;
        case 'ADD_CALLBACK':
          if (action.socketName in sockets) {
            sockets[action.socketName].on(
              action.eventName, action.eventCallback(store,sockets[action.socketName])
            ) 
          }
          break;
        case 'DISPATCH_THUNK_WITH_SOCKET':
          let socket = (typeof sockets[action.socketName] === 'undefined') ? null : sockets[action.socketName];
          store.dispatch(
            action.thunkGenerator(socket)
          )
          break;
        default:
          return next(action)
      }
    } else {
      return next(action)
    }
  };
};

export default socketMiddleware();
