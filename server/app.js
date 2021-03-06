var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('../config.json');
var routes = require('./routes/database');

var app = express();

// view engine setup
// view engine setup
app.set('views', path.join(__dirname, '/../client/views'));
app.set('view engine', 'jade');

app.use('/', routes);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public',   'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../client')));
app.use(express.static('../'));

app.all('*', function(request, response, next) {
  // Just send the index.html for other files to support HTML5Mode
  response.sendFile('index.html', { root: __dirname + '/../client' });
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
