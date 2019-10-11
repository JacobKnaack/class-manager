'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const STUDENT = 'STUDENT';
const INSTRUCTOR = 'INSTRUCTOR';
const TA = 'TA';

exports.roles = {
  STUDENT,
  INSTRUCTOR,
  TA,
};

const user = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true },
  isAdmin: {type: Boolean, required: true, default: false },
});

user.pre('save', async function() {
  if (this.isModified('password'))
  {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

user.statics.capabilities = {
  STUDENT : ['read'],
  INSTRUCTOR: ['read', 'write', 'delete', 'update'],
  TA: ['read', 'update'],
};

user.methods.capabilities = function() {
  switch(this.role) {
    case STUDENT:
      return user.capabilities[this.role];
    case INSTRUCTOR:
      return user.capabilities[this.role];
    case TA:
      return user.capabilities[this.role];
    default:
      return undefined;
  }
};

user.statics.authenticateToken = function(token) {
  let parsedToken = jwt.verify(token, process.env.API_SECRET);
  let query = {_id: parsedToken.id};
  return this.findOne(query);
};

user.statics.authenticateBasic = function(auth) {
  let query = {email: auth.email};
  return this.findOne(query)
    .then(user => user && user.comparePassword(auth.password))
    .catch((e) => e);
};

user.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null);
}

user.methods.generateToken = function(){
  let tokenData = {
    id:this._id,
    capabilities: this.capabilities() || [],
  };

  return jwt.sign(tokenData, process.env.API_SECRET);
}

module.exports = mongoose.model('User', user);
