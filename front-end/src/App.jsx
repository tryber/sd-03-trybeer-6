import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Login, Products, AdminProfile } from './pages';
import AdminSideBar from './components/adminSideBar/adminSideBar';
import Register from './components/register/Register';
import Profile from './components/profile/Profile';
import Checkout from './components/checkout/Checkout';
import store from './store';
import SaleDetails from './pages/SaleDetails';
import Sales from './pages/Sales';
import PrivateRoute from './components/privateRoute/PrivateRoute';

const App = () => (
  <Provider store={ store }>
    <Router>
      <Switch>
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/products" component={ Products } />
        <Route path="/checkout" component={ Checkout } />
        <Route path="/profile" component={ Profile } />
        <PrivateRoute path="/orders/:id">
          <SaleDetails />
        </PrivateRoute>
        <Route path="/orders" component={ Sales } />
        <Route path="/admin/orders">
          <AdminSideBar menuTitle="TryBeer" />
        </Route>
        <Route path="/admin/profile" component={ AdminProfile } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </Router>
  </Provider>
);

export default App;
