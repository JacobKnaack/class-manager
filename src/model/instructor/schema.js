'use strict';

const mongoose = require('mongoose');
const UserSchema = require('../user');

const roles = UserSchema.roles;

UserSchema.add({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, default: roles.INTRUCTOR, required: true, enum: [roles.INTRUCTOR] },
});

module.exports = mongoose.model('Student', UserSchema);
