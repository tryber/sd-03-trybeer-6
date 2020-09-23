const router = require('express').Router();
const Controllers = require('../controllers');

router.post('/', Controllers.users.loginUser);
router.post('/create', Controllers.users.createUser);

module.exports = router;
