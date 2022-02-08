import React, {useEffect, useState, useImperativeHandle} from "react";

export const Timer = React.forwardRef( (props,ref) => {
  const [elapsedTime, setElapsedTime] = useState(0.0)
  const [isPaused, setIsPaused] = useState( (props.startsPaused*1) )

  useEffect(
    () => {
      const interval = setInterval(() => {
          if (!isPaused) {
            setElapsedTime(elapsedTime => elapsedTime + (1)    );
          }
        }, 1000);
      return () => clearInterval(interval);
    }
    , [isPaused]
  )

  useImperativeHandle(ref, () => ({
      pauseTimer : () => {setIsPaused(1)},
      startTimer : () => {setIsPaused(0)},
      resetTimer : () => {setElapsedTime(0.0)},
      getElapsedTime : () => (elapsedTime)
    })
  )

  return (
    <div style={{minWidth:'100%', margin:'0px', padding: '0px', flexGrow:1,
        display:'flex', flexDirection:'row', justifyContent:'flex-end',alignItems:'flex-end'}}>
      <p style={{margin:'0px'}}>{parseInt(elapsedTime)}</p>
    </div>
  )
})

export const CountdownTimer = React.forwardRef( (props,ref) => {

  // props.startSeconds
  // props.onCountdown

  const [elapsedTime, setElapsedTime] = useState(props.startSeconds)
  const [isPaused, setIsPaused] = useState( (props.startsPaused * 1) )

  useEffect(
    () => {
      const interval = setInterval(() => {
          if (!isPaused) {
              setElapsedTime(elapsedTime => elapsedTime - (1)    );
          }
        }, 1000);
      return () => clearInterval(interval);
    }
    , [isPaused]
  )

  useEffect(
    () => {
      console.log(elapsedTime)
      if (elapsedTime <= 0) {
        setIsPaused(1);
        setElapsedTime(0);
        props.onCountdown()
      }
    }
    , [elapsedTime]
  )

  useImperativeHandle(ref, () => ({
      pauseTimer : () => {setIsPaused(1)},
      startTimer : () => {setIsPaused(0)},
      resetTimer : () => {setElapsedTime(0.0)},
      getElapsedTime : () => (elapsedTime)
    })
  )

  return (
    <div style={{minWidth:'100%', margin:'0px', padding: '0px', flexGrow:1,
        display:'flex', flexDirection:'row', justifyContent:'flex-end',alignItems:'flex-end'}}>
      <p style={{margin:'0px'}}>{parseInt(elapsedTime)}</p>
    </div>
  )
})


