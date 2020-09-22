import React from 'react';
import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../../utils';
import Register from './Register';

const route = '/register';
const component = <Register />;

afterEach(cleanup);

describe('Testa a rota do componente Register e confirma que foi renderizado', () => {
  test('deve renderizar o componente Register e confirmar a rota /register', () => {
    const { history } = renderWithRouter(component, { route });
    const myRoute = history.location.pathname;
    expect(myRoute).toBe('/register');
  });

  test('confirma que o componente foi renderizado com sucesso', () => {
    const { getByText } = renderWithRouter(component, { route });
    expect(getByText('Tela de cadastro de usuário')).toBeInTheDocument();
  });
});

describe('Testes de comportamento de validação do formulário, campo nome', () => {
  const invalidName = 'Willy';
  const specialChar = 'Willy Souza Catao !';
  const nameWithNumber = 'Willy 844 Souza Catao649';
  const validName = 'Willy de Souza Catao';

  test('verifica se ocorre erro ao escrever nome pequeno', async () => {
    const { getByLabelText, getByText } = renderWithRouter(component, {
      route,
    });
    const inputName = getByLabelText('Nome');
    const inputEmail = getByLabelText('Email');

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();

    inputName.focus();
    userEvent.type(inputName, invalidName);
    userEvent.tab();

    expect(inputName).toHaveValue(invalidName);
    expect(inputEmail).toHaveFocus();
    expect(inputName).not.toHaveFocus();

    const errorMsg = await getByText(/digitou um nome menor que 12 letras/i);
    expect(errorMsg).toBeInTheDocument();
  });

  test('verifica se ocorre erro ao escrever nome com caracter especial', async () => {
    const { getByLabelText, getByText } = renderWithRouter(component, {
      route,
    });
    const inputName = getByLabelText('Nome');
    const inputEmail = getByLabelText('Email');

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();

    inputName.focus();
    userEvent.type(inputName, specialChar);
    userEvent.tab();

    expect(inputName).toHaveValue(specialChar);
    expect(inputEmail).toHaveFocus();
    expect(inputName).not.toHaveFocus();

    const errorMsg = await getByText(
      /Você digitou um caracter especial ou número/i,
    );
    expect(errorMsg).toBeInTheDocument();
  });

  test('verifica se ocorre erro ao escrever nome número', async () => {
    const { getByLabelText, getByText } = renderWithRouter(component, {
      route,
    });
    const inputName = getByLabelText('Nome');
    const inputEmail = getByLabelText('Email');

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();

    inputName.focus();
    userEvent.type(inputName, nameWithNumber);
    userEvent.tab();

    expect(inputName).toHaveValue(nameWithNumber);
    expect(inputEmail).toHaveFocus();
    expect(inputName).not.toHaveFocus();

    const errorMsg = await getByText(
      /Você digitou um caracter especial ou número/i,
    );
    expect(errorMsg).toBeInTheDocument();
  });

  test('verifica se NÃO ocorre erro ao escrever nome válido', async () => {
    const { getByLabelText, queryByText } = renderWithRouter(component, {
      route,
    });
    const inputName = getByLabelText('Nome');
    const inputEmail = getByLabelText('Email');

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();

    inputName.focus();
    userEvent.type(inputName, validName);
    userEvent.tab();

    expect(inputName).toHaveValue(validName);
    expect(inputEmail).toHaveFocus();
    expect(inputName).not.toHaveFocus();

    const errMsg = queryByText(/Você digitou um caracter especial ou número/i);
    expect(errMsg).not.toBeInTheDocument();
  });
});

