'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('../model/user');
const auth = require('../middleware/auth');

authRouter.post('/api/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then( (user) => {
      req.token = user.generateToken();
      req.user = user;
      res.set('token', req.token);
      res.cookie('auth', req.token);
      res.send(req.token);
    }).catch(next({status: 401, message: 'Invalid User ID / Password'}));
});

authRouter.post('/api/signin', auth(), (req, res, next) => {
  res.cookie('auth', req.token);
  res.send(req.token);
});

module.exports = authRouter;
