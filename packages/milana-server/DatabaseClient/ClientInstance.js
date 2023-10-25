const { MongoClient } = require('mongodb');
const logger = require('../logger');
const getConnectionStringUri = require('./NewConnection');
const connectToMongo = new WeakMap();
const runtime_dev = process.env.COSMOS_DEV_ENV;
const runtime_test = process.env.COSMOS_TEST_ENV;

/****************************************
 * Azure cosmos nosql credentials from env
 * If an invalid value is provided, then
 * the node process is exited with code 1
 ****************************************/

const username = process.env.COSMOS_USER || 'predictiveresearch';
const password =
	process.env.COSMOS_PASSWORD ||
	'UX55dPf0Z1bymZkBCKM8ubeQNzrGNcNaJ2nABxJvSvJp48w5efoTSsmPQvBX3k2l5BHZ92UfRDItACDb74BRuw==';
const host = process.env.COSMOS_HOST || 'predictiveresearch.mongo.cosmos.azure.com';
const appName = process.env.COSMOS_APP_NAME || '@predictiveresearch@';

class MilanaDatabaseClient {
	/**
	 * Creates a new instance of azure cosmose databse client.
	 *
	 * @param {string} username - MongoDB username
	 * @param {string} password - MongoDB password
	 * @param {string} host - MongoDB instance host
	 * @param {string} appName - MongoDB application name
	 */
	constructor(username, password, host, appName) {
		this.username = username;
		this.password = password;
		this.host = host;
		this.appName = appName;
		this.dbInstance = null;

		connectToMongo.set(this, async () => {
			const url = getConnectionStringUri(this.username, this.password, this.host, this.appName);
			const databaseName = process.env.NODE_ENV === 'test' ? runtime_test : runtime_dev;
			const client = new MongoClient(url);
			try {
				await client.connect();
				this.dbInstance = client.db(databaseName);
			} catch (err) {
				console.error('Failed to connect to MongoDb:', err);
				process.exit(1);
			}
		});
	}

	/**
	 * Connect to MongoDB and return the database instance.
	 *
	 * @returns {Promise<MongoClient>} A promise that resolves with the MongoDB database instance.
	 */
	async connect() {
		const connectMethod = connectToMongo.get(this);
		await connectMethod();
		return this.dbInstance;
	}
	/**
	 *
	 * @param {string} collection - Collection to create
	 * @returns void
	 */
	async createCollection(collection) {
		try {
			await this.dbInstance.createCollection(collection);
		} catch (err) {
			logger.error(err);
		}
	}
	/**
	 *
	 * @param {string} collection - Collection to destroy
	 * @returns void
	 */
	async dropCollection(collection) {
		try {
			await this.dbInstance.dropCollection(collection);
		} catch (err) {
			logger.error(err);
		}
	}
	/**
	 *
	 * @param {string} collection - Returns the instance of the collection
	 * @param {boolean} force - True, creates a new collection and returns the instance of newly created collection
	 * @returns {MongoDBCollection} - Instance of requested collection
	 */
	async getCollection(collection, force = false) {
		const collections = await this.dbInstance.listCollections().toArray();
		if (collections.map((c) => c.name).includes(collection)) {
			return this.dbInstance.collection(collection);
		} else if (force) {
			await this.createCollection(collection);
			return this.dbInstance.collection(collection);
		} else {
			logger.warn(`Collection ${collection} does not exists.`);
			return null;
		}
	}
}

const client = new MilanaDatabaseClient(username, password, host, appName);
async function initializeClient() {
	await client.connect();
	return { client: client, db: client.dbInstance };
}
module.exports = {
	initializeClient,
};
