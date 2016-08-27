const ENV       = require('../startup/env');
const Mandrill  = require('mandrill-api').Mandrill;
const merge     = require('lodash').merge;

const MandrillAPI = new Mandrill(ENV.MANDRILL_APIKEY);

const _private = {
  send: function(params) {
    MandrillAPI.messages.sendRaw(params, function(err) {
      if (err && err[0].status !== 'sent') {
        console.log('[Mandrill][Error] ' + JSON.stringify(err));
      } else {
        console.log('[Mandrill][Sent]');
      }
    });
  },

  addresses: function() {
    return ENV.EMAILS.map((email) => {
      return { "email": email };
    });
  },

  params: function(emailObj) {
    return merge(emailObj, {
      "key": ENV.MANDRILL_APIKEY,
      "async": false,
      "ip_pool": "Main Pool",
      "return_path_domain": null
    });
  }
};

const sendEmail = function(emailObj) {
  return _private.send(_private.params(emailObj));
};

module.exports = {
  sendEmail,
  _private,
  MandrillAPI
};
