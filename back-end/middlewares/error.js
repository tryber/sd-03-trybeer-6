// eslint-disable-next-line no-unused-vars
function errormid(error, _req, res, next) {
  return res.status(404).json(error);
}

module.exports = errormid;
