import { Mongo } from 'meteor/mongo';
import { merge } from 'lodash';

export const ForwardingMap = merge(new Mongo.Collection('forwarding-map'), {
  map: function(email) {
    return ForwardingMap.findOne({inboundAddress: email}).forwardingAddress;
  }
});
