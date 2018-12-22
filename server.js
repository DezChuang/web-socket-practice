var express = require('express')
const app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
const port = process.env.PORT || 8787

const nicknameArr = [
  '鳳山下智久',
  '哈爾濱崎步',
  '大坪林俊傑',
  '三芝田信長',
  '新竹林七賢',
  '虎尾田榮一郎',
  '武當山德勒',
  '水沙連勝文',
  '池上戶彩',
  '清水樹奈奈',
  '六張黎智英',
  '二十張無忌'
]

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})
app.use('/static', express.static(__dirname + '/static'))

io.on('connection', function(socket) {
  console.log('a user connected')
  const nickname = `${nicknameArr[Math.floor(12 * Math.random())]}`
  io.emit('enter', nickname)
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg)
  })
  socket.on('disconnect', function() {
    io.emit('leave')
  })
})

http.listen(port, function() {
  console.log('listening on *:' + port)
})
