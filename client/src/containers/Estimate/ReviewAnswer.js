import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner, useHotkeys } from "@blueprintjs/core";
import { CountdownTimer } from './Timer'
import PromptCard from './PromptCard'
import { actions, hotKeyGen } from "./redux";



export default props => {
    
  const dispatch = useDispatch()
  let review = useSelector(state => state.estimate.review)

  const defaultReviewState = {
    correctAnswer: null //4634
    , providedAnswer: null //2349
    , pctError: null //34.234234
    , score: null //30
  }
  
  if (review == null) {
    review = defaultReviewState
  }

  // Clean up the review data once the screen is removed
  const clearReview = () => {
    actions.updateModuleState({'review':defaultReviewState})
  }
  useEffect(
    () => {
      return clearReview
    }, []
  )

  const nextQuestion = () => {dispatch(actions.updateModuleState({displayedTabId:'answer-prompt'}))}
  const pauseGame = () => {dispatch(actions.updateModuleState({displayedTabId:'pause-menu'}))}

  // hotkey encodings
  const hotkeys = useMemo(() => [
    hotKeyGen('enter','Submit Answer',nextQuestion),
    hotKeyGen('right','Submit Answer',nextQuestion),
    hotKeyGen('space','Pause Game',pauseGame),
    hotKeyGen('space','Pause Game',pauseGame),
    ], [] );
  const { handleKeyDown, handleKeyUp } = useHotkeys(hotkeys);


  let innerDiv = null 
  const divStyle = {display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start', padding:'2.5px'}
  // const textStyle = {fontWeight:'bold', margin:'0px'}

  const labelGenerator = (k,v) => (
    <div style={divStyle}>
      <label>{k}</label>
      <div style={{marginRight:'10px'}}/>
      <label className="bp3-input">{v}</label>
    </div>
  )

  if ( (review !== null) && ('pctError' in review) ) {
    innerDiv = (
      <div 
        style={{flexGrow:1,display:'flex', flexDirection:'row', justifyContent:'flex-start', alignSelf:'stretch', alignItems:'center' }}
        onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}
      >
        <div >
          {labelGenerator('Provided Answer', review.providedAnswer) }
          {labelGenerator('Correct Answer', review.correctAnswer) }
          {labelGenerator('% Error', review.pctError) }
          {labelGenerator('Score', review.score) }
        </div>
      </div>
    )
  } else {
    innerDiv = <Spinner />
  }
    
    return (
      <PromptCard title={'Estimate'} timer={<CountdownTimer startSeconds={2} onCountdown={nextQuestion}/>}>
        {innerDiv}
      </PromptCard>
    )
  }
