const fs    = require('fs');
const merge = require('lodash').merge;
const Utils = require('./utilities');

// Read settings.json file
const settings  = JSON.parse(fs.readFileSync(process.env.PWD + '/settings.json', 'utf-8'));

module.exports = merge(settings, {
  API_TOKENS: Utils.parseArray(settings.API_TOKENS)
});
