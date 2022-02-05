import React, {useMemo} from "react";
import { NumericInput, Card, Elevation, Divider, useHotkeys } from "@blueprintjs/core";
import styles from './Estimate.module.css'


export default props => {

  const n1 = ( typeof props.n1 !== 'undefined' ? props.n1 : 46 );  //(props.n1 ?? 46)
  const n2 = ( typeof props.n2 !== 'undefined' ? props.n2 : 78 ); //(props.n2 ?? 78)
  const message = (typeof props.message !== 'undefined' ? 
      props.message : "This is a message that can be controlled by the backend")

  const hotkeys = useMemo(() => [
        {
          combo: "a",global: true,
          label: "Enter letter 'a'",
          onKeyDown: () => {console.log('a')},
        },
        {
          combo: "enter",global: true,
          label: "Submit answer",
          onKeyDown: () => console.log('enter'),
        },
        {
          combo: "left",global: true,
          label: "Back",
          onKeyDown: () => console.log('left'),
        },
        {
          combo: "right",global: true,
          label: "Next",
          onKeyDown: () => console.log('right'),
        },
        {
          combo: "up",global: true,
          label: "Go to menu",
          onKeyDown: () => console.log('up'),
        },
        {
          combo: "space",global: true,
          label: "Pause game",
          onKeyDown: () => console.log('space'),
        },
    ], []);
  const { handleKeyDown, handleKeyUp } = useHotkeys(hotkeys);

  return (
    <Card interactive={true} elevation={Elevation.TWO} className={styles.card} 
      onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
      <h5 className={styles.title} >Estimation Practice</h5>
      <Divider className={styles.no_margin_divider}/>
      <div className={styles.vflex_container} >
        <div sytles='margin-bottom:20px'></div>
        <div className={`bp3-text-large ${styles.message}`}>{message}</div>
        <div className={styles.hflex_container}>
          <div className={`bp3-text-large ${styles.prompt}`}>{n1} x {n2} = </div>
          <NumericInput
            large={true}
            buttonPosition="none"
            intent="primary"
            allowNumericCharactersOnly={true}
          />  
        </div>
      </div>
    </Card>
  )
}