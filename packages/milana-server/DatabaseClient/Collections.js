const logger = require('../logger');
const { initializeClient } = require('./ClientInstance');

/**
 *
 * @async
 * @param {string} collection - Name of the collection to get mongo collection instance
 * @param {boolean} force - It true, create a new collection with the name. Default false
 * @returns {MongoCollection | null } - If exits return mongo collection else return null
 */
async function getCollectionInstance(collection, force = false) {
	try {
		const { client } = await initializeClient();
		const instance = await client.getCollection(...arguments);
		if (instance) {
			return instance;
		} else {
			throw new Error(`FailedOperation: Unable to get collection ${collection}.`);
		}
	} catch (err) {
		logger.error(err);
		return null;
	}
}

module.exports = getCollectionInstance;
