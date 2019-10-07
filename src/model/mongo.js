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
    const filter = {_id};
    return this.schema.findOneAndUpdate(filter, record);
  }

  delete(_id) {
    const filter = {_id};
    return this.schema.findOneAndDelete(filter);
  }
}

module.exports = Model;
