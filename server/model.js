const STATE_TASK = "STATE_TASK";
const STATE_RESULTS = "STATE_RESULTS"

const model = {
  task: `Task: ${Math.random().toString(36).substring(7)}`,
  users: [],
  results: [],
  gameState: STATE_TASK,
}

const roomIsEmpty = () => {
  return model.users.length === 0;
}

const getGameState = () => {
  return model.gameState;
}

const setNextTask = () => {
  model.task = `Task: ${Math.random().toString(36).substring(7)}`
  model.gameState = STATE_TASK;
}

const getTask = () => {
  return model.task;
}

const addUser = id => {
  model.users = [
    ...model.users,
    {
      id: id,
      name: `User ${Math.floor(Math.random() * 1000)}`,
      isFinished: false,
      selectedCard: "None",
      finishedResults: false,
    }
  ]
}

const userFinishedTask = (id, isFinished, selectedCard) => {
  model.users = model.users.map(user => {
    if (user.id === id) {
      return {
        ...user,
        isFinished: isFinished,
        selectedCard: selectedCard
      }
    } else return user
  })
}

const setResults = () => {
  model.results = model.users.map(user => {
    return {
      name: user.name,
      selectedCard: user.selectedCard
    }
  })

  model.gameState = STATE_RESULTS;
}

const getResults = () => {
  return model.results;
}

const resetUsers = () => {
  model.users = model.users.map(user => {
    return {
      ...user,
      isFinished: false,
      selectedCard: "None"
    }
  })
}

const endUserResults = (id, isFinished) => {
  model.users = model.users.map(user => {
    if (user.id === id) {
      return {
        ...user,
        finishedResults: isFinished
      } 
    } else return user
  })
}

const resetResultsUsers = () => {
  model.users = model.users.map(user => {
    return {
      ...user,
      finishedResults: false,
    }
  })
}

const allUsersFinishedTask = () => {
  return model.users.every(user => user.isFinished)
}

const allUsersFinishedResults = () => {
  return model.users.every(u => u.finishedResults)
}

const removeUser = id => {
  model.users = model.users.filter(user => user.id !== id)
}

module.exports = {
  roomIsEmpty,
  getGameState,
  addUser,
  userFinishedTask,
  setResults,
  getResults,
  resetUsers,
  endUserResults,
  resetResultsUsers,
  setNextTask,
  getTask,
  allUsersFinishedTask,
  allUsersFinishedResults,
  removeUser
}