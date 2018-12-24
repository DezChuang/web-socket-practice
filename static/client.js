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

var socket = io()
$('form').submit(function() {
  socket.emit('chat message', `${$('#nickname').val()}: ${$('#m').val()}`)
  $('#m').val('')
  return false
})

const nickname = `${nicknameArr[Math.floor(12 * Math.random())]}`
// $('#messages').append($('<li>').text(`${nickname}前來報到！`))
$('#nickname').val(nickname)
socket.emit('enter', `${nickname}前來報到！`)
window.scrollTo(0, document.body.scrollHeight)

socket.on('chat message', function(msg) {
  $('#messages').append($('<li>').text(`${msg}`))
  window.scrollTo(0, document.body.scrollHeight)
})

$('#leave').on('click', function() {
  socket.emit('leave', $('#nickname').val())
  socket.close()
  $('#messages').append($('<li>').text(`${nickname}已成功離線！`))
})

socket.on('leave', function(nickname) {
  $('#messages').append($('<li>').text(`${nickname}已隨風飄逝！`))
  window.scrollTo(0, document.body.scrollHeight)
})
