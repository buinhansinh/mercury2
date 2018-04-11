const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const api_init = require('./src/init');
const api_route = require('./src/route');


api_init()

// var book = require('./routes/book');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

// Authentication via passport.js
app.use(passport.initialize());
app.use(passport.session());

// app.use(express.static(path.join(__dirname, 'dist')));
// app.use('/api', express.static(path.join(__dirname, 'dist')));
app.use('/api', api_route);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;