'use strict';

const express = require('express');
const router = express.Router();

router.get('/students', getStudents);
// router.get('/student/:id', getStudentById);

function getStudents(req, res) {

}

module.exports = router;
