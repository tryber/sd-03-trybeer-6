const router = require('express').Router();
const Controllers = require('../controllers');

const Hero = require('../services/hero.js');

router.get('/', Hero(Controllers.product.getProducts));

module.exports = router;
