const Sale = require('../models/Sale');

async function createSale(saleData) {
  const sale = new Sale(saleData);
  return sale.save();
}

module.exports = { createSale };
