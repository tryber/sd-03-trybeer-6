const moment = require('moment');

function removePassword(dataToRemove) {
  const { password, ...dataWithoutPassword } = dataToRemove;
  return dataWithoutPassword;
}

function formatDateToDbDate(date) {
  return moment(date).format('YYYY-MM-DD HH:MM:SS');
}

module.exports = { removePassword, formatDateToDbDate };
