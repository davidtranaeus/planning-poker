const STATE_TASK = "STATE_TASK";
const STATE_RESULTS = "STATE_RESULTS"

const model = {
  tasks: [],
  users: [],
  results: [],
  gameState: STATE_TASK,
}

const addTask = task => {
  model.tasks = [...model.tasks, task]
}

const setNextTask = () => {
  model.tasks = [...model.tasks.slice(1)];
  model.gameState = STATE_TASK;
}

const hasTasks = () => {
  return model.tasks.length !== 0;
}

const hasUsers = () => {
  return model.users.length !== 0;
}

const getGameState = () => {
  return model.gameState;
}

const getCurrentTask = () => {
  return model.tasks[0];
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

const userEndedTask = (id, isFinished, selectedCard) => {
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

const setFinalResults = () => {
  model.results = model.users.map(user => {
    return {
      name: user.name,
      selectedCard: user.selectedCard
    }
  })

  model.gameState = STATE_RESULTS;
}

const getFinalResults = () => {
  return model.results;
}

const resetUsers = () => {
  model.users = model.users.map(user => {
    return {
      ...user,
      isFinished: false,
      selectedCard: "None",
      finishedResults: false,
    }
  })
}

const userEndedResults = (id, isFinished) => {
  model.users = model.users.map(user => {
    if (user.id === id) {
      return {
        ...user,
        finishedResults: isFinished
      } 
    } else return user
  })
}

const allUsersEndedTask = () => {
  return model.users.every(user => user.isFinished)
}

const allUsersEndedResults = () => {
  return model.users.every(u => u.finishedResults)
}

const removeUser = id => {
  model.users = model.users.filter(user => user.id !== id)
}

module.exports = {
  addTask,
  setNextTask,
  hasTasks,
  hasUsers,
  getGameState,
  addUser,
  userEndedTask,
  setFinalResults,
  getFinalResults,
  resetUsers,
  userEndedResults,
  setNextTask,
  getCurrentTask,
  allUsersEndedTask,
  allUsersEndedResults,
  removeUser
}