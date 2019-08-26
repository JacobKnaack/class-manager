'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = Schema({
  name: { type: String, required: true },
  ta: { type: Schema.Types.ObjectId, ref: 'TeachingAssistant' }
});

module.exports = mongoose.model('Student', studentSchema);