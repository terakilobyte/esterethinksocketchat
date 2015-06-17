import State from './lib/state';
import reviveAuth from './auth/revive';
import reviveTodos from './todos/revive';
import reviveUsers from './users/revive';
import reviveChat from './chat/revive';

const initialState = process.env.IS_BROWSER
  ? window._appState
  : require('../server/initialstate');

export const state = new State(initialState, function(key, value) {
  switch (key) {
    case 'auth': return reviveAuth(value);
    case 'todos': return reviveTodos(value);
    case 'users': return reviveUsers(value);
    case 'chat': return reviveChat(value);
  }
});

export const authCursor = state.cursor(['auth']);
export const i18nCursor = state.cursor(['i18n']);
export const pendingActionsCursor = state.cursor(['pendingActions']);
export const todosCursor = state.cursor(['todos']);
export const usersCursor = state.cursor(['users']);
export const chatCursor = state.cursor(['chat']);
