'use strict';

const express = require('express');
const router = express.Router();

router.get('/api/students', getStudents);
// router.get('/api/student/:id', getStudentById);

function getStudents(req, res) {

}

module.exports = router;
