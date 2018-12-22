var socket = io()
$('form').submit(function() {
  socket.emit('chat message', `${$('#nickname').val()}: ${$('#m').val()}`)
  $('#m').val('')
  return false
})
socket.on('chat message', function(msg) {
  $('#messages').append($('<li>').text(`${msg}`))
  window.scrollTo(0, document.body.scrollHeight)
})
socket.on('enter', function(nickname) {
  $('#messages').append($('<li>').text(`${nickname}前來報到！`))
  $('#nickname').val(nickname)
  window.scrollTo(0, document.body.scrollHeight)
})
socket.on('leave', function() {
  const nickname = $('#nickname').val()
  $('#messages').append($('<li>').text(`${nickname}已隨風飄逝！`))
  window.scrollTo(0, document.body.scrollHeight)
})
