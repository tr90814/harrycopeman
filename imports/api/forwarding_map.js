import { Mongo } from 'meteor/mongo';
import { merge } from 'lodash';

export const ForwardingMap = merge(new Mongo.Collection('forwarding-map'), {
  map: function(email) {
    const obj = ForwardingMap.findOne({inboundAddress: email});
    if (obj && obj.forwardingAddress) {
      return obj.forwardingAddress;
    } else {
      console.log('[ADDRESS_NOT_FOUND]', email);
    }
  }
});
