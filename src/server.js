'use strict';

require('dotenv').config();
const cwd = process.cwd();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const sassMiddleware = require('node-sass-middleware');

const app = express();
const viewRouter = require('./routes/views.js');

const notFound = require('./middleware/not-found.js');
const serverError = require('./middleware/server-error.js');

app.use(morgan('dev'));
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

  mongoConnect: () => {
    const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
    }
    return mongoose.connect(process.env.MONGODB_URI, options)
  },

  start: (port) => {
    const PORT = process.env.PORT || port || 3000;
    app.listen(PORT, () => console.log(`Class Manager running on port :: ${PORT}`));
  },
};
