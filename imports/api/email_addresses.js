import { ENV } from '../startup/meteor_context';
import { ForwardingMap } from './forwarding_map';
import randomString from 'randomstring';

const _private = {
  proposeEmail: function() {
    return randomString.generate({capitalization: 'lowercase', length: 20}) + '@' + ENV().DOMAIN;
  }
};

const generateEmailAddress = function() {
  const email = _private.proposeEmail();
  console.log('[generated]:', email);
  return ForwardingMap.find({inboundEmail: email}).count() > 0 ? generateEmailAddress() : email;
};

module.exports = {
  generateEmailAddress,
  _private
};
