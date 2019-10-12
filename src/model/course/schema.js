'use strict';

const mongoose = require('mongoose');

const course = mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, required: true },
  name: { type: String, required: true },
  code: { type: String, unique: true},
  instructor: { type: mongoose.Schema.ObjectId },
  assistants: { type: Array },
});

module.exports =  mongoose.model('Course', course);
