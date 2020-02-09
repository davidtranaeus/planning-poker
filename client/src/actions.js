// Actions
export const SELECT_CARD = 'SET_CARD'
export const END_ROUND = 'END_ROUND'
export const NEW_TASK = 'NEW_TASK'

// Action creators
export const selectCard = (cardId) => {
  return { type: SELECT_CARD, cardId} 
}

export const endRound = () => {
  return { type: END_ROUND }
}

export const newTask = (task) => {
  return { type: NEW_TASK, task}
}