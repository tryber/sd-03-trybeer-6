const Product = require('../models/Product');

async function getAllProducts() {
  return Product.getAllProducts();
}

module.exports = { getAllProducts };
