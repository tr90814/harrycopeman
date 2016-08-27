const ENV          = require('../startup/env');
const MailMap      = require('./mail_map');
const randomString = require('randomstring');

const proposeEmail = function() {
  return randomString.generate({capitalization: 'lowercase', length: 20}) + '@' + ENV.DOMAIN;
};

const generate = function() {
  const email = proposeEmail();
  console.log('[generated]:', email);
  return MailMap.findOne({ inboundEmail: email }).count() > 0 ? generate() : email;
};

module.exports = {
  generate,
  proposeEmail
};
