import React, { useState } from 'react';
import { BsJustify } from 'react-icons/bs';

import './Topbar.css';

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <div className="menu-container">
        <div className="parent-menu-div">
          <div className="button-menu-div">
            <button
              className="menu-drag-button"
              type="button"
              onClick={ () => setMenuOpen(!menuOpen) }
            >
              <BsJustify />
            </button>
          </div>
          <div className="title-menu-div">
            <h1 className="title">Trybeer</h1>
          </div>
        </div>
      </div>
      <div className={ menuOpen ? 'menu-open' : 'menu-closed' }>
        <ul className="menu-ul">
          <li className="menu-li">Produtos</li>
          <li className="menu-li">Meus Pedidos</li>
          <li className="menu-li">Meu Perfil</li>
          <li className="menu-li">Sair</li>
        </ul>
      </div>
    </div>
  );
}
