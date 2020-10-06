import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { BsTrash } from 'react-icons/bs';

import Topbar from '../topbar/Topbar';
import getUserByToken from '../../utils/axios/profile/GetDataByToken';
import RegisterSale from '../../utils/axios/checkout/RegisterSale';

function Checkout() {
  const history = useHistory();
  const magicNumber = 0;
  const fixeNumber = 2;
  const timeOut = 5000;
  const [cartItens, setCartItens] = useState();
  const [total, setTotal] = useState(magicNumber);
  const [rua, setRua] = useState(null);
  const [numero, setNumero] = useState(null);
  const [status, setStatus] = useState(false);

  const registerSale = async () => {
    const user = await getUserByToken(JSON.parse(localStorage.getItem('token')));
    const totalPrice = parseFloat(total).toFixed(fixeNumber);
    const sale = await RegisterSale(user.id, totalPrice, rua, numero);

    if (sale.id) {
      setStatus(true);
      setTimeout(() => {
        localStorage.removeItem('cartItens');
        history.push('/products');
      }, timeOut);
    }
  };

  const calcList = (itens) => {
    const resumo = itens.reduce((acc, cur) => {
      acc += cur.quantity * cur.price;
      return acc;
    }, magicNumber);

    setTotal(resumo.toFixed(fixeNumber).replace('.', ','));
  };

  const handleList = async (val) => {
    const newItens = cartItens.filter(({ product }) => product !== val);
    localStorage.removeItem('cartItens');
    localStorage.setItem('cartItens', JSON.stringify(newItens));
    setCartItens(newItens);
    calcList(newItens);
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) return history.push('/login');
    setCartItens(JSON.parse(localStorage.getItem('cartItens')));
    return calcList(JSON.parse(localStorage.getItem('cartItens')));
  }, [history]);

  return (
    <div>
      <Topbar menuTitle="Finalizar Pedido" />
      <h2>Produtos</h2>
      { cartItens && cartItens.length === magicNumber
        ? <h3>Não há produtos no carrinho</h3> : null }
      { status ? <h3>Compra realizada com sucesso!</h3> : null}
      <ul>
        {cartItens
          && cartItens.length > magicNumber
          && cartItens.map(({ quantity, price, product }, i) => (
            <li key={ product }>
              <div key={ `${product}+${price}` }>
                <span data-testid={ `${i}-product-qtd-input` }>{quantity}</span>
                <span data-testid={ `${i}-product-name` }>{product}</span>
                <span data-testid={ `${i}-product-total-value` }>
                  {`R$ ${(price * quantity).toFixed(fixeNumber).replace('.', ',')}`}
                </span>
                <span
                  data-testid={ `${i}-product-unit-price` }
                >
                  {`(R$ ${parseFloat(price).toFixed(fixeNumber).replace('.', ',')} un)`}
                </span>
                <button
                  type="button"
                  value={ product }
                  onClick={ (e) => handleList(e.currentTarget.value) }
                  data-testid={ `${i}-removal-button` }
                >
                  <BsTrash />
                </button>
              </div>
            </li>
          ))}
      </ul>
      <p data-testid="order-total-value">{`Total: R$ ${total}`}</p>
      <h2>Endereço</h2>
      <form>
        <label htmlFor="rua">
          Rua:
          <input
            name="rua"
            type="text"
            onChange={ (e) => setRua(e.target.value) }
            data-testid="checkout-street-input"
          />
        </label>
        <label htmlFor="numero">
          Número da casa:
          <input
            name="numero"
            type="text"
            onChange={ (e) => setNumero(e.target.value) }
            data-testid="checkout-house-number-input"
          />
        </label>
        <button
          type="button"
          disabled={ !rua || !numero || total === magicNumber }
          data-testid="checkout-finish-btn"
          onClick={ () => registerSale() }
        >
          Finalizar pedido
        </button>
      </form>
    </div>
  );
}

export default connect()(Checkout);

/* {
  cart: [
    {
      quantity: 1,
      price: '2.19',
      product: 'Skol 269ml'
    },
    {
      quantity: 1,
      price: '4.49',
      product: 'Skol Beats Senses 313ml'
    }
  ]
} */
