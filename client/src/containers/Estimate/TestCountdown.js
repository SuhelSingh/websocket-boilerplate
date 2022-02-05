import React, {useRef} from "react";
import { Card, Elevation, Divider , Spinner } from "@blueprintjs/core";
import styles from './Estimate.module.css'
import {CountdownTimer} from './Timer'

export default props => {
    const timerEl = useRef(null);
    return (
      <Card interactive={true} elevation={Elevation.TWO} className={styles.card}>
        <h5 className={styles.title}>Test Countdown</h5>
        <Divider className={styles.no_margin_divider}/>
        <div style={{minHeight:'150px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
          <Spinner /> 
        </div>
        <CountdownTimer ref={timerEl} startSeconds={3} startsPaused={false} onCountdown={() => console.log('countdown_ended')}/> 
      </Card> 
    )
  }
