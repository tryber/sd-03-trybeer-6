import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Login, Products } from './pages';
import Register from './components/register/Register';
import Profile from './components/profile/Profile';
import Topbar from './components/topbar/Topbar';

import store from './store';

import './App.css';

const App = () => (
  <Provider store={ store }>
    <Router>
      <Switch>
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/products" component={ Products } />
        <Route path="/admin/orders">
          <Topbar menuTitle="TryBeer" />
        </Route>
        <Route path="/orders" component={ () => <div>Orders Page</div> } />
        <Route path="/profile" component={ Profile } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </Router>
  </Provider>
);

export default App;
