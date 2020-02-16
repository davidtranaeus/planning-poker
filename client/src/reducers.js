import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { SELECT_CARD, END_TASK, RECEIVE_TASK,
  RECEIVE_RESULTS, GAME_VIEW, RESULTS_VIEW, 
  END_RESULTS, NO_TASKS} from './actions'

const values = ["0", "1/2", "1", "2", "3", "5", "8", "13"];
const defaultCards = values.map((v, id) => ({ id: id, value: v, selected: false }))

const task = (state = "None", action) => {
  switch (action.type) {
    case RECEIVE_TASK:
      return action.task
    case NO_TASKS:
      return false;
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
    case NO_TASKS:
    case RECEIVE_TASK:
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

const user = (state = { isFinished: false }, action) => {
  switch (action.type) {
    case END_TASK:
    case END_RESULTS:
      return { isFinished: action.isFinished }
    case NO_TASKS:
    case RECEIVE_TASK: // Todo, slå ihop RECEIVE_TASK och NO_TASKS till samma
    case RECEIVE_RESULTS:
      return { isFinished: false }
    default:
      return state
  }
}

const results = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_RESULTS:
      return action.results
    default:
      return state
  }
}

const view = (state = GAME_VIEW, action) => {
  switch (action.type) {
    case NO_TASKS:
    case RECEIVE_TASK:
      return GAME_VIEW
    case RECEIVE_RESULTS:
      return RESULTS_VIEW
    default:
      return state
  }
}

const combinedReducers = combineReducers({
  task,
  cards,
  user,
  results,
  view,
  form: formReducer
})

export default combinedReducers;