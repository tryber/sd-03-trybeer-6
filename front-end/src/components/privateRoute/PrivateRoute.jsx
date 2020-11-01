import PropTypes from 'prop-types';
import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

export default function PrivateRoute({ path, component, children }) {
  const isLogged = !!localStorage.getItem('token');
  return isLogged ? (
    <div>
      <Route path={ path } component={ component }>
        {children}
      </Route>
    </div>
  ) : (
    <Redirect to="/login" />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.string.isRequired,
  component: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
