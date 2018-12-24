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
socket.emit('join', {
  username: nickname
})

// 送出聊天訊息
$('form').submit(function() {
  socket.emit('chat message', `${$('#nickname').val()}: ${$('#m').val()}`)
  $('#m').val('')
  return false
})

// 點擊連線按鈕
$('#enter').on('click', function() {
  socket.open()
  $('#nickname').val(nickname)
  socket.emit('join', {
    username: nickname
  })
  $('#messages').append($('<li>').text(`你已成功連線！`))
})

// 點擊離線按鈕
$('#leave').on('click', function() {
  socket.close()
  $('#messages').append($('<li>').text(`你已成功離線！`))
})

// 監聽連線訊息
socket.on('broadcast_join', function(data) {
  $('#user_count').text(`在線人數：${data.userCount} 人`)
  $('#messages').append($('<li>').text(`${data.username} 前來報到！`))
  window.scrollTo(0, document.body.scrollHeight)
})

// 監聽離線訊息
socket.on('broadcast_quit', function(data) {
  $('#user_count').text(`在線人數：${data.userCount} 人`)
  $('#messages').append($('<li>').text(`${data.username} 已隨風飄逝！`))
  window.scrollTo(0, document.body.scrollHeight)
})

// 監聽聊天訊息
socket.on('chat message', function(msg) {
  $('#messages').append($('<li>').text(`${msg}`))
  window.scrollTo(0, document.body.scrollHeight)
})