describe('Testes de validação de formulário do campo email', () => {
  const invalidEmail = 'wscat';
  const validEmail = 'wscatao@gmail.com';

  it('Verifica se ao digitar um e-mail invalido recebo mensagem de erro', () => {
    const { getByLabelText, queryByText } = renderWithRouter(component, {
      route,
    });

    const inputEmail = getByLabelText('Email');
    const inputPassword = getByLabelText('Senha');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();

    inputEmail.focus();
    userEvent.type(inputEmail, invalidEmail);
    userEvent.tab();

    expect(inputEmail).toHaveValue(invalidEmail);
    expect(inputPassword).toHaveFocus();
    expect(inputEmail).not.toHaveFocus();

    const errMsg = queryByText(/Você digitou um e-mail inválido/i);
    expect(errMsg).toBeInTheDocument();
  });

  it('Verifica se ao digitar um e-mail válido não recebo mensagem de erro', () => {
    const { getByLabelText, queryByText } = renderWithRouter(component, {
      route,
    });

    const inputEmail = getByLabelText('Email');
    const inputPassword = getByLabelText('Senha');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();

    inputEmail.focus();
    userEvent.type(inputEmail, validEmail);
    userEvent.tab();

    expect(inputEmail).toHaveValue(validEmail);
    expect(inputPassword).toHaveFocus();
    expect(inputEmail).not.toHaveFocus();

    const errMsg = queryByText(/Você digitou um e-mail inválido/i);
    expect(errMsg).not.toBeInTheDocument();
  });
});

describe('Verifica validação de formulário no campo senha', () => {
  const invalidPassword = 'abc';
  const validPassword = 'abc12345';

  it('Verifica se recebo uma mensagme de erro ao digitar uma senha inválida', () => {
    const { getByLabelText, queryByText } = renderWithRouter(component, {
      route,
    });

    const inputPassword = getByLabelText('Senha');
    const checkBox = getByLabelText('Quero vender');

    expect(inputPassword).toBeInTheDocument();
    expect(checkBox).toBeInTheDocument();

    inputPassword.focus();
    userEvent.type(inputPassword, invalidPassword);
    userEvent.tab();

    expect(inputPassword).toHaveValue(invalidPassword);
    expect(inputPassword).not.toHaveFocus();
    expect(checkBox).toHaveFocus();

    const errMsg = queryByText(/Você digitou uma senha menor que 6 caracteres/i);
    expect(errMsg).toBeInTheDocument();
  });

  it('Verifica se NÃO recebo uma mensagme de erro ao digitar uma senha válida', () => {
    const { getByLabelText, queryByText } = renderWithRouter(component, {
      route,
    });

    const inputPassword = getByLabelText('Senha');
    const checkBox = getByLabelText('Quero vender');

    expect(inputPassword).toBeInTheDocument();
    expect(checkBox).toBeInTheDocument();

    inputPassword.focus();
    userEvent.type(inputPassword, validPassword);
    userEvent.tab();

    expect(inputPassword).toHaveValue(validPassword);
    expect(inputPassword).not.toHaveFocus();
    expect(checkBox).toHaveFocus();

    const errMsg = queryByText(/Você digitou uma senha menor que 6 caracteres/i);
    expect(errMsg).not.toBeInTheDocument();
  });
});

describe('Verifica se o botão está desabilitado com dados inválidos e válido com dados válidos', () => {
  it('Digita dados inválidos e verifica se o botão está habilitado', () => {
    const { getByRole, getByLabelText } = renderWithRouter(component, { route });
    const btnCadastrar = getByRole('button', /cadastrar/i);
    const inputName = getByLabelText('Nome');
    const inputEmail = getByLabelText('Email');
    const inputPassword = getByLabelText('Senha');

    expect(btnCadastrar).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();

    inputName.focus();
    userEvent.type(inputName, 'Willy');
    userEvent.tab();
    userEvent.type(inputEmail, 'wsc');
    userEvent.tab();
    userEvent.type(inputPassword, 'abc');
    userEvent.tab();

    expect(btnCadastrar).toHaveAttribute('disabled');
  });

  it('Digita dados válidos e verifica se o botão está habilitado', () => {
    const { getByRole, getByLabelText } = renderWithRouter(component, { route });
    const btnCadastrar = getByRole('button', /cadastrar/i);
    const inputName = getByLabelText('Nome');
    const inputEmail = getByLabelText('Email');
    const inputPassword = getByLabelText('Senha');

    expect(btnCadastrar).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();

    inputName.focus();
    userEvent.type(inputName, 'Willy de Souza Catão');
    userEvent.tab();
    userEvent.type(inputEmail, 'wscatao@gmail.com');
    userEvent.tab();
    userEvent.type(inputPassword, 'abc12345');
    userEvent.tab();

    expect(btnCadastrar).not.toHaveAttribute('disabled');
  });
});
