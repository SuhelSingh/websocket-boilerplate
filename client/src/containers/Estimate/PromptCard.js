import React from "react";
import { Card, Elevation, Divider, HotkeysProvider } from "@blueprintjs/core";
import styles from './Estimate.module.css'

export default props => {
  const timer = ('timer' in props) ? props.timer : null
  return (
    <Card interactive={true} elevation={Elevation.TWO} className={styles.card}>
      <HotkeysProvider>
        <h5 className={styles.title} >{props.title}</h5>
        <Divider className={styles.no_margin_divider}/>
        <div style={{flexGrow:2, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          {props.children}
        </div>
        <div>{timer}</div>
      </HotkeysProvider>
    </Card>
  )
}