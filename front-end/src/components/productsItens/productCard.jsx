import React from 'react';
import { connect } from 'react-redux';
import { productsHandler } from '../../actions';

const findProduct = (products, name) =>
  products.findIndex((product) => product.product === name);

const productAdd = (product, cart, price, total, callback) => {
  const productIndex = findProduct(cart, product);

  if (productIndex === -1) {
    const newCart = [...cart, { quantity: 1, price, product }];
    localStorage.setItem('cartItens', JSON.stringify(newCart));
    localStorage.setItem('totalCart', JSON.stringify(total));
    callback(newCart, total);
    return;
  }

  cart[productIndex].quantity += 1;
  localStorage.setItem('cartItens', JSON.stringify(cart));
  localStorage.setItem('totalCart', JSON.stringify(total));
  callback(cart, total);
};

const productRemove = (product, cart, total, callback) => {
  const productIndex = findProduct(cart, product);

  if (productIndex !== -1 && cart[productIndex].quantity > 0) {
    cart[productIndex].quantity -= 1;
    localStorage.setItem('cartItens', JSON.stringify(cart));
    localStorage.setItem('totalCart', JSON.stringify(total));
    callback(cart, total);
  }

  if (productIndex !== -1 && cart[productIndex].quantity === 0) {
    cart.splice(productIndex, 1);
    localStorage.setItem('cartItens', JSON.stringify(cart));
    callback(cart, total);
  }
};

const ProductCard = ({
  index,
  data: { price, thumbnail, name },
  cart,
  total,
  productHandler,
}) => {
  const cartStorage = JSON.parse(localStorage.getItem('cartItens')) || cart;

  const totalCart =
    Number(JSON.parse(localStorage.getItem('totalCart'))) || total;

  const productIndex = findProduct(cartStorage, name);

  return (
    <div>
      <h4 data-testid={`${index}-product-name`}>{name}</h4>
      <img src={thumbnail} alt={name} data-testid={`${index}-product-img`} />
      <h3 data-testid={`${index}-product-price`}>
        R$ {parseFloat(price).toFixed(2).replace('.', ',')}
      </h3>
      <button
        type="button"
        data-testid={`${index}-product-minus`}
        onClick={() =>
          productRemove(
            name,
            cartStorage,
            totalCart - Number(price),
            productHandler,
          )
        }
      >
        -
      </button>
      <span data-testid={`${index}-product-qtd`}>
        {productIndex !== -1 ? cartStorage[productIndex].quantity : 0}
      </span>
      <button
        type="button"
        data-testid={`${index}-product-plus`}
        onClick={() =>
          productAdd(
            name,
            cartStorage,
            price,
            totalCart + Number(price),
            productHandler,
          )
        }
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
  productHandler: (data, total) => dispatch(productsHandler(data, total)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
