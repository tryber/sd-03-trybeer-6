const { getAllProducts } = require('../services/products');

async function getProducts(req, res, _next) {
  const products = await getAllProducts();
  return res.status(200).json(products);
}

module.exports = { getProducts };
