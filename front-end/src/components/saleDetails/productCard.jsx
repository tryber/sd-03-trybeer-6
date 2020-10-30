import PropTypes from 'prop-types';
import React from 'react';

export default function Productcard({ id, qty, product }) {
  return (
    <div>
      <p data-testid={ `${id}-product-name` }>
        {product.name}
      </p>

      <p data-testid={ `${id}-product-qtd` }>
        x
        {qty}
      </p>

      <p data-testid={ `${id}-product-total-value` }>
        {+qty * product.price}
      </p>
    </div>
  );
}

Productcard.propTypes = {
  id: PropTypes.number.isRequired,
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  qty: PropTypes.number.isRequired,
};
