'use strict';

const mongoose = require('mongoose');

const course = mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, unique: true},
  instructor: { type: mongoose.Schema.ObjectId, required: true },
  assistants: { type: Array, required: true },
});

module.exports =  mongoose.model('Course', course);
