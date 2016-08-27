const { isArray, toArray } = require('lodash');

const parseArray = function(array) {
  return isArray(array) ? array : JSON.parse(array);
};

const promisify = function(fn) {
  return function() {
    const args = toArray(arguments);
    return new Promise((resolve, reject) => {
      args.push((err, res) => err ? reject(err) : resolve(res));
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
