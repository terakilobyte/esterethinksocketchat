import Promise from 'bluebird';
import setToString from '../lib/settostring';
import {
  ValidationError
}
from '../lib/validation';
import {
  dispatch
}
from '../dispatcher';
import {
  validate
}
from '../validation';
let socket = null;

if (typeof io !== 'undefined') {
  console.log('io is defined');
  socket = io();
  /**
   * Got a message
   */
  socket.on('chat message', (data) => {
    gotMessage(data);
  });

}


export function gotMessage(data) {
  dispatch(gotMessage, data);
}

export function sentMessage(data) {
  socket.emit('chat message', data);
}


setToString('chat', {
  gotMessage,
  sentMessage
});
