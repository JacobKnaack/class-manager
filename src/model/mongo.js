'use strict';

class Model {
  constructor(schema) {
    this.schema = schema;
  }

  get(_id) {
    if (_id) return this.schema.findOne({ _id });
    return this.schema.find({});
  }

  create(data) {
    const newModel = new this.schema(data);
    return newModel.save();
  }

  update(_id, record) {

  }

  delete(_id) {

  }
}

module.exports = Model;