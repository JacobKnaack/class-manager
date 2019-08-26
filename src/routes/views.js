'use strict';

const express = require('express');
const router = express.Router();

router.get('/', renderHome);
router.get('/:student', renderStudent);

function renderHome(request, response) {
  response.send('index.html');
}

function renderStudent(request, response, next) {
  if (request.params.student) {
    response.send('/views/student.html');
  }
  next('No Student provided');
}

module.exports = router;