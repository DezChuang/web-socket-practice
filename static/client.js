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

// 使用者連上網址，廣播登入訊息
const nickname = `${nicknameArr[Math.floor(12 * Math.random())]}`
$('#nickname').val(nickname)
socket.emit('enter', `${nickname}前來報到！`)
window.scrollTo(0, document.body.scrollHeight)

// 送出聊天訊息
$('form').submit(function() {
  socket.emit('chat message', `${$('#nickname').val()}: ${$('#m').val()}`)
  $('#m').val('')
  return false
})

// 監聽聊天訊息
socket.on('chat message', function(msg) {
  $('#messages').append($('<li>').text(`${msg}`))
  window.scrollTo(0, document.body.scrollHeight)
})

// 點擊離線按鈕
$('#leave').on('click', function() {
  socket.emit('leave', $('#nickname').val())
  socket.close()
  $('#messages').append($('<li>').text(`${nickname}已成功離線！`))
})

// 監聽離線訊息
socket.on('leave', function(nickname) {
  $('#messages').append($('<li>').text(`${nickname}已隨風飄逝！`))
  window.scrollTo(0, document.body.scrollHeight)
})
