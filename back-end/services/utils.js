const moment = require('moment');

function removePassword(dataToRemove) {
  const { password, ...dataWithoutPassword } = dataToRemove;
  return dataWithoutPassword;
}

function formatDateToDbDate(date) {
  return moment(date).format('YYYY-MM-DD');
}

module.exports = { removePassword, formatDateToDbDate };
