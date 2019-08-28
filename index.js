'use strict';

const server = require('./src/server.js');

if (Object.keys(server.app.locals).length) {
  server.start();
} else {
  server.config('./class.config.js')
    .then(() => server.start())
    .catch(err => console.log({ message: 'Server error', error: err }));
}