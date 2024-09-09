const bcrypt = require("bcrypt");

function EncryptId(slug) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(slug, salt);
  return hash;
}

module.exports = EncryptId;
