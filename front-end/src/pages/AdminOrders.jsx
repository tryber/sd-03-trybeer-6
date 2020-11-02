import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminOrder from '../adminOrders/AdminOrder';

const ENDPOINT = 'http://localhost:3001/sales';

async function getData() {
  const { data } = await axios.get(ENDPOINT);
  return data;
}

export default function AdminOrders() {
  const [data, setData] = useState([]);
  const isLoaded = !!data.length;
  console.log(data);
  useEffect(() => {
    getData().then(setData);
  }, []);
  return isLoaded ? (
    <div>
      Admin Orders
      {data.map(({
        id, totalPrice, deliveryAddress, deliveryNumber, status,
      }) => (
        <AdminOrder
          key={ id }
          status={ status }
          address={ { deliveryAddress, deliveryNumber } }
          id={ id }
          totalPrice={ totalPrice }
        />
      ))}
    </div>
  ) : (
    <p>Loading</p>
  );
}
