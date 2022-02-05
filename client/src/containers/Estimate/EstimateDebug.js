import React from "react";
import { connect } from "react-redux";
import styles from './Estimate.module.css'

import AnswerPrompt from './AnswerPrompt'
import StartSession from './StartSession'
import ReviewAnswer from './ReviewAnswer'
import PauseMenu from './PauseMenu'
import TestTimer from './TestTimer'
import TestCountdown from './TestCountdown'

import { HotkeysProvider, Tab, Tabs } from "@blueprintjs/core";

const EstimateDebug = props => {

  return (
    <HotkeysProvider>
      <div className={styles.main}>
      <div style={{marginBottom: "50px"}}></div>
        <Tabs id="EstimateTabs" defaultSelectedTabId="start-session" className={styles.main_content_container} vertical={true}>
            <Tab id="start-session" title="Start Session" panel={<StartSession/>}/>   
            <Tab id="answer-prompt" title="Answer Prompt" panel={<AnswerPrompt/>} />
            <Tab id="review-answer" title="Review Answer" panel={<ReviewAnswer />} />
            <Tab id="test-countdown" title="Test Countdown" panel={<TestCountdown />} />
            <Tab id="test-timer" title="Test Timer" panel={<TestTimer />} />
            <Tab id="pause-menu" title="Pause Menu" panel={<PauseMenu />} />
            <Tabs.Expander />
        </Tabs>
      </div>
    </HotkeysProvider>
  )
}

function mapStateToProps(state) {
  return {
    estimate: state.estimate
  };
}

export default connect(mapStateToProps)(EstimateDebug);