import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BsJustify } from 'react-icons/bs';

import './adminSideBar.css';

export default function AdminSideBar(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { menuTitle } = props;

  return (
    <div>
      <div className="menu-container">
        <div className="parent-menu-div">
          <div className="button-menu-div">
            <button
              className="menu-drag-button"
              type="button"
              onClick={ () => setMenuOpen(!menuOpen) }
              data-testid="top-hamburguer"
            >
              <BsJustify />
            </button>
          </div>
          <div className="title-menu-div">
            <h1 className="title" data-testid="top-title">
              {menuTitle}
            </h1>
          </div>
        </div>
      </div>
      <div className={ menuOpen ? 'menu-open admin-side-bar-container' : 'menu-open' }>
        <ul className="menu-ul">
          <Link to="/admin/orders" className="links">
            <li className="menu-li" data-testid="side-menu-item-orders">
              Pedidos
            </li>
          </Link>
          <Link to="/admin/profile" className="links">
            <li className="menu-li" data-testid="side-menu-item-profile">
              Perfil
            </li>
          </Link>
          <Link to="/login" className="links">
            <li
              className="menu-li"
              data-testid="side-menu-item-logout"
              onClick={() => localStorage.clear()}
            >
              Sair
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

AdminSideBar.propTypes = {
  menuTitle: PropTypes.string.isRequired,
};
