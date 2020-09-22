import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Login from './components/login/Login';
import Register from './components/register/Register';

const App = () => (
  <Switch>
    <Route path="/login" component={ Login } />
    <Route path="/register" component={ Register } />
  </Switch>
);

export default App;
