const { StatusCodes } = require('http-status-codes');

/**
 *
 * @param {Object} req - The express request object
 * @param {Object} res - The express response object
 * @returns User information
 */
const getUser = (req, res) => {
	return res.status(StatusCodes.OK).json({
		user: req.user,
	});
};

module.exports = { getUser };
