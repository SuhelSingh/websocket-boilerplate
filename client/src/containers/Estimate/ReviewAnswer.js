import React from "react";
import { Card, Elevation, Divider } from "@blueprintjs/core";
import styles from './Estimate.module.css'
import { Timer } from './Timer'

// const inputEl = useRef(null);
//   const onButtonClick = () => {
//     // `current` points to the mounted text input element
//     inputEl.current.focus();
//   };

export default props => {
    const message = "You provided {x}. The answer is {y}. You were {z}% off"

    return (
      <Card interactive={true} elevation={Elevation.TWO} className={styles.card}>
        <h5 className={styles.title}>Estimation Practice</h5>
        <Divider className={styles.no_margin_divider}/>
        <div className={styles.vflex_container} >
          <div sytles='margin-bottom:20px'></div>
          <div className={`bp3-text-large ${styles.message}`}>{message}</div>
        </div>
        {/* <ProgressBar value={progress} stripes={false} animate={false}/> */}
        <Timer/>
      </Card> 
    )
  }
