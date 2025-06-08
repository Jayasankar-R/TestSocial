const bcrypt = require('bcrypt');

async function hashPassword(plainPassword) {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(plainPassword, salt);
  return hashed;
}

async function checkPassword(plainPassword,hashedPassword) {
  return bcrypt.compare(plainPassword,hashedPassword)
}

module.exports = {
  hashPassword,
  checkPassword
};