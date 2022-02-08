import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './Estimate.module.css'

import AnswerPrompt from './AnswerPrompt'
import StartSession from './StartSession'
import ReviewAnswer from './ReviewAnswer'
import PauseMenu from './PauseMenu'
import TestTimer from './TestTimer'
import TestCountdown from './TestCountdown'
import TestCountdown2 from './TestCountdown2'
import TestToaster from './TestToaster'
import {actions} from './redux'

import { HotkeysProvider, Tab, Tabs } from "@blueprintjs/core";

const EstimateDebug = props => {

  const tabId = useSelector(state => state.estimate.displayedTabId)
  const dispatch = useDispatch()
  const onTabChange = (newTabId)=>{ 
    dispatch(actions.updateModuleState({displayedTabId:newTabId}));
  }

  return (
    <HotkeysProvider>
      <div className={styles.main}>
      <div style={{marginBottom: "50px"}}></div>
        <Tabs 
          id="EstimateTabs" 
          selectedTabId={tabId}
          onChange={onTabChange}
          className={styles.main_content_container} 
          vertical={true}
          renderActiveTabPanelOnly={true}
        >
            <Tab id="start-session" title="Start Session" panel={<StartSession/>}/>   
            <Tab id="answer-prompt" title="Answer Prompt" panel={<AnswerPrompt/>} />
            <Tab id="review-answer" title="Review Answer" panel={<ReviewAnswer />} />
            <Tab id="pause-menu" title="Pause Menu" panel={<PauseMenu />} />
            
            <Tab id="test-countdown" title="Test Countdown" panel={<TestCountdown />} />
            <Tab id="test-countdown2" title="Test Countdown2" panel={<TestCountdown2 />} />
            <Tab id="test-timer" title="Test Timer" panel={<TestTimer />} />
            <Tab id="test-toaster" title="Test Toaster" panel={<TestToaster />} />
            <Tabs.Expander />
        </Tabs>
      </div>
    </HotkeysProvider>
  )
}

export default EstimateDebug;