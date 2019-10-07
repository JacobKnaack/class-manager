'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
  response.render('pages/index');
});

router.get('/student/:student', (request, response, next) => {
  if (request.params.student) {
    response.render('pages/student');
  }
  next('No Student provided');
});

module.exports = router;
