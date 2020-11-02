const { createSale, getSales, salesByUser, getById, deliverySale } = require('../services/sales');

async function regiterSale(req, res) {
  const { body: saleData } = req;
  const sale = await createSale(saleData);
  return res.status(201).json(sale);
}

async function getAllSales(_req, res) {
  const sales = await getSales();
  return res.status(200).json(sales);
}

async function getSalesByUser(req, res) {
  const { id } = req.params;
  const sales = await salesByUser(id);
  return res.status(200).json(sales);
}

async function getSaleById(req, res) {
  const { id } = req.params;
  const sale = await getById(id);
  return res.status(200).json(sale);
}

async function deliverySaleController(req, res) {
  const { id } = req.params;
  const sale = await deliverySale(id);
  return res.status(200).json(sale);
}
module.exports = { regiterSale, getAllSales, getSalesByUser, getSaleById, deliverySaleController };
