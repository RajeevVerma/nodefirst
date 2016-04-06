var express = require('express');
var security = express.Router();
var passport = require('passport');

require('../serverModules/PassportAuthentication')(passport);

security.post('/', function(req, res, next) {
    var done = function(error, user) {
        if (error)
            console.log("Error occurred while login:" + error);
         if (error)
            res.send(error)
              res.json(user); 
    };
    passport.authenticate('login')(req, res, done);
    //passportStrategy.login(req.param('username'), req.param('password'));
})

security.post('/signup', function(req, res, next) {
    var done = function(error, user) {
        if (error)
            console.log("Error occurred while login:" + error);
        
        if (error)
            res.send(error)

        res.json(user); 
           // next(error, user);
    };
    passport.authenticate('signup')(req, res, done);
    //passportStrategy.login(req.param('username'), req.param('password'));
})

module.exports = security;

