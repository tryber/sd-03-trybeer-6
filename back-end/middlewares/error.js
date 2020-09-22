function error(error, req, res, next) {
  return res.status(404).json(error);
}

module.exports = error;
