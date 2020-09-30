import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import TopBar from '../topbar/Topbar';
import getUserByToken from '../../utils/axios/profile/GetDataByToken';
import UpdateUserName from '../../utils/axios/profile/UpdateUserName';
import './Profile.css';

export default function Profile() {
  const [initialName, setInitialName] = useState('');
  const [initialEmail, setInitialEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [nameCopy, setNameCopy] = useState(null);
  const [updated, setUpdated] = useState(false);
  const history = useHistory();

  const updateUser = async () => {
    const updateData = UpdateUserName(userId, initialName);
    updateData.then(() => setUpdated(true));
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) return history.push('/login');
    const user = getUserByToken(token);
    user.then((userOb) => {
      setInitialName(userOb.name);
      setInitialEmail(userOb.email);
      setNameCopy(userOb.name);
      setUserId(userOb.id);
    });
  }, [history]);

  return (
    <div>
      <TopBar menuTitle="Meu perfil" />
      <div className="container">
        <div>
          <h2>{ updated ? 'Atualização concluída com sucesso' : null}</h2>
        </div>
        <form className="form-container">
          <label htmlFor="profile-name" className="form-label">
            Name
            <input
              name="profile-name"
              type="text"
              data-testid="profile-name-input"
              value={ initialName }
              onChange={ (e) => setInitialName(e.target.value) }
              className="form-input"
            />
          </label>
          <label htmlFor="profile-email" className="form-label">
            Email
            <input
              name="profile-email"
              type="text"
              readOnly
              data-testid="profile-email-input"
              value={ initialEmail }
              className="form-input"
            />
          </label>
          <button
            type="button"
            data-testid="profile-save-btn"
            disabled={ initialName === nameCopy }
            className={ (initialName === nameCopy) ? 'form-btn-disabled' : 'form-btn' }
            onClick={ () => updateUser() }
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
