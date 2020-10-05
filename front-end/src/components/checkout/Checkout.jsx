import React from 'react';
import { connect } from 'react-redux';

import Topbar from '../topbar/Topbar';

function Checkout({ cart }) {
  const cartItens = [JSON.parse(localStorage.getItem('cartItens')) || cart];

  console.log(cartItens);

  return (
    <div>
      <Topbar menuTitle="Finalizar Pedido" />
      <h2>Produtos</h2>
      <ul>
        {/* { cartItens.map((item) => (
          <li key={item.[Skol laa ]}>

          </li>
        ))} */}
      </ul>
    </div>
  );
}

const mapStateToProps = ({ cart }) => ({
  cart,
});

export default connect(mapStateToProps)(Checkout);

/* {
  cart: {
    'Skol Lata 250ml': 1,
    'Heineken 600ml': 2,
    'Antarctica Pilsen 300ml': 1,
    'Skol 269ml': 1
  },
  total: 21.88
} */
