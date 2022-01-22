import React from "react";
import { Switch, Route } from "react-router-dom";
import MessageList from "../components/MessageList";
import DebugDiv from "../components/DebugDiv";
import Landing from "../components/Landing";

const Main = props => {
  return (
    <div className="container">
      <Switch>
        <Route path="/debug" component={DebugDiv} />
        <Route path="/messages" component={MessageList} />
        <Route path="/" component={Landing} />
      </Switch>
    </div>
  );
};

export default Main;
