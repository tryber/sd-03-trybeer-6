import React from 'react';
// import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../../utils';
import Login from './index';

const route = '/login';
const component = <Login />;

describe('Validação do componente/rota Login', () => {
  test('Verifica se esta na pagina de login', () => {
    const { history } = renderWithRouter(component, { route });
    const mainRoute = history.location.pathname;

    expect(mainRoute).toBe('/login');
  });

  test('Verifica se o componente foi renderizado na tela', () => {
    const { getByText } = renderWithRouter(component, { route });

    expect(getByText('Login')).toBeInTheDocument();
  });

  test('Verifica se existe os inputs de email e senha', () => {
    const { getByTestId } = renderWithRouter(component, { route });

    expect(getByTestId('email-input')).toBeInTheDocument();
    expect(getByTestId('password-input')).toBeInTheDocument();
  });

  test('Verifica se existe um botao de entrar e se ele esta desabilitado', () => {
    const { getByTestId } = renderWithRouter(component, { route });

    expect(getByTestId('signin-btn')).toBeDisabled();
  });

  test('Verifica se o botao de criar uma conta leva pra rota register', () => {
    const { history, getByTestId } = renderWithRouter(component, { route });
    const newAccountBtn = getByTestId('no-account-btn');

    userEvent.click(newAccountBtn);

    const mainRoute = history.location.pathname;
    expect(mainRoute).toBe('/register');
  });

  test('Verifica se ao colocar email invalido o botao ENTRAR esta desabilitado', () => {
    const emailValue = 'test@t.com';
    const passwordValue = '1234567';

    const { getByTestId } = renderWithRouter(component, { route });
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');

    userEvent.type(emailInput, emailValue);
    userEvent.type(passwordInput, passwordValue);

    const loginBtn = getByTestId('signin-btn');

    expect(loginBtn).toBeDisabled();
  });

  test('Verifica se ao colocar senha invalida o botao ENTRAR esta desabilitado', () => {
    const emailValue = 'test@test.com';
    const passwordValue = '12345';

    const { getByTestId } = renderWithRouter(component, { route });
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');

    userEvent.type(emailInput, emailValue);
    userEvent.type(passwordInput, passwordValue);

    const loginBtn = getByTestId('signin-btn');

    expect(loginBtn).toBeDisabled();
  });

  test.todo('Verifica se ao colocar email valido ele redirecionado para rota Home');
  test.todo('Verifica se ao colocar email de adm valido ele redirecionado para rota Admin');
});
