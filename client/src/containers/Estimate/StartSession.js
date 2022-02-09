import React, {useEffect, useState, useMemo} from "react"
import {useDispatch, useSelector} from "react-redux"
import { Menu, MenuItem, FormGroup, InputGroup, Button, Position, Classes, Spinner, useHotkeys } from "@blueprintjs/core";
import {Popover2} from "@blueprintjs/popover2"
import PromptCard from './PromptCard'
import { CountdownTimer } from "./Timer"
import {actions, hotKeyGen} from './redux'

export default props => {
  
    const [userName, setUserName] = useState("Suhel")
    const [sessionTag, setSessionTag] = useState("debug")
    const sessionId = useSelector(state => state.estimate.sessionId)
    const [innerDiv, setInnerDiv] = useState('START_SESSION') // [START_SESSION, LOADING, COUNTDOWN]

    // Set the session_id to null when initially rendering this screen
    useEffect( () => {
        dispatch( actions.ws.connectIfNotExists('ws://localhost:5000/estimate') )
        dispatch( actions.updateModuleState({sessionId:null}) )
      } , []
    ) 

    // If session_id changes, then update the mode to prompt
    useEffect( () => { 
      if (sessionId !== null) {
          setInnerDiv('COUNTDOWN')
        }
      }, [sessionId]
    )

    const dispatch = useDispatch()

    const startSessionCallback = (res) => {
      console.log(res)
      if (res !== null) {
        actions.toast.success(`Started Session: ${res}`)
        dispatch(actions.updateModuleState({sessionId:res,displayedTabId:'answer-prompt'}))
      } else {
        actions.toast.failure('FUUUUUCK, couldnt get a god damn session id ')
      }
    }

    const startSession = () => {
      dispatch( actions.ws.emit(
        'start_session',
        {userName,sessionTag},
        startSessionCallback
      ))
    }

    const switchToAnswerPrompt = () => { 
      dispatch( actions.updateModuleState({displayedTabId:'answer-prompt'}) ); 
    }

    // hotkey encodings
    const hotkeys = useMemo(() => [
      hotKeyGen('enter','Start session',startSession),
      hotKeyGen('right','Start session',startSession)
      ], [userName, sessionTag] );
    const { handleKeyDown, handleKeyUp } = useHotkeys(hotkeys);

    const sessionTagMenu = (<Menu className={Classes.ELEVATION_1}>
      <MenuItem text="test" onClick={()=>{setSessionTag('test')}}/>
      <MenuItem text="practice" onClick={()=>{setSessionTag('practice')}}/>
      <MenuItem text="debug" onClick={()=>{setSessionTag('debug')}}/>
    </Menu>)

    const SessionInputForm = (
      <div onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
        <FormGroup label="Username" labelFor="username-input" inline={true}>
          <InputGroup id="username-input" value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>
        </FormGroup>
        <Popover2 content={sessionTagMenu} position={Position.BOTTOM}>
          <FormGroup label="Session Type" labelFor="session-type" inline={true}>
            <InputGroup id="session-type" value={sessionTag} onChange={(e)=>{setSessionTag(e.target.value)}}/>  
          </FormGroup>
        </Popover2>
        <Button text='Start Session' onClick = {startSession} fill={false}/>
      </div>
    )

    const LoadingDiv = (
      <Spinner /> 
    )

    const Countdown = (
      <div style={{flexShrink:2, fontSize:'48px'}}>
        <CountdownTimer 
          startSeconds={3} 
          startsPaused={false} 
          onCountdown={switchToAnswerPrompt}
        /> 
      </div>
    )

    const renderChild = (x) => {
      switch (x) {
        case 'START_SESSION':
          return SessionInputForm
        case 'COUNTDOWN':
          return Countdown
        case 'LOADING':
          return LoadingDiv
        default :
          return SessionInputForm
      }
    } 

    return (
      <PromptCard title={'Start a Session'}>
          <div style={{flexGrow:1, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            {renderChild(innerDiv)}
          </div>
      </PromptCard>
    )
  }
