import config from './config';
import express from 'express';
import {
  Server
}
from 'http';
import io from 'socket.io';
import r from 'rethinkdb';
import rethink from './rethink/rethink';



const app = express();
const server = Server(app);
const sockets = io(server);


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

r.connect({
  host: 'localhost',
  port: 28015,
  db: config.database
}, (err, conn) => {
  if (err) {
    console.log('Error connecting to rethink! ', err);
    process.exit(0);
  }
  rethink.init(conn, sockets);
  rethink.subscribe('messages');

  sockets.on('connection', (socket) => {
    console.log('user connected');
    socket.on('chat message', (data) => {
      rethink.insert(data, 'messages');
    });
  });

  server.listen(config.port, () => {
    console.log('Server started at port %s', config.port);
  });
})
