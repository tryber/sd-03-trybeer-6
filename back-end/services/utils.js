function removePassword(dataToRemove) {
  const { password, ...dataWithoutPassword } = dataToRemove;
  return dataWithoutPassword;
}

module.exports = { removePassword };
