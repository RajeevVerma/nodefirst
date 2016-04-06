var mongoose = require('mongoose');

module.exports = function Configuration() {
    mongoose.connect('mongodb://localhost/test');
 var db = mongoose.connection;

  db.once('open', function () {
    console.log('Connected to database!');
  });

  db.on('error', console.error.bind(console, 'Error:'));
   return mongoose;
}