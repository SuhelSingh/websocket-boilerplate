import React, {useRef} from "react";
import { Card, Elevation, Divider , Button } from "@blueprintjs/core";
import styles from './Estimate.module.css'
import {Timer} from './Timer'

export default props => {
    const timerEl = useRef(null);
    return (
      <Card interactive={true} elevation={Elevation.TWO} className={styles.card}>
        <h5 className={styles.title}>Test Timer</h5>
        <Divider className={styles.no_margin_divider}/>
        <div sytles='margin-bottom:20px'></div>
        <div >
          <Button text='Log Timer' onClick={()=> {console.log(timerEl.current)}}/>
          <Button text='Pause Timer' onClick={()=> {timerEl.current.pauseTimer()}}/>
          <Button text='Start Timer' onClick={()=> {timerEl.current.startTimer()}}/>
          <Button text='Reset Timer' onClick={()=> {timerEl.current.resetTimer()}}/>
          <Button text='Get Elapsed Time' onClick={()=> {console.log(timerEl.current.getElapsedTime())}}/>
        </div>
        <Timer ref={timerEl} startsPaused={false}/>  
      </Card> 
    )
  }
