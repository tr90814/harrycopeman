import { ENV } from './meteor_context';
import { parseArray } from './utilities';

const _private = {
  hasBearerAuth: function(req) {
    const token = req.headers.authorization;
    return parseArray(ENV().API_TOKENS.map(function(token) {
      return 'Bearer ' + token;
    })).indexOf(token) != -1;
  },

  hasAuthToken: function(req) {
    const token = req.body.token;
    return parseArray(ENV().API_TOKENS).indexOf(token) != -1;
  }
};

const authCheck = function(req, res, next) {
  if (!_private.hasAuthToken(req) && !_private.hasBearerAuth(req)) {
    console.info("[Authenticate][check] failed");
    res.statusCode = 401;
    return res.end("Unauthorised");
  } else {
    console.info("[Authenticate][check] passed");
    next();
  }
};

module.exports = {
  authCheck,
  _private
};
