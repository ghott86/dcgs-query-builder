import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route } from 'react-router';

import App from './components/App';
import QueryBuilder from './components/QueryBuilder';
import Profile from './components/Profile';
import Login from './components/Login';
import AuthStore from './stores/AuthStore.js';

window.React = React;

function requireAuth(nextState, replace) {
  if (!AuthStore.isLoggedIn()) {
    window.location = '#/login';
  }
}

window.apiRootUrl = 'http://localhost:3111';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} onEnter={requireAuth}>
      <Route path="/querybuilder" component={QueryBuilder}/>
      <Route path="/profile" component={Profile}/>
    </Route>
    <Route path="/login" component={Login}/>
  </Router>
  , document.getElementById('content')
);