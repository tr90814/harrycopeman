const ENV = require('./env');

const hasBearerAuth = function(req) {
  const token = req.headers.authorization;
  return ENV.API_TOKENS.map((token) => 'Bearer ' + token).indexOf(token) !== -1;
};

const hasAuthToken = function(req) {
  const token = req.body.token;
  return ENV.API_TOKENS.indexOf(token) !== -1;
};

const auth = function(req, res, next) {
  if (hasAuthToken(req) || hasBearerAuth(req)) return next();
  console.info("[Authenticate][check] failed");
  return res.status(401).json({ message: "Unauthorised" });
};

module.exports = {
  auth,
  hasAuthToken,
  hasBearerAuth
};
