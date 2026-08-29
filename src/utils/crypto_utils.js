const bcrypt = require('bcryptjs');

class PasswordUtils {
  hash(password) {
    return bcrypt.hash(password, 12);
  }

  compare(password, hash) {
    return bcrypt.compare(password, hash);
  }
}

module.exports = new PasswordUtils();
