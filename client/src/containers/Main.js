import React from "react";
import { Routes, Route } from "react-router-dom";
import MessageList from "../components/MessageList";
import Debug from "./Debug";
import Estimate from "./Estimate";
import InspectSockets from "./InspectSockets";
import Landing from "../components/Landing";
import styles from './Main.module.css';


const Main = props => {

  return (
    <div className={styles.main}>
      <Routes>
        <Route path="/debug" element={<Debug/>} />
        <Route path="/messages" element={<MessageList/>} />
        <Route path="/estimate" element={<Estimate/>} />
        <Route path="/inspect_sockets" element={<InspectSockets/>} />
        <Route path="/" element={<Landing/>} />
      </Routes>
    </div>
  );
};

export default Main;
