import { ENV, Random } from '../startup/meteor_context';
import { ForwardingMap } from './forwarding_map';

const _private = {
  proposeEmail: function() {
    return Random.id() + '@' + ENV().DOMAIN;
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
