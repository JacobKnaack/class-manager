'use strict';

const express = require('express');
const courseRouter = express.Router();

const auth = require('../middleware/auth');
const course = require('../model/course/mongo-class');

courseRouter.get('/api/courses', auth(), (request, response, next) => {
  const { user } = request;
  return course.getByUserId(user._id)
    .then(courses => {
      response.send(courses);
    })
    .catch(next);
});

courseRouter.post('/api/courses', auth(), (request, response, next) => {
  return course.create(request.body)
    .then(course => {
      response.send(course);
    })
    .catch(next);
});

module.exports = courseRouter;
