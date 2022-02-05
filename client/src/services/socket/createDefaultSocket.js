import { io } from "socket.io-client";

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
    console.log(`Connected: ${socket.id}`)
  });

  socket.on("send_action", (msg) => {
    const payload = JSON.parse(msg);
    store.dispatch(payload)
  });

  socket.on("log", (msg) => {console.log(msg)} )
  
  return socket
}

export default createDefaultSocket
