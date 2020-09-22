function errormid(error, _req, res, _next) {
  return res.status(404).json(error);
}

module.exports = errormid;
