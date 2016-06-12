import { ENV, Random } from '../startup/meteor_context';
import { ForwardingMap } from './forwarding_map';
import { lowerCase } from 'lodash';

const _private = {
  proposeEmail: function() {
    return lowerCase(Random.id()) + '@' + ENV().DOMAIN;
  }
};

const generateEmailAddress = function() {
  const email = _private.proposeEmail();
  return ForwardingMap.find({inboundEmail: email}).count() > 0 ? generateEmailAddress() : email;
};

module.exports = {
  generateEmailAddress,
  _private
};
