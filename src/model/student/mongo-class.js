'use strict';

const MongooseModel = require('../mongo.js');
const schema = require('./schema');

/**
 * Student Class extends mongoose model
 * @params {object} schema
 */

class Student extends MongooseModel {}

module.exports = new Student(schema);
