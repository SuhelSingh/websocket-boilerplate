import React from "react";
import { connect } from "react-redux";
import { NumericInput, Card, Elevation, Divider } from "@blueprintjs/core";
import styles from './Estimate.module.css'

const EstimationPrompt = props => {

  const n1 = ( typeof props.n1 !== 'undefined' ? props.n1 : 46 );  //(props.n1 ?? 46)
  const n2 = ( typeof props.n2 !== 'undefined' ? props.n2 : 78 ); //(props.n2 ?? 78)

  return (
    <div className={styles.main}>
      <div className={styles.divider_div}></div>
      
      <Card interactive={true} elevation={Elevation.TWO} className={styles.card}>
          <h1 className={styles.title} >Estimation Practice</h1>
          <Divider/>
          <div className={styles.body}> 
            <div>
                <h3>{n1} x {n2}</h3>
                <div style={{marginBottom: "10px"}}></div>
                <NumericInput large={true} buttonPosition="none" intent="primary" allowNumericCharactersOnly={true}/>
            </div>
          </div>
      </Card>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    estimate: state.estimate
  };
}

export default connect(mapStateToProps)(EstimationPrompt);