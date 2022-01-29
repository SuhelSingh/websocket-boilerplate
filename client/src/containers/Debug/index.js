import React  from "react";
import { connect, useSelector } from "react-redux";
import { fetchDebug } from "../../store/actions/debug";
import { Button, Card, Elevation, Text } from "@blueprintjs/core";
import styles from './Debug.module.css'

const DebugContainer = props => {

  const current_state = useSelector( state => state)
  const displayStore = () => {
    console.log(current_state)
  }

  return (
    <div className={styles.main}>
      <div className={styles.divider_div}></div>
      <Card interactive={true} elevation={Elevation.TWO} className={styles.card}>
          <h5>Debug Content</h5>
          <div className={styles.hcontainer}>
            <Button className={styles.hitem} onClick={() => props.fetchDebug()}>Fetch String</Button>
            <Text className={styles.hitem} >
              {props.debug}
            </Text>
          </div>
      </Card>
      <div style={{marginBottom: "30px"}}></div>
      <Card interactive={true} elevation={Elevation.TWO} className={styles.card}>
          <h5>Debug Buttons</h5>
          <Button className={styles.hitem} onClick={displayStore} text="Display Store"/>
          <div style={{marginBottom: "10px"}}></div>
      </Card>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    debug: state.debug
  };
}

export default connect(mapStateToProps, { fetchDebug })(DebugContainer);