const express = require('express');
const MailMap = require('../api/mail_map');
const Methods = require('../api/methods');
const Mailer  = require('../api/send_email');
const Utils   = require('./utilities');
const router  = express.Router();

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

// /mail_map/:mail_id
router.route('/mail_map/:email')

  .get((req, res) => {
    MailMap.find({ forwardingAddress: req.params.email })
      .then((mailMap) => res.json(mailMap))
      .catch((err) => res.send(err));
  })

  .put((req, res) => {
    Methods.update(req.params.oldEmail, req.params.newEamil)
      .then((mailMap) => res.json(mailMap))
      .catch((err) => res.send(err));
  })

  .delete(function(req, res) {
    MailMap.remove({ _id: req.params.mail_id })
      .then((result) => res.json({ message: 'Successfully deleted mail map for id:' + result }))
      .catch((err) => res.send(err));
  });

router.route('/inbound')
  .post((req, res) => {
    const events = Utils.parseArray(req.body.mandrill_events);
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
