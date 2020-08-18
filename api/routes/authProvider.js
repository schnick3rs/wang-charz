if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const { JWT_SECRET } = process.env;

import { v4 } from 'uuid';

const authProvider = require('jsonwebtoken');

const JWT_ISSUER = 'doctors-of-doom.com';

module.exports = {
  sign: (userId, jwtPayload) => {
    const jwtOptions = {

      expiresIn: '1h',

      // Identifies the recipients that the JWT is intended for.
      // audience: '',

      // Identifies principal that issued the JWT.
      issuer: JWT_ISSUER,

      // Case sensitive unique identifier of the token even among different issuers.
      jwtid: v4(),

      // Identifies the subject of the JWT.
      subject: `${userId}`,

    };

    const token = authProvider.sign(jwtPayload, JWT_SECRET, jwtOptions);

    return token;
  },
  verify: (token) => {
    const jwtVerifyOptions = {
      issuer: [JWT_ISSUER],
    };

    const decoded = authProvider.verify(token, JWT_SECRET, jwtVerifyOptions);

    return {
      ...decoded,
      token,
    };
  },
  verifyRequest: (request) => {
    const authHeader = request.header('Authorization');

    const token = authHeader.split('Bearer ')[1];

    const jwtVerifyOptions = {
      issuer: [JWT_ISSUER],
    };

    const decoded = authProvider.verify(token, JWT_SECRET, jwtVerifyOptions);

    return {
      ...decoded,
      token,
    };
  },
};
