import React from 'react';
// import { waitFor } from '@testing-library/dom';
// import { cleanup, act } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../../utils';
import Profile from './Profile';

// beforeEach(() => cleanup());

const component = <Profile />;
const route = '/profile';

describe('Verifica renderização e componentes', () => {
  it('Verifica que o componente tem a rota correta', () => {
    const { history } = renderWithRouter(component, { route });

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });
});
