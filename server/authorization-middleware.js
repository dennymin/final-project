const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');

function authorizationMiddleware(req, res, next) {
  if (!req.headers['signin-token']) {
    throw new ClientError(401, 'authentication required');
  } else {
    const newToken = req.headers['signin-token'];
    const payload = jwt.verify(newToken, process.env.TOKEN_SECRET);
    req.user = payload;
    next();
  }
}

module.exports = authorizationMiddleware;
