'use strict';

module.exports = (err, req, res) => {
  res.status(500);
  res.send({ error: err });
  res.end();
}