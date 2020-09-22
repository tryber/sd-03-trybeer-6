import React, { useState } from 'react';

export default function Register() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const emailValidator = (e) => {
    const {
      target: { value: typedEmail },
    } = e;
    //* Regex de e-mail
    const validator = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!validator.test(typedEmail)) {
      return setEmailError('Você digitou um e-mail inválido');
    }

    //* Passando no validador incluir no state ao sair do foco do campo (onBlur)
    return (setEmailError(null), setEmail(typedEmail));
  };

  const passwordValidator = (e) => {
    const {
      target: { value: typedPassword },
    } = e;

    //* Regra do Eslint de armazenar números em variáveis para comparar.
    const magicNumber = 6;

    if (typedPassword.length < magicNumber) {
      return setPasswordError('Você digitou uma senha menor que 6 caracteres');
    }

    //* Passando na validação de senha armazernar no estado ao sair do foto (onBlur).
    return (setPasswordError(null), setPassword(typedPassword));
  };

  const nameValidator = (e) => {
    const {
      target: { value: typedName },
    } = e;
    const nameRegex = /[^A-Za-z]/;
    const magicNumber = 12;

    if (!nameRegex.test(typedName) || typedName.length < magicNumber) {
      return setNameError(
        'Você digitou um caracter especial ou número no nome ou digitou um nome menor que 12 letras.',
      );
    }

    //* Passou na validação de nome.
    return (setNameError(null), setName(typedName));
  };

  return (
    <form>
      <label htmlFor="name">
        Nome
        <input
          type="text"
          name="name"
          data-testid="signup-name"
          onBlur={ (e) => nameValidator(e) }
        />
        {nameError ? <p>{nameError}</p> : null}
      </label>
      <label htmlFor="email">
        Email
        <input
          type="text"
          name="email"
          data-testid="signup-email"
          onBlur={ (e) => emailValidator(e) }
        />
        {emailError ? <p>{emailError}</p> : null}
      </label>
      <label htmlFor="senha">
        Senha
        <input
          type="password"
          name="senha"
          data-testid="signup-password"
          onBlur={ (e) => passwordValidator(e) }
        />
        {passwordError ? <p>{passwordError}</p> : null}
      </label>
      <label htmlFor="seller">
        Quero vender
        <input
          type="checkbox"
          name="seller"
          data-testid="signup-seller"
          onChange={ () => setIsAdmin(!isAdmin) }
        />
      </label>
      <button
        type="button"
        data-testid="signup-btn"
        disabled={ !name || !email || !password || emailError || passwordError || nameError }
      >
        CADASTRAR
      </button>
    </form>
  );
}
