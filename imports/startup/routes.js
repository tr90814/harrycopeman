import { HTTP } from 'meteor/http';
import { Picker } from 'meteor/meteorhacks:picker';
import BodyParser from 'body-parser';
import { authCheck } from './authenticate';
import { generateEmailAddress } from '../api/email_addresses';
import { ForwardingMap } from '../api/forwarding_map';
import { sendEmail } from '../api/send_email';

// Helpers
const helpers = {
  create: function(params, req, res) {
    const email = req.body.email;
    const inboundAddress = generateEmailAddress();
    const date = new Date();

    ForwardingMap.insert({
      forwardingAddress: email,
      inboundAddress,
      updatedAt: date,
      createdAt: date
    });

    return res.end(inboundAddress);
  },

  update: function(params, req, res) {
    const oldEmail = req.body.oldEmail;
    const newEmail = req.body.newEmail;

    ForwardingMap.update({forwardingAddress: oldEmail}, {
      forwardingAddress: newEmail,
      updatedAt: new Date()
    });

    return res.end();
  },

  redirectMail: function(params, req, res) {
    console.log(req.body);

    const data = req.body;
    const emailObj = {
      "raw_message": data.msg.raw_msg,
      "from_email": data.msg.from_email,
      "from_name": data.msg.from_name,
      "to": [ForwardingMap.map(data.msg.email)]
    };

    sendEmail(emailObj);

    return res.end();
  }
};

// Middlewares
Picker.middleware(BodyParser.urlencoded({ extended: false }));
Picker.middleware(BodyParser.json());
// Picker.middleware(authCheck);

// Routes
Picker.route('/create', helpers.create);
Picker.route('/update', helpers.update);
Picker.route('/inbound_mail', helpers.redirectMail);

module.exports = helpers;
