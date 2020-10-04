import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';

const isValidParams = (email, password) => {
  const emailValidation = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i.test(email);

  const minLengthPassword = 6;

  return emailValidation && password.length >= minLengthPassword ? false : true;
};

const loginRequest = async (email, password, message, history) => {
  try {
    const loginResponse = await axios.post('http://localhost:3001/user/', {
      email,
      password,
    });

    const { data: { token, user } } = loginResponse;

    if (token) localStorage.setItem('token', JSON.stringify(token));

    user.role === 'administrator'
      ? history.push('/admin/orders')
      : history.push('/products');
  } catch (err) {
    message('Email ou senha inválidos');
  }
};

const InputTypes = ({ type, handleChanger }) => (
  <div className={`Input${type}`}>
    <div>
      <label htmlFor={type}>{type}</label>
    </div>
    <div>
      <input
        type={type === 'Email' ? 'text' : 'password'}
        name={type}
        data-testid={type === 'Email' ? "email-input" : "password-input"} 
        onChange={({ target: { value } }) => handleChanger(value)}
        placeholder={type}
      />
    </div>
  </div>
);

export default function InputLogin () {
  const [email, emailHandler] = useState(null);
  const [password, passwordHandler] = useState('');
  const [message, messageHandler] = useState(null);
  const history = useHistory();

  return (
    <section className="MainLogin">
      <h1>Login</h1>
      {message && <span>{message}</span>}
      <InputTypes type="Email" handleChanger={emailHandler} />
      <InputTypes type="Password" handleChanger={passwordHandler} />
      <div>
        <button
          disabled={isValidParams(email, password)}
          data-testid="signin-btn"
          onClick={() => loginRequest(email, password, messageHandler, history)}
        >
          ENTRAR
        </button>
      </div>
      <div>
        <Link to="/register">
          <button data-testid="no-account-btn">Ainda não tenho conta</button>
        </Link>
      </div>
    </section>
  );
};
