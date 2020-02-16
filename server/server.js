const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = 3001;
const app = express();
const server = http.createServer(app);

const io = socketIO(server);

const model = require('./model')

io.on('connection', socket => {
  model.addUser(socket.id);

  if (model.getGameState() === 'STATE_TASK') {
    if (model.hasSubmittedTasks()) {
      io.to(socket.id).emit('new task', model.getTask());
    } else {
      io.to(socket.id).emit('no tasks')
    }
  } else {
    io.to(socket.id).emit('results', model.getResults());
  }
  
  socket.on('end task', data => {
    model.userFinishedTask(socket.id, data.isFinished, data.selectedCard)

    if (model.allUsersFinishedTask()) {
      model.setResults()
      model.resetUsers()
      io.emit('results', model.getResults())
    }
  })

  socket.on('end results', data => {
    model.endUserResults(socket.id, data.isFinished)

    if (model.allUsersFinishedResults()) {
      model.resetResultsUsers()
      model.setNextTask()
      if (model.hasSubmittedTasks()) {
        io.emit('new task', model.getTask());
      } else {
        io.emit('no tasks');
      }
    }
  })

  socket.on('submit task', data => {
    console.log(data)
    if (model.getGameState() === 'STATE_TASK' && !model.hasSubmittedTasks()) {
      model.addTask(data.task)
      io.emit('new task', model.getTask())
    } else {
      model.addTask(data.task)
    }
  })

  socket.on('disconnect', () => {
    model.removeUser(socket.id)

    // TODO städa upp
    if (!model.roomIsEmpty()) {
      if (model.getGameState() === 'STATE_TASK') {
        if (model.allUsersFinishedTask()) {
          model.setResults()
          model.resetUsers()
          io.emit('results', model.getResults())
        }
      } else {
        if (model.allUsersFinishedResults()) {
          model.resetResultsUsers()
          model.setNextTask()
          io.emit('new task', model.getTask());
        }
      }
    }
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))