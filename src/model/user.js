'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('json-web-token');

exports.roles = {
  STUDENT: 'STUDENT',
  INTRUCTOR: 'INSTRUCTOR',
  TA: 'TA',
  ADMIN: 'ADMIN',
};

const User = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true },
});

User.pre('save', async function() {
  if (this.isModified('password'))
  {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

User.statics.capabilities = {
  STUDENT : ['read'],
  INSTRUCTOR: ['read', 'write', 'delete', 'update'],
  TA: ['read', 'update'],
};

User.methods.capabilities = function() {
  switch(this.role) {
    case STUDENT:
      return User.capabilities[this.role];
    case INSTRUCTOR:
      return User.capabilities[this.role];
    case TA:
      return User.capabilities[this.role];
    default:
      return undefined;
  }
};

User.statics.authenticateToken = function(token) {
  let parsedToken = jwt.verify(token, process.env.API_SECRET);
  let query = {_id: parsedToken.id};
  return this.findOne(query);
};

User.statics.authenticateBasic = function(auth) {
  let query = {username:auth.username};
  return this.findOne(query)
    .then(user => user && user.comparePassword(auth.password))
    .catch(console.error);
};

User.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null);
}

User.methods.generateToken = function(){
  let tokenData = {
    id:this._id,
    capabilities: (this.acl && this.acl.capabilities) || [],
  };
  return jwt.sign(tokenData, process.env.API_SECRET);
}

module.exports = mongoose.model('User', User);
