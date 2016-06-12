import { Picker } from 'meteor/meteorhacks:picker';
import BodyParser from 'body-parser';
import { Meteor } from './meteor_context';
import { authCheck } from './authenticate';
import { parseArray } from './utilities';
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
    const query = { forwardingAddress: oldEmail };

    ForwardingMap.update(query, {
      forwardingAddress: newEmail,
      updatedAt: new Date()
    }, {multi: true});

    const emails = ForwardingMap.find(query).fetch().map((el) => {
      return el.forwardingAddress;
    });

    return res.end(emails);
  },

  redirectMail: function(params, req, res) {
    const events = parseArray(req.body.mandrill_events);
    res.end();

    events.forEach((event) => {
      if (event.event !== 'inbound') return;
      sendEmail({
        "raw_message": event.msg.raw_msg,
        "from_email": "forwarding@farewill.com",
        "from_name": event.msg.from_name,
        "to": [ForwardingMap.map(event.msg.email)]
      });
    });
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


Meteor.startup(() => {
  console.log(ForwardingMap.find().fetch());
});

