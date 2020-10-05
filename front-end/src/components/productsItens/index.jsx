import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import history from 'history/browser';
import ProductCard from './productCard';

const ProductsItens = ({ total }) => {
  const [beers, setBeers] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/product/')
      .then(({ data }) => setBeers([...data]));
  }, []);

  const totalCart = localStorage.getItem('totalCart') || total;

  return (
    <div>
      <div>
        {beers.map((beer, index) => <ProductCard key={beer.id} index={index} data={beer} />)}
      </div>
      <div>
        <button
          type="button"
          data-testid="checkout-bottom-btn"
          onClick={() => history.push('/checkout')}
          disabled={totalCart > 0 ? false : true}
        >
          Ver Carrinho 
        </button>
        <p
          data-testid="checkout-bottom-btn-value"
        >
          R$ {parseFloat(totalCart).toFixed(2).replace('.', ',')}
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = ({ total }) => ({
  total
});

export default connect(mapStateToProps)(ProductsItens);
