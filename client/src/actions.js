// Constants
export const GAME_VIEW = 'GAME_VIEW'
export const RESULTS_VIEW = 'RESULTS_VIEW'

// Actions
export const SELECT_CARD = 'SET_CARD'
export const END_TASK = 'END_TASK'
export const RECEIVE_TASK = 'RECEIVE_TASK'
export const RECEIVE_RESULTS = 'SHOW_RESULTS'
export const END_RESULTS = 'END_RESULTS'

// Action creators
export const selectCard = cardId => {
  return { type: SELECT_CARD, cardId } 
}

export const endTask = isFinished => {
  return { type: END_TASK, isFinished }
}

export const receiveTask = task => {
  return { type: RECEIVE_TASK, task }
}

export const receiveResults = results => {
  return { type: RECEIVE_RESULTS, results }
}

export const endResults = isFinished => {
  return { type: END_RESULTS, isFinished}
}