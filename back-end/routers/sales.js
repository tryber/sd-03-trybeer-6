const router = require('express').Router();
const Controllers = require('../controllers');
const Hero = require('../services/hero.js');

router.post('/', Hero(Controllers.sales.regiterSale));
router.get('/', Hero(Controllers.sales.getAllSales));

module.exports = router;
