'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('../model/user');
const auth = require('../middleware/auth');

authRouter.post('/api/signup', (request, response, next) => {
  const { body } = request;
  const user = new User(body);
  user.save()
    .then( (user) => {
      request.token = user.generateToken();
      request.user = user;
      response.set('token', request.token);
      response.cookie('auth', request.token);
      response.send(request.token);
    }).catch(e => {
      next({
      status: 400,
      message: 'Bad Request',
    });
  });
});

authRouter.post('/api/signin', auth(), (request, response, next) => {
  const { token } = request;
  response.cookie('auth', token);
  response.send(token);
});

module.exports = authRouter;
