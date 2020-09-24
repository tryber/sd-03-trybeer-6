const router = require('express').Router();
const Controllers = require('../controllers');
const { auth } = require('../middlewares');

router.post('/', Controllers.users.loginUser);
router.get('/', auth.authToken, Controllers.users.getUser);

router.post('/create', Controllers.users.createUser);

module.exports = router;
