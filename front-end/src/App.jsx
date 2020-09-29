import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Register from './components/register/Register';
import Profile from './components/profile/Profile';

const App = () => (
  <Switch>
    <Route path="/login" component={ () => <div>Login Page</div> } />
    <Route path="/register" component={ Register } />
    <Route path="/products" component={ () => <div>Products Page</div> } />
    <Route path="/admin/orders" component={ () => <div>Admin Orders Page</div> } />
    <Route path="/orders" component={ () => <div>Orders Page</div> } />
    <Route path="/profile" component={ Profile } />
    <Route exact path="/" component={ () => <div>Login Page</div> } />
  </Switch>
);

export default App;
