import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const emailValidator = (e) => {
    const {
      target: { value: typedEmail },
    } = e;
    const validator = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!validator.test(typedEmail)) return setEmailError('Você digitou um e-mail inválido');

    //* Passando no validador incluir no state ao sair do foco do campo (onBlur)
    setEmailError(null);
    setEmail(typedEmail);
  };

  const passWordValidator = (e) => {
    const {
      target: { value: typedPassword },
    } = e;

    //* Regra do Eslint de armazenar números em variáveis para comparar.
    const magicNumber = 6;

    if (typedPassword.length < magicNumber) return setPasswordError('Você digitou uma senha menor que 6 caracteres');

    //* Passando na validação de senha armazernar no estado ao sair do foto (onBlur).
    setPasswordError(null);
    setPassword(typedPassword);
  };

  return (
    <form>
      <label htmlFor="email-input">
        E-mail:
        <input
          type="text"
          name="email-input"
          data-testid="email-input"
          onBlur={ (e) => emailValidator(e) }
        />
        {emailError ? <p>{emailError}</p> : null}
      </label>
      <label htmlFor="password-input">
        Senha:
        <input
          type="password"
          name="password-input"
          data-testid="password-input"
          onBlur={ (e) => passWordValidator(e) }
        />
        {passwordError ? <p>{passwordError}</p> : null}
      </label>
      <button
        type="button"
        name="signin-btn"
        data-testid="signin-btn"
        disabled={ !email || !password || emailError || passwordError }
      >
        Entrar
      </button>
      <Link to="/register" name="no-account-btn" data-testid="no-account-btn">
        Ainda não tenho conta
      </Link>
    </form>
  );
}
