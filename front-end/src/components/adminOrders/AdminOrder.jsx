import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function AdminOrder({
  status, address, id, totalPrice,
}) {
  const history = useHistory();
  const maxFloatNumbers = 2;
  function goToDetails() {
    return history.push(`/admin/orders/${id}`);
  }
  return (
    <button type="button" onClick={ goToDetails }>
      <p data-testid={ `${id - 1}-order-number` }>{`Pedido ${id}`}</p>
      <p data-testid={ `${id - 1}-order-status` }>{`Status: ${status}`}</p>
      <p data-testid={ `${id - 1}-order-address` }>{`Endereço de entrega:${address.deliveryAddress}, ${address.deliveryNumber} `}</p>
      <p data-testid={ `${id - 1}-order-total-value` }>{`Valor Total:R$ ${totalPrice.toFixed(maxFloatNumbers).split('.').join(',')}`}</p>
    </button>
  );
}

AdminOrder.propTypes = {
  address: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
};
