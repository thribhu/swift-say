/**
 * @fileoverview Casbin enforcer
 */
const { newEnforcer } = require('casbin');
const path = require('path');

const modelPath = path.join(__dirname, 'model.conf');
const policyPath = path.join(__dirname, 'policy.csv');
async function getEnforcer() {
	let enforcer = await newEnforcer(modelPath, policyPath);
	return enforcer;
}
getEnforcer();
module.exports = getEnforcer();
