const { createSale } = require('../services/sales');

async function regiterSale(req, res) {
  const { body: saleData } = req;
  const sale = await createSale(saleData);
  return res.status(201).json(sale);
}

module.exports = { regiterSale };
