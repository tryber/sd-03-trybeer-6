import PropTypes from 'prop-types';
import React from 'react';

export default function OrderCard({ id, qty, product }) {
  const maxFloatNumbers = 2;
  return (
    <div>
      <p data-testid={ `${id - 1}-product-name` }>
        {product.name}
      </p>

      <p data-testid={ `${id - 1}-product-qtd` }>
        x
        {qty}
      </p>

      <p data-testid={ `${id - 1}-order-unit-price` }>
        {`(R$ ${(parseFloat(product.price)).toFixed(maxFloatNumbers).split('.').join(',')})`}
      </p>

      <p data-testid={ `${id - 1}-product-total-value` }>
        {`R$ ${(+qty * parseFloat(product.price)).toFixed(maxFloatNumbers).split('.').join(',')}`}
      </p>
    </div>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  qty: PropTypes.number.isRequired,
};
