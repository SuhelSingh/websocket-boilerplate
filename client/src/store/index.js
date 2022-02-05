import rootReducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import socket_middleware from '../services/socket/middleware'

export function configureStore() {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(...[thunk,socket_middleware]),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return store;
}
