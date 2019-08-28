'use strict';

const cwd = process.cwd();
const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const sassMiddleware = require('node-sass-middleware');

const app = express();
const viewRouter = require('./routes/views.js');

const notFound = require('./middleware/404.js');
const serverError = require('./middleware/500.js');

app.use(sassMiddleware({
  src: __dirname + '/sass',
  dest: cwd + '/public/style',
  debug: true
}));
app.use(express.static(path.join(cwd, './public')));
app.use(viewRouter);

app.use('*', notFound);
app.use(serverError);

module.exports = {
  app,

  config: async (configPath) => {
    return new Promise((resolve, reject) => {
      let configData;
      if (fs.existsSync(configPath)) {
        configData = require(configPath).json;
        for (let key in Object.keys(configData)) {
          app.locals[key] = configData[key];
        }
        resolve(app.locals);
      } else {
        configData = {
          class: "Enter Class Name here",
          classCode: "",
          description: "Enter class description here",
          students: [],
          teachingAssistant: [],
          instructor: "Enter Instructor Name here"
        }
        app.locals = configData;
      }
      reject('Server configuration error');
    });
  },

  mongoConnect: () => {
    const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
    }
    mongoose.connect(process.env.MONGODB_URI, options);
  },

  start: (port) => {
    const PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Class Manager running on port :: ${PORT}`));
  },

}