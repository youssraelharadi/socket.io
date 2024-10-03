const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use('/ping', express.static(__dirname + '/ping/public'));
app.use('/pong', express.static(__dirname + '/pong/public'));

io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté');

  socket.on('pingMessage', (message) => {
    console.log('Message reçu de Ping:', message);
    io.emit('pongNotification', 'Ping a envoyé : ' + message);
  });

  socket.on('disconnect', () => {
    console.log('Un utilisateur est déconnecté');
  });
});

server.listen(3000, () => {
  console.log('Le serveur fonctionne sur le port 3000');
});
