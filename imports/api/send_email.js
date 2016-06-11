import { Meteor, ENV } from '../startup/meteor_context';
import { Mandrill } from 'mandrill-api';
import { merge } from 'lodash';

const MandrillAPI = new Mandrill(Meteor.settings.MANDRILL_APIKEY);

const _private = {
  send: function(params) {
    MandrillAPI.messages.sendRaw(params, function(err) {
      if (err) {
        console.log('[Mandrill][Error] ' + err.message);
      } else {
        console.log('[Mandrill][Sent] Ping error emails to: ' + ENV().EMAILS);
      }
    });
  },

  addresses: function() {
    return ENV().EMAILS.map((email) => {
      return { "email": email };
    });
  },

  params: function(emailObj) {
    return merge(emailObj, {
      "key": ENV().MANDRILL_APIKEY,
      "async": false,
      "ip_pool": "Main Pool",
      "send_at": "example send_at",
      "return_path_domain": null
    });
  }
};

const sendEmails = function(emailObj) {
  return _private.send(_private.params(emailObj));
};

module.exports = {
  sendEmails,
  _private,
  MandrillAPI
};

