import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Login from './components/login/Login';
import Register from './components/register/Register';

const App = () => (
  <Switch>
    <Route path="/login" component={ Login } />
    <Route path="/register" component={ Register } />
    <Route path="/products" component={ () => <div>Products Page</div> } />
    <Route path="/admin/orders" component={ () => <div>Admin Orders Page</div> } />
    <Route path="/orders" component={ () => <div>Orders Page</div> } />
    <Route path="/profile" component={ () => <div>Profile Page</div> } />
    <Route exact path="/" component={ Login } />
  </Switch>
);

export default App;
