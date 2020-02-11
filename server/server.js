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
  task: "None"
}

io.on('connection', socket => {
  console.log('User connected')

  model.users.push({
    id: socket.id,
    name: `User ${Math.floor(Math.random() * 1000)}`,
    isFinished: false,
    selectedCard: "None"
  })
  
  socket.on('end round', data => {
    model.users = model.users.map(u => {
      if (u.id === socket.id) {
        u.isFinished = data.isFinished;
        u.selectedCard = data.selectedCard;
      }
      return u
    })

    console.log(model.users)

    if (model.users.every(u => u.isFinished)) {

      model.users = model.users.map(u => {
        return {
          ...u,
          isFinished: false,
          selectedCard: "None"
        }
      })

      io.emit('new task', generateTask());
    }
  })

  socket.on('new round', data => {
    

  })

  socket.on('disconnect', () => {
    model.users = model.users.filter(u => u.id !== socket.id)
    console.log('User disconnected')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))