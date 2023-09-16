const { StatusCodes } = require('http-status-codes');

/**
 *
 * @param {Object} req - The express request object
 * @param {Object} res - The express response object
 * @param {function} next - The express next function
 * @returns User information
 */
const getUser = (req, res, next) => {
  return res.status(StatusCodes.OK).json({
    user: req.user,
  });
};

module.exports = { getUser };
