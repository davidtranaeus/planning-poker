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

const isInTaskState = () => {
  return model.gameState === STATE_TASK;
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

const updateUser = (id, update) => {
  model.users = model.users.map(user => {
    if (user.id === id) {
      return {
        ...user,
        ...update
      } 
    } else return user
  })
}

const allUsersFinished = () => {
  return model.users.every(user => user.isFinished)
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
      selectedCard: "None"
    }
  })
}

const removeUser = id => {
  model.users = model.users.filter(user => user.id !== id)
}

module.exports = {
  updateUser,
  allUsersFinished,
  addTask,
  setNextTask,
  hasTasks,
  hasUsers,
  isInTaskState,
  addUser,
  setFinalResults,
  getFinalResults,
  resetUsers,
  setNextTask,
  getCurrentTask,
  removeUser
}