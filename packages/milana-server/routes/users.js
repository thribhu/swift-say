var express = require('express');
var router = express.Router();
const { getUser } = require('../Controllers/Users');
const { StatusCodes } = require('http-status-codes');
const authMiddleware = require('../middlewares/onlyAuthenticated');

/**
 * Get user information
 */
router.get('/', authMiddleware, function (req, res, next) {
  return getUser(req, res, next);
});

module.exports = router;
