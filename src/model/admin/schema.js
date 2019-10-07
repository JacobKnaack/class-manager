'use strict';

const mongoose = require('mongoose');
const UserSchema = require('../user');

const roles = UserSchema.roles;

UserSchema.add({
  role: { type: String, default: roles.ADMIN, required: true, enum: [roles.ADMIN]}
});

module.exports = mongoose.model("Admin", UserSchema);
