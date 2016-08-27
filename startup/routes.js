const express  = require('express');
const MailMap  = require('../api/mail_map');
const Methods  = require('../api/methods');
const Mailer   = require('../api/send_email');
const Utils    = require('./utilities');
const validate = require('./validate').validate;
const schemas  = require('./schemas');
const router   = express.Router();

// /mail_map
router.route('/mail_map')
  .post((req, res) => {
    Methods.insert(req.body.email)
      .then((inboundAddress) => res.json({ inboundAddress }))
      .catch(res.send);
  })

  .get((req, res) => {
    return MailMap.find()
      .then((mailMaps) => res.json(mailMaps))
      .catch((err) => res.send(err));
  });

// /mail_map/:email
router.route('/mail_map/:email')

  .get((req, res) => {
    validate(res, schemas.EMAIL, req.params.email);

    MailMap.find({ forwardingAddress: req.params.email })
      .then((mailMap) => res.json(mailMap))
      .catch((err) => res.send(err));
  })

  .put((req, res) => {
    validate(res, schemas.EMAIL, req.params.email);
    validate(res, schemas.EMAIL, req.body.newEmail);

    Methods.update(req.params.email, req.body.newEmail)
      .then((mailMap) => res.json(mailMap))
      .catch((err) => res.send(err));
  })

  .delete((req, res) => {
    validate(schemas.STRING, req.params.email);

    MailMap.remove({ _id: req.params.email })
      .then(() => res.json({ message: 'Successfully deleted mail map' }))
      .catch((err) => res.send(err));
  });

router.route('/inbound')
  .post((req, res) => {
    const events = Utils.parseArray(req.body.mandrill_events);

    validate(res, schemas.STRING, events.msg.raw_msg);
    validate(res, schemas.STRING, events.msg.from_name);
    validate(res, schemas.STRING, events.msg.email);

    res.end(200);

    events.forEach((event) => {
      if (event.event !== 'inbound') return;
      Mailer.send({
        "raw_message": event.msg.raw_msg,
        "from_email": "forwarding@farewill.com",
        "from_name": event.msg.from_name,
        "to": [Methods.map(event.msg.email)]
      });
    });
  });

module.exports = router;
