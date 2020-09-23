import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

export default function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  const Wrapper = ({ children }) => (
    <Router history={ history }>{children}</Router>
  );

  Wrapper.propTypes = {
    children: PropTypes.element.isRequired,
  };

  return {
    ...render(ui, { wrapper: Wrapper }),
    history,
  };
}
