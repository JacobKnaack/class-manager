'use strict';

const cwd = process.cwd();
const fs = require('fs');
const express = require('express');
const sassMiddleware = require('node-sass-middleware');

const app = express();
const viewRouter = require('./routes/views.js');

app.use(express.static('./public'));
app.use(viewRouter);
app.use(sassMiddleware({
  src: __dirname + '/sass',
  dest: cwd + '/public/style',
  debug: true
}));

module.exports = {
  app,

  config: async (configPath) => {
    return new Promise((resolve, reject) => {
      let configData;
      if (fs.existsSync(configPath)) {
        configData = require(configPath);
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
      reject('Server configurataion error');
    });
  },

  start: (port) => {
    const PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Class Manager running on port :: ${PORT}`));
  },

}