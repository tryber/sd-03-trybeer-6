import React, { useState, useEffect } from 'react';

import TopBar from '../topbar/Topbar';
import './Profile.css';

export default function Profile() {
  const [initialName, setInitialName] = useState(null);
  const [initialEmail, setInitialEmail] = useState(null);
  const [nameCopy, setNameCopy] = useState(null);

  // useEffect(() => {
  //   setInitialName(user.name);
  //   setNameCopy(user.name);
  //   setInitialEmail(user.email);
  // }, []);

  return (
    <div>
      <TopBar menuTitle="Meu perfil" />
      <div className="container">
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
            className="form-btn"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
