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
    name: `User ${model.users.length + 1}`,
    finished: false,
  })
  
  socket.on('end round', () => {
    model.users = model.users.map(u => {
      if (u.id === socket.id) u.finished = true;
      return u
    })
    
    if (model.users.every(u => u.finished)) {
      model.users.map(u => {
        u.finished = false;
        return u
      })
      io.emit('new task', generateTask());
    }
  })

  socket.on('disconnect', () => {
    model.users = model.users.filter(u => u.id !== socket.id)
    console.log('User disconnected')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))