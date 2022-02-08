import React from "react";
import styles from './Estimate.module.css'

import AnswerPrompt from './AnswerPrompt'
import StartSession from './StartSession'
import ReviewAnswer from './ReviewAnswer'
import PauseMenu from './PauseMenu'
import TestTimer from './TestTimer'
import TestCountdown from './TestCountdown'

import { HotkeysProvider } from "@blueprintjs/core";

const Estimate = props => {

  return (
    <HotkeysProvider>
      <div className={styles.main}>
        <div style={{marginBottom: "50px"}}></div>
        <div className={styles.main_content_container}>
          <AnswerPrompt/>
          <div style={{marginBottom: "50px"}}></div>
          <StartSession/>
          <div style={{marginBottom: "50px"}}></div>
          <ReviewAnswer/>
          <div style={{marginBottom: "50px"}}></div>
          <PauseMenu/>
          <div style={{marginBottom: "50px"}}></div>
          <TestCountdown/>
          <div style={{marginBottom: "50px"}}></div>
          <TestTimer/>
          <div style={{marginBottom: "50px"}}></div>
        </div>
      </div>
    </HotkeysProvider>
  )
}

export default Estimate;