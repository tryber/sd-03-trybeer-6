import React from 'react';
import { waitFor } from '@testing-library/dom';
import { cleanup, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../../utils';
import Topbar from './Topbar';

const pageTitle = 'TryBeer';
const component = <Topbar menuTitle={ pageTitle } />;
const linkElements = [
  'side-menu-item-products',
  'side-menu-item-my-orders',
  'side-menu-item-my-profile',
  'side-menu-item-logout',
];
const routes = ['/products', '/orders', '/profile', '/login'];

afterEach(cleanup);

describe('Verifica se o componente Topbar é renderizado', () => {
  it('O componente deve ter o título TryBeer', () => {
    const { getByTestId } = renderWithRouter(component);

    expect(getByTestId('top-title')).toBeInTheDocument();
  });

  it('Verifica se existe uma lista com links ao abrir o menu', () => {
    const { getByTestId } = renderWithRouter(component);
    const MenuHamburguer = getByTestId('top-hamburguer');

    userEvent.click(MenuHamburguer);

    linkElements.forEach((link) => expect(getByTestId(link)).toBeInTheDocument());
  });
});

describe('Testa se ao clicar no link é redirecionado para', () => {
  it('Verifica se ao clicar no elemento link é redirecionado', async () => {
    const { getByTestId, history } = renderWithRouter(component);
    const MenuHamburguer = getByTestId('top-hamburguer');

    userEvent.click(MenuHamburguer);

    await act(async () => {
      userEvent.click(getByTestId(linkElements[0]));
      await waitFor(() => expect(history.location.pathname).toBe(routes[0]));
    });
    await act(async () => {
      userEvent.click(getByTestId(linkElements[1]));
      await waitFor(() => expect(history.location.pathname).toBe(routes[1]));
    });
    await act(async () => {
      userEvent.click(getByTestId(linkElements[2]));
      await waitFor(() => expect(history.location.pathname).toBe(routes[2]));
    });
    await act(async () => {
      userEvent.click(getByTestId(linkElements[3]));
      await waitFor(() => expect(history.location.pathname).toBe(routes[3]));
    });
  });
});
