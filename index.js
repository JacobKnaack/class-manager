'use strict';

const server = require('./src/server.js');

server.mongoConnect()
  .then(server.start)
  .catch(console.error);
