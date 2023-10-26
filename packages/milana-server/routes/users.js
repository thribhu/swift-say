var express = require('express');
var router = express.Router();
const { getUser, saveUser } = require('../Controllers/Users');
const authMiddleware = require('../middlewares/onlyAuthenticated');

/**
 * Get user information
 */
router.get('/', authMiddleware, function (req, res, next) {
	return getUser(req, res, next);
});
router.post('/', (req, res) => {
	return saveUser(req, res, 201);
});
router.put('/', (req, res) => {
	return saveUser(req, res, 202);
});

module.exports = router;
