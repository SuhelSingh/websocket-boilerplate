import rootReducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import socket_middleware from '../services/socket/middleware'
import { createLogger } from 'redux-logger'

const logger = createLogger({
  // ...options
  predicate: (getState, action) => (action.type.split('.')[0] === 'ESTIMATE')
  , diff:false
  , collapsed: true //(getState, action) => action.type.split('.')[0] !== 'ESTIMATE'
});

export function configureStore() {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(...[thunk,socket_middleware,logger]),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return store;
}
