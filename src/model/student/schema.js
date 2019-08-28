'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = Schema({
  first: { type: String, required: true },
  last: { type: String, required: true },
  email: { type: String, required: true },
  ta: { type: Schema.Types.ObjectId, ref: 'TeachingAssistant' }
});

module.exports = mongoose.model('Student', studentSchema);