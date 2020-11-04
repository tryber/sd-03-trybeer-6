import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import OrderCard from './OrderCard';

const ENDPOINT = (id) => `http://localhost:3001/sales/${id}`;

async function getData(id) {
  const { data } = await axios.get(ENDPOINT(id));
  return data;
}

export default function AdminOrderDetail() {
  const { id } = useParams();
  const [data, setData] = useState({});
  let productsToRender;
  const maxFloatNumbers = 2;
  const { products, totalPrice, status } = data;

  async function deliverySale() {
    const response = await axios.patch(ENDPOINT(id));
    console.log(response);
    setData({ ...data, status: 'Entregue' });
  }

  useEffect(() => {
    getData(id).then(setData);
  }, [id]);

  if (products && products.length) {
    productsToRender = products.map(({ product, qnt }) => (
      <OrderCard key={ product.id } qty={ qnt } product={ product } id={ product.id } />
    ));
  }

  return Object.keys(data).length ? (
    <div>
      <h1 data-testid="top-title">Detalhes de pedido:</h1>
      <p data-testid="order-number">
        Pedido
        {` ${id}`}
      </p>
      <p data-testid="order-status">
        Status:
        {' '}
        {status}
      </p>
      <p data-testid="order-date">
        Data de realização:
        {moment(data.saleDate).format('DD/MM')}
      </p>
      {productsToRender}
      <p data-testid="order-total-value">
        {`Total: R$ ${totalPrice
          .toFixed(maxFloatNumbers)
          .split('.')
          .join(',')}`}
      </p>
      {status === 'Pendente' && (
        <button onClick={ deliverySale } type="button" data-testid="mark-as-delivered-btn">
          Marcar como entregue
        </button>
      )}
    </div>
  ) : (
    <p>Loading</p>
  );
}
