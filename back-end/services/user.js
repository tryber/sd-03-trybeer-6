require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { removePassword } = require('./utils');

async function createUser(userData) {
  const user = new User(userData);
  return user.save();
}

async function loginUser(email, password) {
  const userAuthenticated = (await User.getFromDb(email)).authenticateUser(password);
  const userDataWithoutPassword = removePassword(userAuthenticated);
  const token = jwt.sign(JSON.stringify(userDataWithoutPassword), process.env.SECRET);

  return { token, ...userDataWithoutPassword };
}

async function getUser(email) {
  const user = await User.getFromDb(email);
  return user;
}

module.exports = { createUser, loginUser, getUser };
