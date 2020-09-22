import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <form>
      <label htmlFor="email-input">E-mail:</label>
      <input type="text" name="email-input" data-testid="email-input" />
      <label htmlFor="password-input">Senha:</label>
      <input type="password" name="password-input" data-testid="password-input" />
      <button type="button" name="signin-btn" data-testid="signin-btn">Entrar</button>
      <Link to="/register" name="no-account-btn" data-testid="no-account-btn">
        Ainda não tenho conta
      </Link>
    </form>
  );
}
