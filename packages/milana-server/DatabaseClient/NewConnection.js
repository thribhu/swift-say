/**
 * @param {string} username - Mongoose username
 * @param {string} password - Mongoose password
 * @param {string} host - Mongoose host ip address
 * @param {string} appName - Mongoose app name
 * @param {Object} [options]- Additional options for the connection string
 * @param {boolean} [options.ssl] - Set ssl
 * @param {boolean} [options.retrywrites] - Set retry writes
 * @param {number} [options.maxIdleTimeMS] - Set maximum idle time in milli seconds
 * @param {string|number} [options.port] - Set the application host port
 * @returns {string} Mongoose client connection uri string
 */
function getConnectionStringUri(username, password, host, appName, options = {}) {
	const { ssl = true, retrywrites = false, maxIdleTimeMS = 120000, port = 10255 } = options;
	try {
		if (
			typeof username !== 'string' ||
			typeof password !== 'string' ||
			typeof host !== 'string' ||
			typeof appName !== 'string'
		) {
			throw new Error(
				'Missing or invalid parameter(s). Please provide valid strings for username, password, host, and appName.',
			);
		}
		if (typeof port !== 'string' && isNaN(port)) {
			throw new Error('Invalid port. Port must be a string or a number.');
		}
		const portString = typeof port === 'string' ? port : port.toString();
		return `mongodb://${username}:${password}@${host}:${portString}/?ssl=${ssl}&retrywrites=${retrywrites}&maxIdleTimeMS=${maxIdleTimeMS}&appName=${appName}`;
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
}
module.exports = getConnectionStringUri;
