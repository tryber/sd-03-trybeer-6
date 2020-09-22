import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Login from './components/login/Login';

const App = () => {
  return (
    <Switch>
      <Route exact path="/login" component={ Login } />
    </Switch>
  )
}

export default App;
