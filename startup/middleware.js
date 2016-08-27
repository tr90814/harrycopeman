const ENV         = require('./env');
const parseArray  = require('./utilities').parseArray;

const _private = {
  hasBearerAuth: function(req) {
    const token = req.headers.authorization;
    return parseArray(ENV.API_TOKENS.map(function(token) {
      return 'Bearer ' + token;
    })).indexOf(token) != -1;
  },

  hasAuthToken: function(req) {
    const token = req.body.token;
    return parseArray(ENV.API_TOKENS).indexOf(token) != -1;
  }
};

const auth = function(req, res, next) {
  if (!_private.hasAuthToken(req) && !_private.hasBearerAuth(req)) {
    console.info("[Authenticate][check] failed");
    res.statusCode = 401;
    return res.json({ message: "Unauthorised" });
  } else {
    console.info("[Authenticate][check] passed");
    next();
  }
};

module.exports = {
  auth,
  _private
};
