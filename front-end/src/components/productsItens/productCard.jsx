import React from 'react';
import { connect } from 'react-redux';
import { productsHandler } from '../../actions';

const productAdd = (product, cart, total, callback) => {
  if (!cart[product]) {
    cart[product] = 1;
    localStorage.setItem('cartItens', JSON.stringify(cart));
    localStorage.setItem('totalCart', JSON.stringify(total));
    callback(cart, total);
    return;
  }

  cart[product] += 1;
  localStorage.setItem('cartItens', JSON.stringify(cart));
  localStorage.setItem('totalCart', JSON.stringify(total));
  callback(cart, total);
};

const productRemove = (product, cart, total, callback) => {
  if (cart[product] > 0) {
    cart[product] -= 1;
    localStorage.setItem('cartItens', JSON.stringify(cart));
    localStorage.setItem('totalCart', JSON.stringify(total));
    callback(cart, total);
  }

  if (cart[product] === 0) {
    delete cart[product];
    localStorage.setItem('cartItens', JSON.stringify(cart));
    callback(cart, total);
  }
};

const ProductCard = ({ index, data: { price, thumbnail, name }, cart, total, productHandler}) => {
  const cartStorage = JSON.parse(localStorage.getItem('cartItens')) || cart;

  const totalCart = Number(JSON.parse(localStorage.getItem('totalCart'))) || total;

  console.log(total)

  return (
    <div>
      <h4 data-testid={`${index}-product-name`}>{name}</h4>
      <img src={thumbnail} alt={name} data-testid={`${index}-product-img`}/>
      <h3
        data-testid={`${index}-product-price`}
      >
        R$ {parseFloat(price).toFixed(2).replace('.', ',')}
      </h3>
      <button
        type="button"
        data-testid={`${index}-product-minus`}
        onClick={() => productRemove(name, cartStorage, totalCart - Number(price), productHandler)}
      >
        -
      </button>
      <span data-testid={`${index}-product-qtd`}>{cartStorage[name] ? cartStorage[name] : 0}</span>
      <button
        data-testid={`${index}-product-plus`}
        onClick={() => productAdd(name, cartStorage, totalCart + Number(price), productHandler)}
      >
        +
      </button>
    </div>
  );
};

const mapStateToProps = ({ cart, total }) => ({
  cart,
  total,
});

const mapDispatchToProps = (dispatch) => ({
  productHandler: (data, total) => dispatch(productsHandler(data, total))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
