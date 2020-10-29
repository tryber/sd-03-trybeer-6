import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/saleDetails/productCard';

const ENDPOINT = (id) => `http://localhost:3001/sales/${id}`;

async function getData(id) {
  const { data } = await axios.get(ENDPOINT(id));
  return data;
}

export default function SaleDetails() {
  const { id } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    getData(id).then(setData);
  }, [id]);
  let productsToRender;
  const { date, products, totalPrice } = data;

  if (products) {
    console.log(products);
    productsToRender = products.map(({ product, qnt }) => (
      <ProductCard key={ product.id } qty={ qnt } product={ product } id={ product.id } />
    ));
  }

  return (
    <div>
      <h1 data-testid="top-title">Detalhes de pedido:</h1>
      <p data-testid="order-number">{id}</p>
      <p data-testid="order-date">{date}</p>
      {productsToRender}
      <p data-testid="order-total-value">
        {totalPrice}
      </p>
    </div>
  );
}
