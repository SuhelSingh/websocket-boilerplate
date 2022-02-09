import React, {useMemo, useState, useRef, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux"
import { NumericInput, useHotkeys, Button } from "@blueprintjs/core";
import PromptCard from "./PromptCard"
import styles from './Estimate.module.css'
import {actions, hotKeyGen} from './redux'
import { Timer } from "./Timer";


export default props => {

  const prompt = useSelector(state=>state.estimate.prompt)
  const sessionId = useSelector(state=>state.estimate.sessionId)
  const dispatch = useDispatch()

  const [inputValue, setInputValue] = useState('')
  const timerRef = useRef(null);
  const inputRef = useRef(null);
  useEffect( ()=>{
    inputRef.current.focus(); // focus on input
    inputRef.current.onblur = () => {
        setTimeout(()=>{
        if (inputRef.current !== null) {
          inputRef.current.focus()
        }
      },1000)
    }
  }, []) 

  // Functions to determine behavior once the prompt starts
  const clearPrompt = () => { actions.updateModuleState({prompt:{n1:null, n2:null}}) }
  const updatePromptCallback = ({n1,n2}) => { dispatch(actions.updateModuleState({prompt:{n1,n2}})) }
  const startPrompt = () => {
    clearPrompt();
    dispatch( actions.ws.emit('fetch_prompt',{sessionId},updatePromptCallback) )
  }
  useEffect(startPrompt, [])

  // Function to determine behavior once an answer is submitted
  const submitAnswer = () => {
    if (inputValue!=='') {
      const payload = { 
        answer : inputValue,
        elapsedTime : timerRef.current.getElapsedTime(),
        prompt: prompt,
        sessionId: sessionId
      }
      const submitAnserCallback = (newState)=>{
        console.log('submit answer callback: ', newState)
        dispatch(actions.updateModuleState({displayedTabId:'review-answer',review:newState}))
      }
      console.log(payload)
      dispatch(
        actions.ws.emit('send_answer',payload, submitAnserCallback)
      )
    }
  }

  // Function to pause game
  const pauseGame = () => {dispatch(actions.updateModuleState({displayedTabId:'pause-menu'}))}


  // hotkey encodings
  const hotkeys = useMemo(() => [
    hotKeyGen('enter','Submit Answer',submitAnswer),
    hotKeyGen('right','Submit Answer',submitAnswer),
    hotKeyGen('space','Pause Game',pauseGame),
    hotKeyGen('esc','Pause Game',pauseGame),
    ], [inputValue] );
  const { handleKeyDown, handleKeyUp } = useHotkeys(hotkeys);

  // The actual component
  return (
    <PromptCard title={'Estimate'} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} timer={<Timer ref={timerRef}/>}>
      <div className={`bp3-text-large ${styles.message}`}>Estimate the product as quickly as possible</div>
      <div style={{height:'20px'}}></div>
      <div className={styles.hflex_container}>
        <div className={`bp3-text-large ${styles.prompt}`}>{prompt.n1} x {prompt.n2} = </div>
        <NumericInput
          inputRef={inputRef}
          large={true}
          buttonPosition="none"
          allowNumericCharactersOnly={true}
          value={inputValue}
          onValueChange={(v1,valueAsString) => {setInputValue(valueAsString) }}
        />  
        <Button text='Submit' onClick={submitAnswer}/>
      </div>
      {/* <Button text='Fetch Question' onClick={startPrompt}/> */}
    </PromptCard>
  )
}