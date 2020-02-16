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

const hasSubmittedTasks = () => {
  return model.tasks.length !== 0;
}

const roomIsEmpty = () => {
  return model.users.length === 0;
}

const getGameState = () => {
  return model.gameState;
}

const getTask = () => {
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
  addTask,
  setNextTask,
  hasSubmittedTasks,
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