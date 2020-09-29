import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BsJustify } from 'react-icons/bs';

import './Topbar.css';

export default function TopBar(props) {
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
      <div className={ menuOpen ? 'menu-open side-menu-container' : 'menu-closed' }>
        <ul className="menu-ul">
          <Link to="/products" className="links">
            <li className="menu-li" data-testid="side-menu-item-products">
              Produtos
            </li>
          </Link>
          <Link to="/orders" className="links">
            <li className="menu-li" data-testid="side-menu-item-my-orders">
              Meus pedidos
            </li>
          </Link>
          <Link to="/profile" className="links">
            <li className="menu-li" data-testid="side-menu-item-my-profile">
              Meu Perfil
            </li>
          </Link>
          <Link to="/login" className="links">
            <li className="menu-li" data-testid="side-menu-item-logout">
              Sair
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

TopBar.propTypes = {
  menuTitle: PropTypes.string.isRequired,
};
