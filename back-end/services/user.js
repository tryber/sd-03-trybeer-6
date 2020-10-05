require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Sales = require('../models/Sale');

const { removePassword } = require('./utils');

async function createUser(userData) {
  const user = new User(userData);
  return user.save();
}

async function loginUser(email, password) {
  const userAuthenticated = (await User.getFromDb(email)).authenticateUser(password);
  const userDataWithoutPassword = removePassword(userAuthenticated);
  const token = jwt.sign(JSON.stringify(userDataWithoutPassword), process.env.SECRET || 'shhh');

  return { token, userDataWithoutPassword };
}

async function getUser(email) {
  const user = await User.getFromDb(email);

  return user;
}

async function updateUser(id, dataToUpdate) {
  const user = await User.getFromDb(id);
  Object.entries(dataToUpdate).forEach(([propertie, value]) => {
    user[propertie] = value;
  });
  await user.save();

  return user;
}

async function decodeToken(token) {
  return jwt.decode(token);
}

async function getSales(id) {
  // const user = new User({ id });
  const sales = await Sales.byUser(id);
  return sales;
  // const sales = user.getSales();
  // return sales;
}
module.exports = { createUser, loginUser, getUser, updateUser, decodeToken, getSales };
