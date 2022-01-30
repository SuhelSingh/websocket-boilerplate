import { io } from "socket.io-client";

const create_socket = (host, path, name, dispatch) => {

  const socket = io(
    host, { 
      path: path,
      transports: ["websocket"], 
      rejectUnauthorized: false,
      secure: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax : 5000,
      reconnectionAttempts: 5
    }
  );

  // Add event listeners
  socket.on("connect", () => {
    console.log(`Connected: ${socket.id}`)
  });

  socket.on("send_action", (msg) => {
    const payload = JSON.parse(msg);
    dispatch(payload)
  });

  socket.on("log", (msg) => {console.log(msg)} )

  // Add functions
  const emit_json = (event_name, json_payload) => {
    console.log(`Emitted event. Name: ${event_name}, Payload: ${json_payload}`)
    socket.emit(event_name, json_payload)
  }

  const send_json = (json_payload) => {
    socket.emit(json_payload)
  }
  
  return {
    name: name,
    socket: socket,
    functions: {
      emit_json, 
      send_json
    }
  }

}

export default create_socket
