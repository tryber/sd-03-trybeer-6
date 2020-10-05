const router = require('express').Router();
const Controllers = require('../controllers');
const { auth } = require('../middlewares');
const Hero = require('../services/hero.js');

router.post('/', Hero(Controllers.users.loginUser));
router.get('/', Hero(Controllers.users.getUserByToken));

router.get('/:id', auth.authToken, Controllers.users.getUser);
router.patch('/:id', auth.authToken, Controllers.users.updateUser);

router.post('/create', Controllers.users.createUser);

router.get('/:id/sale', Controllers.users.getSales);

module.exports = router;
