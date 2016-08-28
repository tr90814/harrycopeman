const EmailAddresses = require('./email_addresses');
const MailMap        = require('./mail_map');

module.exports = {
  findForwardingAddress: function(email) {
    return MailMap.findOne({inboundAddress: email})
      .then((obj) => obj.forwardingAddress)
      .then((address) => {
        if (!address) throw new Error('[ADDRESS_NOT_FOUND]', email);
        return address;
      });
  },

  insert: function(email, inboundEmail) {
    const mail = new MailMap();
    const date = new Date();

    mail.forwardingAddress = email;
    mail.inboundAddress = inboundEmail ? inboundEmail : EmailAddresses.generate();
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
