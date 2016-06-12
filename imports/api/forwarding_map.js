import { Meteor } from '../startup/meteor_context';
import { Mongo } from 'meteor/mongo';
import { merge } from 'lodash';

export const ForwardingMap = merge(new Mongo.Collection('forwarding-map'), {
  map: function(email) {
    const obj = ForwardingMap.findOne({inboundAddress: email});
    if (obj && obj.forwardingAddress) {
      return obj.forwardingAddress;
    } else {
      throw new Meteor.Error('[ADDRESS_NOT_FOUND]', email);
    }
  }
});
