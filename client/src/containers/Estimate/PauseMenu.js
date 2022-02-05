import React from "react";
import { Card, Elevation, Divider , Button } from "@blueprintjs/core";
import styles from './Estimate.module.css'

export default props => {
    return (
      <Card interactive={true} elevation={Elevation.TWO} className={styles.card}>
        <h5 className={styles.title}>Pause Menu</h5>
        <Divider className={styles.no_margin_divider}/>
        <div className={styles.vflex_container }>
          <div sytles='margin-bottom:20px'></div>
          <Button text='Resume' onClick={()=> {console.log('resume')}}/>
          <Button text='End Session' onClick={()=> {console.log('end session')}}/>
          <Button text='Log Env' onClick={()=> {console.log('placeholder')}}/>
        </div>
      </Card> 
    )
  }
