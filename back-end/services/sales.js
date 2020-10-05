const Sale = require('../models/Sale');

async function createSale(saleData) {
  const sale = new Sale(saleData);
  return sale.save();
}

async function getSales() {
  const sales = await Sale.getAllSales();
  return sales;
}

async function salesByUser(id) {
  const sales = await Sale.byUser(id);
  return sales;
}

module.exports = { createSale, getSales, salesByUser };
