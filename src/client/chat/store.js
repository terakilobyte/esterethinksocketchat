import * as actions from './actions';
import {chatCursor} from '../state';
import {register} from '../dispatcher';

export const dispatchToken = register(({action, data}) => {

  switch (action) {
    case actions.sentMessage:
    case actions.gotMessage:
      chatCursor(chats => {
        return chats.update('messages', (messages) => {
          return messages.push(data);
        })
      });
      break;

  }

});
