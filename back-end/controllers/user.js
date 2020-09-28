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
    throw new Error({ status: 401, error: 'user is invalid' });
  } catch (error) {
    next(error);
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

module.exports = { loginUser, createUser, getUser, updateUser };
