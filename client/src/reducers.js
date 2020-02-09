import { SELECT_CARD, END_ROUND, NEW_TASK } from './actions'
import { combineReducers } from 'redux';

const values = ["0", "1/2", "1", "2", "3", "5", "8", "13"];
const defaultCards = values.map((v, id) => ({ id: id, value: v, selected: false }))

const task = (state = { text: "None", finished: false }, action) => {
  switch (action.type) {
    case NEW_TASK:
      return {
        text: action.payload,
        finished: false
      }
    case END_ROUND:
      return {
        ...state,
        finished: true,
      }
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

const combinedReducers = combineReducers({
  task,
  cards
})

export default combinedReducers;