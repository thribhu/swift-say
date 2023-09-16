/**
 * @fileoverview middleware which allows only supervisor
 */
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const enforcer = require('../Casbin');

/**
 *
 * @param {Object} req - The express request
 * @param {Object} res - The express response
 * @param {function} next - The express next function
 */
module.exports = async (req, res, next) => {
  try {
    const user = req.user;
    const roles = user.roles;
    const path = req.path;
    const method = req.method;
    console.log(roles[0].name);
    const hasPermission = await enforcer.enforce(roles[0].name, path, method);
    console.log(hasPermission);
    if (hasPermission) {
      next();
    } else {
      res.status(StatusCodes.FORBIDDEN).json({
        message: `${user.displayName} has no authorisation`,
        reason: ReasonPhrases.FORBIDDEN,
      });
    }
  } catch (err) {}
};
