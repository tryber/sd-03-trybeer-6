import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import SaleCard from '../components/sales/SaleCard';

const GET_USER_SALES = (id) => `http://localhost:3001/user/${id}/sales`;

async function getId() {
  const token = JSON.parse(localStorage.getItem('token'));
  const userData = await axios.get('http://localhost:3001/user', {
    headers: { authorization: token },
  });
  return userData.data.id;
}

async function getSales() {
  const id = await getId();
  return axios.get(GET_USER_SALES(id)).then(({ data }) => data);
}

export default function Sales() {
  const [sales, setSales] = useState([false]);
  const history = useHistory();
  useEffect(() => (localStorage.getItem('token')
    ? getSales().then(setSales) : history.push('/')), [history]);

  return (
    <div>
      <h1 data-testid="top-title">Meus Pedidos:</h1>
      {sales.map(({ id, saleDate, totalPrice }) => (
        <SaleCard key={ id } id={ id } date={ saleDate } total={ totalPrice } />
      ))}
    </div>
  );
}
