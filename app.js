
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var todos = require('./routes/todos');
var mongoose = require('mongoose');   
var passport  = require('passport');
var app = express();
var appConfiguration = require('./serverModules/config')();
var security = require('./routes/security');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());                             // Initialize PassportJS
app.use(passport.session());                                // Use Passport's session authentication strategy - this stores the logged in user in the session and will now run on any request

app.get('/', function(req, res) {
        res.sendFile('./views/index.html', { root: __dirname }); // load the single view file (angular will handle the page changes on the front-end)
    });
    
 app.get('/views/*', function(req, res){
         res.sendFile(req.originalUrl, { root: __dirname }); // load the single view file (angular will handle the page changes on the front-end)
    });
app.use('/authenticate', security);

app.use('/todos', todos);
//mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu'); 


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
