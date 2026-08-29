const jwt = require('jsonwebtoken');

class Token {
  getSecret() {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is required');
    }

    return process.env.JWT_SECRET;
  }

  generateAccessToken(user) {
    return jwt.sign(user, this.getSecret(), { expiresIn: '7d' });
  }

  validateToken(accessToken) {
    try {
      jwt.verify(accessToken, this.getSecret());
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = new Token();
