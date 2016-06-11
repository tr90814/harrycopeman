import { isArray, toArray } from 'lodash/fp';

const parseArray = function(array) {
  return isArray(array) ? array : JSON.parse(array);
};

const promisify = function(fn) {
  return function() {
    const args = toArray(arguments);
    return new Promise(function(resolve, reject) {
      args.push(function(err, res) {
        return err ? reject(err) : resolve(res);
      });
      return fn.apply(this, args);
    });
  };
};

const log = function(data) {
  console.log(data);
  return data;
};

module.exports = {
  parseArray,
  promisify,
  log
};
