'use strict';

const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
  const { auth } = request.cookies;
  if (auth && jwt.verify(auth, process.env.API_SECRET)) {
    request.authToken = auth;
  }
  next();
}
