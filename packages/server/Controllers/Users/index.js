// eslint-disable-next-line no-unused-vars
const express = require('express');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const logger = require('../../logger');
const userSchema = require('../../Entities/User/User.schema');
const User = require('../../Entities/User');

/**
 *
 * @param {express.Request} req - The express request object
 * @param {express.Response} res - The express response object
 * @returns User information
 */
const getUser = async (req, res) => {
	const { id } = req.user;
	logger.info(`User ${id}`);
	return res.status(200).json(req.user);
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
/**
 * @description Deactivate the user account
 * @param {express.Request} req - The express request object
 * @param {express.Response} res - The express response object
 * @returns {void} - Returns response back to the restfull client
 */
const deactivate = async (req, res) => {
	const { error, value } = userSchema.validate(req.body);
	try {
		if (error) {
			throw new Error(error);
		}
		const user = new User(value);
		const deactivateUser = await user.toggleAccountStatus(true);
		if (deactivateUser) {
			return res.status(StatusCodes.NO_CONTENT).send(ReasonPhrases.NO_CONTENT);
		} else {
			throw new Error('Invalid Operation: Unable to deactivate the user');
		}
	} catch (err) {
		logger.error(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
	}
};
/**
 * @description Reactivate the user account
 * @param {express.Request} req - The express request object
 * @param {express.Response} res - The express response object
 * @returns {void} - Returns response back to the restfull client
 */
const activate = async (req, res) => {
	const { error, value } = userSchema.validate(req.body);
	try {
		if (error) {
			throw new Error(error);
		}
		const user = new User(value);
		const deactivateUser = await user.toggleAccountStatus(false);
		if (deactivateUser) {
			return res.status(StatusCodes.OK).send(ReasonPhrases.OK);
		} else {
			throw new Error('Invalid Operation: Unable to activate the user');
		}
	} catch (err) {
		logger.error(err);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
	}
};
module.exports = { getUser, saveUser, deactivate, activate };
