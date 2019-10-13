'use strict';

const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').default;
let mongoServer = new MongoMemoryServer();

let mockDB = module.exports = {
  startDB: async () => {
    const mongoURI = await mongoServer.getConnectionString();

    const mongooseOptions = {
      useNewUrlParser:true,
      useCreateIndex: true
    };

    await mongoose.connect(mongoURI, mongooseOptions, (err) => {
      if (err) console.error(err);
    });
  },

  stopDB: () => {
    mongoose.disconnect();
    mongoServer.stop();
  },
};

describe('Module exports an object', () => {
  it('Is an object', () => {
    expect(typeof mockDB).toEqual('object');
  })
})



