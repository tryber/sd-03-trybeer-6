import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages';
import store from './store';

import './App.css';

const App = () => (
  <Provider store={ store }>
    <Router>
      <Switch>
        <Route exact path="/login" component={ Login } />
      </Switch>
    </Router>
  </Provider>
);

export default App;
