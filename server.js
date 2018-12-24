var express = require('express')
const app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
const port = process.env.PORT || 8787

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})
app.use('/static', express.static(__dirname + '/static'))

let connectionList = []

io.on('connection', function(socket) {
  const socketId = socket.id
  connectionList[socketId] = {
    socket: socket
  }
  socket.on('join', function(data) {
    io.emit('broadcast_join', data)
    connectionList[socketId].username = data.username
  })
  socket.on('disconnect', function() {
    if (connectionList[socketId].username) {
      io.emit('broadcast_quit', {
        username: connectionList[socketId].username
      })
    }
    delete connectionList[socketId]
  })

  socket.on('chat message', function(msg) {
    io.emit('chat message', msg)
  })
})

http.listen(port, function() {
  console.log('listening on *:' + port)
})
