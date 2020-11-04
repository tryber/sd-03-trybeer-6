import PropTypes from 'prop-types';
import React from 'react';

const maxFloatNumbers = 2;

export default function ProductCard({ id, qty, product }) {
  return (
    <div>
      <p data-testid={ `${id - 1}-product-name` }>
        {product.name}
      </p>

      <p data-testid={ `${id - 1}-product-qtd` }>
        x
        {qty}
      </p>

      <p data-testid={ `${id - 1}-product-total-value` }>
        {`R$ ${(+qty * parseFloat(product.price)).toFixed(maxFloatNumbers).split('.').join(',')}`}
      </p>
    </div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  qty: PropTypes.number.isRequired,
};
