import React from 'react';
import { connect } from 'react-redux';

import Topbar from '../topbar/Topbar';

function Checkout({ cart, total }) {
  const cartItens = [JSON.parse(localStorage.getItem('cartItens')) || cart];
  const totalItens = JSON.parse(localStorage.getItem('totalCart')) || total;

  console.log(cartItens);

  return (
    <div>
      <Topbar menuTitle="Finalizar Pedido" />
      Página de checkout
    </div>
  );
}

const mapStateToProps = ({ cart, total }) => ({
  cart,
  total,
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