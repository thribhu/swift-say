/**
 * @fileoverview Abstract user class for various scoped users
 * @module User
 */

const { initializeClient } = require('../../DatabaseClient/ClientInstance');
const logger = require('../../logger');

class User {
	/**
	 * Create a user instance from mongodb collection
	 * @constructor
	 * @param {object} user - User object
	 * @param {string} user.id - User's Id (casdoor id)
	 * @param {string} user.username - User's username name (casdoor display name)
	 * @param {string} user.displayName - User's display name (casdoor display name)
	 * @param {string} user.email - User's email
	 * @param {("male"|"female"|"other")} user.gender - User's gender
	 * @param {number} user.age - User's age
	 * @param {string[]} user.roles - User's role on the application
	 */
	constructor(user) {
		const { id = null, username, displayName, email, gender, age, roles } = user;
		this.username = username;
		this.displayName = displayName;
		this.email = email;
		this.gender = gender;
		this.age = age;
		this.roles = roles;
		this._id = id;
		this.isEsistingUser();
	}
	async setup() {
		const { client } = await initializeClient();
		this.client = await client.getCollection('Users', true);
	}
	/**
	 *
	 * @returns {string|boolean} Returns ID of the user if exists else fase
	 */
	async isEsistingUser() {
		if (!this.client) {
			await this.setup();
		}
		const userExists = await this.client.findOne({ username: this.username });
		if (userExists) {
			this._id = userExists._id.toString();
			return userExists._id.toString();
		} else {
			logger.info(`${this.username} has no account yet.`);
			return false;
		}
	}
	/**
	 *
	 * @param {object} user - User object
	 * @param {string} user.username - User's  username (casdoor username)
	 * @param {string} user.displayName - User's display name (casdoor display name)
	 * @param {string} user.email - User's email
	 * @param {("male"|"female"|"other")} user.gender - User's gender
	 * @param {number} user.age - User's age
	 * @param {string[]} user.roles - User's role on the application
	 * @returns {boolean} True, if existing record is updated or new record created
	 */
	async save(user) {
		try {
			if (!this.client) {
				await this.setup();
			}
			const isDeffaultUser = await this.isEsistingUser();
			if (isDeffaultUser) {
				if (user) {
					const updateRequest = await this.client.findOneAndUpdate(
						{ _id: isDeffaultUser },
						{ $set: { ...user } },
						{ returnOriginal: false },
					);
					if (updateRequest) {
						logger.info(`Updating ${this.username}'s record.`);
						return true;
					} else {
						return false;
					}
				} else {
					logger.info('Invalid update object. Try again.');
					return false;
				}
			} else {
				let newUser = await this.client.insertOne({
					username: this.username,
					displayName: this.displayName,
					email: this.email,
					roles: this.roles,
					gender: this.gender,
					age: this.age,
					deactivate: false,
					...user,
				});
				this._id = newUser._id;
				return true;
			}
		} catch (err) {
			logger.error(err);
			return false;
		}
	}
	/**
	 * @async
	 * @param {boolean} activateAccount - Set to true to activate the account, false to deactivate it.
	 * @returns {boolean} - True if the account status is changed, else false
	 */
	async toggleAccountStatus(activateAccount) {
		try {
			if (this.client) {
				this.setup();
			}
			let defaultUser = await this.isEsistingUser();
			if (!defaultUser) {
				throw new Error(`Invalid: ${this.username} cannot perform account status change.`);
			} else {
				const updatedStatus = await this.client.findOneAndUpdate(
					{ _id: defaultUser },
					{ $set: { deactivate: activateAccount } },
					{ returnOriginal: false },
				);
				if (updatedStatus) {
					return true;
				} else {
					return false;
				}
			}
		} catch (err) {
			logger.error(err);
			return false;
		}
	}
}

module.exports = User;
