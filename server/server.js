const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = 3001;
const app = express();
const server = http.createServer(app);

const io = socketIO(server);

const generateTask = () => {
  return `Task: ${Math.random().toString(36).substring(7)}`
}

const model = {
  users: [],
  results: []
}

const addUser = (users, id) => {
  return [
    ...users,
    {
      id: id,
      name: `User ${Math.floor(Math.random() * 1000)}`,
      isFinished: false,
      selectedCard: "None",
      finishedResults: false,
    }
  ]
}

const endUserRound = (users, id, data) => {
  return users.map(user => {
    if (user.id === id) {
      return {
        ...user,
        isFinished: data.isFinished,
        selectedCard: data.selectedCard
      }
    } else return user
  })
}

const setResults = users => {
  return users.map(user => {
    return {
      name: user.name,
      selectedCard: user.selectedCard
    }
  })
}

const resetUsers = users => {
  return users.map(user => {
    return {
      ...user,
      isFinished: false,
      selectedCard: "None"
    }
  })
}

const endUserResults = (users, id, data) => {
  return users.map(user => {
    if (user.id === id) {
      return {
        ...user,
        finishedResults: data.isFinished
      } 
    } else return user
  })
}

const resetResultsUsers = users => {
  return users.map(user => {
    return {
      ...user,
      finishedResults: false,
    }
  })
}

io.on('connection', socket => {
  model.users = addUser(model.users, socket.id);
  
  socket.on('end task', data => {
    model.users = endUserRound(model.users, socket.id, data)

    if (model.users.every(u => u.isFinished)) {
      model.results = setResults(model.users)
      model.users = resetUsers(model.users)
      io.emit('results', model.results)
    }
  })

  socket.on('end results', data => {
    model.users = endUserResults(model.users, socket.id, data)

    if (model.users.every(u => u.finishedResults)) {
      model.users = resetResultsUsers(model.users)
      io.emit('new task', generateTask());
    }
  })

  socket.on('disconnect', () => {
    model.users = model.users.filter(u => u.id !== socket.id)
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))