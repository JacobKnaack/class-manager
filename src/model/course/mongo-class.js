'use strict';

const MongooseModel = require('../mongo');
const schema = require('./schema');

/**
 * Course Model extends mongoose model
 * @params {object} schema
 */

class Course extends MongooseModel {
  getByUserId(id) {
    return this.schema.find({ userId: id });
  }
};

module.exports = new Course(schema);
