import { io } from "socket.io-client";
import { AppToaster } from "../Toaster";

const defaultConfig = { 
  path: '',
  transports: ["websocket"], 
  rejectUnauthorized: false,
  secure: true,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax : 5000,
  reconnectionAttempts: 5
}

const createDefaultSocket = (host='ws://localhost:5000', socketConfig = defaultConfig) => (store) =>  {

  const socket = io(
    host, socketConfig
  );

  // Add event listeners
  socket.on("connect", () => {
    AppToaster.show({message:`hey yo, the socket has connected: ${socket.id}`, intent:'success'})
  });

  socket.on("disconnect", () => {
    AppToaster.show({message:`FUCK. The socket disconnected: ${socket.id}`, intent:'warning'})
  });

  socket.on("send_action", (msg) => {
    const payload = (typeof msg === 'string' ) ? JSON.parse(msg) : msg
    store.dispatch(payload)
  });

  socket.on("log", (msg) => {console.log(msg)} )
  
  return socket
}

export default createDefaultSocket
