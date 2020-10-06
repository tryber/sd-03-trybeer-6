import PropTypes from 'prop-types';
import React from 'react';
import ProductCard from '../components/productsItens/productCard';

export default function SaleDetails({
  id, date, products, totalPrice,
}) {
  return (
    <div>
      <h1 data-testid="top-title">Detalhes de pedido:</h1>
      <p data-testid="order-number">{id}</p>
      <p data-testid="order-date">{date}</p>
      {products.map(({ product, qty }) => (
        <ProductCard key={ product.id } qty={ qty } product={ product } id={ product.id } />
      ))}
      <p data-testid="order-total-value">
        {totalPrice}
      </p>
    </div>
  );
}

SaleDetails.propTypes = {
  date: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  products: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
};
