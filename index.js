var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendfile('index.html');
});

io.on('connection', function(socket){
  socket.on('action', function(msg){
    io.emit('world', msg);
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
