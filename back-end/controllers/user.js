const Boom = require('@hapi/boom');
const services = require('../services');

async function createUser(req, res, next) {
  try {
    const { body } = req;
    const user = await services.user.createUser(body);
    if (user) {
      res.status(201).json({ user: { id: user.getAutoIncrementValue(), ...body } });
    }
  } catch (error) {
    next(error);
  }
}

async function loginUser(req, res, next) {
  try {
    const { body: { email, password } } = req;
    const { token, userDataWithoutPassword: user } = await services.user.loginUser(email, password);
    if (token && user) {
      return res.status(200).json({ token, user });
    }
  } catch (error) {
    next(Boom.unauthorized());
  }
}

async function getUser(req, res, next) {
  try {
    const { body: email } = req;
    const user = await services.user.getUser(email);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function getUserByToken(req, res, _next) {
  const { authorization: token } = req.headers;
  const userInfo = await services.user.decodeToken(token);
  const user = await services.user.getUser(userInfo.email);
  return res.status(200).json(user);
}

async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const userUpdated = await services.user.updateUser(id, dataToUpdate);
    return res.status(200).json(userUpdated);
  } catch (error) {
    next(error);
  }
}

async function getSales(req, res) {
  const { id } = req.params;
  const sales = await services.user.getSales(id);
  return res.status(200).json(sales);
}

module.exports = { loginUser, createUser, getUser, updateUser, getUserByToken, getSales };
