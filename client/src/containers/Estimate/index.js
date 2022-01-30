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
          <h5 className={styles.title} >Estimation Practice</h5>
          <Divider className={styles.no_margin_divider}/>
          <div className={styles.body}> 
            <div className={styles.vflex_container}>
            <div sytles='margin-bottom:20px'></div>
              <div className={styles.hflex_container}>
                <div className={'bp3-text-large'}>{n1} x {n2} = </div>
                <NumericInput
                  large={true}
                  buttonPosition="none"
                  intent="primary"
                  allowNumericCharactersOnly={true}
                  className={styles.typography_style}
                />
              </div>
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