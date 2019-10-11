'use strict';

require('dotenv').config();
const server = require('./src/server.js');

server.mongoConnect()
  .then(() => {
    if (process.env.NODE_ENV === 'development') {
      server.initTestUser({
        email: "test@test.com",
        password: "test",
        isAdmin: true,
      });
    }
    server.start()
  })
  .catch(console.error);
