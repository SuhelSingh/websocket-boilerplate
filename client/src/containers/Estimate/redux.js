import {ws_actions} from '../../services/socket/middleware'
import { AppToaster } from '../../services/Toaster';

// Action Types
// ------------
export const UPDATE_MODULE_STATE = 'ESTIMATE._UPDATE_STATE';


// Building Block Actions
// -------
const ws = ws_actions('estimate')
const updateModuleState = (newState) => ({type:UPDATE_MODULE_STATE,newState:newState})
export const toast = {
  success: (toast) => { AppToaster.show({message:toast,intent:'success'}); console.log(AppToaster)},
  failure: (toast) => { AppToaster.show({message:toast,intent:'danger'}); console.log(AppToaster)},
  message: (toast) => { AppToaster.show({message:toast,intent:'primary'}); console.log(AppToaster)},
}
export const actions = {
  ws,
  updateModuleState,
  toast,
}

export const hotKeyGen = (combo, label=null, action=null) => {
  let _label = (label==null) ? combo : label
  let _action = (action==null) ? () => {console.log(`hotkey: ${label}`)} : action 
  return {
    combo:combo, global: true, allowInInput:true, label:_label, onKeyDown:_action, 
  }
}

// export const setPrompt = (prompt) => {}
// Starting a session
    // Enter username
    // Tag session (practice, test, other)
    // Start game

// Loading screen (3...2...1... countdown)
    // Fetch question
    // Load prompt

// Answering a question 
    // Numeric inputs
    // Submit answer
    // Pause game

// Reviewing an answer
    // Fetch accuracy
    // Go to next question
    // Pause game

// Pause menu
    // Resume 
        // Go to "Answer question"
        // Go to "Review answer"
    // Start new session


// FETCH_NEW_QUESTION
// START_TIMER
// PAUSE_TIMER
// END_TIMER
// SUBMIT_ANSWER
// DISPLAY_ANSWER


//// REDUCER
const initialState = {
    messageText: 'Waiting for prompt to load',
    review: null,
    inputValue: '...',
    prompt: { text:'', n1:null, n2:null},
    displayedTabId: 'start-session',
    sessionId: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MODULE_STATE:
      return { ...state, ...action.newState };
    default:
      return state;
  }
};
export default reducer



  

