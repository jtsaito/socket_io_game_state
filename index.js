var world = { "p1": { x: 200, y: 200}, "p2": { x: 200, y: 400} };

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// App and sockets
app.get('/', function(req, res){
    res.sendfile('index.html');
});

io.on('connection', function(socket){
  socket.on('action', function(action){
    if(action) {
      update(action);
      io.emit('world', world);
    }
  });

  socket.on('setPlayer', function(msg){
    io.emit('setPlayer', msg);
  });

  socket.on('speedTest', function(msg){
    io.emit('speedTest', { sent: msg.sent, on_server: new Date().getTime() } );
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});


// world
function update(action) {
  var actor = action.actor;
  var delta = action.action;

  switch(delta) {
    case 'up':    world[actor].y = world[actor].y - 10; break;
    case 'down':  world[actor].y = world[actor].y + 10; break;
    case 'left':  world[actor].x = world[actor].x - 10; break;
    case 'right': world[actor].x = world[actor].x + 10; break;
  }
}
