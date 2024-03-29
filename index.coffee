world = { "p1": { x: 200, y: 200}, "p2": { x: 200, y: 400} }

app  = require('express')()
http = require('http').Server(app)
io   = require('socket.io')(http)

# App and sockets
app.get '/', (req, res) ->
  res.sendfile('index.html')

io.on 'connection', (socket) ->

  socket.on 'action', (action) ->
    if(action)
      update(action);
      io.emit('world', world)

  socket.on 'setPlayer', (msg) ->
    io.emit('setPlayer', msg)

  socket.on 'speedTest', (msg) ->
    io.emit('speedTest', { sent: msg.sent, on_server: new Date().getTime() } )


http.listen 3000, ->
  console.log('listening on *:3000')


# world
update = (action) ->
  actor = action.actor

  switch action.action
    when 'up'    then world[actor].y = world[actor].y - 10
    when 'down'  then world[actor].y = world[actor].y + 10
    when 'left'  then world[actor].x = world[actor].x - 10
    when 'right' then world[actor].x = world[actor].x + 10


app.get '/jump.mp3', (req, res) ->
  res.sendfile('jump.mp3')
