require('dotenv').config();
const jwt = require('jsonwebtoken');

function authToken(req, _res, next) {
  const { body: { token } } = req;
  const userInfo = jwt.decode(token);
  req.userInfo = userInfo;
  next();
}

module.exports = { authToken };
