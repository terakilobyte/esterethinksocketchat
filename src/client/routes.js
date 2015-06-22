import App from './app/app.react';
import Examples from './pages/examples.react';
import Home from './pages/home.react';
import Login from './pages/login.react';
import Me from './pages/me.react';
import NotFound from './pages/notfound.react';
import React from 'react';
import Chat from './pages/chat.react';
import {DefaultRoute, NotFoundRoute, Route} from 'react-router';

export default (
  <Route handler={App} path="/">
    <DefaultRoute handler={Chat} name="chat" />
    <NotFoundRoute handler={NotFound} name="not-found" />
    <Route handler={Examples} name="examples" />
    <Route handler={Login} name="login" />
    <Route handler={Me} name="me" />
    <Route handler={Home} name="home" />
  </Route>
);
