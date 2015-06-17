import config from './config';
import express from 'express';
import {Server} from 'http';
import io from 'socket.io';

const app = express();
const server = Server(app);
const sockets = io(server);

import messages from './chats';

// Load API
app.use('/api/v1', require('./api'));

// Load react-js frontend.
app.use(require('./frontend'));

// Add error handler. Four arguments need to be defined in order for the
// middleware to act as an error handler.
app.use((err, req, res, next) => {
  const msg = err.stack || err;
  console.log('Yay', msg);
  res.status(500).send('500: ' + msg);
});

sockets.on('connection', (socket) => {
  console.log('user connected');
  socket.on('chat message', (data) => {
    console.log('chat message with data: ', data);
    messages.pushMessage(data);
    socket.broadcast.emit('chat message', data);
  })
});

server.listen(config.port, () => {
  console.log('Server started at port %s', config.port);
});
