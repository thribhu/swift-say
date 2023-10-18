/**
 * @fileoverview A helper function which validates the object
 * @module @milana/library
 */

/**
 *
 * @param {*} value - The value to be validated as a valid js datatype
 * @return {boolean} - False, if the value is null, undefined
 */

function isValid(value) {
  return value !== undefined && value !== null;
}

/**
 *
 * @param {Object} data - Object which needs to validated
 * @param {Object} [options] -  Additional options for validation
 * @param {boolean} [options.requireAllFields] - If true, all fields are required
 * @param {string[]} [options.requiredFields] - An array of field names required
 * @param {Function} [options.customValidator] - A custom validtion function
 * @returns {boolean} - True if the data is valid according to the criteria
 */

function isValidObject(data, options = {}) {
  const {
    requiredFields = [],
    requireAllFields = false,
    customValidator = isValid,
  } = options;
  const keys = Object.keys(data);
  try {
    if (requireAllFields) {
      for (const key of keys) {
        if (!customValidator(data[key])) {
          throw new Error(`Validation failed for the ${key}`);
        }
      }
    } else {
      for (const key of requiredFields) {
        if (!keys.includes(key) || !customValidator(data[key])) {
          throw new Error(`Validation failed for the ${key}`);
        }
      }
    }
    return true;
  } catch (err) {
    throw err;
  }
}

module.exports = isValidObject;
