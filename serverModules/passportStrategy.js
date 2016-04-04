var passport = require('passport');
var localStrategy = require('passport-local').strategy;

module.exports = function PassportAuthentication(params) {

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });


    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};