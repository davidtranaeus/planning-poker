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
    if (model.hasTasks()) {
      io.to(socket.id).emit('new task', model.getCurrentTask());
    } else {
      io.to(socket.id).emit('no tasks')
    }
  } else {
    io.to(socket.id).emit('results', model.getFinalResults());
  }
  
  socket.on('end task', data => {
    model.userEndedTask(socket.id, data.isFinished, data.selectedCard)

    if (model.allUsersEndedTask()) {
      model.setFinalResults()
      model.resetUsers()
      io.emit('results', model.getFinalResults())
    }
  })

  socket.on('end results', data => {
    model.userEndedResults(socket.id, data.isFinished)

    if (model.allUsersEndedResults()) {
      model.resetUsers()
      model.setNextTask()
      if (model.hasTasks()) {
        io.emit('new task', model.getCurrentTask());
      } else {
        io.emit('no tasks');
      }
    }
  })

  socket.on('submit task', data => {
    console.log(data)
    if (model.getGameState() === 'STATE_TASK' && !model.hasTasks()) {
      model.addTask(data.task)
      io.emit('new task', model.getCurrentTask())
    } else {
      model.addTask(data.task)
    }
  })

  socket.on('disconnect', () => {
    model.removeUser(socket.id)

    // TODO städa upp
    if (model.hasUsers()) {
      if (model.getGameState() === 'STATE_TASK') {
        if (model.allUsersEndedTask()) {
          model.setFinalResults()
          model.resetUsers()
          io.emit('results', model.getFinalResults())
        }
      } else {
        if (model.allUsersEndedResults()) {
          model.resetUsers()
          model.setNextTask()
          io.emit('new task', model.getCurrentTask());
        }
      }
    }
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))