'use strict';

module.exports = (err, req, res) => {
  if (err.status) {
    const statusCode = err.status;
    const statusError = err.message;
    res.status(statusCode).send(statusError).end();
  } else {
    res.status(500);
    res.send(err);
    res.end();
  }
};

