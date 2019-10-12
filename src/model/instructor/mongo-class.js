'use strict';

const MongooseModel = require('../mongo.js');
const Schema = require('./schema');

/**
 * Instructor Model extends mongoose model
 * @params {object} schema
 */

class Instructor extends MongooseModel {};

module.exports = new Instructor(Schema);
