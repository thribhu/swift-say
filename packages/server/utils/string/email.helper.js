/**
 * Validate if the provided string is a valid email address.
 *
 * @param {string} email - The email address to validate
 * @returns {boolean} True if the email is valid, false otherwise
 */
function isValidEmail(email) {
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return emailRegex.test(email);
}

module.exports = isValidEmail;
