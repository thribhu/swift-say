/**
 * @fileoverview This is a middleware which only furthers authenticated user to next requests
 * @module middlewares
 */
const sdk = require('../Casdoor');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
/**
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Express next object
 */
const OnlyAuthenticatedUser = (req, res, next) => {
  const { authorization } = req.headers;
  let [_, token] = authorization.split(' '); // jwt token
  try {
    if (!token || token === undefined) {
      res
        .status(StatusCodes.NETWORK_AUTHENTICATION_REQUIRED)
        .send(ReasonPhrases.NETWORK_AUTHENTICATION_REQUIRED);
    } else {
      const user = sdk.parseJwtToken(token);
      if (Object.values(user)) {
        req.user = user;
        next();
      } else {
        throw new Error('Invalid JWT token');
      }
    }
  } catch (err) {
    throw err;
  }
};

const extractBearerToken = (authrization) => {
  const [, token] = authrization.split(' ');
  return token;
};

module.exports = OnlyAuthenticatedUser;
