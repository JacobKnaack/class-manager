'use strict';

const express = require('express');
const router = express.Router();

const url = require('../middleware/url');
const authCookies = require('../middleware/authCookies');
const auth = require('../middleware/auth');

router.get('/', url, authCookies, (request, response) => {
  const { location, authToken } = request;
  response.render(
    'pages/index',
    {
      location,
      authToken,
    },
  );
});

router.get('/register', url, (request, response) => {
  response.render('pages/register');
});

router.get('/student/:student', auth(), (request, response, next) => {
  const { student } = request.params;
  if (student) {
    response.render('pages/student');
  }
  next('No Student provided');
});

module.exports = router;
