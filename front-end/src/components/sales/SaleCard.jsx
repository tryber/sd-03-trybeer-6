import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';

export default function SaleCard({ id, date, total }) {
  return (
    <div data-testid={ `${id}-order-card-container` }>
      <p data-testid={ `${id}-order-number` }>
        {`Pedido ${id}`}
      </p>
      <p data-testid={ `${id}-order-date` }>{moment(date).format('DD/MM')}</p>
      <p data-testid={ `${id}-order-total-value` }>{`R$: ${total}`}</p>
    </div>
  );
}

SaleCard.propTypes = {
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
};
