/**
 * @fileoverview Casbin enforcer
 */
const { newEnforcer } = require('casbin');
const fs = require('fs');
const path = require('path');

const modelPath = path.join(__dirname, 'model.conf');
const policyPath = path.join(__dirname, 'policy.csv');
const modelConf = fs.readFileSync(modelPath, 'utf-8');
const policyCSV = fs.readFileSync(policyPath, 'utf-8');
// async function getEnforcer() {
//   let enforcer = await newEnforcer(modelConf, policyCSV);
//   return enforcer;
// }
const enforcer = newEnforcer(modelConf, policyCSV);
module.exports = enforcer;
