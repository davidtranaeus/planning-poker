import { SELECT_CARD, END_ROUND, NEW_TASK } from './actions'
import { combineReducers } from 'redux';

const values = ["0", "1/2", "1", "2", "3", "5", "8", "13"];
const defaultCards = values.map((v, id) => ({ id: id, value: v, selected: false }))

const task = (state = "None", action) => {
  switch (action.type) {
    case NEW_TASK:
      return action.payload
    default:
      return state;
  }
}

const cards = (state = defaultCards, action) => {
  switch (action.type) {
    case SELECT_CARD:
      return state.map(c => {
        return {
          ...c,
          selected: c.id === action.cardId ? !c.selected : false,
        }
      })
    case NEW_TASK:
      return state.map(c => {
        return {
          ...c,
          selected: false,
        }
      })
    default:
      return state
  }
}

const isFinished = (state = false, action) => {
  switch (action.type) {
    case NEW_TASK:
      return false
    case END_ROUND:
      return action.isFinished
    default:
      return state
  }
}

const combinedReducers = combineReducers({
  task,
  cards,
  isFinished,
})

export default combinedReducers;