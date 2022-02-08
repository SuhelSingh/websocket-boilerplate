import React, {useMemo} from "react";
import {useDispatch} from "react-redux"
import { Card, Elevation, Divider , Button, useHotkeys } from "@blueprintjs/core";
import styles from './Estimate.module.css'
import {actions, hotKeyGen} from './redux'

export default props => {

    const dispatch = useDispatch()
    const resumeSession = () => {dispatch(actions.updateModuleState({displayedTabId:'answer-prompt'}))}
    const endSession = () => { 
      actions.toast.message('Session ended');
      dispatch(actions.updateModuleState({displayedTabId:'start-session',sessionId:null}))
    }
    const startSession = () => {endSession()}

    // hotkey encodings
    const hotkeys = useMemo(() => [
      hotKeyGen('enter','Resume Session',resumeSession),
      hotKeyGen('right','Resume Session',resumeSession),
      hotKeyGen('esc','End Session',endSession),
      hotKeyGen('s','Start New Session',startSession),
      hotKeyGen('r','Resume Session',resumeSession),
      ], [] );
    const { handleKeyDown, handleKeyUp } = useHotkeys(hotkeys);

    return (
      <Card interactive={true} elevation={Elevation.TWO} className={styles.card} 
            onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
        <h5 className={styles.title}>Pause Menu</h5>
        <Divider className={styles.no_margin_divider}/>
        <div className={styles.vflex_container }>
          <div sytles='margin-bottom:20px'></div>
          <Button text='Resume (enter)' onClick={resumeSession}/>
          <Button text='End Session (esc)' onClick={endSession}/>
          <Button text='Start New Session (s)' onClick={startSession}/>
        </div>
      </Card> 
    )
  }
