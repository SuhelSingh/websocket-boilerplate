import {ws_actions} from '../../services/socket/middleware'


// Action Types
// ------------
export const UPDATE_STATE = 'ESTIMATE.UPDATE_STATE';

export const UPDATE_PROMPT = "ESTIMATE.UPDATE_PROMPT";
export const UPDATE_MESSAGE = "ESTIMATE.UPDATE_MESSAGE";
export const UPDATE_INPUT = "ESTIMATE.UPDATE_INPUT";
export const UPDATE_PROMPT_STATUS = "ESTIMATE.UPDATE_PROMPT_STATUS";
export const UPDATE_MODE = "ESTIMATE.CHANGE_MODE";
export const UPDATE_TIMER = "ESTIMATE.UPDATE_TIMER";
export const START_TIMER = "ESTIMATE.START_TIMER"

// Actions
// -------
export const ws = ws_actions('estimate')

export const updateState = (newState) => ({type:''})
export const connectSocket = () => { ws.connect() }
export const startSession = (user,tag) => { ws.emit('estimate__start_session', {user, tag}) }
export const changeMode = (newMode) => ({ type:UPDATE_MODE, newMode }) // start, answer, review, pause, load

export const requestPrompt = () => { ws.emit('estimate__request_prompt',{}) }
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
    n1: 0,
    n2: 0,
    promptText: '...Loading',
    messageText: 'Waiting for prompt to load',
    inputValue: '...',
    promptStatus: 'normal',
    gameMode: 'paused'
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STATE:
      return { ...state, ...action.newState };
    case UPDATE_PROMPT:
      return { ...state, promptStatus: action.newValue };
    case UPDATE_MESSAGE:
      return { ...state, messageText: action.newValue };
    case UPDATE_INPUT:
      return { ...state, inputValue: action.newValue };
    case UPDATE_PROMPT_STATUS:
      return { ...state, promptStatus: action.newValue };
    case UPDATE_MODE:
      return { ...state, gameMode: action.newValue };
    default:
      return state;
  }
};
export default reducer



  

