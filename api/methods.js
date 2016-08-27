const EmailAddresses = require('../api/email_addresses');
const MailMap        = require('./mail_map');

module.exports = {
  map: function(email) {
    const obj = MailMap.findOne({inboundAddress: email});
    if (obj && obj.forwardingAddress) return obj.forwardingAddress;
    throw new Error('[ADDRESS_NOT_FOUND]', email);
  },

  insert: function(email) {
    // validate email string
    const mail = new MailMap();
    const date = new Date();

    mail.forwardingAddress = email;
    mail.inboundAddress = EmailAddresses.generate();
    mail.createdAt = date;
    mail.updatedAt = date;
    console.log('method');
    return mail.save().then(() => mail.inboundAddress);
  },

  update: function(oldEmail, newEmail) {
    // Validate email strings
    return MailMap.findOne({ forwardingAddress: oldEmail })
      .then((mailMap) => {
        mailMap.forwardingAddress = newEmail;
        mailMap.updatedAt = new Date();
        return mailMap.save();
      });
  }
};
