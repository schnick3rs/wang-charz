if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const JWT_SECRET = process.env.JWT_SECRET;

const uuidv4 = require('uuid/v4');

const jwt = require('jsonwebtoken');

const JWT_ISSUER = 'doctors-of-doom.com';

module.exports = {
  sign: (userId, jwtPayload) => {

    const jwtOptions = {

      expiresIn: '1h',

      // Identifies the recipients that the JWT is intended for.
      //audience: '',

      // Identifies principal that issued the JWT.
      issuer: JWT_ISSUER,

      // Case sensitive unique identifier of the token even among different issuers.
      jwtid: uuidv4(),

      // Identifies the subject of the JWT.
      subject: `${userId}`,

    };

    const token = jwt.sign(jwtPayload, JWT_SECRET, jwtOptions);

    return token;
  },
  verify: (token) => {

    const jwtVerifyOptions = {
      issuer: [JWT_ISSUER],
    };

    const decoded = jwt.verify(token, JWT_SECRET, jwtVerifyOptions);

    return {
      ...decoded,
      token: token,
    };
  },
};

