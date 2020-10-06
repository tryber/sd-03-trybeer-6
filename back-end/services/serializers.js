// const moment = require('moment');
const utils = require('./utils');

function serializeSale(saleData) {
  const [
    id,
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate,
    status,
  ] = saleData;
  const saleDateFormated = utils.formatDateToDbDate(saleDate);
  return {
    id,
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate: saleDateFormated,
    status,
  };
}

function serializeProduct(product) {
  const [id, name, price, urlImage] = product;

  return { id, name, price, urlImage };
}

module.exports = { serializeSale, serializeProduct };
