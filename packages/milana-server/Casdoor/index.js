/**
 * @file: Casdoor/index.js
 * @fileoverview: Establish connection between casdoor application and server
 * @module Casdoor
 * created: Sat Sep 16 2023 23:34:11 GMT+0530
 */

const { SDK } = require('casdoor-nodejs-sdk');
const config = require('./config');

/**
 * Represents a fresh casdoor sdk connection on every require
 */

class Casdoor {
  /**
   * Create new casdoor connection
   * @constructor
   * @param {Object} casdoorConfig - Casdoor application configuration
   * @see {@link https://github.com/casdoor/casdoor-nodejs-react-example#installation}
   * @param {string} casdoorCert - Casdoor application public certificate
   */
  constructor(casdoorConfig = config) {
    this.config = casdoorConfig;
    this.sdk = this.connect();
  }
  /**
   *
   * @returns an Casdoor SDK instance
   */
  connect() {
    const sdk = new SDK(this.config);
    return sdk;
  }
}
const instance = new Casdoor();

module.exports = instance.sdk;
