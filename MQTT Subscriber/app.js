var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var mqtt = require('mqtt')

var options = {
  host: '33b181fb2a7c4004a2cc08b139344d91.s1.eu.hivemq.cloud',
  port: 8883,
  protocol: 'mqtts',
  username: '<your-id>',
  password: '<your-password>'
}

//initialize the MQTT client
var client = mqtt.connect(options);

client.on('connect', function () {
  console.log('Connected to MQTT Broker');
});

client.on('error', function (error) {
  console.log(error);
});

client.on('message', function (topic, message) {
  console.log('Topic: ' + topic,', Message: '+ message.toString());
});

client.subscribe('Record Inserted');

module.exports = app;
