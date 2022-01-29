import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "../store";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Main from "./Main";

const store = configureStore();

// I need a container/component that displays random strings
// I should create a new container and display component
// Maybe I should model this off the MessageList container
// First I should understand how that works

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Main />
    </BrowserRouter>
  </Provider>
);

export default App;
