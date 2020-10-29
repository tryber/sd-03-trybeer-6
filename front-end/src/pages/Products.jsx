import React from 'react';
import { Redirect } from 'react-router-dom';
import Topbar from '../components/topbar/Topbar';
import ProductsItens from '../components/productsItens/index';

const Products = () => {
  const token = localStorage.getItem('token');

  if (token) return (
    <div>
      <Topbar menuTitle="TryBeer" typeOfUser="client" />
      <ProductsItens />
    </div>
  );

  return <Redirect to="/login" />;
};

export default Products;
