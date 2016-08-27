const fs = require('fs');
const Utils = require('./utilities');
const settings = JSON.parse(fs.readFileSync(process.env.PWD + '/settings.json', 'utf-8'));

module.exports = {
  DOMAIN: settings.DOMAIN,
  MANDRILL_APIKEY: settings.MANDRILL_APIKEY,
  API_TOKENS: Utils.parseArray(settings.API_TOKENS)
};
