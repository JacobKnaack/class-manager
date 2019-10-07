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
const authRouter = require('./routes/auth');
const notFound = require('./middleware/not-found.js');
const serverError = require('./middleware/server-error.js');

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(sassMiddleware({
  src: cwd + '/src/sass/',
  dest: cwd + '/public/style/',
  debug: true,
  prefix: '/style'
}));
app.use(express.static(path.join(cwd, './public')));
app.use(authRouter);
app.use(viewRouter);

app.use('*', notFound);
app.use(serverError);

module.exports = {
  app,

  mongoConnect: () => {
    const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
    };

    return mongoose.connect(process.env.MONGODB_URI, options)
  },

  start: (port) => {
    const PORT = process.env.PORT || port || 3000;
    app.listen(PORT, () => console.log(`Class Manager running on port :: ${PORT}`));
  },
};
