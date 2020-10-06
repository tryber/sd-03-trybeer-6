import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BsTrash } from 'react-icons/bs';

import Topbar from '../topbar/Topbar';

function Checkout() {
  const [cartItens, setCartItens] = useState();
  const magicNumber = 0;

  const handleList = (val) => {
    console.log(val);
    const newItens = cartItens.filter(({ product }) => product !== val);
    console.log(newItens);
    localStorage.removeItem('cartItens');
    localStorage.setItem('cartItens', JSON.stringify(newItens));
    setCartItens(newItens);
    
  };

  useEffect(() => {
    setCartItens(JSON.parse(localStorage.getItem('cartItens')));
  }, []);

  return (
    <div>
      <Topbar menuTitle="Finalizar Pedido" />
      <h2>Produtos</h2>
      <ul>
        {cartItens
          && cartItens.length > magicNumber
          && cartItens.map(({ quantity, price, product }) => (
            <li key={ product }>
              <div key={ `${product}+${price}` }>
                <span>{quantity}</span>
                <span>{product}</span>
                <span>{price * quantity}</span>
                <span>{`(${price})`}</span>
                <button type="button" value={ product } onClick={ (e) => handleList(e.currentTarget.value) }>
                  <BsTrash />
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default connect()(Checkout);

/* {
  cart: [
    {
      quantity: 1,
      price: '2.19',
      product: 'Skol 269ml'
    },
    {
      quantity: 1,
      price: '4.49',
      product: 'Skol Beats Senses 313ml'
    }
  ]
} */
