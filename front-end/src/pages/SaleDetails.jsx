import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import ProductCard from '../components/saleDetails/productCard';

const ENDPOINT = (id) => `http://localhost:3001/sales/${id}`;

async function getData(id) {
  const { data } = await axios.get(ENDPOINT(id));
  return data;
}

export default function SaleDetails() {
  const { id } = useParams();
  const [data, setData] = useState({});
  let productsToRender;
  const initialPrice = 0;
  let totalPrice = initialPrice;
  const maxFloatNumbers = 2;
  const { products } = data;

  useEffect(() => {
    getData(id).then(setData);
  }, [id]);

  if (products && products.length) {
    productsToRender = products.map(({ product, qnt }) => {
      totalPrice += +(+qnt * parseFloat(product.price));
      return (<ProductCard
        key={ product.id }
        qty={ qnt }
        product={ product }
        id={ product.id }
      />);
    });
  }

  return Object.keys(data).length ? (
    <div>
      {console.log('keys', data)}
      <h1 data-testid="top-title">Detalhes de pedido:</h1>
      <p data-testid="order-number">
        Pedido
        {` ${id}`}
      </p>
      <p data-testid="order-date">
        Data de realização:
        {moment(data.saleDate).format('DD/MM')}
      </p>
      {productsToRender}
      <p data-testid="order-total-value">
        {`Total: R$ ${totalPrice.toFixed(maxFloatNumbers).split('.').join(',')}`}
      </p>
    </div>
  ) : (
    <p>Loading</p>
  );
}
