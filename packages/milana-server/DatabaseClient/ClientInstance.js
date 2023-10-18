const { MongoClient } = require('mongodb');
const getConnectionStringUri = require('./NewConnection');
const connectToMongo = new WeakMap();

/****************************************
 * Azure cosmos nosql credentials from env
 * If an invalid value is provided, then
 * the node process is exited with code 1
 ****************************************/

const username = process.env.COSMOS_USER;
const password = process.env.COSMOS_PASSWORD;
const host = process.env.COSMOS_HOST;
const port = process.env.PORT;
const appName = process.env.COSMOS_APP_NAME;

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
			console.log(url);
			const client = new MongoClient(url);
			try {
				await client.connect();
				this.dbInstance = client.db();
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
}

async function initializeClient() {
	const client = new MilanaDatabaseClient(username, password, host, appName);
	await client.connect();
	return client.dbInstance;
}
module.exports = initializeClient;
