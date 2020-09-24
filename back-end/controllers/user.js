const services = require('../services');

async function createUser(req, res, next) {
  console.log('ENTROU NO CREATE USER');
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
    const token = await services.user.loginUser(email, password);
    if (token) {
      return res.status(201).json({ token });
    }
    throw new Error({ status: 401, error: 'user is invalid' });
  } catch (error) {
    next(error);
  }
}

module.exports = { loginUser, createUser };
