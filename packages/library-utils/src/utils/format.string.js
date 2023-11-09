/**
 * @fileoverview Exports utility helpers to format string
 * @module utility
 */
const uriRegex = require("../regex");

/**
 *
 * @description Removes unwanted space in the string provided
 * @param {string} data - String data to be formatted
 * @returns {string | null} False if no data is provided else formatted string
 */
function stripUnwanted(data) {
  if (!data || !data.length || data === undefined) {
    return null;
  } else {
    let trimmed = data.trim();
    if (trimmed.length !== data.length) {
      return trimmed;
    } else {
      return data;
    }
  }
}

/**
 *
 * @param {string} data Single line of string after which a white space is added
 * @param {Object} options Additional list of options
 * @param {boolean} options[before] If true, add white space before the line
 * @param {boolean} options[after] If true, add white space after the line
 * @param {boolean} options[trim] If true, Remove unwanted whitespace
 * @returns {string | null} Returns formatted string
 */
function addWhiteSpace(data, options) {
  if (!data || !data.length || data === undefined) {
    return null;
  } else {
    let stringToFormat = data;
    if (options.trim) {
      stringToFormat = stripUnwanted(data);
    }
    if (options.before) {
      return "\n" + stringToFormat;
    } else {
      return stringToFormat + "\n";
    }
  }
}

/**
 *
 * @param {string} data String to format as title - Bold text
 * @param {Object} options Additional properties for the title format
 * @param {boolean} options[trim] If true, remove the unwanted whitespace
 * @param {boolean} options[space] If true, add new line after the string
 * @returns {null | string} returns bolder string supports only whatspp
 */
function formatTitle(data, options) {
  if (!data || !data.length || data !== undefined) {
    return null;
  } else {
    let formattedString = data;
    const { trim, space } = options;
    if (trim) {
      formattedString = stripUnwanted(data);
    }
    if (space) {
      formattedString = addWhiteSpace(formattedString);
    }
    return decorateText(formattedString, "*");
  }
}

/**
 * @description Converts the string to Italic
 * @param {string} data
 * @returns {null|string}Italic format typed face of the data string
 */
function formatItalic(data) {
  if (!data || !data.length || data === undefined) {
    return null;
  }
  return decorateText(data, "_");
}

/**
 * @description Converts the string to Strikethrough
 * @param {string} data
 * @returns {null | string} Returns a strike through format of string
 */
function formatStrikeThrough(data) {
  if (!data || !data.length || data === undefined) {
    return null;
  }
  return decorateText(data, "~");
}

/**
 *
 * @param {string} data String to be decorated
 * @param {string} decorator Tags which decorate the data string
 * @returns {null | string} returns decorated string
 */
function decorateText(data, decorator) {
  if (!data || !data.length || data === undefined) {
    return null;
  } else {
    return `${decorator}${data}${decorator}`;
  }
}
/**
 *
 * @param {string[]} data Array of string options
 * @returns {null | string} Returns list of numbered option
 */
function formatList(data) {
  if (!data || !data.length || data === undefined) {
    return null;
  } else {
    let formatted = "";
    data.forEach((option, i) => {
      formatted.concat(addWhiteSpace(`${i + 1} option`));
    });
    if (!formatted.length) {
      return null;
    } else return formatted;
  }
}
/**
 *
 * @param {string[]} data Array of URI
 */
function formatLinks(data) {
  if (!data.length) {
    return null;
  } else {
    let formatted = "";
    data.forEach((uri) => {
      if (uriRegex.test(uri)) {
        const uri = new URI(uri);
        if (uri) {
          formatted.concat(addWhiteSpace(uri));
        }
      } else {
        return null;
      }
    });
    if (!formatted.length) {
      return null;
    } else return formatted;
  }
}
module.exports = {
  stripUnwanted,
  decorateText,
  formatStrikeThrough,
  formatItalic,
  formatTitle,
  formatList,
  formatLinks,
};
