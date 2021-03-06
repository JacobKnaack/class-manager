'use strict';

const mongoose = require('mongoose');
const UserSchema = require('../user');

const roles = UserSchema.roles;

UserSchema.add({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  ta: { type: mongoose.Schema.ObjectId, required: true },
  role: { type: String, default: roles.STUDENT, required: true },
});

module.exports = mongoose.model('Student', UserSchema);
