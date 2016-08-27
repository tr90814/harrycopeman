const EmailAddresses = require('./email_addresses');
const MailMap        = require('./mail_map');

module.exports = {
  map: function(email) {
    const obj = MailMap.findOne({inboundAddress: email});
    if (obj && obj.forwardingAddress) return obj.forwardingAddress;
    throw new Error('[ADDRESS_NOT_FOUND]', email);
  },

  insert: function(email) {
    const mail = new MailMap();
    const date = new Date();

    mail.forwardingAddress = email;
    mail.inboundAddress = EmailAddresses.generate();
    mail.createdAt = date;
    mail.updatedAt = date;

    return mail.save().then(() => mail.inboundAddress);
  },

  update: function(id, email) {
    return MailMap.update(
      { _id: id },
      { $set: { forwardingAddress: email, updatedAt: new Date() } },
      { multi: true }
    );
  }
};
