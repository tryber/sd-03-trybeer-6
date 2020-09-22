import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <form>
      <label htmlFor="email-input">
        E-mail:
        <input type="text" name="email-input" data-testid="email-input" />
      </label>
      <label htmlFor="password-input">
        Senha:
        <input
          type="password"
          name="password-input"
          data-testid="password-input"
        />
      </label>
      <button type="button" name="signin-btn" data-testid="signin-btn">
        Entrar
      </button>
      <Link to="/register" name="no-account-btn" data-testid="no-account-btn">
        Ainda não tenho conta
      </Link>
    </form>
  );
}
