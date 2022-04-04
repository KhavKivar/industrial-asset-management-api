
const jwt = require('jsonwebtoken');

const secret_key = "REMOVED_JWT_SECRET"
class Token {
    generateAccessToken(usuario) {
        return jwt.sign(usuario, secret_key, { expiresIn: '7d' });
    }
    validateToken(accessToken) {
        jwt.verify(accessToken, secret_key, (err, verifiedJwt) => {
            if (err) {
               return false;
            } else {
                return true;
            }
        }
        );

    }

}


module.exports = new Token;
