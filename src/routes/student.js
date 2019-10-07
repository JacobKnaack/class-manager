'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/api/students', auth("read"), getStudents);
// router.get('/api/student/:id', auth('read'), getStudentById);

function getStudents(req, res) {

}

module.exports = router;
