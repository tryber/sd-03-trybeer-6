const Sale = require('../models/Sale');

async function createSale(saleData) {
  const sale = new Sale(saleData);
  console.log('SALE', sale);
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

async function getById(id) {
  const sales = await Sale.byId(id);
  return sales;
}

module.exports = { createSale, getSales, salesByUser, getById };
