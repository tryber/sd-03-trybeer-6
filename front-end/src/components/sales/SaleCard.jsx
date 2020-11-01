import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

export default function SaleCard({ id, date, total }) {
  const history = useHistory();
  function goToDetails() {
    return history.push(`/orders/${id + 1}`);
  }

  return (
    <button type="button" onClick={ goToDetails }>
      <div data-testid={ `${id}-order-card-container` }>
        <p data-testid={ `${id}-order-number` }>
          {`Pedido ${id + 1}`}
        </p>
        <p data-testid={ `${id}-order-date` }>{moment(date).format('DD/MM')}</p>
        <p data-testid={ `${id}-order-total-value` }>{`R$: ${total}`}</p>
      </div>
    </button>
  );
}

SaleCard.propTypes = {
  date: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
