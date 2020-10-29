import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import getUserByToken from '../../utils/axios/profile/GetDataByToken';

import './styles.css'

const AdminProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) history.push('/login');
    const user = getUserByToken(token);
    user.then(({ name, email }) => {
      setName(name);
      setEmail(email);
    });
  });

  return (
    <div className="profile-admin-container">
      <h1>Perfil</h1>
      <div>
        <span data-testid="profile-name">Nome: {name}</span>
      </div>
      <div>
        <span data-testid="profile-email">Email: {email}</span>
      </div>
    </div>
  );
}

export default AdminProfile;
