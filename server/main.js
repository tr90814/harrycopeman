import '../imports/startup/routes';

import { ForwardingMap } from '../imports/api/forwarding_map';
import { Meteor } from '../imports/startup/meteor_context';

Meteor.startup(() => {
  console.log('[MAP]: inboundAddress => forwardingAddress\n', ForwardingMap.find().fetch().map((el) => {
    return el.inboundAddress + ' => ' + el.forwardingAddress;
  }).join('\n'));
});
