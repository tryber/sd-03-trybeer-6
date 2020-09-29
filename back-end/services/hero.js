const Boom = require('@hapi/boom');

function hero(cb) {
  return async (req, res, next) => {
    try {
      const cbResponse = await cb(req, res, next);
      if (Boom.isBoom(cbResponse)) {
        next(cbResponse);
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = hero;
