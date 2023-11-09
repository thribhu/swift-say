/**
 * @fileoverview Message constructor which will format respecting all messaging platforms
 * @module Message
 */
const { stripUnwanted } = require('@message-mannkey/utils');
const logger = require('../../logger');
/**
 * @typedef {Object} MessageOptions
 * @property {number} limit - WORD limit on the message objects message property
 * @property {string[]} images - Ordered set of image URI
 * @property {string[]} videos - Ordered set of video URI
 * @property {"mcq" | "question" | "sms"} kind - Kind of message
 * @property {string[]} answerOptions - list of options for `mcq` kind question
 * @property {function(kind:string): void} format - Format the message in either format provided
 */

/**
 * @typedef {Object} Message
 * @property {string} message - UTF-8 string with word limit set by the subscription
 * @property {MessageOptions} options - Additional parameters to configure the message object
 */

/**
 * @class
 */
class Message {
	/**
	 * @constructor
	 * @param {string} message - UTF-8 string with word limit set by the subscription
	 * @param {MessageOptions} options - Additional parameters to configure the message object
	 */
	constructor(message, options) {
		this.message = message;
		this.options = {
			limit: 500,
			images: [],
			videos: [],
			kind: 'sms',
			answerOptions: [],
			format: null,
			...options,
		};
		if (this.options.limit) {
			if (this.message.length > this.options.limit) {
				logger.warn(`Invalid word limit: ${this.message} is more than ${this.options.limit} limit`);
				return;
			}
		}
		this.format();
	}
	/**
	 *
	 * @returns {void} Strips unwanted whitespace and return the message
	 */
	format() {
		const formatted = stripUnwanted(this.message);
		if (formatted) {
			this.message = formatted;
		} else {
			logger.error(`Invalid message: ${this.message} is not a valid string`);
		}
	}

	/**
	 * @description Saves a draft version of the message
	 * @return {void}
	 */
	saveDraft() {}
	/**
	 * @description Returns list of reverse chronological saved drafts of messages
	 * @returns {Message[]} List of reverse chronological drafted messages
	 */
	getDrafts() {}
	/**
	 * @description Prepare the message to be publish ready state for platforms in the subscription
	 * @param {string[]} platforms - Subscribtion based platforms
	 * @retuns {void}
	 */
	prepare() {}
	/**
	 * @async
	 * @description Send the message
	 * @returns {void}
	 */
	send() {}
}

module.exports = Message;
