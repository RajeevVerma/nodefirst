
var LocalStrategy = require('passport-local').Strategy;
var users = require('./Users');
var User = require('./User');
var passport = require('passport');

module.exports = function PassportAuthentication(p) {

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });


    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    // passport/login.js
    passport.use('login', new LocalStrategy(
        function(username, password, done) {
            // check in mongo if a user with username exists or not
            users.prototype.query({
                'username': username
            },
                function(err, user) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log error & redirect back
                    if (!user) {
                        console.log('User Not Found with username from strategy- ' + username);
                        return done('User Not Found with username');
                    }
                    // User exists but wrong password, log the error 
                    if (!isValidPassword(user, password)) {
                        console.log('Invalid Password from strategy');
                        return done('Invalid Password');
                    }
                    // User and password both match, return user from 
                    // done method which will be treated like success
                    return done(null, user);
                }
            );
        }
    ));

    passport.use('signup', new LocalStrategy({
        passReqToCallback: true
    },
        function(req, username, password, done) {
            //findOrCreateUser = function() {
                // find a user in Mongo with provided username
                users.prototype.query({ 'username': username }, function(err, user) {
                    // In case of any error return
                    if (err) {
                        console.log('Error in SignUp: ' + err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists');
                        return done('User already exists', false);
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser = new User();
                        // set the user's local credentials
                        newUser.username = username;
                        newUser.password = password;
                        newUser.email = req.param('email');
                        newUser.firstName = req.param('firstName');
                        newUser.lastName = req.param('lastName');

                        // save the user
                        users.prototype.create(newUser, function(err) {
                            if (err) {
                                console.log('Error in Saving user: ' + err);
                                throw err;
                            }
                            console.log('User Registration succesful');
                            return done(null, newUser);
                        });
                    }
                });
           // };

            // Delay the execution of findOrCreateUser and execute 
            // the method in the next tick of the event loop
           // process.nextTick(findOrCreateUser);
        })
    );
    var isValidPassword = function(user, password) {
        return password === user.password;
    }


};