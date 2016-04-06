var User = require('./User');


var Users = function() {
};

Users.prototype.query = function(query, done) {
    User.findOne(query, function(err, user) {
        if (err) {
            console.log('Error in finding user: ' + err);
        }
        done(null, user);
    });
};

Users.prototype.create = function(newUser, done) {
    // save the user
    newUser.save(function(err) {
        if (err) {
            console.log('Error in Saving user: ' + err);
            throw err;
        }
        console.log('User Registration succesful');
        return done(null, newUser);
    });
}


module.exports = Users;