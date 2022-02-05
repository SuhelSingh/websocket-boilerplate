import React from "react";
import { Routes, Route } from "react-router-dom";
import Debug from "../Debug";
import InspectSocket from "../InspectSocket";
import Landing from "../Landing";
import {Estimate, EstimateDebug} from "../Estimate";
import styles from './Main.module.css';


const Main = props => {

  return (
    <div className={styles.main}>
      <div className={styles.layout_container}>
        <Routes>
          <Route path="/debug" element={<Debug/>} />
          <Route path="/estimate" element={<Estimate/>} />
          <Route path="/estimate_debug" element={<EstimateDebug/>} />
          <Route path="/inspect_sockets" element={<InspectSocket/>} />
          <Route path="/" element={<Landing/>} />
        </Routes>
      </div>
    </div>
  );
};

export default Main;
