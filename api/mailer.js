const ENV       = require('../startup/env');
const Mandrill  = require('mandrill-api').Mandrill;
const merge     = require('lodash').merge;

const MandrillAPI = new Mandrill(ENV.MANDRILL_APIKEY);

const _private = {
  send: function(params) {
    MandrillAPI.messages.sendRaw(params, function(err) {
      const notSent = err && err[0].status !== 'sent';
      const message = notSent ? '[Error] ' + JSON.stringify(err) : '[Sent]';
      console.log('[Mandrill]' + message);
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

const send = function(emailObj) {
  return _private.send(_private.params(emailObj));
};

module.exports = {
  send,
  _private,
  MandrillAPI
};
