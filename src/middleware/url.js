'use strict';

const url = require('url');

module.exports = (req, res, next) => {
  req.location = url.format({
    protocol: req.protocol,
    host: req.get('host')
  });
  next();
};
