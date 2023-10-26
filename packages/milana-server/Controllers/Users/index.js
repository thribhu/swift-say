const express = require('express');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const logger = require('../../logger');
const userSchema = require('../../Entities/User/User.schema');
const User = require('../../Entities/User');
const { initializeClient } = require('../../DatabaseClient/ClientInstance');

/**
 *
 * @param {express.Request} req - The express request object
 * @param {express.Response} res - The express response object
 * @returns User information
 */
const getUser = async (req, res) => {
	const { db } = await initializeClient();
	const { id } = req.user;
};

/**
 *
 * @param {express.Request} req - The express request object
 * @param {express.Response} res - The express response object
 * @param {number} status - Success status code
 * @returns {void} - Returns response back to the restfull client
 */
const saveUser = async (req, res, status) => {
	try {
		const { error, value } = userSchema.validate(req.body);
		if (error) {
			throw new Error(error);
		} else {
			const user = new User(value);
			let save;
			if (status === 201) {
				save = await user.save();
			} else {
				save = await user.save(value);
			}
			if (save) {
				return res
					.status(status === 201 ? StatusCodes.CREATED : StatusCodes.ACCEPTED)
					.send(status === 201 ? ReasonPhrases.CREATED : ReasonPhrases.ACCEPTED);
			} else {
				logger.info(`Unable to save user ${value.username} in the database.`);
				return res.status(StatusCodes.NOT_ACCEPTABLE).send(ReasonPhrases.NOT_ACCEPTABLE);
			}
		}
	} catch (err) {
		logger.error(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
	}
};
module.exports = { getUser, saveUser };
