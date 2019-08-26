'use strict';

const Model = require('../mongo.js');

/**
 * Student Model extends mongoose model
 * @params {object} schema
 */

class Student extends Model {
  constructor(schema) {
    super(schema);
  }
}

module.exports = Student;