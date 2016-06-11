import { merge } from 'lodash';

let Meteor;
let Random;

// Test stubbing for Meteor libraries
if (process.argv.join('').match('tests')) {
  Random = {
    id: function() {}
  };
  Meteor = {
    methods: function() {},
    Error: function() { throw new Error(arguments[0]); },
    settings: {
      API_TOKENS: ['test_token']
    },
    absoluteUrl: function() {
      return 'test.com/';
    },
    setTimeout: setTimeout
  };
} else {
  Meteor = require('meteor/meteor').Meteor;
  Random = require('meteor/random').Random;
}

// Merge in Node env
const settings = merge(Meteor.settings, process.env);

// ENV getter function
const ENV = function() {
  return {
    DOMAIN: settings.DOMAIN,
    MANDRILL_API_KEY: settings.MANDRILL_API_KEY
  };
};

module.exports = {
  Meteor,
  Random,
  ENV
};
