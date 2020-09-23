require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function createUser(userData) {
  const user = new User(userData);
  return user.save();
}

async function loginUser(email, password) {
  const userAuthenticated = (await User.getFromDb(email)).authenticateUser(password);
  const token = jwt.sign(JSON.stringify(userAuthenticated), process.env.SECRET);

  return token;
}

module.exports = { createUser, loginUser };
