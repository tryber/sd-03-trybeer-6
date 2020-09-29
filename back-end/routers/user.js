const router = require('express').Router();
const Controllers = require('../controllers');
const { auth } = require('../middlewares');

router.post('/', Controllers.users.loginUser);
router.post('/', Controllers.users.getUserByToken);

router.get('/:id', auth.authToken, Controllers.users.getUser);
router.patch('/:id', auth.authToken, Controllers.users.updateUser);

router.post('/create', Controllers.users.createUser);

module.exports = router;
