import '../imports/startup/routes';

import { ForwardingMap } from '../imports/api/forwarding_map';
import { Meteor } from '../imports/startup/meteor_context';

Meteor.startup(() => {
  console.log('[MAP]', ForwardingMap.find().fetch());
});
