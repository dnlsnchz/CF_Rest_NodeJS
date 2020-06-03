var express = require('express');
var path = require('path');
var logger = require('morgan');
const bodyParser = require('body-parser');

//const Place = require('./models/Place');

const places = require('./routes/places');

const db = require('./config/database');



db.connect();
var app = express();

// view engine setup
app.use(logger('dev'));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/places',places);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
